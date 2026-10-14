package admin

import (
	"github.com/gin-gonic/gin"
)

func RegisterAdminRoutes(r *gin.RouterGroup) {

	group := r.Group("/admin")

	// TODO: attach handlers
	_ = group
}