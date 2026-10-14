package handler

import (
	"net/http"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/Consultation/model"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/Consultation/service"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type ConsultationController struct {
	service service.ConsultationService
}

func NewConsultationController(
	service service.ConsultationService,
) *ConsultationController {
	return &ConsultationController{
		service: service,
	}
}

// Create Consultation
func (h *ConsultationController) CreateConsultation(c *gin.Context) {

	var consultation model.Consultation

	if err := c.ShouldBindJSON(&consultation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid request body",
			"error":   err.Error(),
		})
		return
	}

	err := h.service.Create(
		c.Request.Context(),
		&consultation,
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
		"message": "Consultation created successfully",
		"data":    consultation,
	})
}

// Get All Consultations
func (h *ConsultationController) GetAllConsultations(c *gin.Context) {

	consultations, err := h.service.GetAll(
		c.Request.Context(),
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to fetch consultations",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"count":   len(consultations),
		"data":    consultations,
	})
}

// Get Consultation By ID
func (h *ConsultationController) GetConsultationByID(c *gin.Context) {

	id := c.Param("id")

	objectID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid consultation ID",
		})
		return
	}

	consultation, err := h.service.GetByID(
		c.Request.Context(),
		objectID,
	)

	if err != nil {

		if err == mongo.ErrNoDocuments {
			c.JSON(http.StatusNotFound, gin.H{
				"success": false,
				"message": "Consultation not found",
			})
			return
		}

		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to fetch consultation",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    consultation,
	})
}

// Get Consultation By Appointment
func (h *ConsultationController) GetByAppointment(c *gin.Context) {

	id := c.Param("appointmentId")

	appointmentID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid appointment ID",
		})
		return
	}

	consultation, err := h.service.GetByAppointmentID(
		c.Request.Context(),
		appointmentID,
	)

	if err != nil {

		if err == mongo.ErrNoDocuments {
			c.JSON(http.StatusNotFound, gin.H{
				"success": false,
				"message": "Consultation not found",
			})
			return
		}

		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to fetch consultation",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    consultation,
	})
}

// Get Patient Consultations
func (h *ConsultationController) GetByPatient(c *gin.Context) {

	id := c.Param("patientId")

	patientID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid patient ID",
		})
		return
	}

	consultations, err := h.service.GetByPatientID(
		c.Request.Context(),
		patientID,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to fetch patient consultations",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"count":   len(consultations),
		"data":    consultations,
	})
}

// Get Doctor Consultations
func (h *ConsultationController) GetByDoctor(c *gin.Context) {

	id := c.Param("doctorId")

	doctorID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid doctor ID",
		})
		return
	}

	consultations, err := h.service.GetByDoctorID(
		c.Request.Context(),
		doctorID,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to fetch doctor consultations",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"count":   len(consultations),
		"data":    consultations,
	})
}

// Get Clinic Consultations
func (h *ConsultationController) GetByClinic(c *gin.Context) {

	id := c.Param("clinicId")

	clinicID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid clinic ID",
		})
		return
	}

	consultations, err := h.service.GetByClinicID(
		c.Request.Context(),
		clinicID,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to fetch clinic consultations",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"count":   len(consultations),
		"data":    consultations,
	})
}

// Update Consultation
func (h *ConsultationController) UpdateConsultation(c *gin.Context) {

	id := c.Param("id")

	consultationID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid consultation ID",
		})
		return
	}

	var consultation model.Consultation

	if err := c.ShouldBindJSON(&consultation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid request body",
			"error":   err.Error(),
		})
		return
	}

	err = h.service.Update(
		c.Request.Context(),
		consultationID,
		&consultation,
	)

	if err != nil {

		if err == mongo.ErrNoDocuments {
			c.JSON(http.StatusNotFound, gin.H{
				"success": false,
				"message": "Consultation not found",
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
		"message": "Consultation updated successfully",
	})
}

// Update Consultation Status
func (h *ConsultationController) UpdateStatus(c *gin.Context) {

	id := c.Param("id")

	consultationID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid consultation ID",
		})
		return
	}

	var request struct {
		Status model.ConsultationStatus `json:"status"`
	}

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid request body",
			"error":   err.Error(),
		})
		return
	}

	err = h.service.UpdateStatus(
		c.Request.Context(),
		consultationID,
		request.Status,
	)

	if err != nil {

		if err == mongo.ErrNoDocuments {
			c.JSON(http.StatusNotFound, gin.H{
				"success": false,
				"message": "Consultation not found",
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
		"message": "Consultation status updated successfully",
	})
}

// Delete Consultation
func (h *ConsultationController) DeleteConsultation(c *gin.Context) {

	id := c.Param("id")

	consultationID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid consultation ID",
		})
		return
	}

	err = h.service.Delete(
		c.Request.Context(),
		consultationID,
	)

	if err != nil {

		if err == mongo.ErrNoDocuments {
			c.JSON(http.StatusNotFound, gin.H{
				"success": false,
				"message": "Consultation not found",
			})
			return
		}

		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to delete consultation",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Consultation deleted successfully",
	})
}
