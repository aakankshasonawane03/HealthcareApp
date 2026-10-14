package service

import (
	"context"
	"time"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/medicalrecord/model"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/medicalrecord/repository"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type MedicalRecordService interface {
	Create(ctx context.Context, record *model.MedicalRecord) error
	GetAll(ctx context.Context) ([]model.MedicalRecord, error)
	GetByID(ctx context.Context, id primitive.ObjectID) (*model.MedicalRecord, error)
	GetByPatientID(ctx context.Context, patientID primitive.ObjectID) ([]model.MedicalRecord, error)
	GetByDoctorID(ctx context.Context, doctorID primitive.ObjectID) ([]model.MedicalRecord, error)
	GetByConsultationID(ctx context.Context, consultationID primitive.ObjectID) (*model.MedicalRecord, error)
	Update(ctx context.Context, id primitive.ObjectID, record *model.MedicalRecord) error
	Delete(ctx context.Context, id primitive.ObjectID) error
}

type medicalRecordService struct {
	repository repository.MedicalRecordRepository
}

func NewMedicalRecordService(
	repo repository.MedicalRecordRepository,
) MedicalRecordService {
	return &medicalRecordService{
		repository: repo,
	}
}

func (s *medicalRecordService) Create(
	ctx context.Context,
	record *model.MedicalRecord,
) error {

	now := time.Now()

	record.ID = primitive.NewObjectID()
	record.CreatedAt = now
	record.UpdatedAt = now

	if record.RecordDate.IsZero() {
		record.RecordDate = now
	}

	return s.repository.Create(ctx, record)
}

func (s *medicalRecordService) GetAll(
	ctx context.Context,
) ([]model.MedicalRecord, error) {

	return s.repository.GetAll(ctx)
}

func (s *medicalRecordService) GetByID(
	ctx context.Context,
	id primitive.ObjectID,
) (*model.MedicalRecord, error) {

	return s.repository.GetByID(ctx, id)
}

func (s *medicalRecordService) GetByPatientID(
	ctx context.Context,
	patientID primitive.ObjectID,
) ([]model.MedicalRecord, error) {

	return s.repository.GetByPatientID(ctx, patientID)
}

func (s *medicalRecordService) GetByDoctorID(
	ctx context.Context,
	doctorID primitive.ObjectID,
) ([]model.MedicalRecord, error) {

	return s.repository.GetByDoctorID(ctx, doctorID)
}

func (s *medicalRecordService) GetByConsultationID(
	ctx context.Context,
	consultationID primitive.ObjectID,
) (*model.MedicalRecord, error) {

	return s.repository.GetByConsultationID(ctx, consultationID)
}

func (s *medicalRecordService) Update(
	ctx context.Context,
	id primitive.ObjectID,
	record *model.MedicalRecord,
) error {

	record.UpdatedAt = time.Now()

	return s.repository.Update(ctx, id, record)
}

func (s *medicalRecordService) Delete(
	ctx context.Context,
	id primitive.ObjectID,
) error {

	return s.repository.Delete(ctx, id)
}

