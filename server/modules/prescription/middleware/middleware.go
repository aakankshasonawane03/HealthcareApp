package middleware

import "github.com/gin-gonic/gin"

func PrescriptionMiddleware() func(*gin.Context) {
	return func(c *gin.Context) {
		// example middleware logic
		c.Next()
	}
}
