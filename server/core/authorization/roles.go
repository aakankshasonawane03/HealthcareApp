package authorization

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func RequireRoles(allowedRoles ...string) gin.HandlerFunc {
	return func(c *gin.Context) {
		principal, err := FromContext(c)
		if err != nil {
			c.AbortWithStatusJSON(
				http.StatusUnauthorized,
				gin.H{"success": false, "message": err.Error()},
			)
			return
		}

		for _, allowed := range allowedRoles {
			if principal.Role == allowed {
				c.Next()
				return
			}
		}

		c.AbortWithStatusJSON(
			http.StatusForbidden,
			gin.H{
				"success": false,
				"message": "Insufficient permissions",
			},
		)
	}
}
