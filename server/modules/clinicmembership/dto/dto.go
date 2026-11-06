package dto

import (
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/clinicmembership/model"
)

type AddClinicMemberRequest struct {
	UserID      string   `json:"user_id" binding:"required"`
	Role        string   `json:"role" binding:"required"`
	Permissions []string `json:"permissions"`
}

type UpdateClinicMemberRequest struct {
	Role        string   `json:"role" binding:"required"`
	Permissions []string `json:"permissions"`
}

type ClinicMemberResponse struct {
	ID          string   `json:"id"`
	UserID      string   `json:"user_id"`
	ClinicID    string   `json:"clinic_id"`
	Role        string   `json:"role"`
	Permissions []string `json:"permissions"`
	IsActive    bool     `json:"is_active"`
}

type MembershipListResponse struct {
	Members []ClinicMemberResponse `json:"members"`
	Total   int                    `json:"total"`
}

func ToClinicMemberResponse(
	membership *model.ClinicMembership,
) ClinicMemberResponse {
	if membership == nil {
		return ClinicMemberResponse{}
	}

	return ClinicMemberResponse{
		ID:          membership.ID.Hex(),
		UserID:      membership.UserID.Hex(),
		ClinicID:    membership.ClinicID.Hex(),
		Role:        membership.Role,
		Permissions: membership.Permissions,
		IsActive:    membership.IsActive,
	}
}
