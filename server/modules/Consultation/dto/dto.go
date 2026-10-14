package dto

type CreateConsultationDTO struct {
	Name string `json:"name" binding:"required"`
}
