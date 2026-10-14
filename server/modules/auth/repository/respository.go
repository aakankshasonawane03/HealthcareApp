package repository

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"log"
	"time"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/model"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserRepository interface {
	Create(ctx context.Context, user *model.User) error
	FindByEmail(ctx context.Context, email string) (*model.User, error)
	FindByID(ctx context.Context, id primitive.ObjectID) (*model.User, error)

	CreateRefreshToken(
		ctx context.Context,
		token string,
		userID primitive.ObjectID,
		expiresAt time.Time,
	) error

	FindRefreshToken(
		ctx context.Context,
		token string,
	) (primitive.ObjectID, time.Time, bool, error)

	RevokeRefreshToken(
		ctx context.Context,
		token string,
	) error
}

type userRepository struct {
	collection       *mongo.Collection
	refreshCollection *mongo.Collection
}

func NewUserRepository(
	collection *mongo.Collection,
	refreshCollection *mongo.Collection,
) UserRepository {

	log.Printf(
		"Auth repository connected to database=%s collection=%s",
		collection.Database().Name(),
		collection.Name(),
	)

	log.Printf(
		"Refresh token repository connected to database=%s collection=%s",
		refreshCollection.Database().Name(),
		refreshCollection.Name(),
	)

	return &userRepository{
		collection:        collection,
		refreshCollection: refreshCollection,
	}
}

// Create inserts a new user into MongoDB.
func (r *userRepository) Create(
	ctx context.Context,
	user *model.User,
) error {

	log.Printf(
		"Saving user | database=%s | collection=%s | email=%s",
		r.collection.Database().Name(),
		r.collection.Name(),
		user.Email,
	)

	result, err := r.collection.InsertOne(ctx, user)
	if err != nil {
		log.Printf("MongoDB INSERT ERROR: %v", err)
		return err
	}

	log.Printf(
		"User saved successfully | inserted_id=%v | email=%s",
		result.InsertedID,
		user.Email,
	)

	return nil
}

// Find user by email.
func (r *userRepository) FindByEmail(
	ctx context.Context,
	email string,
) (*model.User, error) {

	var user model.User

	err := r.collection.FindOne(
		ctx,
		bson.M{"email": email},
	).Decode(&user)

	if err != nil {
		return nil, err
	}

	return &user, nil
}

// Find user by MongoDB ObjectID.
func (r *userRepository) FindByID(
	ctx context.Context,
	id primitive.ObjectID,
) (*model.User, error) {

	var user model.User

	err := r.collection.FindOne(
		ctx,
		bson.M{"_id": id},
	).Decode(&user)

	if err != nil {
		return nil, err
	}

	return &user, nil
}

// CreateRefreshToken stores a hashed refresh token.
func (r *userRepository) CreateRefreshToken(
	ctx context.Context,
	token string,
	userID primitive.ObjectID,
	expiresAt time.Time,
) error {

	hash := sha256.Sum256([]byte(token))
	tokenHash := hex.EncodeToString(hash[:])

	refreshToken := bson.M{
		"token_hash": tokenHash,
		"user_id":    userID,
		"expires_at": expiresAt,
		"revoked":    false,
		"created_at": time.Now(),
	}

	_, err := r.refreshCollection.InsertOne(
		ctx,
		refreshToken,
	)

	if err != nil {
		log.Printf(
			"Failed to save refresh token: %v",
			err,
		)
		return err
	}

	return nil
}

// FindRefreshToken validates and retrieves refresh token data.
func (r *userRepository) FindRefreshToken(
	ctx context.Context,
	token string,
) (primitive.ObjectID, time.Time, bool, error) {

	hash := sha256.Sum256([]byte(token))
	tokenHash := hex.EncodeToString(hash[:])

	var result struct {
		UserID    primitive.ObjectID `bson:"user_id"`
		ExpiresAt time.Time          `bson:"expires_at"`
		Revoked   bool               `bson:"revoked"`
	}

	err := r.refreshCollection.FindOne(
		ctx,
		bson.M{
			"token_hash": tokenHash,
		},
	).Decode(&result)

	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return primitive.NilObjectID, time.Time{}, false, errors.New(
				"refresh token not found",
			)
		}

		return primitive.NilObjectID, time.Time{}, false, err
	}

	return result.UserID, result.ExpiresAt, result.Revoked, nil
}

// RevokeRefreshToken invalidates a refresh token.
func (r *userRepository) RevokeRefreshToken(
	ctx context.Context,
	token string,
) error {

	hash := sha256.Sum256([]byte(token))
	tokenHash := hex.EncodeToString(hash[:])

	result, err := r.refreshCollection.UpdateOne(
		ctx,
		bson.M{
			"token_hash": tokenHash,
		},
		bson.M{
			"$set": bson.M{
				"revoked": true,
			},
		},
	)

	if err != nil {
		return err
	}

	if result.MatchedCount == 0 {
		return errors.New("refresh token not found")
	}

	return nil
}