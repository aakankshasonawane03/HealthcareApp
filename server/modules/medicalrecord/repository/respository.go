
package repository

import (
	"context"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/medicalrecord/model"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type MedicalRecordRepository interface {
	Create(ctx context.Context, record *model.MedicalRecord) error

	GetAll(ctx context.Context) ([]model.MedicalRecord, error)

	GetByID(
		ctx context.Context,
		id primitive.ObjectID,
	) (*model.MedicalRecord, error)

	GetByPatientID(
		ctx context.Context,
		patientID primitive.ObjectID,
	) ([]model.MedicalRecord, error)

	GetByDoctorID(
		ctx context.Context,
		doctorID primitive.ObjectID,
	) ([]model.MedicalRecord, error)

	// Ownership-filtered queries
	GetByIDAndPatientID(
		ctx context.Context,
		id primitive.ObjectID,
		patientID primitive.ObjectID,
	) (*model.MedicalRecord, error)

	GetByIDAndDoctorID(
		ctx context.Context,
		id primitive.ObjectID,
		doctorID primitive.ObjectID,
	) (*model.MedicalRecord, error)

	GetByConsultationID(
		ctx context.Context,
		consultationID primitive.ObjectID,
	) (*model.MedicalRecord, error)

	Update(
		ctx context.Context,
		id primitive.ObjectID,
		record *model.MedicalRecord,
	) error

	Delete(ctx context.Context, id primitive.ObjectID) error
}

type medicalRecordRepository struct {
	collection *mongo.Collection
}

func NewMedicalRecordRepository(
	collection *mongo.Collection,
) MedicalRecordRepository {
	return &medicalRecordRepository{
		collection: collection,
	}
}

func (r *medicalRecordRepository) Create(
	ctx context.Context,
	record *model.MedicalRecord,
) error {
	_, err := r.collection.InsertOne(ctx, record)
	return err
}

func (r *medicalRecordRepository) GetAll(
	ctx context.Context,
) ([]model.MedicalRecord, error) {
	cursor, err := r.collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var records []model.MedicalRecord
	if err := cursor.All(ctx, &records); err != nil {
		return nil, err
	}

	return records, nil
}

func (r *medicalRecordRepository) GetByID(
	ctx context.Context,
	id primitive.ObjectID,
) (*model.MedicalRecord, error) {
	var record model.MedicalRecord

	err := r.collection.FindOne(
		ctx,
		bson.M{"_id": id},
	).Decode(&record)
	if err != nil {
		return nil, err
	}

	return &record, nil
}

func (r *medicalRecordRepository) GetByPatientID(
	ctx context.Context,
	patientID primitive.ObjectID,
) ([]model.MedicalRecord, error) {
	cursor, err := r.collection.Find(
		ctx,
		bson.M{"patient_id": patientID},
	)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var records []model.MedicalRecord
	if err := cursor.All(ctx, &records); err != nil {
		return nil, err
	}

	return records, nil
}

func (r *medicalRecordRepository) GetByDoctorID(
	ctx context.Context,
	doctorID primitive.ObjectID,
) ([]model.MedicalRecord, error) {
	cursor, err := r.collection.Find(
		ctx,
		bson.M{"doctor_id": doctorID},
	)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var records []model.MedicalRecord
	if err := cursor.All(ctx, &records); err != nil {
		return nil, err
	}

	return records, nil
}

// GetByIDAndPatientID retrieves a record only when both
// the record ID and patient profile ID match.
func (r *medicalRecordRepository) GetByIDAndPatientID(
	ctx context.Context,
	id primitive.ObjectID,
	patientID primitive.ObjectID,
) (*model.MedicalRecord, error) {
	var record model.MedicalRecord

	err := r.collection.FindOne(
		ctx,
		bson.M{
			"_id":        id,
			"patient_id": patientID,
		},
	).Decode(&record)
	if err != nil {
		return nil, err
	}

	return &record, nil
}

// GetByIDAndDoctorID retrieves a record only when both
// the record ID and doctor profile ID match.
// The service must additionally enforce the care-access policy.
func (r *medicalRecordRepository) GetByIDAndDoctorID(
	ctx context.Context,
	id primitive.ObjectID,
	doctorID primitive.ObjectID,
) (*model.MedicalRecord, error) {
	var record model.MedicalRecord

	err := r.collection.FindOne(
		ctx,
		bson.M{
			"_id":       id,
			"doctor_id": doctorID,
		},
	).Decode(&record)
	if err != nil {
		return nil, err
	}

	return &record, nil
}

func (r *medicalRecordRepository) GetByConsultationID(
	ctx context.Context,
	consultationID primitive.ObjectID,
) (*model.MedicalRecord, error) {
	var record model.MedicalRecord

	err := r.collection.FindOne(
		ctx,
		bson.M{"consultation_id": consultationID},
	).Decode(&record)
	if err != nil {
		return nil, err
	}

	return &record, nil
}

func (r *medicalRecordRepository) Update(
	ctx context.Context,
	id primitive.ObjectID,
	record *model.MedicalRecord,
) error {
	update := bson.M{
		"$set": bson.M{
			"diagnosis":   record.Diagnosis,
			"symptoms":    record.Symptoms,
			"treatment":   record.Treatment,
			"notes":       record.Notes,
			"record_date": record.RecordDate,
			"updated_at":  record.UpdatedAt,
		},
	}

	_, err := r.collection.UpdateOne(
		ctx,
		bson.M{"_id": id},
		update,
	)

	return err
}

func (r *medicalRecordRepository) Delete(
	ctx context.Context,
	id primitive.ObjectID,
) error {
	_, err := r.collection.DeleteOne(
		ctx,
		bson.M{"_id": id},
	)

	return err
}
