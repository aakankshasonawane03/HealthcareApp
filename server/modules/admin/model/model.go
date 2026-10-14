package model

import "time"

type UserSummary struct {
	ID        string    `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Role      string    `json:"role"`
	IsActive  bool      `json:"is_active"`
	CreatedAt time.Time `json:"created_at"`
}

type DoctorSummary struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	Email     string `json:"email"`
	Specialty string `json:"specialty"`
	IsActive  bool   `json:"is_active"`
}

type PatientSummary struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	IsActive bool   `json:"is_active"`
}

type ClinicSummary struct {
	ID        string    `json:"id"`
	Name      string    `json:"name"`
	Address   string    `json:"address"`
	Phone     string    `json:"phone"`
	CreatedAt time.Time `json:"created_at"`
}

type AppointmentSummary struct {
	ID        string    `json:"id"`
	DoctorID  string    `json:"doctor_id"`
	PatientID string    `json:"patient_id"`
	Date      string    `json:"date"`
	Time      string    `json:"time"`
	Status    string    `json:"status"`
	Reason    string    `json:"reason"`
	CreatedAt time.Time `json:"created_at"`
}

type Dashboard struct {
	TotalUsers        int64 `json:"total_users"`
	ActiveUsers       int64 `json:"active_users"`
	TotalDoctors      int64 `json:"total_doctors"`
	ActiveDoctors     int64 `json:"active_doctors"`
	TotalPatients     int64 `json:"total_patients"`
	ActivePatients    int64 `json:"active_patients"`
	TotalClinics      int64 `json:"total_clinics"`
	TotalAppointments int64 `json:"total_appointments"`
	PendingAppointments int64 `json:"pending_appointments"`
	CompletedAppointments int64 `json:"completed_appointments"`
}