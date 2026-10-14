package handler

import (
	"net/http"
	"strings"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/model"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/service"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type AuthController struct {
	service service.AuthService
}

func NewAuthController(
	authService service.AuthService,
) *AuthController {
 
	return &AuthController{
		service: authService,
	}
}

// ------------------------------------------------------------
// Register request
// ------------------------------------------------------------

type RegisterRequest struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Role     string `json:"role"`
}

// ------------------------------------------------------------
// Login request
// ------------------------------------------------------------

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// ------------------------------------------------------------
// Refresh token request
// ------------------------------------------------------------

type RefreshTokenRequest struct {
	RefreshToken string `json:"refresh_token"`
}

// ------------------------------------------------------------
// Register
// ------------------------------------------------------------

func (h *AuthController) Register(
	c *gin.Context,
) {

	var request RegisterRequest

	// Parse JSON.
	if err := c.ShouldBindJSON(&request); err != nil {

		c.JSON(
			http.StatusBadRequest,
			gin.H{
				"success": false,
				"message": "Invalid request body",
				"error":   err.Error(),
			},
		)

		return
	}

	// Clean input.
	request.Name = strings.TrimSpace(
		request.Name,
	)

	request.Email = strings.ToLower(
		strings.TrimSpace(
			request.Email,
		),
	)

	request.Password = strings.TrimSpace(
		request.Password,
	)

	request.Role = strings.ToUpper(
		strings.TrimSpace(
			request.Role,
		),
	)

	// Validate.
	if request.Name == "" ||
		request.Email == "" ||
		request.Password == "" {

		c.JSON(
			http.StatusBadRequest,
			gin.H{
				"success": false,
				"message": "Name, email and password are required",
			},
		)

		return
	}

	// Create user model.
	user := &model.User{
		Name:     request.Name,
		Email:    request.Email,
		Password: request.Password,
		Role:     request.Role,
	}

	// Register.
	err := h.service.Register(
		c.Request.Context(),
		user,
	)

	if err != nil {

		c.JSON(
			http.StatusBadRequest,
			gin.H{
				"success": false,
				"message": err.Error(),
			},
		)

		return
	}

	// Response.
	c.JSON(
		http.StatusCreated,
		gin.H{
			"success": true,
			"message": "User registered successfully",
			"data": gin.H{
				"id":         user.ID.Hex(),
				"name":       user.Name,
				"email":      user.Email,
				"role":       user.Role,
				"is_active":  user.IsActive,
				"created_at": user.CreatedAt,
				"updated_at": user.UpdatedAt,
			},
		},
	)
}

// ------------------------------------------------------------
// Login
// ------------------------------------------------------------

func (h *AuthController) Login(
	c *gin.Context,
) {

	var request LoginRequest

	// Parse request.
	if err := c.ShouldBindJSON(&request); err != nil {

		c.JSON(
			http.StatusBadRequest,
			gin.H{
				"success": false,
				"message": "Invalid request body",
				"error":   err.Error(),
			},
		)

		return
	}

	// Clean email.
	request.Email = strings.ToLower(
		strings.TrimSpace(
			request.Email,
		),
	)

	// Clean password.
	request.Password = strings.TrimSpace(
		request.Password,
	)

	// --------------------------------------------------------
	// Login
	// --------------------------------------------------------
	//
	// OLD:
	//
	// token, user, err := h.service.Login(...)
	//
	// NEW:
	//
	// accessToken, refreshToken, user, err := ...
	//

	accessToken, refreshToken, user, err := h.service.Login(
		c.Request.Context(),
		request.Email,
		request.Password,
	)

	if err != nil {

		c.JSON(
			http.StatusUnauthorized,
			gin.H{
				"success": false,
				"message": err.Error(),
			},
		)

		return
	}

	// --------------------------------------------------------
	// Response
	// --------------------------------------------------------

	c.JSON(
		http.StatusOK,
		gin.H{
			"success": true,
			"message": "Login successful",

			"access_token": accessToken,

			"refresh_token": refreshToken,

			"token_type": "Bearer",

			"expires_in": 900,

			"user": gin.H{
				"id":         user.ID.Hex(),
				"name":       user.Name,
				"email":      user.Email,
				"role":       user.Role,
				"is_active":  user.IsActive,
				"created_at": user.CreatedAt,
				"updated_at": user.UpdatedAt,
			},
		},
	)
}

