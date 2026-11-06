package handler

import (
	"errors"
	"net/http"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/clinicmembership/dto"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/clinicmembership/service"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type ClinicMembershipController struct {
	service service.ClinicMembershipService
}

func NewClinicMembershipController(
	membershipService service.ClinicMembershipService,
) *ClinicMembershipController {
	return &ClinicMembershipController{
		service: membershipService,
	}
}

func getObjectID(value string) (primitive.ObjectID, error) {
	return primitive.ObjectIDFromHex(value)
}

func getAuthenticatedUserID(c *gin.Context) (primitive.ObjectID, error) {
	userID := c.GetString("user_id")

	if userID == "" {
		return primitive.NilObjectID, errors.New(
			"authenticated user not found",
		)
	}

	return getObjectID(userID)
}

func respondError(c *gin.Context, err error) {
	switch {
	case errors.Is(err, mongo.ErrNoDocuments):
		c.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"message": "Resource not found",
		})

	case err.Error() == "only the organization owner can manage clinic members":
		c.JSON(http.StatusForbidden, gin.H{
			"success": false,
			"message": err.Error(),
		})

	case err.Error() == "user account is inactive":
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": err.Error(),
		})

	default:
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": err.Error(),
		})
	}
}

// POST /api/clinics/:clinicId/members
func (h *ClinicMembershipController) AddMember(c *gin.Context) {
	actorID, err := getAuthenticatedUserID(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"success": false,
			"message": "Invalid authenticated user",
		})
		return
	}

	clinicID, err := getObjectID(c.Param("clinicId"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid clinic ID",
		})
		return
	}

	var req dto.AddClinicMemberRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid request body",
			"error":   err.Error(),
		})
		return
	}

	userID, err := getObjectID(req.UserID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid member user ID",
		})
		return
	}

	membership, err := h.service.AddMember(
		c.Request.Context(),
		actorID,
		clinicID,
		userID,
		req.Role,
		req.Permissions,
	)

	if err != nil {
		respondError(c, err)
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"success": true,
		"message": "Clinic member added successfully",
		"data":    dto.ToClinicMemberResponse(membership),
	})
}

// GET /api/clinics/:clinicId/members
func (h *ClinicMembershipController) GetMembers(c *gin.Context) {
	actorID, err := getAuthenticatedUserID(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"success": false,
			"message": "Invalid authenticated user",
		})
		return
	}

	clinicID, err := getObjectID(c.Param("clinicId"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid clinic ID",
		})
		return
	}

	members, err := h.service.GetMembers(
		c.Request.Context(),
		actorID,
		clinicID,
	)

	if err != nil {
		respondError(c, err)
		return
	}

	response := make([]dto.ClinicMemberResponse, 0, len(members))

	for i := range members {
		response = append(
			response,
			dto.ToClinicMemberResponse(&members[i]),
		)
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data": dto.MembershipListResponse{
			Members: response,
			Total:   len(response),
		},
	})
}

// GET /api/clinics/:clinicId/members/me
func (h *ClinicMembershipController) GetMyMembership(c *gin.Context) {
	userID, err := getAuthenticatedUserID(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"success": false,
			"message": "Invalid authenticated user",
		})
		return
	}

	clinicID, err := getObjectID(c.Param("clinicId"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid clinic ID",
		})
		return
	}

	membership, err := h.service.GetMyMembership(
		c.Request.Context(),
		userID,
		clinicID,
	)

	if err != nil {
		respondError(c, err)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    dto.ToClinicMemberResponse(membership),
	})
}

// PUT /api/clinics/:clinicId/members/:userId
func (h *ClinicMembershipController) UpdateMember(c *gin.Context) {
	actorID, err := getAuthenticatedUserID(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"success": false,
			"message": "Invalid authenticated user",
		})
		return
	}

	clinicID, err := getObjectID(c.Param("clinicId"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid clinic ID",
		})
		return
	}

	userID, err := getObjectID(c.Param("userId"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid member user ID",
		})
		return
	}

	var req dto.UpdateClinicMemberRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid request body",
			"error":   err.Error(),
		})
		return
	}

	err = h.service.UpdateMember(
		c.Request.Context(),
		actorID,
		clinicID,
		userID,
		req.Role,
		req.Permissions,
	)

	if err != nil {
		respondError(c, err)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Clinic member updated successfully",
	})
}

// DELETE /api/clinics/:clinicId/members/:userId
func (h *ClinicMembershipController) DeactivateMember(c *gin.Context) {
	actorID, err := getAuthenticatedUserID(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"success": false,
			"message": "Invalid authenticated user",
		})
		return
	}

	clinicID, err := getObjectID(c.Param("clinicId"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid clinic ID",
		})
		return
	}

	userID, err := getObjectID(c.Param("userId"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid member user ID",
		})
		return
	}

	err = h.service.DeactivateMember(
		c.Request.Context(),
		actorID,
		clinicID,
		userID,
	)

	if err != nil {
		respondError(c, err)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Clinic member deactivated successfully",
	})
}