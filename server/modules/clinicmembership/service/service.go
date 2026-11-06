package service

import (
	"context"
	"errors"
	"strings"
	"time"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/clinicmembership/model"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/clinicmembership/repository"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

const (
	RoleDoctor       = "DOCTOR"
	RoleReceptionist = "RECEPTIONIST"
)

var allowedPermissions = map[string]bool{
	"patients.read":           true,
	"patients.manage":         true,
	"appointments.read":       true,
	"appointments.manage":     true,
	"schedule.read":           true,
	"schedule.manage":         true,
	"queue.read":              true,
	"queue.manage":            true,
	"consultation.read":       true,
	"consultation.manage":     true,
	"prescriptions.read":      true,
	"prescriptions.manage":    true,
}

type ClinicMembershipService interface {
	AddMember(
		ctx context.Context,
		actorID primitive.ObjectID,
		clinicID primitive.ObjectID,
		userID primitive.ObjectID,
		role string,
		permissions []string,
	) (*model.ClinicMembership, error)

	GetMembers(
		ctx context.Context,
		actorID primitive.ObjectID,
		clinicID primitive.ObjectID,
	) ([]model.ClinicMembership, error)

	GetMyMembership(
		ctx context.Context,
		userID primitive.ObjectID,
		clinicID primitive.ObjectID,
	) (*model.ClinicMembership, error)

	UpdateMember(
		ctx context.Context,
		actorID primitive.ObjectID,
		clinicID primitive.ObjectID,
		userID primitive.ObjectID,
		role string,
		permissions []string,
	) error

	DeactivateMember(
		ctx context.Context,
		actorID primitive.ObjectID,
		clinicID primitive.ObjectID,
		userID primitive.ObjectID,
	) error
}

type clinicMembershipService struct {
	repo repository.ClinicMembershipRepository
}

func NewClinicMembershipService(
	repo repository.ClinicMembershipRepository,
) ClinicMembershipService {
	return &clinicMembershipService{
		repo: repo,
	}
}

func (s *clinicMembershipService) authorizeOwner(
	ctx context.Context,
	actorID primitive.ObjectID,
	clinicID primitive.ObjectID,
) (primitive.ObjectID, error) {
	if actorID.IsZero() || clinicID.IsZero() {
		return primitive.NilObjectID, errors.New(
			"valid user and clinic IDs are required",
		)
	}

	organizationID, err := s.repo.GetClinic(ctx, clinicID)
	if err != nil {
		return primitive.NilObjectID, err
	}

	isOwner, err := s.repo.IsOrganizationOwner(
		ctx,
		organizationID,
		actorID,
	)
	if err != nil {
		return primitive.NilObjectID, err
	}

	if !isOwner {
		return primitive.NilObjectID, errors.New(
			"only the organization owner can manage clinic members",
		)
	}

	return organizationID, nil
}

func validateRole(role string) (string, error) {
	role = strings.ToUpper(strings.TrimSpace(role))

	if role != RoleDoctor && role != RoleReceptionist {
		return "", errors.New(
			"only DOCTOR and RECEPTIONIST roles are allowed",
		)
	}

	return role, nil
}

func validatePermissions(
	permissions []string,
) ([]string, error) {
	unique := make(map[string]bool)
	result := make([]string, 0, len(permissions))

	for _, permission := range permissions {
		permission = strings.ToLower(strings.TrimSpace(permission))

		if permission == "" {
			continue
		}

		if !allowedPermissions[permission] {
			return nil, errors.New(
				"invalid permission: " + permission,
			)
		}

		if !unique[permission] {
			unique[permission] = true
			result = append(result, permission)
		}
	}

	return result, nil
}

func (s *clinicMembershipService) AddMember(
	ctx context.Context,
	actorID primitive.ObjectID,
	clinicID primitive.ObjectID,
	userID primitive.ObjectID,
	role string,
	permissions []string,
) (*model.ClinicMembership, error) {
	organizationID, err := s.authorizeOwner(
		ctx,
		actorID,
		clinicID,
	)
	if err != nil {
		return nil, err
	}

	if userID.IsZero() || userID == actorID {
		return nil, errors.New("valid member user ID is required")
	}

	role, err = validateRole(role)
	if err != nil {
		return nil, err
	}

	actualRole, isActive, err := s.repo.GetUserRole(ctx, userID)
	if err != nil {
		return nil, err
	}

	if !isActive {
		return nil, errors.New("user account is inactive")
	}

	if strings.ToUpper(strings.TrimSpace(actualRole)) != role {
		return nil, errors.New(
			"requested role does not match the user's account role",
		)
	}

	permissions, err = validatePermissions(permissions)
	if err != nil {
		return nil, err
	}

	existing, err := s.repo.GetByUserAndClinic(
		ctx,
		userID,
		clinicID,
	)

	if err == nil && existing != nil {
		return nil, errors.New(
			"user already has a membership record in this clinic",
		)
	}

	if err != nil && !errors.Is(err, mongo.ErrNoDocuments) {
		return nil, err
	}

	now := time.Now()

	membership := &model.ClinicMembership{
		ID:             primitive.NewObjectID(),
		UserID:         userID,
		OrganizationID: organizationID,
		ClinicID:       clinicID,
		Role:           role,
		Permissions:    permissions,
		IsActive:       true,
		CreatedAt:      now,
		UpdatedAt:      now,
	}

	if err := s.repo.Create(ctx, membership); err != nil {
		return nil, err
	}

	return membership, nil
}

func (s *clinicMembershipService) GetMembers(
	ctx context.Context,
	actorID primitive.ObjectID,
	clinicID primitive.ObjectID,
) ([]model.ClinicMembership, error) {
	_, err := s.authorizeOwner(ctx, actorID, clinicID)
	if err != nil {
		return nil, err
	}

	return s.repo.GetAllByClinic(ctx, clinicID)
}

func (s *clinicMembershipService) GetMyMembership(
	ctx context.Context,
	userID primitive.ObjectID,
	clinicID primitive.ObjectID,
) (*model.ClinicMembership, error) {
	if userID.IsZero() || clinicID.IsZero() {
		return nil, errors.New("valid user and clinic IDs are required")
	}

	membership, err := s.repo.GetByUserAndClinic(
		ctx,
		userID,
		clinicID,
	)
	if err != nil {
		return nil, err
	}

	if !membership.IsActive {
		return nil, mongo.ErrNoDocuments
	}

	return membership, nil
}

func (s *clinicMembershipService) UpdateMember(
	ctx context.Context,
	actorID primitive.ObjectID,
	clinicID primitive.ObjectID,
	userID primitive.ObjectID,
	role string,
	permissions []string,
) error {
	_, err := s.authorizeOwner(ctx, actorID, clinicID)
	if err != nil {
		return err
	}

	role, err = validateRole(role)
	if err != nil {
		return err
	}

	actualRole, isActive, err := s.repo.GetUserRole(ctx, userID)
	if err != nil {
		return err
	}

	if !isActive {
		return errors.New("user account is inactive")
	}

	if strings.ToUpper(strings.TrimSpace(actualRole)) != role {
		return errors.New(
			"requested role does not match the user's account role",
		)
	}

	permissions, err = validatePermissions(permissions)
	if err != nil {
		return err
	}

	membership, err := s.repo.GetByUserAndClinic(
		ctx,
		userID,
		clinicID,
	)
	if err != nil {
		return err
	}

	if !membership.IsActive {
		return mongo.ErrNoDocuments
	}

	return s.repo.Update(
		ctx,
		membership.ID,
		clinicID,
		role,
		permissions,
	)
}

func (s *clinicMembershipService) DeactivateMember(
	ctx context.Context,
	actorID primitive.ObjectID,
	clinicID primitive.ObjectID,
	userID primitive.ObjectID,
) error {
	_, err := s.authorizeOwner(ctx, actorID, clinicID)
	if err != nil {
		return err
	}

	if userID.IsZero() {
		return errors.New("valid member user ID is required")
	}

	return s.repo.Deactivate(ctx, userID, clinicID)
}