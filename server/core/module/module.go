package module

import "github.com/gin-gonic/gin"

type Module interface {
	Name() string

	// Initialize dependencies (DB, services, config, etc.)
	Init(ctx *ModuleContext) error

	// Register HTTP routes
	RegisterRoutes(r *gin.RouterGroup)
}
