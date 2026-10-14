package service

import (
	"context"
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"errors"
	"os"
	"strings"
	"time"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/model"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/repository"

	"github.com/golang-jwt/jwt/v5"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

const (

	// Access token lifetime.
	//
	// Example:
	// 15 minutes
	AccessTokenDuration = 15 * time.Minute

	// Refresh token lifetime.
	//
	// Example:
	// 7 days
	RefreshTokenDuration = 7 * 24 * time.Hour
)

type AuthService interface {
	Register(
		ctx context.Context,
		user *model.User,
	) error

	Login(
		ctx context.Context,
		email string,
		password string,
	) (
		string,
		string,
		*model.User,
		error,
	)

	RefreshAccessToken(
		ctx context.Context,
		refreshToken string,
	) (
		string,
		error,
	)

	Logout(
		ctx context.Context,
		refreshToken string,
	) error

	GetUserByID(
		ctx context.Context,
		id primitive.ObjectID,
	) (*model.User, error)
}

type authService struct {
	repository repository.UserRepository
}

func NewAuthService(
	repo repository.UserRepository,
) AuthService {

	return &authService{
		repository: repo,
	}
}

// ============================================================
// REGISTER
// ============================================================

func (s *authService) Register(
	ctx context.Context,
	user *model.User,
) error {

	// Check if email already exists.
	existingUser, err := s.repository.FindByEmail(
		ctx,
		user.Email,
	)

	if err == nil && existingUser != nil {

		return errors.New(
			"email already registered",
		)
	}

	if err != nil &&
		!errors.Is(err, mongo.ErrNoDocuments) {

		return err
	}

	// Hash password.
	hashedPassword, err := bcrypt.GenerateFromPassword(
		[]byte(user.Password),
		bcrypt.DefaultCost,
	)

	if err != nil {
		return err
	}

	// Generate user ID.
	user.ID = primitive.NewObjectID()

	// Store hashed password.
	user.Password = string(hashedPassword)

	// Default role.
	if user.Role == "" {
		user.Role = "PATIENT"
	}

	// Activate account.
	user.IsActive = true

	now := time.Now()

	user.CreatedAt = now
	user.UpdatedAt = now

	// Save user.
	return s.repository.Create(
		ctx,
		user,
	)
}

// ============================================================
// LOGIN
// ============================================================
//
// Login now returns:
//
// 1. access token
// 2. refresh token
// 3. user
//
// Previously it returned only:
//
// access token + user
func (s *authService) Login(
	ctx context.Context,
	email string,
	password string,
) (
	string,
	string,
	*model.User,
	error,
) {
	// 1. Find user by email.
	user, err := s.repository.FindByEmail(
		ctx,
		strings.TrimSpace(email),
	)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return "", "", nil, errors.New("invalid email or password")
		}

		return "", "", nil, err
	}

	if user == nil {
		return "", "", nil, errors.New("invalid email or password")
	}

	// 2. Check whether the account is active.
	if !user.IsActive {
		return "", "", nil, errors.New("user account is inactive")
	}

	// 3. Compare the submitted password with
	// the bcrypt password stored in MongoDB.
	err = bcrypt.CompareHashAndPassword(
		[]byte(user.Password),
		[]byte(password),
	)
	if err != nil {
		return "", "", nil, errors.New("invalid email or password")
	}

	// 4. Generate access token.
	accessToken, err := generateJWT(user)
	if err != nil {
		return "", "", nil, err
	}

	// 5. Generate refresh token.
	refreshToken, err := generateRefreshToken()
	if err != nil {
		return "", "", nil, err
	}

	// 6. Store the refresh token in MongoDB.
	// Only its hash is stored by the repository.
	err = s.repository.CreateRefreshToken(
		ctx,
		refreshToken,
		user.ID,
		time.Now().Add(RefreshTokenDuration),
	)
	if err != nil {
		return "", "", nil, err
	}

	// 7. Return access token, refresh token and user.
	return accessToken, refreshToken, user, nil
}

// ============================================================
// REFRESH ACCESS TOKEN
// ============================================================

