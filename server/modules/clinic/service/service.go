package service

import (
	"context"
	"errors"
	"strings"
	"time"

	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/clinic/model"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/clinic/repository"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ClinicService interface {
	CreateClinic(ctx context.Context, organizationID primitive.ObjectID, clinic *model.Clinic) error
	GetAllClinics(ctx context.Context, organizationID primitive.ObjectID) ([]model.Clinic, error)
	GetClinicByID(ctx context.Context, organizationID, id primitive.ObjectID) (*model.Clinic, error)
	UpdateClinic(ctx context.Context, organizationID, id primitive.ObjectID, clinic *model.Clinic) error
	DeleteClinic(ctx context.Context, organizationID, id primitive.ObjectID) error
}

type clinicService struct {
	repo repository.ClinicRepository
}

func NewClinicService(repo repository.ClinicRepository) ClinicService {
	return &clinicService{repo: repo}
}

func validateOrganizationID(organizationID primitive.ObjectID) error {
	if organizationID.IsZero() {
		return errors.New("valid organization ID is required")
	}
	return nil
}

func (s *clinicService) CreateClinic(
	ctx context.Context,
	organizationID primitive.ObjectID,
	clinic *model.Clinic,
) error {
	if err := validateOrganizationID(organizationID); err != nil {
		return err
	}

	clinic.Name = strings.TrimSpace(clinic.Name)
	clinic.Address = strings.TrimSpace(clinic.Address)
	clinic.City = strings.TrimSpace(clinic.City)
	clinic.State = strings.TrimSpace(clinic.State)
	clinic.Pincode = strings.TrimSpace(clinic.Pincode)
	clinic.Phone = strings.TrimSpace(clinic.Phone)
	clinic.Email = strings.TrimSpace(clinic.Email)

	if clinic.Name == "" {
		return errors.New("clinic name is required")
	}
	if clinic.Address == "" {
		return errors.New("clinic address is required")
	}
	if clinic.City == "" {
		return errors.New("clinic city is required")
	}
	if clinic.State == "" {
		return errors.New("clinic state is required")
	}
	if clinic.Pincode == "" {
		return errors.New("clinic pincode is required")
	}
	if clinic.Phone == "" {
		return errors.New("clinic phone is required")
	}

	// Always assign the trusted organization ID from the caller.
	clinic.ID = primitive.NewObjectID()
	clinic.OrganizationID = organizationID
	clinic.IsActive = true

	now := time.Now()
	clinic.CreatedAt = now
	clinic.UpdatedAt = now

	return s.repo.Create(ctx, clinic)
}

func (s *clinicService) GetAllClinics(
	ctx context.Context,
	organizationID primitive.ObjectID,
) ([]model.Clinic, error) {
	if err := validateOrganizationID(organizationID); err != nil {
		return nil, err
	}

	clinics, err := s.repo.GetAll(ctx, organizationID)
	if err != nil {
		return nil, err
	}

	result := make([]model.Clinic, len(clinics))
	for i, clinic := range clinics {
		result[i] = model.Clinic{
			ID:             clinic.ID,
			OrganizationID: clinic.OrganizationID,
			Name:           clinic.Name,
			Address:        clinic.Address,
			City:           clinic.City,
			State:          clinic.State,
			Pincode:        clinic.Pincode,
			Phone:          clinic.Phone,
			Email:          clinic.Email,
			Description:    clinic.Description,
			OpeningTime:    clinic.OpeningTime,
			ClosingTime:    clinic.ClosingTime,
			IsActive:       clinic.IsActive,
			CreatedAt:      clinic.CreatedAt,
			UpdatedAt:      clinic.UpdatedAt,
		}
	}

	return result, nil
}

func (s *clinicService) GetClinicByID(
	ctx context.Context,
	organizationID, id primitive.ObjectID,
) (*model.Clinic, error) {
	if err := validateOrganizationID(organizationID); err != nil {
		return nil, err
	}

	return s.repo.GetByID(ctx, organizationID, id)
}

func (s *clinicService) UpdateClinic(
	ctx context.Context,
	organizationID, id primitive.ObjectID,
	clinic *model.Clinic,
) error {
	if err := validateOrganizationID(organizationID); err != nil {
		return err
	}

	clinic.Name = strings.TrimSpace(clinic.Name)
	clinic.Address = strings.TrimSpace(clinic.Address)
	clinic.City = strings.TrimSpace(clinic.City)
	clinic.State = strings.TrimSpace(clinic.State)
	clinic.Pincode = strings.TrimSpace(clinic.Pincode)
	clinic.Phone = strings.TrimSpace(clinic.Phone)
	clinic.Email = strings.TrimSpace(clinic.Email)

	if clinic.Name == "" {
		return errors.New("clinic name is required")
	}
	if clinic.Address == "" {
		return errors.New("clinic address is required")
	}
	if clinic.City == "" {
		return errors.New("clinic city is required")
	}
	if clinic.State == "" {
		return errors.New("clinic state is required")
	}
	if clinic.Pincode == "" {
		return errors.New("clinic pincode is required")
	}
	if clinic.Phone == "" {
		return errors.New("clinic phone is required")
	}

	// Do not allow request data to change clinic ownership.
	clinic.OrganizationID = organizationID
	clinic.UpdatedAt = time.Now()

	return s.repo.Update(ctx, organizationID, id, clinic)
}

func (s *clinicService) DeleteClinic(
	ctx context.Context,
	organizationID, id primitive.ObjectID,
) error {
	if err := validateOrganizationID(organizationID); err != nil {
		return err
	}

	return s.repo.Delete(ctx, organizationID, id)
}
