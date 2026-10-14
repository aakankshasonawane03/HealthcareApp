package service

import (
	"context"
	"errors"
	"strings"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/admin/dto"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/admin/model"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/admin/repository"
)

type AdminService interface {
	GetDashboard(ctx context.Context) (*model.Dashboard, error)

	GetUsers(ctx context.Context) ([]model.UserSummary, error)
	UpdateUserStatus(ctx context.Context, id string, request dto.UpdateUserStatusDTO) error

	GetDoctors(ctx context.Context) ([]model.DoctorSummary, error)
	GetPatients(ctx context.Context) ([]model.PatientSummary, error)

	GetClinics(ctx context.Context) ([]model.ClinicSummary, error)
	CreateClinic(ctx context.Context, request dto.CreateClinicDTO) (*model.ClinicSummary, error)
	UpdateClinic(ctx context.Context, id string, request dto.UpdateClinicDTO) error
	DeleteClinic(ctx context.Context, id string) error

	GetAppointments(ctx context.Context) ([]model.AppointmentSummary, error)
}

type adminService struct {
	repo repository.AdminRepository
}

func NewAdminService(repo repository.AdminRepository) AdminService {
	return &adminService{
		repo: repo,
	}
}

// GetDashboard returns admin dashboard statistics.
func (s *adminService) GetDashboard(
	ctx context.Context,
) (*model.Dashboard, error) {

	return s.repo.GetDashboard(ctx)
}

// GetUsers returns all users.
func (s *adminService) GetUsers(
	ctx context.Context,
) ([]model.UserSummary, error) {

	return s.repo.GetUsers(ctx)
}

// UpdateUserStatus activates or deactivates a user.
func (s *adminService) UpdateUserStatus(
	ctx context.Context,
	id string,
	request dto.UpdateUserStatusDTO,
) error {

	id = strings.TrimSpace(id)

	if id == "" {
		return errors.New("user id is required")
	}

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return errors.New("invalid user id")
	}

	return s.repo.UpdateUserStatus(
		ctx,
		objectID,
		request.IsActive,
	)
}

// GetDoctors returns all doctors.
func (s *adminService) GetDoctors(
	ctx context.Context,
) ([]model.DoctorSummary, error) {

	return s.repo.GetDoctors(ctx)
}

// GetPatients returns all patients.
func (s *adminService) GetPatients(
	ctx context.Context,
) ([]model.PatientSummary, error) {

	return s.repo.GetPatients(ctx)
}

// GetClinics returns all clinics.
func (s *adminService) GetClinics(
	ctx context.Context,
) ([]model.ClinicSummary, error) {

	return s.repo.GetClinics(ctx)
}

// CreateClinic creates a new clinic.
func (s *adminService) CreateClinic(
	ctx context.Context,
	request dto.CreateClinicDTO,
) (*model.ClinicSummary, error) {

	name := strings.TrimSpace(request.Name)
	address := strings.TrimSpace(request.Address)
	phone := strings.TrimSpace(request.Phone)

	if name == "" {
		return nil, errors.New("clinic name is required")
	}

	if address == "" {
		return nil, errors.New("clinic address is required")
	}

	if phone == "" {
		return nil, errors.New("clinic phone is required")
	}

	data := bson.M{
		"name":    name,
		"address": address,
		"phone":   phone,
	}

	return s.repo.CreateClinic(ctx, data)
}

// UpdateClinic updates an existing clinic.
func (s *adminService) UpdateClinic(
	ctx context.Context,
	id string,
	request dto.UpdateClinicDTO,
) error {

	id = strings.TrimSpace(id)

	if id == "" {
		return errors.New("clinic id is required")
	}

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return errors.New("invalid clinic id")
	}

	data := bson.M{}

	name := strings.TrimSpace(request.Name)
	address := strings.TrimSpace(request.Address)
	phone := strings.TrimSpace(request.Phone)

	if name != "" {
		data["name"] = name
	}

	if address != "" {
		data["address"] = address
	}

	if phone != "" {
		data["phone"] = phone
	}

	if len(data) == 0 {
		return errors.New("at least one field is required to update")
	}

	return s.repo.UpdateClinic(
		ctx,
		objectID,
		data,
	)
}

// DeleteClinic deletes an existing clinic.
func (s *adminService) DeleteClinic(
	ctx context.Context,
	id string,
) error {

	id = strings.TrimSpace(id)

	if id == "" {
		return errors.New("clinic id is required")
	}

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return errors.New("invalid clinic id")
	}

	return s.repo.DeleteClinic(
		ctx,
		objectID,
	)
}

// GetAppointments returns all appointments.
func (s *adminService) GetAppointments(
	ctx context.Context,
) ([]model.AppointmentSummary, error) {

	return s.repo.GetAppointments(ctx)
}