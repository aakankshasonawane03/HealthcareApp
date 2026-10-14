package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/admin/dto"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/admin/service"
)

type AdminHandler struct {
	service service.AdminService
}

func NewAdminHandler(
	adminService service.AdminService,
) *AdminHandler {

	return &AdminHandler{
		service: adminService,
	}
}

// Dashboard returns admin dashboard statistics.
func (h *AdminHandler) Dashboard(c *gin.Context) {

	data, err := h.service.GetDashboard(
		c.Request.Context(),
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to load admin dashboard",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Admin dashboard loaded successfully",
		"data":    data,
	})
}

// GetUsers returns all users.
func (h *AdminHandler) GetUsers(c *gin.Context) {

	users, err := h.service.GetUsers(
		c.Request.Context(),
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to get users",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Users fetched successfully",
		"data":    users,
	})
}

// UpdateUserStatus activates or deactivates a user.
func (h *AdminHandler) UpdateUserStatus(c *gin.Context) {

	userID := c.Param("id")

	var request dto.UpdateUserStatusDTO

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid request body",
			"error":   err.Error(),
		})
		return
	}

	err := h.service.UpdateUserStatus(
		c.Request.Context(),
		userID,
		request,
	)

	if err != nil {
		statusCode := http.StatusBadRequest

		c.JSON(statusCode, gin.H{
			"success": false,
			"message": "Failed to update user status",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "User status updated successfully",
	})
}

// GetDoctors returns all doctors.
func (h *AdminHandler) GetDoctors(c *gin.Context) {

	doctors, err := h.service.GetDoctors(
		c.Request.Context(),
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to get doctors",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Doctors fetched successfully",
		"data":    doctors,
	})
}

// GetPatients returns all patients.
func (h *AdminHandler) GetPatients(c *gin.Context) {

	patients, err := h.service.GetPatients(
		c.Request.Context(),
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to get patients",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Patients fetched successfully",
		"data":    patients,
	})
}

// GetClinics returns all clinics.
func (h *AdminHandler) GetClinics(c *gin.Context) {

	clinics, err := h.service.GetClinics(
		c.Request.Context(),
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to get clinics",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Clinics fetched successfully",
		"data":    clinics,
	})
}

// CreateClinic creates a new clinic.
func (h *AdminHandler) CreateClinic(c *gin.Context) {

	var request dto.CreateClinicDTO

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid request body",
			"error":   err.Error(),
		})
		return
	}

	clinic, err := h.service.CreateClinic(
		c.Request.Context(),
		request,
	)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Failed to create clinic",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"success": true,
		"message": "Clinic created successfully",
		"data":    clinic,
	})
}

// UpdateClinic updates a clinic.
func (h *AdminHandler) UpdateClinic(c *gin.Context) {

	clinicID := c.Param("id")

	var request dto.UpdateClinicDTO

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid request body",
			"error":   err.Error(),
		})
		return
	}

	err := h.service.UpdateClinic(
		c.Request.Context(),
		clinicID,
		request,
	)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Failed to update clinic",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Clinic updated successfully",
	})
}

// DeleteClinic deletes a clinic.
func (h *AdminHandler) DeleteClinic(c *gin.Context) {

	clinicID := c.Param("id")

	err := h.service.DeleteClinic(
		c.Request.Context(),
		clinicID,
	)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Failed to delete clinic",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Clinic deleted successfully",
	})
}

// GetAppointments returns all appointments.
func (h *AdminHandler) GetAppointments(c *gin.Context) {

	appointments, err := h.service.GetAppointments(
		c.Request.Context(),
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
		"message": "Appointments fetched successfully",
		"data":    appointments,
	})
}