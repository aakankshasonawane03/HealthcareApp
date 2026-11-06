package service

import (
	"context"
	"errors"
	"time"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/appointment/dto"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/appointment/model"
	appointmentRepository "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/appointment/repository"
	doctorRepository "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/doctor/repository"
	notificationService "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/notification/service"
	patientRepository "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/patients/repository"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type AppointmentService interface {
	CreateAppointment(
		ctx context.Context,
		organizationID primitive.ObjectID,
		req dto.CreateAppointmentRequest,
	) (*model.Appointment, error)

	GetAllAppointments(
		ctx context.Context,
		organizationID primitive.ObjectID,
	) ([]model.Appointment, error)

	GetAppointmentByID(
		ctx context.Context,
		organizationID primitive.ObjectID,
		id string,
	) (*model.Appointment, error)

	UpdateAppointment(
		ctx context.Context,
		organizationID primitive.ObjectID,
		id string,
		req dto.UpdateAppointmentRequest,
	) (*model.Appointment, error)

	DeleteAppointment(
		ctx context.Context,
		organizationID primitive.ObjectID,
		id string,
	) error

	GetUpcomingAppointments(
		ctx context.Context,
		startTime time.Time,
		endTime time.Time,
	) ([]model.Appointment, error)

	SendAppointmentReminder(
		ctx context.Context,
		appointment model.Appointment,
	) error

	MarkReminderSent(
		ctx context.Context,
		id primitive.ObjectID,
	) error
}

type appointmentService struct {
	appointmentRepo appointmentRepository.AppointmentRepository
	doctorRepo      doctorRepository.DoctorRepository
	patientRepo     patientRepository.PatientRepository
	notificationSvc *notificationService.Service
}

func NewAppointmentService(
	appointmentRepo appointmentRepository.AppointmentRepository,
	doctorRepo doctorRepository.DoctorRepository,
	patientRepo patientRepository.PatientRepository,
	notificationSvc *notificationService.Service,
) AppointmentService {
	return &appointmentService{
		appointmentRepo: appointmentRepo,
		doctorRepo:      doctorRepo,
		patientRepo:     patientRepo,
		notificationSvc: notificationSvc,
	}
}

// CREATE APPOINTMENT

func (s *appointmentService) CreateAppointment(
	ctx context.Context,
	organizationID primitive.ObjectID,
	req dto.CreateAppointmentRequest,
) (*model.Appointment, error) {

	if organizationID.IsZero() {
		return nil, errors.New("organization ID is required")
	}

	doctorID, err := primitive.ObjectIDFromHex(req.DoctorID)
	if err != nil {
		return nil, errors.New("invalid doctor ID")
	}

	patientID, err := primitive.ObjectIDFromHex(req.PatientID)
	if err != nil {
		return nil, errors.New("invalid patient ID")
	}

	if req.AppointmentDate.IsZero() {
		return nil, errors.New("appointment date is required")
	}

	if req.AppointmentTime == "" {
		return nil, errors.New("appointment time is required")
	}

	// Verify doctor belongs to this organization.
	_, err = s.doctorRepo.GetByID(ctx, organizationID, req.DoctorID)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return nil, errors.New("doctor not found in this organization")
		}
		return nil, err
	}

	// Verify patient exists.
	_, err = s.patientRepo.GetByID(ctx, req.PatientID)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return nil, errors.New("patient not found")
		}
		return nil, err
	}

	// Check doctor availability within the organization.
	existingAppointment, err := s.appointmentRepo.FindDoctorAppointment(
		ctx,
		organizationID,
		req.DoctorID,
		req.AppointmentDate,
		req.AppointmentTime,
	)
	if err != nil {
		return nil, err
	}

	if existingAppointment != nil {
		return nil, errors.New("doctor already has an appointment at this time")
	}

	now := time.Now()

	appointment := &model.Appointment{
		OrganizationID:  organizationID,
		DoctorID:        doctorID,
		PatientID:       patientID,
		AppointmentDate: req.AppointmentDate,
		AppointmentTime: req.AppointmentTime,
		Reason:          req.Reason,
		Status:          "Booked",
		ReminderSent:    false,
		CreatedAt:       now,
		UpdatedAt:       now,
	}

	if err := s.appointmentRepo.Create(ctx, appointment); err != nil {
		return nil, err
	}

	return appointment, nil
}

// GET ALL APPOINTMENTS

func (s *appointmentService) GetAllAppointments(
	ctx context.Context,
	organizationID primitive.ObjectID,
) ([]model.Appointment, error) {

	if organizationID.IsZero() {
		return nil, errors.New("organization ID is required")
	}

	return s.appointmentRepo.GetAll(ctx, organizationID)
}

// GET APPOINTMENT BY ID

