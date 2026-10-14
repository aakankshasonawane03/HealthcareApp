
package middleware

import (
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")

		if authHeader == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"success": false,
				"message": "Token required",
			})
			return
		}

		parts := strings.SplitN(authHeader, " ", 2)
		if len(parts) != 2 ||
			!strings.EqualFold(parts[0], "Bearer") ||
			strings.TrimSpace(parts[1]) == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"success": false,
				"message": "Invalid authorization header",
			})
			return
		}

		jwtSecret := os.Getenv("JWT_SECRET")
		if jwtSecret == "" {
			c.AbortWithStatusJSON(
				http.StatusInternalServerError,
				gin.H{
					"success": false,
					"message": "JWT secret is not configured",
				},
			)
			return
		}

		token, err := jwt.Parse(
			strings.TrimSpace(parts[1]),
			func(token *jwt.Token) (interface{}, error) {
				if token.Method != jwt.SigningMethodHS256 {
					return nil, jwt.ErrSignatureInvalid
				}
				return []byte(jwtSecret), nil
			},
		)

		if err != nil || token == nil || !token.Valid {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"success": false,
				"message": "Invalid or expired token",
			})
			return
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"success": false,
				"message": "Invalid token claims",
			})
			return
		}

		// Require an expiration claim.
		expiration, err := claims.GetExpirationTime()
		if err != nil || expiration == nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"success": false,
				"message": "Token expiration is required",
			})
			return
		}

		// Require a stable authenticated user ID.
		userID, ok := claims["user_id"].(string)
		if !ok || strings.TrimSpace(userID) == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"success": false,
				"message": "Invalid user identity in token",
			})
			return
		}

		role, ok := claims["role"].(string)
		if !ok || strings.TrimSpace(role) == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"success": false,
				"message": "Invalid role in token",
			})
			return
		}

		// These keys must remain consistent with your
		// authorization helpers and other middleware.
		c.Set("user_id", strings.TrimSpace(userID))
		c.Set("role", strings.ToUpper(strings.TrimSpace(role)))

		if email, ok := claims["email"].(string); ok {
			c.Set("email", email)
		}

		c.Next()
	}
}
