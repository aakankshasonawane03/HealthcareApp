
package authorization

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func RequireRoles(allowedRoles ...string) gin.HandlerFunc {
	return func(c *gin.Context) {
		principal, err := FromContext(c)

		// Temporary debugging: inspect the authenticated user's role.
		fmt.Printf(
			"[RBAC DEBUG] method=%s path=%s user_id=%q role=%q err=%v allowed_roles=%v\n",
			c.Request.Method,
			c.Request.URL.Path,
			principal.UserID,
			principal.Role,
			err,
			allowedRoles,
		)

		if err != nil {
			c.AbortWithStatusJSON(
				http.StatusUnauthorized,
				gin.H{
					"success": false,
					"message": err.Error(),
				},
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
