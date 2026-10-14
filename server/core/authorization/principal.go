package authorization

import (
	"errors"
	"strings"

	"github.com/gin-gonic/gin"
)

var (
	ErrUnauthenticated = errors.New("authentication required")
	ErrForbidden       = errors.New("permission denied")
)

type Principal struct {
	UserID string
	Role   string
}

func FromContext(c *gin.Context) (Principal, error) {
	rawID, idOK := c.Get("user_id")
	rawRole, roleOK := c.Get("role")

	if !idOK || !roleOK {
		return Principal{}, ErrUnauthenticated
	}

	userID, okID := rawID.(string)
	role, okRole := rawRole.(string)

	if !okID || !okRole ||
		strings.TrimSpace(userID) == "" ||
		strings.TrimSpace(role) == "" {
		return Principal{}, ErrUnauthenticated
	}

	return Principal{
		UserID: strings.TrimSpace(userID),
		Role:   strings.ToUpper(strings.TrimSpace(role)),
	}, nil
}
