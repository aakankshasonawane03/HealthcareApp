package dto

type CreateDoctorRequest struct {
	Name            string  `json:"name" binding:"required"`
	Email           string  `json:"email" binding:"required"`
	Phone           string  `json:"phone" binding:"required"`
	Specialization  string  `json:"specialization" binding:"required"`
	Qualification   string  `json:"qualification" binding:"required"`
	Experience      int     `json:"experience" binding:"required"`
	ConsultationFee float64 `json:"consultation_fee" binding:"required"`
}

type UpdateDoctorRequest struct {
	Name            string  `json:"name"`
	Phone           string  `json:"phone"`
	Specialization  string  `json:"specialization"`
	Qualification   string  `json:"qualification"`
	Experience      int     `json:"experience"`
	ConsultationFee float64 `json:"consultation_fee"`
	IsActive        bool    `json:"is_active"`
}//