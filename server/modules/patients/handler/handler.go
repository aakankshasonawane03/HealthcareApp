package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/patients/dto"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/patients/service"
)

type PatientHandler struct {
	service service.PatientService
}

func NewPatientHandler(service service.PatientService) *PatientHandler {
	return &PatientHandler{
		service: service,
	}
}

// Create Patient
func (h *PatientHandler) CreatePatient(c *gin.Context) {

	var req dto.CreatePatientRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	patient, err := h.service.CreatePatient(c.Request.Context(), req)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"success": true,
		"message": "Patient created successfully",
		"data":    patient,
	})
}

// Get All Patients
func (h *PatientHandler) GetAllPatients(c *gin.Context) {

	patients, err := h.service.GetAllPatients(c.Request.Context())

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    patients,
	})
}

// Get Patient By ID
func (h *PatientHandler) GetPatientByID(c *gin.Context) {

	id := c.Param("id")

	patient, err := h.service.GetPatientByID(c.Request.Context(), id)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    patient,
	})
}

// Update Patient
func (h *PatientHandler) UpdatePatient(c *gin.Context) {

	id := c.Param("id")

	var req dto.UpdatePatientRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	patient, err := h.service.UpdatePatient(c.Request.Context(), id, req)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Patient updated successfully",
		"data":    patient,
	})
}

// Delete Patient
func (h *PatientHandler) DeletePatient(c *gin.Context) {

	id := c.Param("id")

	err := h.service.DeletePatient(c.Request.Context(), id)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Patient deleted successfully",
	})
}
