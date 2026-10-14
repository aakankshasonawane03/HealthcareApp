package handler

import (
	"net/http"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/doctor/dto"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/doctor/service"

	"github.com/gin-gonic/gin"
)

type DoctorHandler struct {
	service service.DoctorService
}

func NewDoctorHandler(service service.DoctorService) *DoctorHandler {
	return &DoctorHandler{
		service: service,
	}
}

// Create Doctor
func (h *DoctorHandler) CreateDoctor(c *gin.Context) {

	var req dto.CreateDoctorRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	doctor, err := h.service.CreateDoctor(c.Request.Context(), req)

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

// Get All Doctors
func (h *DoctorHandler) GetAllDoctors(c *gin.Context) {

	doctors, err := h.service.GetAllDoctors(c.Request.Context())

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    doctors,
	})
}

// Get Doctor By ID
func (h *DoctorHandler) GetDoctorByID(c *gin.Context) {

	id := c.Param("id")

	doctor, err := h.service.GetDoctorByID(c.Request.Context(), id)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
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

// Update Doctor
func (h *DoctorHandler) UpdateDoctor(c *gin.Context) {

	id := c.Param("id")

	var req dto.UpdateDoctorRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	doctor, err := h.service.UpdateDoctor(c.Request.Context(), id, req)

	if err != nil {
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

// Delete Doctor
func (h *DoctorHandler) DeleteDoctor(c *gin.Context) {

	id := c.Param("id")

	err := h.service.DeleteDoctor(c.Request.Context(), id)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
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
