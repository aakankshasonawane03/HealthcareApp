package patients

import (
	"github.com/gin-gonic/gin"
)

func RegisterPatientsRoutes(r *gin.RouterGroup) {

	group := r.Group("/patients")

	// TODO: attach handlers
	_ = group
}
