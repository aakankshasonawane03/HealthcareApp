package medicalrecord

type CreateMedicalrecordDTO struct {
	Name string `json:"name" binding:"required"`
}
