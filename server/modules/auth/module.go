package auth

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/handler"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/repository"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/service"
)

const ModuleName = "auth"

type Module struct {
	handler *handler.AuthController
}

func NewModule() *Module {
	return &Module{}
}

func (m *Module) Name() string {
	return ModuleName
}

func (m *Module) Init(ctx *module.ModuleContext) error {

	// Users collection
	userCollection := ctx.DB.Collection("users")

	// Refresh tokens collection
	refreshTokenCollection := ctx.DB.Collection("refresh_tokens")

	// Create repository
	repo := repository.NewUserRepository(
		userCollection,
		refreshTokenCollection,
	)

	// Create auth service
	authService := service.NewAuthService(repo)

	// Create auth controller
	m.handler = handler.NewAuthController(authService)

	return nil
}

func (m *Module) RegisterRoutes(r *gin.RouterGroup) {

	// =========================
	// AUTH MODULE ROOT
	// =========================
	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"module":  ModuleName,
			"message": "Auth module is working",
			"success": true,
		})
	})

	// =========================
	// AUTH HEALTH CHECK
	// =========================
	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"module":  ModuleName,
			"status":  "healthy",
			"message": "Auth service is running",
			"success": true,
		})
	})

	// =========================
	// REGISTER
	// =========================
	r.POST("/register", m.handler.Register)

	// =========================
	// LOGIN
	// =========================
	r.POST("/login", m.handler.Login)

	// =========================
	// REFRESH ACCESS TOKEN
	// =========================
	r.POST("/refresh", m.handler.RefreshToken)

	// =========================
	// LOGOUT
	// =========================
	r.POST("/logout", m.handler.Logout)
}

// Make sure Module implements module.Module
var _ module.Module = (*Module)(nil)
