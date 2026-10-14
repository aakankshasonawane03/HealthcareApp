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
	CreateClinic(ctx context.Context, clinic *model.Clinic) error
	GetAllClinics(ctx context.Context) ([]model.Clinic, error)
	GetClinicByID(ctx context.Context, id primitive.ObjectID) (*model.Clinic, error)
	UpdateClinic(ctx context.Context, id primitive.ObjectID, clinic *model.Clinic) error
	DeleteClinic(ctx context.Context, id primitive.ObjectID) error
}

type clinicService struct {
	repo repository.ClinicRepository
}

func NewClinicService(
	repo repository.ClinicRepository,
) ClinicService {

	return &clinicService{
		repo: repo,
	}
}

// Create Clinic
func (s *clinicService) CreateClinic(
	ctx context.Context,
	clinic *model.Clinic,
) error {

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

	clinic.ID = primitive.NewObjectID()

	clinic.IsActive = true

	now := time.Now()

	clinic.CreatedAt = now
	clinic.UpdatedAt = now

	return s.repo.Create(ctx, clinic)
}

// Get All Clinics
func (s *clinicService) GetAllClinics(
	ctx context.Context,
) ([]model.Clinic, error) {

	clinics, err := s.repo.GetAll(ctx)
	if err != nil {
		return nil, err
	}

	result := make([]model.Clinic, len(clinics))
	for i, clinic := range clinics {
		result[i] = model.Clinic{
			ID:        clinic.ID,
			Name:      clinic.Name,
			Address:   clinic.Address,
			City:      clinic.City,
			State:     clinic.State,
			Pincode:   clinic.Pincode,
			Phone:     clinic.Phone,
			Email:     clinic.Email,
			IsActive:  clinic.IsActive,
			CreatedAt: clinic.CreatedAt,
			UpdatedAt: clinic.UpdatedAt,
		}
	}

	return result, nil
}

// Get Clinic By ID
func (s *clinicService) GetClinicByID(
	ctx context.Context,
	id primitive.ObjectID,
) (*model.Clinic, error) {

	return s.repo.GetByID(ctx, id)
}

// Update Clinic
func (s *clinicService) UpdateClinic(
	ctx context.Context,
	id primitive.ObjectID,
	clinic *model.Clinic,
) error {

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

	clinic.UpdatedAt = time.Now()

	return s.repo.Update(ctx, id, clinic)
}

// Delete Clinic
func (s *clinicService) DeleteClinic(
	ctx context.Context,
	id primitive.ObjectID,
) error {

	return s.repo.Delete(ctx, id)
}
