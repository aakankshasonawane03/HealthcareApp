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

	CreateMyPatientProfile(
		ctx context.Context,
		userID string,
		req dto.CreateMyPatientProfileRequest,
	) (*model.Patient, error)

	GetAllPatients(ctx context.Context) ([]model.Patient, error)
	GetPatientByID(ctx context.Context, id string) (*model.Patient, error)
	GetMyPatient(ctx context.Context, userID string) (*model.Patient, error)
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

// CreatePatient creates a patient record through the Admin workflow.
func (s *patientService) CreatePatient(
	ctx context.Context,
	req dto.CreatePatientRequest,
) (*model.Patient, error) {
	existing, err := s.repo.GetByEmail(ctx, req.Email)
	if err == nil && existing != nil {
		return nil, errors.New("patient email already exists")
	}
	if err != nil && !errors.Is(err, repository.ErrPatientNotFound) {
		return nil, err
	}

	existing, err = s.repo.GetByPhone(ctx, req.Phone)
	if err == nil && existing != nil {
		return nil, errors.New("patient phone already exists")
	}
	if err != nil && !errors.Is(err, repository.ErrPatientNotFound) {
		return nil, err
	}

	now := time.Now()

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
		CreatedAt:        now,
		UpdatedAt:        now,
	}

	if err := s.repo.Create(ctx, patient); err != nil {
		return nil, err
	}

	return patient, nil
}

// CreateMyPatientProfile creates a patient profile linked to the
// authenticated user's account. userID must come from the JWT context.
func (s *patientService) CreateMyPatientProfile(
	ctx context.Context,
	userID string,
	req dto.CreateMyPatientProfileRequest,
) (*model.Patient, error) {
	if userID == "" {
		return nil, errors.New("authenticated user ID is missing")
	}

	// Check whether this account already has a patient profile.
	exists, err := s.repo.ExistsByUserID(ctx, userID)
	if err != nil {
		return nil, err
	}
	if exists {
		return nil, errors.New("patient profile already exists for this account")
	}

	// Check duplicate email.
	existing, err := s.repo.GetByEmail(ctx, req.Email)
	if err == nil && existing != nil {
		return nil, errors.New("patient email already exists")
	}
	if err != nil && !errors.Is(err, repository.ErrPatientNotFound) {
		return nil, err
	}

	// Check duplicate phone.
	existing, err = s.repo.GetByPhone(ctx, req.Phone)
	if err == nil && existing != nil {
		return nil, errors.New("patient phone already exists")
	}
	if err != nil && !errors.Is(err, repository.ErrPatientNotFound) {
		return nil, err
	}

	now := time.Now()

	patient := &model.Patient{
		ID:               primitive.NewObjectID(),
		UserID:           userID,
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
		CreatedAt:        now,
		UpdatedAt:        now,
	}

	if err := s.repo.Create(ctx, patient); err != nil {
		return nil, err
	}

	return patient, nil
}

// GetAllPatients retrieves all patient records.
func (s *patientService) GetAllPatients(
	ctx context.Context,
) ([]model.Patient, error) {
	return s.repo.GetAll(ctx)
}

// GetPatientByID retrieves a patient by record ID.
func (s *patientService) GetPatientByID(
	ctx context.Context,
	id string,
) (*model.Patient, error) {
	return s.repo.GetByID(ctx, id)
}

// GetMyPatient retrieves the patient record linked to userID.
func (s *patientService) GetMyPatient(
	ctx context.Context,
	userID string,
) (*model.Patient, error) {
	if userID == "" {
		return nil, errors.New("authenticated user ID is missing")
	}

	patient, err := s.repo.GetByUserID(ctx, userID)
	if err != nil {
		if errors.Is(err, repository.ErrPatientNotFound) {
			return nil, errors.New("patient profile not found for this account")
		}
		return nil, err
	}

	return patient, nil
}

// UpdatePatient updates permitted patient fields.
func (s *patientService) UpdatePatient(
	ctx context.Context,
	id string,
	req dto.UpdatePatientRequest,
) (*model.Patient, error) {
	patient, err := s.repo.GetByID(ctx, id)
	if err != nil {
		if errors.Is(err, repository.ErrPatientNotFound) {
			return nil, errors.New("patient not found")
		}
		return nil, err
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

	// IsActive is intentionally not changed here.
	patient.UpdatedAt = time.Now()

	if err := s.repo.Update(ctx, patient); err != nil {
		return nil, err
	}

	return patient, nil
}

// DeletePatient deletes a patient record.
func (s *patientService) DeletePatient(
	ctx context.Context,
	id string,
) error {
	_, err := s.repo.GetByID(ctx, id)
	if err != nil {
		if errors.Is(err, repository.ErrPatientNotFound) {
			return errors.New("patient not found")
		}
		return err
	}

	return s.repo.Delete(ctx, id)
}
