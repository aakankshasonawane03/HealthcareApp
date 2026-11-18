package handler

import (
<<<<<<< HEAD
	"errors"
	"net/http"
	"strings"

	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/clinic/model"
	clinicService "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/clinic/service"
	orgService "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/organization/service"
=======
	"math"
	"net/http"
	"strconv"
>>>>>>> 164b987 (Healthcare Frontend)

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

<<<<<<< HEAD
// getAuthenticatedOrganizationID retrieves the authenticated user's organization.
// The organization ID is derived from the authenticated account, not request data.
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

	var clinic model.Clinic
	if err := c.ShouldBindJSON(&clinic); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid clinic request body",
=======
// Create Clinic
func (c *ClinicController) CreateClinic(ctx *gin.Context) {
	var clinic model.Clinic

	if err := ctx.ShouldBindJSON(&clinic); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid request body",
			"error":   err.Error(),
>>>>>>> 164b987 (Healthcare Frontend)
		})
		return
	}

	// Always use the authenticated user's organization.
	clinic.OrganizationID = organizationID

	err := h.service.CreateClinic(
		c.Request.Context(),
		organizationID,
		&clinic,
	)
	if err != nil {
<<<<<<< HEAD
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
=======
		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": err.Error(),
>>>>>>> 164b987 (Healthcare Frontend)
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Clinic created successfully",
		"data":    clinic,
	})
}

<<<<<<< HEAD
// GetAllClinics lists clinics belonging to the authenticated organization.
func (h *ClinicController) GetAllClinics(c *gin.Context) {
	organizationID, ok := h.getAuthenticatedOrganizationID(c)
	if !ok {
=======
// Get All Clinics
func (c *ClinicController) GetAllClinics(ctx *gin.Context) {
	clinics, err := c.service.GetAllClinics(
		ctx.Request.Context(),
	)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to fetch clinics",
			"error":   err.Error(),
		})
>>>>>>> 164b987 (Healthcare Frontend)
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

<<<<<<< HEAD
// GetClinicByID retrieves a clinic within the authenticated organization.
func (h *ClinicController) GetClinicByID(c *gin.Context) {
	organizationID, ok := h.getAuthenticatedOrganizationID(c)
	if !ok {
=======
// Get Nearby Clinics
func (c *ClinicController) GetNearbyClinics(ctx *gin.Context) {
	latitudeValue := ctx.Query("latitude")
	longitudeValue := ctx.Query("longitude")
	radiusValue := ctx.DefaultQuery("radiusKm", "5")

	latitude, err := strconv.ParseFloat(latitudeValue, 64)
	if err != nil || math.IsNaN(latitude) ||
		math.IsInf(latitude, 0) ||
		latitude < -90 || latitude > 90 {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Valid latitude between -90 and 90 is required",
		})
		return
	}

	longitude, err := strconv.ParseFloat(longitudeValue, 64)
	if err != nil || math.IsNaN(longitude) ||
		math.IsInf(longitude, 0) ||
		longitude < -180 || longitude > 180 {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Valid longitude between -180 and 180 is required",
		})
		return
	}

	radiusKm, err := strconv.ParseFloat(radiusValue, 64)
	if err != nil || math.IsNaN(radiusKm) ||
		math.IsInf(radiusKm, 0) ||
		radiusKm <= 0 || radiusKm > 100 {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Radius must be greater than 0 and at most 100 km",
		})
		return
	}

	clinics, err := c.service.GetNearbyClinics(
		ctx.Request.Context(),
		latitude,
		longitude,
		radiusKm,
	)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to find nearby clinics",
			"error":   err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"success":   true,
		"count":     len(clinics),
		"latitude":  latitude,
		"longitude": longitude,
		"radius_km": radiusKm,
		"data":      clinics,
	})
}

// Get Clinic By ID
func (c *ClinicController) GetClinicByID(ctx *gin.Context) {
	objectID, err := primitive.ObjectIDFromHex(ctx.Param("id"))

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid clinic ID",
		})
>>>>>>> 164b987 (Healthcare Frontend)
		return
	}

	clinicID, err := primitive.ObjectIDFromHex(c.Param("id"))
	if err != nil {
<<<<<<< HEAD
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
=======
		if err == mongo.ErrNoDocuments {
			ctx.JSON(http.StatusNotFound, gin.H{
				"success": false,
				"message": "Clinic not found",
>>>>>>> 164b987 (Healthcare Frontend)
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

<<<<<<< HEAD
// UpdateClinic updates a clinic within the authenticated organization.
func (h *ClinicController) UpdateClinic(c *gin.Context) {
	organizationID, ok := h.getAuthenticatedOrganizationID(c)
	if !ok {
		return
	}
=======
// Update Clinic
func (c *ClinicController) UpdateClinic(ctx *gin.Context) {
	objectID, err := primitive.ObjectIDFromHex(ctx.Param("id"))
>>>>>>> 164b987 (Healthcare Frontend)

	clinicID, err := primitive.ObjectIDFromHex(c.Param("id"))
	if err != nil {
<<<<<<< HEAD
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid clinic ID",
=======
		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid clinic ID",
>>>>>>> 164b987 (Healthcare Frontend)
		})
		return
	}

	var clinic model.Clinic
<<<<<<< HEAD
	if err := c.ShouldBindJSON(&clinic); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid clinic request body",
=======

	if err := ctx.ShouldBindJSON(&clinic); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid request body",
			"error":   err.Error(),
>>>>>>> 164b987 (Healthcare Frontend)
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
<<<<<<< HEAD
		if errors.Is(err, mongo.ErrNoDocuments) {
			c.JSON(http.StatusNotFound, gin.H{
				"error": "Clinic not found in your organization",
=======
		if err == mongo.ErrNoDocuments {
			ctx.JSON(http.StatusNotFound, gin.H{
				"success": false,
				"message": "Clinic not found",
>>>>>>> 164b987 (Healthcare Frontend)
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

<<<<<<< HEAD
// DeleteClinic deletes a clinic within the authenticated organization.
func (h *ClinicController) DeleteClinic(c *gin.Context) {
	organizationID, ok := h.getAuthenticatedOrganizationID(c)
	if !ok {
=======
// Delete Clinic
func (c *ClinicController) DeleteClinic(ctx *gin.Context) {
	objectID, err := primitive.ObjectIDFromHex(ctx.Param("id"))

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid clinic ID",
		})
>>>>>>> 164b987 (Healthcare Frontend)
		return
	}

	clinicID, err := primitive.ObjectIDFromHex(c.Param("id"))
	if err != nil {
<<<<<<< HEAD
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
=======
		if err == mongo.ErrNoDocuments {
			ctx.JSON(http.StatusNotFound, gin.H{
				"success": false,
				"message": "Clinic not found",
>>>>>>> 164b987 (Healthcare Frontend)
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
