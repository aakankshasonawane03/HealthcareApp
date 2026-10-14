package service

import (
	"context"
	"errors"
	"time"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/prescription/model"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/prescription/repository"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type PrescriptionService interface {
	Create(
		ctx context.Context,
		prescription *model.Prescription,
	) error

	GetAll(
		ctx context.Context,
	) ([]model.Prescription, error)

	GetByID(
		ctx context.Context,
		id primitive.ObjectID,
	) (*model.Prescription, error)

	GetByConsultationID(
		ctx context.Context,
		consultationID primitive.ObjectID,
	) (*model.Prescription, error)

	GetByPatientID(
		ctx context.Context,
		patientID primitive.ObjectID,
	) ([]model.Prescription, error)

	GetByDoctorID(
		ctx context.Context,
		doctorID primitive.ObjectID,
	) ([]model.Prescription, error)

	GetByClinicID(
		ctx context.Context,
		clinicID primitive.ObjectID,
	) ([]model.Prescription, error)

	Update(
		ctx context.Context,
		id primitive.ObjectID,
		prescription *model.Prescription,
	) error

	Delete(
		ctx context.Context,
		id primitive.ObjectID,
	) error
}

type prescriptionService struct {
	repository repository.PrescriptionRepository
}

func NewPrescriptionService(
	repository repository.PrescriptionRepository,
) PrescriptionService {
	return &prescriptionService{
		repository: repository,
	}
}

func (s *prescriptionService) Create(
	ctx context.Context,
	prescription *model.Prescription,
) error {

	if prescription.ConsultationID.IsZero() {
		return errors.New("consultation_id is required")
	}

	if prescription.AppointmentID.IsZero() {
		return errors.New("appointment_id is required")
	}

	if prescription.PatientID.IsZero() {
		return errors.New("patient_id is required")
	}

	if prescription.DoctorID.IsZero() {
		return errors.New("doctor_id is required")
	}

	if prescription.ClinicID.IsZero() {
		return errors.New("clinic_id is required")
	}

	if len(prescription.Medicines) == 0 {
		return errors.New("at least one medicine is required")
	}

	// One consultation should have one prescription.
	existing, err := s.repository.GetByConsultationID(
		ctx,
		prescription.ConsultationID,
	)

	if err == nil && existing != nil {
		return errors.New(
			"prescription already exists for this consultation",
		)
	}

	prescription.ID = primitive.NewObjectID()

	prescription.PrescriptionDate = time.Now()

	prescription.CreatedAt = time.Now()

	prescription.UpdatedAt = time.Now()

	return s.repository.Create(
		ctx,
		prescription,
	)
}

func (s *prescriptionService) GetAll(
	ctx context.Context,
) ([]model.Prescription, error) {

	return s.repository.GetAll(ctx)
}

func (s *prescriptionService) GetByID(
	ctx context.Context,
	id primitive.ObjectID,
) (*model.Prescription, error) {

	if id.IsZero() {
		return nil, errors.New("invalid prescription id")
	}

	return s.repository.GetByID(
		ctx,
		id,
	)
}

func (s *prescriptionService) GetByConsultationID(
	ctx context.Context,
	consultationID primitive.ObjectID,
) (*model.Prescription, error) {

	if consultationID.IsZero() {
		return nil, errors.New("invalid consultation id")
	}

	return s.repository.GetByConsultationID(
		ctx,
		consultationID,
	)
}

func (s *prescriptionService) GetByPatientID(
	ctx context.Context,
	patientID primitive.ObjectID,
) ([]model.Prescription, error) {

	if patientID.IsZero() {
		return nil, errors.New("invalid patient id")
	}

	return s.repository.GetByPatientID(
		ctx,
		patientID,
	)
}

func (s *prescriptionService) GetByDoctorID(
	ctx context.Context,
	doctorID primitive.ObjectID,
) ([]model.Prescription, error) {

	if doctorID.IsZero() {
		return nil, errors.New("invalid doctor id")
	}

	return s.repository.GetByDoctorID(
		ctx,
		doctorID,
	)
}

func (s *prescriptionService) GetByClinicID(
	ctx context.Context,
	clinicID primitive.ObjectID,
) ([]model.Prescription, error) {

	if clinicID.IsZero() {
		return nil, errors.New("invalid clinic id")
	}

	return s.repository.GetByClinicID(
		ctx,
		clinicID,
	)
}

func (s *prescriptionService) Update(
	ctx context.Context,
	id primitive.ObjectID,
	prescription *model.Prescription,
) error {

	if id.IsZero() {
		return errors.New("invalid prescription id")
	}

	if len(prescription.Medicines) == 0 {
		return errors.New("at least one medicine is required")
	}

	prescription.UpdatedAt = time.Now()

	return s.repository.Update(
		ctx,
		id,
		prescription,
	)
}

func (s *prescriptionService) Delete(
	ctx context.Context,
	id primitive.ObjectID,
) error {

	if id.IsZero() {
		return errors.New("invalid prescription id")
	}

	return s.repository.Delete(
		ctx,
		id,
	)
}
