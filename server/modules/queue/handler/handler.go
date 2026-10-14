package handler

import (
	"net/http"
	"time"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/queue/model"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/queue/service"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type QueueController struct {
	service service.QueueService
}

func NewQueueController(
	service service.QueueService,
) *QueueController {
	return &QueueController{
		service: service,
	}
}

// Create Queue
func (h *QueueController) CreateQueue(c *gin.Context) {

	var queue model.Queue

	if err := c.ShouldBindJSON(&queue); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid request body",
			"error":   err.Error(),
		})

		return
	}

	err := h.service.Create(
		c.Request.Context(),
		&queue,
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
		"message": "Patient added to queue successfully",
		"data":    queue,
	})
}

// Get All
func (h *QueueController) GetAllQueues(c *gin.Context) {

	queues, err := h.service.GetAll(
		c.Request.Context(),
	)

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to fetch queues",
			"error":   err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"count":   len(queues),
		"data":    queues,
	})
}

// Get By ID
func (h *QueueController) GetQueueByID(c *gin.Context) {

	id := c.Param("id")

	objectID, err := primitive.ObjectIDFromHex(id)

	if err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid queue ID",
		})

		return
	}

	queue, err := h.service.GetByID(
		c.Request.Context(),
		objectID,
	)

	if err != nil {

		if err == mongo.ErrNoDocuments {

			c.JSON(http.StatusNotFound, gin.H{
				"success": false,
				"message": "Queue not found",
			})

			return
		}

		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to fetch queue",
			"error":   err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    queue,
	})
}

// Get By Appointment
func (h *QueueController) GetQueueByAppointment(c *gin.Context) {

	id := c.Param("appointmentId")

	objectID, err := primitive.ObjectIDFromHex(id)

	if err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid appointment ID",
		})

		return
	}

	queue, err := h.service.GetByAppointmentID(
		c.Request.Context(),
		objectID,
	)

	if err != nil {

		if err == mongo.ErrNoDocuments {

			c.JSON(http.StatusNotFound, gin.H{
				"success": false,
				"message": "Queue not found for appointment",
			})

			return
		}

		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to fetch queue",
			"error":   err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    queue,
	})
}

// Get Doctor Queue
func (h *QueueController) GetDoctorQueue(c *gin.Context) {

	id := c.Param("doctorId")

	doctorID, err := primitive.ObjectIDFromHex(id)

	if err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid doctor ID",
		})

		return
	}

	dateString := c.Query("date")

	var date time.Time

	if dateString == "" {
		date = time.Now()
	} else {

		date, err = time.Parse(
			"2006-01-02",
			dateString,
		)

		if err != nil {

			c.JSON(http.StatusBadRequest, gin.H{
				"success": false,
				"message": "Invalid date format. Use YYYY-MM-DD",
			})

			return
		}
	}

	queues, err := h.service.GetByDoctorID(
		c.Request.Context(),
		doctorID,
		date,
	)

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to fetch doctor queue",
			"error":   err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"count":   len(queues),
		"data":    queues,
	})
}

// Get Patient Queue History
func (h *QueueController) GetPatientQueue(c *gin.Context) {

	id := c.Param("patientId")

	patientID, err := primitive.ObjectIDFromHex(id)

	if err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid patient ID",
		})

		return
	}

	queues, err := h.service.GetByPatientID(
		c.Request.Context(),
		patientID,
	)

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to fetch patient queue",
			"error":   err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"count":   len(queues),
		"data":    queues,
	})
}

// Get Clinic Queue
func (h *QueueController) GetClinicQueue(c *gin.Context) {

	id := c.Param("clinicId")

	clinicID, err := primitive.ObjectIDFromHex(id)

	if err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid clinic ID",
		})

		return
	}

	dateString := c.Query("date")

	var date time.Time

	if dateString == "" {
		date = time.Now()
	} else {

		date, err = time.Parse(
			"2006-01-02",
			dateString,
		)

		if err != nil {

			c.JSON(http.StatusBadRequest, gin.H{
				"success": false,
				"message": "Invalid date format. Use YYYY-MM-DD",
			})

			return
		}
	}

	queues, err := h.service.GetByClinicID(
		c.Request.Context(),
		clinicID,
		date,
	)

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to fetch clinic queue",
			"error":   err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"count":   len(queues),
		"data":    queues,
	})
}

// Update Queue Status
func (h *QueueController) UpdateQueueStatus(c *gin.Context) {

	id := c.Param("id")

	queueID, err := primitive.ObjectIDFromHex(id)

	if err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid queue ID",
		})

		return
	}

	var request struct {
		Status model.QueueStatus `json:"status"`
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
		queueID,
		request.Status,
	)

	if err != nil {

		if err == mongo.ErrNoDocuments {

			c.JSON(http.StatusNotFound, gin.H{
				"success": false,
				"message": "Queue not found",
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
		"message": "Queue status updated successfully",
	})
}

// Delete Queue
func (h *QueueController) DeleteQueue(c *gin.Context) {

	id := c.Param("id")

	queueID, err := primitive.ObjectIDFromHex(id)

	if err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid queue ID",
		})

		return
	}

	err = h.service.Delete(
		c.Request.Context(),
		queueID,
	)

	if err != nil {

		if err == mongo.ErrNoDocuments {

			c.JSON(http.StatusNotFound, gin.H{
				"success": false,
				"message": "Queue not found",
			})

			return
		}

		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to delete queue",
			"error":   err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Queue deleted successfully",
	})
}
