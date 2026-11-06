
package service

import (
	"context"
	"errors"
	"strings"
	"time"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/doctor/dto"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/doctor/model"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/doctor/repository"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type DoctorService interface {
	CreateDoctor(
		ctx context.Context,
		organizationID, userID primitive.ObjectID,
		req dto.CreateDoctorRequest,
	) (*model.Doctor, error)

	GetAllDoctors(
		ctx context.Context,
		organizationID primitive.ObjectID,
	) ([]model.Doctor, error)

	GetDoctorByID(
		ctx context.Context,
		organizationID primitive.ObjectID,
		id string,
	) (*model.Doctor, error)

	UpdateDoctor(
		ctx context.Context,
		organizationID primitive.ObjectID,
		id string,
		req dto.UpdateDoctorRequest,
	) (*model.Doctor, error)

	DeleteDoctor(
		ctx context.Context,
		organizationID primitive.ObjectID,
		id string,
	) error
}

type doctorService struct {
	repo repository.DoctorRepository
}

func NewDoctorService(repo repository.DoctorRepository) DoctorService {
	return &doctorService{repo: repo}
}

func validateIDs(
	organizationID, userID primitive.ObjectID,
) error {
	if organizationID.IsZero() {
		return errors.New("valid organization ID is required")
	}

	if userID.IsZero() {
		return errors.New("valid user ID is required")
	}

	return nil
}

func (s *doctorService) CreateDoctor(
	ctx context.Context,
	organizationID, userID primitive.ObjectID,
	req dto.CreateDoctorRequest,
) (*model.Doctor, error) {

	if err := validateIDs(organizationID, userID); err != nil {
		return nil, err
	}

	req.Name = strings.TrimSpace(req.Name)
	req.Email = strings.ToLower(strings.TrimSpace(req.Email))
	req.Phone = strings.TrimSpace(req.Phone)

	if req.Name == "" || req.Email == "" || req.Phone == "" {
		return nil, errors.New("name, email and phone are required")
	}

	// Prevent duplicate doctor profile for the same account.
	_, err := s.repo.GetByUserID(ctx, organizationID, userID)
	if err == nil {
		return nil, errors.New("doctor profile already exists for this user")
	}
	if !errors.Is(err, mongo.ErrNoDocuments) {
		return nil, err
	}

	// Check duplicate email.
	_, err = s.repo.GetByEmail(ctx, organizationID, req.Email)
	if err == nil {
		return nil, errors.New("doctor email already exists")
	}
	if !errors.Is(err, mongo.ErrNoDocuments) {
		return nil, err
	}

	// Check duplicate phone.
	_, err = s.repo.GetByPhone(ctx, organizationID, req.Phone)
	if err == nil {
		return nil, errors.New("doctor phone already exists")
	}
	if !errors.Is(err, mongo.ErrNoDocuments) {
		return nil, err
	}

	if req.Experience < 0 || req.ConsultationFee < 0 {
		return nil, errors.New("experience and consultation fee cannot be negative")
	}

	now := time.Now()

	doctor := &model.Doctor{
		ID:              primitive.NewObjectID(),
		UserID:          userID,
		OrganizationID:  organizationID,
		Name:            req.Name,
		Email:           req.Email,
		Phone:           req.Phone,
		Specialization:  req.Specialization,
		Qualification:   req.Qualification,
		Experience:      req.Experience,
		ConsultationFee: req.ConsultationFee,
		IsActive:        true,
		CreatedAt:       now,
		UpdatedAt:       now,
	}

	if err := s.repo.Create(ctx, doctor); err != nil {
		return nil, err
	}

	return doctor, nil
}

func (s *doctorService) GetAllDoctors(
	ctx context.Context,
	organizationID primitive.ObjectID,
) ([]model.Doctor, error) {

	if organizationID.IsZero() {
		return nil, errors.New("valid organization ID is required")
	}

	return s.repo.GetAll(ctx, organizationID)
}

func (s *doctorService) GetDoctorByID(
	ctx context.Context,
	organizationID primitive.ObjectID,
	id string,
) (*model.Doctor, error) {

	if organizationID.IsZero() {
		return nil, errors.New("valid organization ID is required")
	}

	return s.repo.GetByID(ctx, organizationID, id)
}

func (s *doctorService) UpdateDoctor(
	ctx context.Context,
	organizationID primitive.ObjectID,
	id string,
	req dto.UpdateDoctorRequest,
) (*model.Doctor, error) {

	if organizationID.IsZero() {
		return nil, errors.New("valid organization ID is required")
	}

	doctor, err := s.repo.GetByID(ctx, organizationID, id)
	if err != nil {
		return nil, err
	}

	if req.Name != "" {
		doctor.Name = strings.TrimSpace(req.Name)
	}

	if req.Phone != "" {
		doctor.Phone = strings.TrimSpace(req.Phone)
	}

	if req.Specialization != "" {
		doctor.Specialization = req.Specialization
	}

	if req.Qualification != "" {
		doctor.Qualification = req.Qualification
	}

	if req.Experience < 0 || req.ConsultationFee < 0 {
		return nil, errors.New("experience and consultation fee cannot be negative")
	}

	doctor.Experience = req.Experience
	doctor.ConsultationFee = req.ConsultationFee
	doctor.IsActive = req.IsActive
	doctor.UpdatedAt = time.Now()

	if err := s.repo.Update(ctx, organizationID, doctor); err != nil {
		return nil, err
	}

	return doctor, nil
}

func (s *doctorService) DeleteDoctor(
	ctx context.Context,
	organizationID primitive.ObjectID,
	id string,
) error {

	if organizationID.IsZero() {
		return errors.New("valid organization ID is required")
	}

	_, err := s.repo.GetByID(ctx, organizationID, id)
	if err != nil {
		return err
	}

	return s.repo.Delete(ctx, organizationID, id)
}
