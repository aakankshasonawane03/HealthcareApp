package schedule

type CreateScheduleDTO struct {
	Name string `json:"name" binding:"required"`
}
