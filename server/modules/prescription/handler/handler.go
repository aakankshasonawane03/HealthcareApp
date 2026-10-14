package handler

import (
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/prescription/model"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/prescription/service"
)

type PrescriptionController struct {
	service service.PrescriptionService
}

func NewPrescriptionController(s service.PrescriptionService) *PrescriptionController {
	return &PrescriptionController{service: s}
}

func (c *PrescriptionController) CreatePrescription(ctx *gin.Context) {
	var pres model.Prescription

	if err := ctx.ShouldBindJSON(&pres); err != nil {
		ctx.JSON(400, gin.H{"success": false, "message": "Invalid request body", "error": err.Error()})
		return
	}

	if err := c.service.Create(ctx.Request.Context(), &pres); err != nil {
		ctx.JSON(400, gin.H{"success": false, "message": err.Error()})
		return
	}

	ctx.JSON(201, gin.H{"success": true, "message": "Prescription created successfully", "data": pres})
}

func (c *PrescriptionController) GetAllPrescriptions(ctx *gin.Context) {
	pres, err := c.service.GetAll(ctx.Request.Context())
	if err != nil {
		ctx.JSON(500, gin.H{"success": false, "message": "Failed to fetch prescriptions", "error": err.Error()})
		return
	}

	ctx.JSON(200, gin.H{"success": true, "count": len(pres), "data": pres})
}

func (c *PrescriptionController) GetPrescriptionByID(ctx *gin.Context) {
	id := ctx.Param("id")

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		ctx.JSON(400, gin.H{"success": false, "message": "Invalid prescription ID"})
		return
	}

	pres, err := c.service.GetByID(ctx.Request.Context(), objectID)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			ctx.JSON(404, gin.H{"success": false, "message": "Prescription not found"})
			return
		}
		ctx.JSON(500, gin.H{"success": false, "message": "Failed to fetch prescription", "error": err.Error()})
		return
	}

	ctx.JSON(200, gin.H{"success": true, "data": pres})
}

func (c *PrescriptionController) GetByConsultation(ctx *gin.Context) {
	id := ctx.Param("consultationId")
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		ctx.JSON(400, gin.H{"success": false, "message": "Invalid consultation ID"})
		return
	}

	pres, err := c.service.GetByConsultationID(ctx.Request.Context(), objectID)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			ctx.JSON(404, gin.H{"success": false, "message": "Prescription not found"})
			return
		}
		ctx.JSON(500, gin.H{"success": false, "message": "Failed to fetch prescription", "error": err.Error()})
		return
	}

	ctx.JSON(200, gin.H{"success": true, "data": pres})
}

func (c *PrescriptionController) GetByPatient(ctx *gin.Context) {
	id := ctx.Param("patientId")
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		ctx.JSON(400, gin.H{"success": false, "message": "Invalid patient ID"})
		return
	}

	pres, err := c.service.GetByPatientID(ctx.Request.Context(), objectID)
	if err != nil {
		ctx.JSON(500, gin.H{"success": false, "message": "Failed to fetch prescriptions", "error": err.Error()})
		return
	}

	ctx.JSON(200, gin.H{"success": true, "count": len(pres), "data": pres})
}

func (c *PrescriptionController) GetByDoctor(ctx *gin.Context) {
	id := ctx.Param("doctorId")
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		ctx.JSON(400, gin.H{"success": false, "message": "Invalid doctor ID"})
		return
	}

	pres, err := c.service.GetByDoctorID(ctx.Request.Context(), objectID)
	if err != nil {
		ctx.JSON(500, gin.H{"success": false, "message": "Failed to fetch prescriptions", "error": err.Error()})
		return
	}

	ctx.JSON(200, gin.H{"success": true, "count": len(pres), "data": pres})
}

func (c *PrescriptionController) GetByClinic(ctx *gin.Context) {
	id := ctx.Param("clinicId")
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		ctx.JSON(400, gin.H{"success": false, "message": "Invalid clinic ID"})
		return
	}

	pres, err := c.service.GetByClinicID(ctx.Request.Context(), objectID)
	if err != nil {
		ctx.JSON(500, gin.H{"success": false, "message": "Failed to fetch prescriptions", "error": err.Error()})
		return
	}

	ctx.JSON(200, gin.H{"success": true, "count": len(pres), "data": pres})
}

func (c *PrescriptionController) UpdatePrescription(ctx *gin.Context) {
	id := ctx.Param("id")
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		ctx.JSON(400, gin.H{"success": false, "message": "Invalid prescription ID"})
		return
	}

	var pres model.Prescription
	if err := ctx.ShouldBindJSON(&pres); err != nil {
		ctx.JSON(400, gin.H{"success": false, "message": "Invalid request body", "error": err.Error()})
		return
	}

	if err := c.service.Update(ctx.Request.Context(), objectID, &pres); err != nil {
		if err == mongo.ErrNoDocuments {
			ctx.JSON(404, gin.H{"success": false, "message": "Prescription not found"})
			return
		}
		ctx.JSON(400, gin.H{"success": false, "message": err.Error()})
		return
	}

	ctx.JSON(200, gin.H{"success": true, "message": "Prescription updated successfully"})
}

func (c *PrescriptionController) DeletePrescription(ctx *gin.Context) {
	id := ctx.Param("id")
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		ctx.JSON(400, gin.H{"success": false, "message": "Invalid prescription ID"})
		return
	}

	if err := c.service.Delete(ctx.Request.Context(), objectID); err != nil {
		if err == mongo.ErrNoDocuments {
			ctx.JSON(404, gin.H{"success": false, "message": "Prescription not found"})
			return
		}
		ctx.JSON(500, gin.H{"success": false, "message": "Failed to delete prescription", "error": err.Error()})
		return
	}

	ctx.JSON(200, gin.H{"success": true, "message": "Prescription deleted successfully"})
}
