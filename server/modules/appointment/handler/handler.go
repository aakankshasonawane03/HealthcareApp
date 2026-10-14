package handler

import (
	"github.com/gin-gonic/gin"
	"net/http"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/appointment/dto"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/appointment/service"
)

type AppointmentHandler struct {
	service service.AppointmentService
}

func NewAppointmentHandler(service service.AppointmentService) *AppointmentHandler {
	return &AppointmentHandler{
		service: service,
	}
}




// Create Appointment
func (h *AppointmentHandler) CreateAppointment(c *gin.Context) {

	var req dto.CreateAppointmentRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	appointment, err := h.service.CreateAppointment(
		c.Request.Context(),
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
		"message": "Appointment created successfully",
		"data":    appointment,
	})
}

// Get All Appointments
func (h *AppointmentHandler) GetAllAppointments(c *gin.Context) {

	appointments, err := h.service.GetAllAppointments(
		c.Request.Context(),
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
		"data":    appointments,
	})
}

// Get Appointment By ID
func (h *AppointmentHandler) GetAppointmentByID(c *gin.Context) {

	id := c.Param("id")

	appointment, err := h.service.GetAppointmentByID(
		c.Request.Context(),
		id,
	)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    appointment,
	})
}

// Update Appointment
func (h *AppointmentHandler) UpdateAppointment(c *gin.Context) {

	id := c.Param("id")

	var req dto.UpdateAppointmentRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	appointment, err := h.service.UpdateAppointment(
		c.Request.Context(),
		id,
		req,
	)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Appointment updated successfully",
		"data":    appointment,
	})
}

// Delete Appointment
func (h *AppointmentHandler) DeleteAppointment(c *gin.Context) {

	id := c.Param("id")

	err := h.service.DeleteAppointment(
		c.Request.Context(),
		id,
	)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Appointment deleted successfully",
	})
}