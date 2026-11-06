package dto

type UpdateUserStatusDTO struct {
	IsActive bool `json:"is_active" binding:"required"`
}

type CreateClinicDTO struct {
	Name    string `json:"name" binding:"required"`
	Address string `json:"address" binding:"required"`
	Phone   string `json:"phone" binding:"required"`
}

type UpdateClinicDTO struct {
	Name    string `json:"name"`
	Address string `json:"address"`
	Phone   string `json:"phone"`
}

type AdminDashboardDTO struct {
	TotalUsers            int64 `json:"total_users"`
	ActiveUsers           int64 `json:"active_users"`
	TotalDoctors          int64 `json:"total_doctors"`
	ActiveDoctors         int64 `json:"active_doctors"`
	TotalPatients         int64 `json:"total_patients"`
	ActivePatients        int64 `json:"active_patients"`
	TotalClinics          int64 `json:"total_clinics"`
	TotalAppointments     int64 `json:"total_appointments"`
	PendingAppointments   int64 `json:"pending_appointments"`
	CompletedAppointments int64 `json:"completed_appointments"`
}
type CreateOrganizationOwnerDTO struct {
	Name     string `json:"name" binding:"required,min=2,max=100"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=8"`
}
