package dto

import "time"

// Create Patient Request
type CreatePatientRequest struct {
	FirstName        string    `json:"first_name" binding:"required"`
	LastName         string    `json:"last_name" binding:"required"`
	Email            string    `json:"email" binding:"required,email"`
	Phone            string    `json:"phone" binding:"required"`
	Gender           string    `json:"gender" binding:"required"`
	DateOfBirth      time.Time `json:"date_of_birth" binding:"required"`
	BloodGroup       string    `json:"blood_group" binding:"required"`
	Address          string    `json:"address" binding:"required"`
	EmergencyContact string    `json:"emergency_contact" binding:"required"`
}

// Update Patient Request
type UpdatePatientRequest struct {
	FirstName        string    `json:"first_name"`
	LastName         string    `json:"last_name"`
	Email            string    `json:"email"`
	Phone            string    `json:"phone"`
	Gender           string    `json:"gender"`
	DateOfBirth      time.Time `json:"date_of_birth"`
	BloodGroup       string    `json:"blood_group"`
	Address          string    `json:"address"`
	EmergencyContact string    `json:"emergency_contact"`
	IsActive         bool      `json:"is_active"`
}
