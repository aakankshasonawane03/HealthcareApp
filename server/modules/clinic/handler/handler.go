package handler

import (
	"errors"
	"net/http"
	"strings"

	clinicModel "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/clinic/model"
	clinicService "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/clinic/service"
	orgService "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/organization/service"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type ClinicController struct {
	service    clinicService.ClinicService
	orgService orgService.OrganizationService
}

func NewClinicController(
	service clinicService.ClinicService,
	orgService orgService.OrganizationService,
) *ClinicController {
	return &ClinicController{
		service:    service,
		orgService: orgService,
	}
}

// getAuthenticatedOrganizationID retrieves the organization
// associated with the authenticated user.
func (h *ClinicController) getAuthenticatedOrganizationID(
	c *gin.Context,
) (primitive.ObjectID, bool) {
	userID := strings.TrimSpace(c.GetString("user_id"))

	if userID == "" {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Authenticated user ID is missing",
		})
		return primitive.NilObjectID, false
	}

	userObjectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid authenticated user ID",
		})
		return primitive.NilObjectID, false
	}

	org, err := h.orgService.GetMyOrganization(
		c.Request.Context(),
		userObjectID,
	)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			c.JSON(http.StatusForbidden, gin.H{
				"error": "No organization is associated with this account",
			})
			return primitive.NilObjectID, false
		}

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to retrieve organization",
		})
		return primitive.NilObjectID, false
	}

	if org == nil || org.ID.IsZero() {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "No valid organization is associated with this account",
		})
		return primitive.NilObjectID, false
	}

	return org.ID, true
}

// CreateClinic creates a clinic for the authenticated user's organization.
func (h *ClinicController) CreateClinic(c *gin.Context) {
	organizationID, ok := h.getAuthenticatedOrganizationID(c)
	if !ok {
		return
	}

	var clinic clinicModel.Clinic

	if err := c.ShouldBindJSON(&clinic); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid clinic request body",
		})
		return
	}

	// Do not trust organization_id from the request body.
	clinic.OrganizationID = organizationID

	err := h.service.CreateClinic(
		c.Request.Context(),
		organizationID,
		&clinic,
	)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Clinic created successfully",
		"data":    clinic,
	})
}

// GetAllClinics lists clinics belonging to the authenticated organization.
func (h *ClinicController) GetAllClinics(c *gin.Context) {
	organizationID, ok := h.getAuthenticatedOrganizationID(c)
	if !ok {
		return
	}

	clinics, err := h.service.GetAllClinics(
		c.Request.Context(),
		organizationID,
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to retrieve clinics",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"count": len(clinics),
		"data":  clinics,
	})
}

// GetClinicByID retrieves a clinic within the authenticated organization.
func (h *ClinicController) GetClinicByID(c *gin.Context) {
	organizationID, ok := h.getAuthenticatedOrganizationID(c)
	if !ok {
		return
	}

	clinicID, err := primitive.ObjectIDFromHex(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid clinic ID",
		})
		return
	}

	clinic, err := h.service.GetClinicByID(
		c.Request.Context(),
		organizationID,
		clinicID,
	)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			c.JSON(http.StatusNotFound, gin.H{
				"error": "Clinic not found",
			})
			return
		}

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to retrieve clinic",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": clinic,
	})
}

// UpdateClinic updates a clinic within the authenticated organization.
func (h *ClinicController) UpdateClinic(c *gin.Context) {
	organizationID, ok := h.getAuthenticatedOrganizationID(c)
	if !ok {
		return
	}

	clinicID, err := primitive.ObjectIDFromHex(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid clinic ID",
		})
		return
	}

	var clinic clinicModel.Clinic

	if err := c.ShouldBindJSON(&clinic); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid clinic request body",
		})
		return
	}

	// Prevent the request from changing the clinic's organization.
	clinic.OrganizationID = organizationID

	err = h.service.UpdateClinic(
		c.Request.Context(),
		organizationID,
		clinicID,
		&clinic,
	)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			c.JSON(http.StatusNotFound, gin.H{
				"error": "Clinic not found in your organization",
			})
			return
		}

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Clinic updated successfully",
	})
}

// DeleteClinic deletes a clinic within the authenticated organization.
func (h *ClinicController) DeleteClinic(c *gin.Context) {
	organizationID, ok := h.getAuthenticatedOrganizationID(c)
	if !ok {
		return
	}

	clinicID, err := primitive.ObjectIDFromHex(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid clinic ID",
		})
		return
	}

	err = h.service.DeleteClinic(
		c.Request.Context(),
		organizationID,
		clinicID,
	)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			c.JSON(http.StatusNotFound, gin.H{
				"error": "Clinic not found in your organization",
			})
			return
		}

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to delete clinic",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Clinic deleted successfully",
	})
}
