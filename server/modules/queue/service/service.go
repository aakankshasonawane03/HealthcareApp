package service

import (
	"context"
	"errors"
	"time"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/queue/model"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/queue/repository"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type QueueService interface {
	Create(
		ctx context.Context,
		queue *model.Queue,
	) error

	GetAll(
		ctx context.Context,
	) ([]model.Queue, error)

	GetByID(
		ctx context.Context,
		id primitive.ObjectID,
	) (*model.Queue, error)

	GetByAppointmentID(
		ctx context.Context,
		appointmentID primitive.ObjectID,
	) (*model.Queue, error)

	GetByDoctorID(
		ctx context.Context,
		doctorID primitive.ObjectID,
		date time.Time,
	) ([]model.Queue, error)

	GetByPatientID(
		ctx context.Context,
		patientID primitive.ObjectID,
	) ([]model.Queue, error)

	GetByClinicID(
		ctx context.Context,
		clinicID primitive.ObjectID,
		date time.Time,
	) ([]model.Queue, error)

	UpdateStatus(
		ctx context.Context,
		id primitive.ObjectID,
		status model.QueueStatus,
	) error

	Delete(
		ctx context.Context,
		id primitive.ObjectID,
	) error
}

type queueService struct {
	repository repository.QueueRepository
}

func NewQueueService(
	repository repository.QueueRepository,
) QueueService {
	return &queueService{
		repository: repository,
	}
}

// Create Queue
func (s *queueService) Create(
	ctx context.Context,
	queue *model.Queue,
) error {

	if queue.AppointmentID.IsZero() {
		return errors.New("appointment_id is required")
	}

	if queue.PatientID.IsZero() {
		return errors.New("patient_id is required")
	}

	if queue.DoctorID.IsZero() {
		return errors.New("doctor_id is required")
	}

	if queue.ClinicID.IsZero() {
		return errors.New("clinic_id is required")
	}

	// Check whether appointment is already in queue
	existing, err := s.repository.GetByAppointmentID(
		ctx,
		queue.AppointmentID,
	)

	if err == nil && existing != nil {
		return errors.New("appointment already exists in queue")
	}

	queue.ID = primitive.NewObjectID()

	queue.QueueDate = time.Now()

	queue.CheckInTime = &queue.QueueDate

	queue.Status = model.QueueWaiting

	queue.CreatedAt = time.Now()
	queue.UpdatedAt = time.Now()

	// Generate token number
	token, err := s.repository.GetNextToken(
		ctx,
		queue.ClinicID,
		queue.DoctorID,
		queue.QueueDate,
	)

	if err != nil {
		return err
	}

	queue.TokenNumber = token

	return s.repository.Create(
		ctx,
		queue,
	)
}

// Get All
func (s *queueService) GetAll(
	ctx context.Context,
) ([]model.Queue, error) {

	return s.repository.GetAll(ctx)
}

// Get By ID
func (s *queueService) GetByID(
	ctx context.Context,
	id primitive.ObjectID,
) (*model.Queue, error) {

	if id.IsZero() {
		return nil, errors.New("invalid queue id")
	}

	return s.repository.GetByID(
		ctx,
		id,
	)
}

// Get By Appointment
func (s *queueService) GetByAppointmentID(
	ctx context.Context,
	appointmentID primitive.ObjectID,
) (*model.Queue, error) {

	if appointmentID.IsZero() {
		return nil, errors.New("invalid appointment id")
	}

	return s.repository.GetByAppointmentID(
		ctx,
		appointmentID,
	)
}

// Get By Doctor
func (s *queueService) GetByDoctorID(
	ctx context.Context,
	doctorID primitive.ObjectID,
	date time.Time,
) ([]model.Queue, error) {

	if doctorID.IsZero() {
		return nil, errors.New("invalid doctor id")
	}

	return s.repository.GetByDoctorID(
		ctx,
		doctorID,
		date,
	)
}

// Get By Patient
func (s *queueService) GetByPatientID(
	ctx context.Context,
	patientID primitive.ObjectID,
) ([]model.Queue, error) {

	if patientID.IsZero() {
		return nil, errors.New("invalid patient id")
	}

	return s.repository.GetByPatientID(
		ctx,
		patientID,
	)
}

// Get By Clinic
func (s *queueService) GetByClinicID(
	ctx context.Context,
	clinicID primitive.ObjectID,
	date time.Time,
) ([]model.Queue, error) {

	if clinicID.IsZero() {
		return nil, errors.New("invalid clinic id")
	}

	return s.repository.GetByClinicID(
		ctx,
		clinicID,
		date,
	)
}

// Update Status
func (s *queueService) UpdateStatus(
	ctx context.Context,
	id primitive.ObjectID,
	status model.QueueStatus,
) error {

	if id.IsZero() {
		return errors.New("invalid queue id")
	}

	switch status {

	case model.QueueWaiting,
		model.QueueCalled,
		model.QueueInConsultation,
		model.QueueCompleted,
		model.QueueCancelled:

	default:
		return errors.New("invalid queue status")
	}

	return s.repository.UpdateStatus(
		ctx,
		id,
		status,
		time.Now(),
	)
}

// Delete
func (s *queueService) Delete(
	ctx context.Context,
	id primitive.ObjectID,
) error {

	if id.IsZero() {
		return errors.New("invalid queue id")
	}

	return s.repository.Delete(
		ctx,
		id,
	)
}