func (s *appointmentService) GetAppointmentByID(
	ctx context.Context,
	organizationID primitive.ObjectID,
	id string,
) (*model.Appointment, error) {

	if organizationID.IsZero() {
		return nil, errors.New("organization ID is required")
	}

	if _, err := primitive.ObjectIDFromHex(id); err != nil {
		return nil, errors.New("invalid appointment ID")
	}

	return s.appointmentRepo.GetByID(ctx, organizationID, id)
}

// UPDATE APPOINTMENT

func (s *appointmentService) UpdateAppointment(
	ctx context.Context,
	organizationID primitive.ObjectID,
	id string,
	req dto.UpdateAppointmentRequest,
) (*model.Appointment, error) {

	if organizationID.IsZero() {
		return nil, errors.New("organization ID is required")
	}

	if _, err := primitive.ObjectIDFromHex(id); err != nil {
		return nil, errors.New("invalid appointment ID")
	}

	appointment, err := s.appointmentRepo.GetByID(
		ctx,
		organizationID,
		id,
	)
	if err != nil {
		return nil, err
	}

	// Update doctor if provided.
	if req.DoctorID != "" {
		doctorID, err := primitive.ObjectIDFromHex(req.DoctorID)
		if err != nil {
			return nil, errors.New("invalid doctor ID")
		}

		_, err = s.doctorRepo.GetByID(
			ctx,
			organizationID,
			req.DoctorID,
		)
		if err != nil {
			if errors.Is(err, mongo.ErrNoDocuments) {
				return nil, errors.New("doctor not found in this organization")
			}
			return nil, err
		}

		appointment.DoctorID = doctorID
	}

	// Update patient if provided.
	if req.PatientID != "" {
		patientID, err := primitive.ObjectIDFromHex(req.PatientID)
		if err != nil {
			return nil, errors.New("invalid patient ID")
		}

		_, err = s.patientRepo.GetByID(ctx, req.PatientID)
		if err != nil {
			if errors.Is(err, mongo.ErrNoDocuments) {
				return nil, errors.New("patient not found")
			}
			return nil, err
		}

		appointment.PatientID = patientID
	}

	if !req.AppointmentDate.IsZero() {
		appointment.AppointmentDate = req.AppointmentDate
	}

	if req.AppointmentTime != "" {
		appointment.AppointmentTime = req.AppointmentTime
	}

	if req.Reason != "" {
		appointment.Reason = req.Reason
	}

	if req.Status != "" {
		appointment.Status = req.Status
	}

	// Check availability if the appointment slot changed.
	slotChanged := req.DoctorID != "" ||
		!req.AppointmentDate.IsZero() ||
		req.AppointmentTime != ""

	if slotChanged &&
		appointment.Status != "Cancelled" &&
		appointment.Status != "Rejected" {

		existingAppointment, err := s.appointmentRepo.FindDoctorAppointment(
			ctx,
			organizationID,
			appointment.DoctorID.Hex(),
			appointment.AppointmentDate,
			appointment.AppointmentTime,
		)
		if err != nil {
			return nil, err
		}

		// Ignore the appointment currently being updated.
		if existingAppointment != nil &&
			existingAppointment.ID != appointment.ID {
			return nil, errors.New("doctor already has an appointment at this time")
		}
	}

	appointment.UpdatedAt = time.Now()

	if err := s.appointmentRepo.Update(
		ctx,
		organizationID,
		appointment,
	); err != nil {
		return nil, err
	}

	return appointment, nil
}

// DELETE APPOINTMENT

func (s *appointmentService) DeleteAppointment(
	ctx context.Context,
	organizationID primitive.ObjectID,
	id string,
) error {

	if organizationID.IsZero() {
		return errors.New("organization ID is required")
	}

	if _, err := primitive.ObjectIDFromHex(id); err != nil {
		return errors.New("invalid appointment ID")
	}

	return s.appointmentRepo.Delete(ctx, organizationID, id)
}

// GET UPCOMING APPOINTMENTS - CRON

func (s *appointmentService) GetUpcomingAppointments(
	ctx context.Context,
	startTime time.Time,
	endTime time.Time,
) ([]model.Appointment, error) {

	if endTime.Before(startTime) {
		return nil, errors.New("end time cannot be before start time")
	}

	return s.appointmentRepo.FindUpcomingAppointments(
		ctx,
		startTime,
		endTime,
	)
}

// SEND APPOINTMENT REMINDER - CRON

func (s *appointmentService) SendAppointmentReminder(
	ctx context.Context,
	appointment model.Appointment,
) error {

	if s.notificationSvc == nil {
		return errors.New("notification service is not available")
	}

	return s.notificationSvc.SendAppointmentReminder(
		ctx,
		appointment,
	)
}

// MARK REMINDER SENT - CRON

func (s *appointmentService) MarkReminderSent(
	ctx context.Context,
	id primitive.ObjectID,
) error {

	if id.IsZero() {
		return errors.New("appointment ID is required")
	}

	return s.appointmentRepo.MarkReminderSent(ctx, id)
}

var _ AppointmentService = (*appointmentService)(nil)
