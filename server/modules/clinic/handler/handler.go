package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"

	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/clinic/model"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/clinic/service"
)

type ClinicController struct {
	service service.ClinicService
}

func NewClinicController(
	service service.ClinicService,
) *ClinicController {

	return &ClinicController{
		service: service,
	}
}

// Create Clinic
func (c *ClinicController) CreateClinic(ctx *gin.Context) {

	var clinic model.Clinic

	if err := ctx.ShouldBindJSON(&clinic); err != nil {

		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid request body",
			"error":   err.Error(),
		})

		return
	}

	err := c.service.CreateClinic(
		ctx.Request.Context(),
		&clinic,
	)

	if err != nil {

		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,

			"message": err.Error(),
		})

		return
	}

	ctx.JSON(http.StatusCreated, gin.H{
		"success": true,
		"message": "Clinic created successfully",
		"data":    clinic,
	})
}

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

		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"success": true,
		"count":   len(clinics),
		"data":    clinics,
	})
}

// Get Clinic By ID
func (c *ClinicController) GetClinicByID(ctx *gin.Context) {

	id := ctx.Param("id")

	objectID, err := primitive.ObjectIDFromHex(id)

	if err != nil {

		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid clinic ID",
		})

		return
	}

	clinic, err := c.service.GetClinicByID(
		ctx.Request.Context(),
		objectID,
	)

	if err != nil {

		if err == mongo.ErrNoDocuments {

			ctx.JSON(http.StatusNotFound, gin.H{
				"success": false,
				"message": "Clinic not found",
			})

			return
		}

		ctx.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to fetch clinic",
			"error":   err.Error(),
		})

		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    clinic,
	})
}

// Update Clinic
func (c *ClinicController) UpdateClinic(ctx *gin.Context) {

	id := ctx.Param("id")

	objectID, err := primitive.ObjectIDFromHex(id)

	if err != nil {

		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid clinic ID",
		})

		return
	}

	var clinic model.Clinic

	if err := ctx.ShouldBindJSON(&clinic); err != nil {

		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid request body",
			"error":   err.Error(),
		})

		return
	}

	err = c.service.UpdateClinic(
		ctx.Request.Context(),
		objectID,
		&clinic,
	)

	if err != nil {

		if err == mongo.ErrNoDocuments {

			ctx.JSON(http.StatusNotFound, gin.H{
				"success": false,
				"message": "Clinic not found",
			})

			return
		}

		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": err.Error(),
		})

		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Clinic updated successfully",
	})
}

// Delete Clinic
func (c *ClinicController) DeleteClinic(ctx *gin.Context) {

	id := ctx.Param("id")

	objectID, err := primitive.ObjectIDFromHex(id)

	if err != nil {

		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid clinic ID",
		})

		return
	}

	err = c.service.DeleteClinic(
		ctx.Request.Context(),
		objectID,
	)

	if err != nil {

		if err == mongo.ErrNoDocuments {

			ctx.JSON(http.StatusNotFound, gin.H{
				"success": false,
				"message": "Clinic not found",
			})

			return
		}

		ctx.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to delete clinic",
			"error":   err.Error(),
		})

		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Clinic deleted successfully",
	})
}
