package service

import (
	"context"
	"errors"
	"time"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/patients/dto"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/patients/model"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/patients/repository"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type PatientService interface {
	CreatePatient(ctx context.Context, req dto.CreatePatientRequest) (*model.Patient, error)
	GetAllPatients(ctx context.Context) ([]model.Patient, error)
	GetPatientByID(ctx context.Context, id string) (*model.Patient, error)
	UpdatePatient(ctx context.Context, id string, req dto.UpdatePatientRequest) (*model.Patient, error)
	DeletePatient(ctx context.Context, id string) error
}

type patientService struct {
	repo repository.PatientRepository
}

func NewPatientService(repo repository.PatientRepository) PatientService {
	return &patientService{
		repo: repo,
	}
}

// Create Patient
func (s *patientService) CreatePatient(
	ctx context.Context,
	req dto.CreatePatientRequest,
) (*model.Patient, error) {

	// Check duplicate email
	existingPatient, err := s.repo.GetByEmail(ctx, req.Email)
	if err == nil && existingPatient != nil {
		return nil, errors.New("patient email already exists")
	}

	// Check duplicate phone
	existingPhone, err := s.repo.GetByPhone(ctx, req.Phone)
	if err == nil && existingPhone != nil {
		return nil, errors.New("patient phone already exists")
	}

	patient := &model.Patient{
		ID:               primitive.NewObjectID(),
		FirstName:        req.FirstName,
		LastName:         req.LastName,
		Email:            req.Email,
		Phone:            req.Phone,
		Gender:           req.Gender,
		DateOfBirth:      req.DateOfBirth,
		BloodGroup:       req.BloodGroup,
		Address:          req.Address,
		EmergencyContact: req.EmergencyContact,
		IsActive:         true,
		CreatedAt:        time.Now(),
		UpdatedAt:        time.Now(),
	}

	if err := s.repo.Create(ctx, patient); err != nil {
		return nil, err
	}

	return patient, nil
}

// Get All Patients
func (s *patientService) GetAllPatients(
	ctx context.Context,
) ([]model.Patient, error) {

	return s.repo.GetAll(ctx)
}

// Get Patient By ID
func (s *patientService) GetPatientByID(
	ctx context.Context,
	id string,
) (*model.Patient, error) {

	return s.repo.GetByID(ctx, id)
}

// Update Patient
func (s *patientService) UpdatePatient(
	ctx context.Context,
	id string,
	req dto.UpdatePatientRequest,
) (*model.Patient, error) {

	patient, err := s.repo.GetByID(ctx, id)
	if err != nil {
		return nil, errors.New("patient not found")
	}

	if req.FirstName != "" {
		patient.FirstName = req.FirstName
	}

	if req.LastName != "" {
		patient.LastName = req.LastName
	}

	if req.Email != "" {
		patient.Email = req.Email
	}

	if req.Phone != "" {
		patient.Phone = req.Phone
	}

	if req.Gender != "" {
		patient.Gender = req.Gender
	}

	if !req.DateOfBirth.IsZero() {
		patient.DateOfBirth = req.DateOfBirth
	}

	if req.BloodGroup != "" {
		patient.BloodGroup = req.BloodGroup
	}

	if req.Address != "" {
		patient.Address = req.Address
	}

	if req.EmergencyContact != "" {
		patient.EmergencyContact = req.EmergencyContact
	}

	patient.IsActive = req.IsActive
	patient.UpdatedAt = time.Now()

	if err := s.repo.Update(ctx, patient); err != nil {
		return nil, err
	}

	return patient, nil
}

// Delete Patient
func (s *patientService) DeletePatient(
	ctx context.Context,
	id string,
) error {

	_, err := s.repo.GetByID(ctx, id)
	if err != nil {
		return errors.New("patient not found")
	}

	return s.repo.Delete(ctx, id)
}
