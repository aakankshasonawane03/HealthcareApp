package clinic

type CreateClinicDTO struct {
	Name string `json:"name" binding:"required"`
}
