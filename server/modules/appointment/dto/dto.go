package dto

import "time"

// Create Appointment Request
type CreateAppointmentRequest struct {
	DoctorID        string    `json:"doctor_id" binding:"required"`
	PatientID       string    `json:"patient_id" binding:"required"`
	AppointmentDate time.Time `json:"appointment_date" binding:"required"`
	AppointmentTime string    `json:"appointment_time" binding:"required"`
	Reason          string    `json:"reason" binding:"required"`
}

// Update Appointment Request
type UpdateAppointmentRequest struct {
	DoctorID        string    `json:"doctor_id"`
	PatientID       string    `json:"patient_id"`
	AppointmentDate time.Time `json:"appointment_date"`
	AppointmentTime string    `json:"appointment_time"`
	Reason          string    `json:"reason"`
	Status          string    `json:"status"`
}
