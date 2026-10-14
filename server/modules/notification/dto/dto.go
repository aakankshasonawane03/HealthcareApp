package dto

type CreateNotificationDTO struct {
	UserID      string `json:"user_id" binding:"required"`
	Title       string `json:"title" binding:"required"`
	Message     string `json:"message" binding:"required"`
	ReferenceID string `json:"reference_id"`
	Type        string `json:"type" binding:"required"`
}

type RegisterDeviceTokenDTO struct {
	Token    string `json:"token" binding:"required"`
	Platform string `json:"platform"`
}
