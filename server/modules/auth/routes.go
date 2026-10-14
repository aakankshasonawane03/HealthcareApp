package auth

import (
	"github.com/gin-gonic/gin"
)

func RegisterAuthRoutes(r *gin.RouterGroup) {

	group := r.Group("/auth")

	// TODO: attach handlers
	_ = group
}