func (s *authService) RefreshAccessToken(
	ctx context.Context,
	refreshToken string,
) (
	string,
	error,
) {

	// --------------------------------------------------------
	// 1. Check refresh token
	// --------------------------------------------------------

	refreshToken = strings.TrimSpace(
		refreshToken,
	)

	if refreshToken == "" {

		return "",
			errors.New(
				"refresh token is required",
			)
	}

	// --------------------------------------------------------
	// 2. Hash received refresh token
	// --------------------------------------------------------

	tokenHash := hashRefreshToken(
		refreshToken,
	)

	// --------------------------------------------------------
	// 3. Find token in MongoDB
	// --------------------------------------------------------

	userID,
		expiresAt,
		revoked,
		err := s.repository.FindRefreshToken(
		ctx,
		tokenHash,
	)

	if err != nil {

		if errors.Is(
			err,
			mongo.ErrNoDocuments,
		) {

			return "",
				errors.New(
					"invalid refresh token",
				)
		}

		return "",
			err
	}

	// --------------------------------------------------------
	// 4. Check revoked
	// --------------------------------------------------------

	if revoked {

		return "",
			errors.New(
				"refresh token has been revoked",
			)
	}

	// --------------------------------------------------------
	// 5. Check expiry
	// --------------------------------------------------------

	if time.Now().After(expiresAt) {

		return "",
			errors.New(
				"refresh token has expired",
			)
	}

	// --------------------------------------------------------
	// 6. Find user
	// --------------------------------------------------------

	user, err := s.repository.FindByID(
		ctx,
		userID,
	)

	if err != nil {

		if errors.Is(
			err,
			mongo.ErrNoDocuments,
		) {

			return "",
				errors.New(
					"user not found",
				)
		}

		return "",
			err
	}

	// --------------------------------------------------------
	// 7. Check user status
	// --------------------------------------------------------

	if !user.IsActive {

		return "",
			errors.New(
				"user account is inactive",
			)
	}

	// --------------------------------------------------------
	// 8. Generate NEW access token
	// --------------------------------------------------------

	newAccessToken, err := generateJWT(
		user,
	)

	if err != nil {

		return "",
			err
	}

	return newAccessToken, nil
}

// ============================================================
// LOGOUT
// ============================================================

func (s *authService) Logout(
	ctx context.Context,
	refreshToken string,
) error {

	refreshToken = strings.TrimSpace(
		refreshToken,
	)

	if refreshToken == "" {

		return errors.New(
			"refresh token is required",
		)
	}

	// Hash the received token.
	tokenHash := hashRefreshToken(
		refreshToken,
	)

	// Revoke token in MongoDB.
	err := s.repository.RevokeRefreshToken(
		ctx,
		tokenHash,
	)

	if err != nil {

		if errors.Is(
			err,
			mongo.ErrNoDocuments,
		) {

			return errors.New(
				"invalid refresh token",
			)
		}

		return err
	}

	return nil
}

// ============================================================
// GET USER BY ID
// ============================================================

func (s *authService) GetUserByID(
	ctx context.Context,
	id primitive.ObjectID,
) (*model.User, error) {

	return s.repository.FindByID(
		ctx,
		id,
	)
}

// ============================================================
// ACCESS TOKEN GENERATION
// ============================================================

func generateJWT(
	user *model.User,
) (string, error) {

	secret := os.Getenv(
		"JWT_SECRET",
	)

	if secret == "" {

		secret = "sharkweb-secret-key"
	}

	now := time.Now()

	claims := jwt.MapClaims{

		// User information.
		"user_id": user.ID.Hex(),
		"email":   user.Email,
		"role":    user.Role,

		// Issued at.
		"iat": now.Unix(),

		// Access token expires after
		// AccessTokenDuration.
		"exp": now.Add(
			AccessTokenDuration,
		).Unix(),
	}

	token := jwt.NewWithClaims(
		jwt.SigningMethodHS256,
		claims,
	)

	return token.SignedString(
		[]byte(
			strings.TrimSpace(secret),
		),
	)
}

// ============================================================
// REFRESH TOKEN GENERATION
// ============================================================
//
// Refresh token is NOT a JWT.
//
// It is a cryptographically random string.
func generateRefreshToken() (
	string,
	error,
) {

	// Generate 64 random bytes.
	randomBytes := make(
		[]byte,
		64,
	)

	_, err := rand.Read(
		randomBytes,
	)

	if err != nil {
		return "", err
	}

	// Convert to URL-safe string.
	return base64.RawURLEncoding.EncodeToString(
		randomBytes,
	), nil
}

// ============================================================
// REFRESH TOKEN HASHING
// ============================================================
//
// We store only the hash in MongoDB.
//
// Actual token:
//
//	abc123...
//
// SHA256:
//
//	xyz789...
//
// MongoDB stores:
//
//	xyz789...
func hashRefreshToken(
	token string,
) string {

	hash := sha256.Sum256(
		[]byte(token),
	)

	return base64.RawURLEncoding.EncodeToString(
		hash[:],
	)
}
