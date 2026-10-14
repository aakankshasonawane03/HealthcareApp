package handler

import (
	"net/http"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/schedule/model"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/schedule/service"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type ScheduleHandler struct {
	service service.ScheduleService
}

func NewScheduleHandler(
	service service.ScheduleService,
) *ScheduleHandler {
	return &ScheduleHandler{
		service: service,
	}
}

// Create Schedule
func (h *ScheduleHandler) Create(c *gin.Context) {

	var schedule model.DoctorSchedule

	if err := c.ShouldBindJSON(&schedule); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid request body",
			"error":   err.Error(),
		})
		return
	}

	err := h.service.Create(
		c.Request.Context(),
		&schedule,
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
		"message": "Doctor schedule created successfully",
		"data":    schedule,
	})
}

// Get All Schedules
func (h *ScheduleHandler) GetAll(c *gin.Context) {

	schedules, err := h.service.GetAll(
		c.Request.Context(),
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to fetch schedules",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"count":   len(schedules),
		"data":    schedules,
	})
}

// Get Schedule By ID
func (h *ScheduleHandler) GetByID(c *gin.Context) {

	id := c.Param("id")

	objectID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid schedule ID",
		})
		return
	}

	schedule, err := h.service.GetByID(
		c.Request.Context(),
		objectID,
	)

	if err != nil {

		if err == mongo.ErrNoDocuments {
			c.JSON(http.StatusNotFound, gin.H{
				"success": false,
				"message": "Schedule not found",
			})
			return
		}

		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to fetch schedule",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    schedule,
	})
}

// Get Schedules By Doctor ID
func (h *ScheduleHandler) GetByDoctorID(c *gin.Context) {

	doctorID := c.Param("doctorId")

	objectID, err := primitive.ObjectIDFromHex(doctorID)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid doctor ID",
		})
		return
	}

	schedules, err := h.service.GetByDoctorID(
		c.Request.Context(),
		objectID,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to fetch doctor schedules",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"count":   len(schedules),
		"data":    schedules,
	})
}

// Get Schedules By Clinic ID
func (h *ScheduleHandler) GetByClinicID(c *gin.Context) {

	clinicID := c.Param("clinicId")

	objectID, err := primitive.ObjectIDFromHex(clinicID)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid clinic ID",
		})
		return
	}

	schedules, err := h.service.GetByClinicID(
		c.Request.Context(),
		objectID,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to fetch clinic schedules",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"count":   len(schedules),
		"data":    schedules,
	})
}

// Update Schedule
func (h *ScheduleHandler) Update(c *gin.Context) {

	id := c.Param("id")

	objectID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid schedule ID",
		})
		return
	}

	var schedule model.DoctorSchedule

	if err := c.ShouldBindJSON(&schedule); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid request body",
			"error":   err.Error(),
		})
		return
	}

	err = h.service.Update(
		c.Request.Context(),
		objectID,
		&schedule,
	)

	if err != nil {

		if err == mongo.ErrNoDocuments {
			c.JSON(http.StatusNotFound, gin.H{
				"success": false,
				"message": "Schedule not found",
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
		"message": "Doctor schedule updated successfully",
	})
}

// Delete Schedule
func (h *ScheduleHandler) Delete(c *gin.Context) {

	id := c.Param("id")

	objectID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid schedule ID",
		})
		return
	}

	err = h.service.Delete(
		c.Request.Context(),
		objectID,
	)

	if err != nil {

		if err == mongo.ErrNoDocuments {
			c.JSON(http.StatusNotFound, gin.H{
				"success": false,
				"message": "Schedule not found",
			})
			return
		}

		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to delete schedule",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Doctor schedule deleted successfully",
	})
}
