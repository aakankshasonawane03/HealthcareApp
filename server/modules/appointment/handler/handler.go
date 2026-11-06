package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"

	appointmentDTO "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/appointment/dto"
	appointmentService "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/appointment/service"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Handler struct {
	service appointmentService.AppointmentService
}

// Constructor
func NewHandler(
	service appointmentService.AppointmentService,
) *Handler {
	return &Handler{
		service: service,
	}
}

// Get organization ID from Gin context.
// Your authentication/organization middleware must set this value.
func getOrganizationID(c *gin.Context) (primitive.ObjectID, bool) {
	value, exists := c.Get("organization_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"success": false,
			"message": "Organization ID not found in context",
		})
		return primitive.NilObjectID, false
	}

	switch id := value.(type) {
	case primitive.ObjectID:
		if id.IsZero() {
			c.JSON(http.StatusUnauthorized, gin.H{
				"success": false,
				"message": "Invalid organization ID",
			})
			return primitive.NilObjectID, false
		}
		return id, true

	case string:
		objectID, err := primitive.ObjectIDFromHex(id)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"success": false,
				"message": "Invalid organization ID",
			})
			return primitive.NilObjectID, false
		}
		return objectID, true

	default:
		c.JSON(http.StatusUnauthorized, gin.H{
			"success": false,
			"message": "Invalid organization ID format",
		})
		return primitive.NilObjectID, false
	}
}

// CREATE APPOINTMENT
func (h *Handler) CreateAppointment(c *gin.Context) {
	organizationID, ok := getOrganizationID(c)
	if !ok {
		return
	}

	var req appointmentDTO.CreateAppointmentRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid request body",
			"error":   err.Error(),
		})
		return
	}

	appointment, err := h.service.CreateAppointment(
		c.Request.Context(),
		organizationID,
		req,
	)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Failed to create appointment",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"success": true,
		"message": "Appointment created successfully",
		"data":    appointment,
	})
}

// GET ALL APPOINTMENTS
func (h *Handler) GetAllAppointments(c *gin.Context) {
	organizationID, ok := getOrganizationID(c)
	if !ok {
		return
	}

	appointments, err := h.service.GetAllAppointments(
		c.Request.Context(),
		organizationID,
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to get appointments",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Appointments retrieved successfully",
		"data":    appointments,
	})
}

// GET APPOINTMENT BY ID
func (h *Handler) GetAppointmentByID(c *gin.Context) {
	organizationID, ok := getOrganizationID(c)
	if !ok {
		return
	}

	id := c.Param("id")

	appointment, err := h.service.GetAppointmentByID(
		c.Request.Context(),
		organizationID,
		id,
	)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"message": "Appointment not found",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Appointment retrieved successfully",
		"data":    appointment,
	})
}

// UPDATE APPOINTMENT
func (h *Handler) UpdateAppointment(c *gin.Context) {
	organizationID, ok := getOrganizationID(c)
	if !ok {
		return
	}

	id := c.Param("id")

	var req appointmentDTO.UpdateAppointmentRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid request body",
			"error":   err.Error(),
		})
		return
	}

	appointment, err := h.service.UpdateAppointment(
		c.Request.Context(),
		organizationID,
		id,
		req,
	)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Failed to update appointment",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Appointment updated successfully",
		"data":    appointment,
	})
}

// DELETE APPOINTMENT
func (h *Handler) DeleteAppointment(c *gin.Context) {
	organizationID, ok := getOrganizationID(c)
	if !ok {
		return
	}

	id := c.Param("id")

	err := h.service.DeleteAppointment(
		c.Request.Context(),
		organizationID,
		id,
	)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Failed to delete appointment",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Appointment deleted successfully",
	})
}
