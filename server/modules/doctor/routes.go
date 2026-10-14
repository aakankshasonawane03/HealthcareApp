package doctor

import (
	"github.com/gin-gonic/gin"
)

func RegisterDoctorRoutes(r *gin.RouterGroup) {

	group := r.Group("/doctor")

	// TODO: attach handlers
	_ = group
}
