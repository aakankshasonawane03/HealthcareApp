
package handler

import (
	"errors"
	"net/http"
	"strings"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/doctor/dto"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/doctor/service"
	orgService "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/organization/service"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type DoctorHandler struct {
	service    service.DoctorService
	orgService orgService.OrganizationService
}

func NewDoctorHandler(
	service service.DoctorService,
	orgService orgService.OrganizationService,
) *DoctorHandler {
	return &DoctorHandler{
		service:    service,
		orgService: orgService,
	}
}

func (h *DoctorHandler) getAuthenticatedIDs(
	c *gin.Context,
) (primitive.ObjectID, primitive.ObjectID, bool) {

	userID := strings.TrimSpace(c.GetString("user_id"))

	if userID == "" {
		c.JSON(http.StatusUnauthorized, gin.H{
			"success": false,
			"message": "Authenticated user ID is missing",
		})
		return primitive.NilObjectID, primitive.NilObjectID, false
	}

	userObjectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"success": false,
			"message": "Invalid authenticated user ID",
		})
		return primitive.NilObjectID, primitive.NilObjectID, false
	}

	org, err := h.orgService.GetMyOrganization(
		c.Request.Context(),
		userObjectID,
	)

	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			c.JSON(http.StatusForbidden, gin.H{
				"success": false,
				"message": "No organization associated with this account",
			})
			return primitive.NilObjectID, primitive.NilObjectID, false
		}

		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to retrieve organization",
		})
		return primitive.NilObjectID, primitive.NilObjectID, false
	}

	if org == nil || org.ID.IsZero() {
		c.JSON(http.StatusForbidden, gin.H{
			"success": false,
			"message": "Invalid organization",
		})
		return primitive.NilObjectID, primitive.NilObjectID, false
	}

	return org.ID, userObjectID, true
}

func (h *DoctorHandler) CreateDoctor(c *gin.Context) {

	organizationID, userID, ok := h.getAuthenticatedIDs(c)
	if !ok {
		return
	}

	var req dto.CreateDoctorRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	doctor, err := h.service.CreateDoctor(
		c.Request.Context(),
		organizationID,
		userID,
		req,
	)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"success": true,
		"message": "Doctor created successfully",
		"data":    doctor,
	})
}

func (h *DoctorHandler) GetAllDoctors(c *gin.Context) {

	organizationID, _, ok := h.getAuthenticatedIDs(c)
	if !ok {
		return
	}

	doctors, err := h.service.GetAllDoctors(
		c.Request.Context(),
		organizationID,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"count":   len(doctors),
		"data":    doctors,
	})
}

func (h *DoctorHandler) GetDoctorByID(c *gin.Context) {

	organizationID, _, ok := h.getAuthenticatedIDs(c)
	if !ok {
		return
	}

	doctor, err := h.service.GetDoctorByID(
		c.Request.Context(),
		organizationID,
		c.Param("id"),
	)

	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			c.JSON(http.StatusNotFound, gin.H{
				"success": false,
				"message": "Doctor not found in your organization",
			})
			return
		}

		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    doctor,
	})
}

func (h *DoctorHandler) UpdateDoctor(c *gin.Context) {

	organizationID, _, ok := h.getAuthenticatedIDs(c)
	if !ok {
		return
	}

	var req dto.UpdateDoctorRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	doctor, err := h.service.UpdateDoctor(
		c.Request.Context(),
		organizationID,
		c.Param("id"),
		req,
	)

	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			c.JSON(http.StatusNotFound, gin.H{
				"success": false,
				"message": "Doctor not found in your organization",
			})
			return
		}

		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Doctor updated successfully",
		"data":    doctor,
	})
}

func (h *DoctorHandler) DeleteDoctor(c *gin.Context) {

	organizationID, _, ok := h.getAuthenticatedIDs(c)
	if !ok {
		return
	}

	err := h.service.DeleteDoctor(
		c.Request.Context(),
		organizationID,
		c.Param("id"),
	)

	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			c.JSON(http.StatusNotFound, gin.H{
				"success": false,
				"message": "Doctor not found in your organization",
			})
			return
		}

		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Doctor deleted successfully",
	})
}
