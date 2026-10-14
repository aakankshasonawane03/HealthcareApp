package queue

type CreateQueueDTO struct {
	Name string `json:"name" binding:"required"`
}