// ------------------------------------------------------------
// Refresh Access Token
// ------------------------------------------------------------
//
// Endpoint:
//
// POST /api/auth/refresh
//
// Request:
//
// {
//     "refresh_token": "......"
// }
//
// Response:
//
// {
//     "access_token": "......",
//     "token_type": "Bearer",
//     "expires_in": 900
// }
//
// ------------------------------------------------------------

func (h *AuthController) RefreshToken(
	c *gin.Context,
) {

	var request RefreshTokenRequest

	// Parse request.
	if err := c.ShouldBindJSON(&request); err != nil {

		c.JSON(
			http.StatusBadRequest,
			gin.H{
				"success": false,
				"message": "Invalid request body",
				"error":   err.Error(),
			},
		)

		return
	}

	// Clean refresh token.
	request.RefreshToken = strings.TrimSpace(
		request.RefreshToken,
	)

	// Validate.
	if request.RefreshToken == "" {

		c.JSON(
			http.StatusBadRequest,
			gin.H{
				"success": false,
				"message": "Refresh token is required",
			},
		)

		return
	}

	// --------------------------------------------------------
	// Ask service to validate refresh token
	// and generate a new access token.
	// --------------------------------------------------------

	newAccessToken, err := h.service.RefreshAccessToken(
		c.Request.Context(),
		request.RefreshToken,
	)

	if err != nil {

		c.JSON(
			http.StatusUnauthorized,
			gin.H{
				"success": false,
				"message": err.Error(),
			},
		)

		return
	}

	// --------------------------------------------------------
	// Return new access token.
	// --------------------------------------------------------

	c.JSON(
		http.StatusOK,
		gin.H{
			"success": true,
			"message": "Access token refreshed successfully",

			"access_token": newAccessToken,

			"token_type": "Bearer",

			"expires_in": 900,
		},
	)
}

// ------------------------------------------------------------
// Logout
// ------------------------------------------------------------
//
// Endpoint:
//
// POST /api/auth/logout
//
// Request:
//
// {
//     "refresh_token": "......"
// }
//
// ------------------------------------------------------------

func (h *AuthController) Logout(
	c *gin.Context,
) {

	var request RefreshTokenRequest

	// Parse request.
	if err := c.ShouldBindJSON(&request); err != nil {

		c.JSON(
			http.StatusBadRequest,
			gin.H{
				"success": false,
				"message": "Invalid request body",
				"error":   err.Error(),
			},
		)

		return
	}

	// Clean token.
	request.RefreshToken = strings.TrimSpace(
		request.RefreshToken,
	)

	// Validate.
	if request.RefreshToken == "" {

		c.JSON(
			http.StatusBadRequest,
			gin.H{
				"success": false,
				"message": "Refresh token is required",
			},
		)

		return
	}

	// Revoke refresh token.
	err := h.service.Logout(
		c.Request.Context(),
		request.RefreshToken,
	)

	if err != nil {

		c.JSON(
			http.StatusUnauthorized,
			gin.H{
				"success": false,
				"message": err.Error(),
			},
		)

		return
	}

	c.JSON(
		http.StatusOK,
		gin.H{
			"success": true,
			"message": "Logout successful",
		},
	)
}

// ------------------------------------------------------------
// Get current user
// ------------------------------------------------------------

func (h *AuthController) GetMe(
	c *gin.Context,
) {

	userID := c.GetString(
		"user_id",
	)

	if userID == "" {

		c.JSON(
			http.StatusUnauthorized,
			gin.H{
				"success": false,
				"message": "User ID not found in context",
			},
		)

		return
	}

	id, err := primitive.ObjectIDFromHex(
		userID,
	)

	if err != nil {

		c.JSON(
			http.StatusBadRequest,
			gin.H{
				"success": false,
				"message": "Invalid user ID",
			},
		)

		return
	}

	user, err := h.service.GetUserByID(
		c.Request.Context(),
		id,
	)

	if err != nil {

		c.JSON(
			http.StatusNotFound,
			gin.H{
				"success": false,
				"message": "User not found",
			},
		)

		return
	}

	c.JSON(
		http.StatusOK,
		gin.H{
			"success": true,
			"data": gin.H{
				"id":         user.ID.Hex(),
				"name":       user.Name,
				"email":      user.Email,
				"role":       user.Role,
				"is_active":  user.IsActive,
				"created_at": user.CreatedAt,
				"updated_at": user.UpdatedAt,
			},
		},
	)
}