
package dto

import (
	"time"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/organization/model"
)

// CreateOrganizationRequest represents the data
// required to create a new organization.
type CreateOrganizationRequest struct {
	Name        string `json:"name" binding:"required,min=2,max=100"`
	Description string `json:"description" binding:"omitempty,max=500"`
	Email       string `json:"email" binding:"omitempty,email"`
	Phone       string `json:"phone" binding:"omitempty"`
}

// OrganizationResponse represents the organization
// data returned by the API.
type OrganizationResponse struct {
	ID          string    `json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description,omitempty"`
	Email       string    `json:"email,omitempty"`
	Phone       string    `json:"phone,omitempty"`
	OwnerUserID string    `json:"owner_user_id"`
	IsActive    bool      `json:"is_active"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

// ToOrganizationResponse converts the Organization model
// into an API response DTO.
func ToOrganizationResponse(org *model.Organization) *OrganizationResponse {
	if org == nil {
		return nil
	}

	return &OrganizationResponse{
		ID:          org.ID.Hex(),
		Name:        org.Name,
		Description: org.Description,
		Email:       org.Email,
		Phone:       org.Phone,
		OwnerUserID: org.OwnerUserID.Hex(),
		IsActive:    org.IsActive,
		CreatedAt:   org.CreatedAt,
		UpdatedAt:   org.UpdatedAt,
	}
}
