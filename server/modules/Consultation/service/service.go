package service

import (
	"context"
	"errors"
	"time"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/Consultation/model"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/Consultation/repository"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ConsultationService interface {
	Create(
		ctx context.Context,
		consultation *model.Consultation,
	) error

	GetAll(
		ctx context.Context,
	) ([]model.Consultation, error)

	GetByID(
		ctx context.Context,
		id primitive.ObjectID,
	) (*model.Consultation, error)

	GetByAppointmentID(
		ctx context.Context,
		appointmentID primitive.ObjectID,
	) (*model.Consultation, error)

	GetByPatientID(
		ctx context.Context,
		patientID primitive.ObjectID,
	) ([]model.Consultation, error)

	GetByDoctorID(
		ctx context.Context,
		doctorID primitive.ObjectID,
	) ([]model.Consultation, error)

	GetByClinicID(
		ctx context.Context,
		clinicID primitive.ObjectID,
	) ([]model.Consultation, error)

	Update(
		ctx context.Context,
		id primitive.ObjectID,
		consultation *model.Consultation,
	) error

	UpdateStatus(
		ctx context.Context,
		id primitive.ObjectID,
		status model.ConsultationStatus,
	) error

	Delete(
		ctx context.Context,
		id primitive.ObjectID,
	) error
}

type consultationService struct {
	repository repository.ConsultationRepository
}

func NewConsultationService(
	repository repository.ConsultationRepository,
) ConsultationService {
	return &consultationService{
		repository: repository,
	}
}

func (s *consultationService) Create(
	ctx context.Context,
	consultation *model.Consultation,
) error {

	if consultation.AppointmentID.IsZero() {
		return errors.New("appointment_id is required")
	}

	if consultation.PatientID.IsZero() {
		return errors.New("patient_id is required")
	}

	if consultation.DoctorID.IsZero() {
		return errors.New("doctor_id is required")
	}

	if consultation.ClinicID.IsZero() {
		return errors.New("clinic_id is required")
	}

	// One appointment should have only one consultation.
	existing, err := s.repository.GetByAppointmentID(
		ctx,
		consultation.AppointmentID,
	)

	if err == nil && existing != nil {
		return errors.New("consultation already exists for this appointment")
	}

	consultation.ID = primitive.NewObjectID()

	consultation.ConsultationDate = time.Now()

	consultation.Status = model.StatusStarted

	consultation.CreatedAt = time.Now()
	consultation.UpdatedAt = time.Now()

	return s.repository.Create(
		ctx,
		consultation,
	)
}

func (s *consultationService) GetAll(
	ctx context.Context,
) ([]model.Consultation, error) {

	return s.repository.GetAll(ctx)
}

func (s *consultationService) GetByID(
	ctx context.Context,
	id primitive.ObjectID,
) (*model.Consultation, error) {

	if id.IsZero() {
		return nil, errors.New("invalid consultation id")
	}

	return s.repository.GetByID(
		ctx,
		id,
	)
}

func (s *consultationService) GetByAppointmentID(
	ctx context.Context,
	appointmentID primitive.ObjectID,
) (*model.Consultation, error) {

	if appointmentID.IsZero() {
		return nil, errors.New("invalid appointment id")
	}

	return s.repository.GetByAppointmentID(
		ctx,
		appointmentID,
	)
}

func (s *consultationService) GetByPatientID(
	ctx context.Context,
	patientID primitive.ObjectID,
) ([]model.Consultation, error) {

	if patientID.IsZero() {
		return nil, errors.New("invalid patient id")
	}

	return s.repository.GetByPatientID(
		ctx,
		patientID,
	)
}

func (s *consultationService) GetByDoctorID(
	ctx context.Context,
	doctorID primitive.ObjectID,
) ([]model.Consultation, error) {

	if doctorID.IsZero() {
		return nil, errors.New("invalid doctor id")
	}

	return s.repository.GetByDoctorID(
		ctx,
		doctorID,
	)
}

func (s *consultationService) GetByClinicID(
	ctx context.Context,
	clinicID primitive.ObjectID,
) ([]model.Consultation, error) {

	if clinicID.IsZero() {
		return nil, errors.New("invalid clinic id")
	}

	return s.repository.GetByClinicID(
		ctx,
		clinicID,
	)
}

func (s *consultationService) Update(
	ctx context.Context,
	id primitive.ObjectID,
	consultation *model.Consultation,
) error {

	if id.IsZero() {
		return errors.New("invalid consultation id")
	}

	consultation.UpdatedAt = time.Now()

	return s.repository.Update(
		ctx,
		id,
		consultation,
	)
}

func (s *consultationService) UpdateStatus(
	ctx context.Context,
	id primitive.ObjectID,
	status model.ConsultationStatus,
) error {

	if id.IsZero() {
		return errors.New("invalid consultation id")
	}

	switch status {
	case model.StatusStarted,
		model.StatusCompleted,
		model.StatusCancelled:
	default:
		return errors.New("invalid consultation status")
	}

	return s.repository.UpdateStatus(
		ctx,
		id,
		status,
	)
}

func (s *consultationService) Delete(
	ctx context.Context,
	id primitive.ObjectID,
) error {

	if id.IsZero() {
		return errors.New("invalid consultation id")
	}

	return s.repository.Delete(
		ctx,
		id,
	)
}
