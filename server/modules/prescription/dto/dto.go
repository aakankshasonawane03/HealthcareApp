package prescription

type CreatePrescriptionDTO struct {
	Name string `json:"name" binding:"required"`
}
