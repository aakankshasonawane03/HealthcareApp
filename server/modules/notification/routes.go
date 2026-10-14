package notification

import (
	"github.com/gin-gonic/gin"
)

func RegisterNotificationRoutes(r *gin.RouterGroup) {

	group := r.Group("/notification")

	// TODO: attach handlers
	_ = group
}
