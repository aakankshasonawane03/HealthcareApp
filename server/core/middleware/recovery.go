package middleware

import (
	"log"
	"net/http"
	"runtime/debug"

	"github.com/gin-gonic/gin"
)

func Recovery() gin.HandlerFunc {
	return func(c *gin.Context) {

		defer func() {
			if err := recover(); err != nil {

				// Print panic details to the server console
				log.Printf("PANIC: %v", err)
				debug.PrintStack()

				// Don't send another response if headers were already written
				if !c.Writer.Written() {
					c.JSON(http.StatusInternalServerError, gin.H{
						"success": false,
						"error":   "Internal Server Error",
					})
				}

				c.Abort()
			}
		}()

		c.Next()
	}
}