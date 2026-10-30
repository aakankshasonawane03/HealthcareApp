package service

import (
	"context"
	"errors"
	"strings"
	"time"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/organization/model"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/organization/repository"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type OrganizationService interface {
	Create(
		ctx context.Context,
		ownerID primitive.ObjectID,
		name, description, email, phone string,
	) (*model.Organization, error)

	GetMyOrganization(
		ctx context.Context,
		ownerID primitive.ObjectID,
	) (*model.Organization, error)
}

type organizationService struct {
	repo repository.OrganizationRepository
}

func NewOrganizationService(
	repo repository.OrganizationRepository,
) OrganizationService {
	return &organizationService{repo: repo}
}

func (s *organizationService) Create(
	ctx context.Context,
	ownerID primitive.ObjectID,
	name, description, email, phone string,
) (*model.Organization, error) {
	name = strings.TrimSpace(name)

	if name == "" {
		return nil, errors.New("organization name is required")
	}

	// Initial business rule: one organization per doctor.
	existing, err := s.repo.GetByOwnerID(ctx, ownerID)
	if err == nil && existing != nil {
		return nil, errors.New("you already own an organization")
	}
	if err != nil && !errors.Is(err, mongo.ErrNoDocuments) {
		return nil, err
	}

	now := time.Now()

	org := &model.Organization{
		ID:          primitive.NewObjectID(),
		Name:        name,
		Description: strings.TrimSpace(description),
		Email:       strings.ToLower(strings.TrimSpace(email)),
		Phone:       strings.TrimSpace(phone),
		OwnerUserID: ownerID,
		IsActive:    true,
		CreatedAt:   now,
		UpdatedAt:   now,
	}

	if err := s.repo.Create(ctx, org); err != nil {
		return nil, err
	}

	return org, nil
}

func (s *organizationService) GetMyOrganization(
	ctx context.Context,
	ownerID primitive.ObjectID,
) (*model.Organization, error) {
	return s.repo.GetByOwnerID(ctx, ownerID)
}
