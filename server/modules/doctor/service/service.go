package service

import (
	"context"
	"errors"
	"time"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/doctor/dto"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/doctor/model"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/doctor/repository"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type DoctorService interface {
	CreateDoctor(ctx context.Context, req dto.CreateDoctorRequest) (*model.Doctor, error)
	GetAllDoctors(ctx context.Context) ([]model.Doctor, error)
	GetDoctorByID(ctx context.Context, id string) (*model.Doctor, error)
	UpdateDoctor(ctx context.Context, id string, req dto.UpdateDoctorRequest) (*model.Doctor, error)
	DeleteDoctor(ctx context.Context, id string) error
}

type doctorService struct {
	repo repository.DoctorRepository
}

func NewDoctorService(repo repository.DoctorRepository) DoctorService {
	return &doctorService{
		repo: repo,
	}
}

// Create Doctor
func (s *doctorService) CreateDoctor(
	ctx context.Context,
	req dto.CreateDoctorRequest,
) (*model.Doctor, error) {

	// Check duplicate email
	existingDoctor, err := s.repo.GetByEmail(ctx, req.Email)
	if err == nil && existingDoctor != nil {
		return nil, errors.New("doctor email already exists")
	}

	// Check duplicate phone
	existingPhone, err := s.repo.GetByPhone(ctx, req.Phone)
	if err == nil && existingPhone != nil {
		return nil, errors.New("doctor phone already exists")
	}

	doctor := &model.Doctor{
		ID:              primitive.NewObjectID(),
		Name:            req.Name,
		Email:           req.Email,
		Phone:           req.Phone,
		Specialization:  req.Specialization,
		Qualification:   req.Qualification,
		Experience:      req.Experience,
		ConsultationFee: req.ConsultationFee,
		IsActive:        true,
		CreatedAt:       time.Now(),
		UpdatedAt:       time.Now(),
	}

	if err := s.repo.Create(ctx, doctor); err != nil {
		return nil, err
	}

	return doctor, nil
}

// Get All Doctors
func (s *doctorService) GetAllDoctors(
	ctx context.Context,
) ([]model.Doctor, error) {

	return s.repo.GetAll(ctx)
}

// Get Doctor By ID
func (s *doctorService) GetDoctorByID(
	ctx context.Context,
	id string,
) (*model.Doctor, error) {

	return s.repo.GetByID(ctx, id)
}

// Update Doctor
func (s *doctorService) UpdateDoctor(
	ctx context.Context,
	id string,
	req dto.UpdateDoctorRequest,
) (*model.Doctor, error) {

	doctor, err := s.repo.GetByID(ctx, id)

	if err != nil {
		return nil, errors.New("doctor not found")
	}

	if req.Name != "" {
		doctor.Name = req.Name
	}

	if req.Phone != "" {
		doctor.Phone = req.Phone
	}

	if req.Specialization != "" {
		doctor.Specialization = req.Specialization
	}

	if req.Qualification != "" {
		doctor.Qualification = req.Qualification
	}

	if req.Experience != 0 {
		doctor.Experience = req.Experience
	}

	if req.ConsultationFee != 0 {
		doctor.ConsultationFee = req.ConsultationFee
	}

	doctor.IsActive = req.IsActive
	doctor.UpdatedAt = time.Now()

	if err := s.repo.Update(ctx, doctor); err != nil {
		return nil, err
	}

	return doctor, nil
}

// Delete Doctor
func (s *doctorService) DeleteDoctor(
	ctx context.Context,
	id string,
) error {

	_, err := s.repo.GetByID(ctx, id)

	if err != nil {
		return errors.New("doctor not found")
	}

	return s.repo.Delete(ctx, id)
}
