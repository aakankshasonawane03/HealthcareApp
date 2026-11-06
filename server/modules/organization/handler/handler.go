
package handler

import (
	"errors"
	"net/http"
	"strings"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/organization/dto"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/organization/service"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type OrganizationHandler struct {
	service service.OrganizationService
}

func NewOrganizationHandler(
	s service.OrganizationService,
) *OrganizationHandler {
	return &OrganizationHandler{service: s}
}

// Create creates an organization for the authenticated Doctor.
func (h *OrganizationHandler) Create(c *gin.Context) {
	// Get user ID from the validated JWT middleware.
	userID := strings.TrimSpace(c.GetString("user_id"))

	ownerID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"success": false,
			"message": "Invalid authenticated user ID",
		})
		return
	}

	// Bind and validate the incoming DTO.
	var req dto.CreateOrganizationRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid organization request",
			"error":   err.Error(),
		})
		return
	}

	// Call organization service.
	org, err := h.service.Create(
		c.Request.Context(),
		ownerID,
		req.Name,
		req.Description,
		req.Email,
		req.Phone,
	)
	if err != nil {
		status := http.StatusInternalServerError

		if err.Error() == "organization name is required" ||
			err.Error() == "you already own an organization" {
			status = http.StatusBadRequest
		}

		c.JSON(status, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	// Convert model into response DTO.
	c.JSON(http.StatusCreated, gin.H{
		"success": true,
		"message": "Organization created successfully",
		"data":    dto.ToOrganizationResponse(org),
	})
}

// GetMine retrieves the authenticated Doctor's organization.
func (h *OrganizationHandler) GetMine(c *gin.Context) {
	userID := strings.TrimSpace(c.GetString("user_id"))

	ownerID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"success": false,
			"message": "Invalid authenticated user ID",
		})
		return
	}

	// Retrieve organization belonging to this Doctor.
	org, err := h.service.GetMyOrganization(
		c.Request.Context(),
		ownerID,
	)
	if err != nil {
		status := http.StatusInternalServerError
		message := "Failed to retrieve organization"

		if errors.Is(err, mongo.ErrNoDocuments) {
			status = http.StatusNotFound
			message = "You do not own an organization yet"
		}

		c.JSON(status, gin.H{
			"success": false,
			"message": message,
		})
		return
	}

	// Convert model into response DTO.
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    dto.ToOrganizationResponse(org),
	})
}
