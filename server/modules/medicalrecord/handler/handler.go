package handler

import (
	"net/http"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/medicalrecord/model"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/medicalrecord/service"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type MedicalRecordController struct {
	service service.MedicalRecordService
}

func NewMedicalRecordController(
	service service.MedicalRecordService,
) *MedicalRecordController {
	return &MedicalRecordController{
		service: service,
	}
}

func (h *MedicalRecordController) CreateMedicalRecord(c *gin.Context) {

	var record model.MedicalRecord

	if err := c.ShouldBindJSON(&record); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid request body",
			"error":   err.Error(),
		})
		return
	}

	if err := h.service.Create(
		c.Request.Context(),
		&record,
	); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to create medical record",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"success": true,
		"message": "Medical record created successfully",
		"data":    record,
	})
}

func (h *MedicalRecordController) GetAllMedicalRecords(c *gin.Context) {

	records, err := h.service.GetAll(
		c.Request.Context(),
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to get medical records",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    records,
	})
}

func (h *MedicalRecordController) GetMedicalRecordByID(c *gin.Context) {

	id, err := primitive.ObjectIDFromHex(c.Param("id"))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid medical record ID",
		})
		return
	}

	record, err := h.service.GetByID(
		c.Request.Context(),
		id,
	)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"message": "Medical record not found",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    record,
	})
}

func (h *MedicalRecordController) GetByPatientID(c *gin.Context) {

	patientID, err := primitive.ObjectIDFromHex(
		c.Param("patient_id"),
	)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid patient ID",
		})
		return
	}

	records, err := h.service.GetByPatientID(
		c.Request.Context(),
		patientID,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to get patient medical records",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    records,
	})
}

func (h *MedicalRecordController) GetByDoctorID(c *gin.Context) {

	doctorID, err := primitive.ObjectIDFromHex(
		c.Param("doctor_id"),
	)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid doctor ID",
		})
		return
	}

	records, err := h.service.GetByDoctorID(
		c.Request.Context(),
		doctorID,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to get doctor medical records",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    records,
	})
}

func (h *MedicalRecordController) GetByConsultationID(c *gin.Context) {

	consultationID, err := primitive.ObjectIDFromHex(
		c.Param("consultation_id"),
	)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid consultation ID",
		})
		return
	}

	record, err := h.service.GetByConsultationID(
		c.Request.Context(),
		consultationID,
	)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"message": "Medical record not found",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    record,
	})
}

func (h *MedicalRecordController) UpdateMedicalRecord(c *gin.Context) {

	id, err := primitive.ObjectIDFromHex(
		c.Param("id"),
	)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid medical record ID",
		})
		return
	}

	var record model.MedicalRecord

	if err := c.ShouldBindJSON(&record); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid request body",
			"error":   err.Error(),
		})
		return
	}

	if err := h.service.Update(
		c.Request.Context(),
		id,
		&record,
	); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to update medical record",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Medical record updated successfully",
	})
}

func (h *MedicalRecordController) DeleteMedicalRecord(c *gin.Context) {

	id, err := primitive.ObjectIDFromHex(
		c.Param("id"),
	)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid medical record ID",
		})
		return
	}

	if err := h.service.Delete(
		c.Request.Context(),
		id,
	); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to delete medical record",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Medical record deleted successfully",
	})
}
