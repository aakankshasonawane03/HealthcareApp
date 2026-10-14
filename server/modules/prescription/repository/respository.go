package repository

import (
	"context"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/prescription/model"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type PrescriptionRepository interface {
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

type prescriptionRepository struct {
	collection *mongo.Collection
}

func NewPrescriptionRepository(
	collection *mongo.Collection,
) PrescriptionRepository {
	return &prescriptionRepository{
		collection: collection,
	}
}

func (r *prescriptionRepository) Create(
	ctx context.Context,
	prescription *model.Prescription,
) error {

	_, err := r.collection.InsertOne(
		ctx,
		prescription,
	)

	return err
}

func (r *prescriptionRepository) GetAll(
	ctx context.Context,
) ([]model.Prescription, error) {

	cursor, err := r.collection.Find(
		ctx,
		bson.M{},
	)

	if err != nil {
		return nil, err
	}

	defer cursor.Close(ctx)

	var prescriptions []model.Prescription

	if err := cursor.All(ctx, &prescriptions); err != nil {
		return nil, err
	}

	if prescriptions == nil {
		prescriptions = []model.Prescription{}
	}

	return prescriptions, nil
}

func (r *prescriptionRepository) GetByID(
	ctx context.Context,
	id primitive.ObjectID,
) (*model.Prescription, error) {

	var prescription model.Prescription

	err := r.collection.FindOne(
		ctx,
		bson.M{
			"_id": id,
		},
	).Decode(&prescription)

	if err != nil {
		return nil, err
	}

	return &prescription, nil
}

func (r *prescriptionRepository) GetByConsultationID(
	ctx context.Context,
	consultationID primitive.ObjectID,
) (*model.Prescription, error) {

	var prescription model.Prescription

	err := r.collection.FindOne(
		ctx,
		bson.M{
			"consultation_id": consultationID,
		},
	).Decode(&prescription)

	if err != nil {
		return nil, err
	}

	return &prescription, nil
}

func (r *prescriptionRepository) GetByPatientID(
	ctx context.Context,
	patientID primitive.ObjectID,
) ([]model.Prescription, error) {

	cursor, err := r.collection.Find(
		ctx,
		bson.M{
			"patient_id": patientID,
		},
	)

	if err != nil {
		return nil, err
	}

	defer cursor.Close(ctx)

	var prescriptions []model.Prescription

	if err := cursor.All(ctx, &prescriptions); err != nil {
		return nil, err
	}

	if prescriptions == nil {
		prescriptions = []model.Prescription{}
	}

	return prescriptions, nil
}

func (r *prescriptionRepository) GetByDoctorID(
	ctx context.Context,
	doctorID primitive.ObjectID,
) ([]model.Prescription, error) {

	cursor, err := r.collection.Find(
		ctx,
		bson.M{
			"doctor_id": doctorID,
		},
	)

	if err != nil {
		return nil, err
	}

	defer cursor.Close(ctx)

	var prescriptions []model.Prescription

	if err := cursor.All(ctx, &prescriptions); err != nil {
		return nil, err
	}

	if prescriptions == nil {
		prescriptions = []model.Prescription{}
	}

	return prescriptions, nil
}

func (r *prescriptionRepository) GetByClinicID(
	ctx context.Context,
	clinicID primitive.ObjectID,
) ([]model.Prescription, error) {

	cursor, err := r.collection.Find(
		ctx,
		bson.M{
			"clinic_id": clinicID,
		},
	)

	if err != nil {
		return nil, err
	}

	defer cursor.Close(ctx)

	var prescriptions []model.Prescription

	if err := cursor.All(ctx, &prescriptions); err != nil {
		return nil, err
	}

	if prescriptions == nil {
		prescriptions = []model.Prescription{}
	}

	return prescriptions, nil
}

func (r *prescriptionRepository) Update(
	ctx context.Context,
	id primitive.ObjectID,
	prescription *model.Prescription,
) error {

	update := bson.M{
		"$set": bson.M{
			"medicines":  prescription.Medicines,
			"notes":      prescription.Notes,
			"updated_at": prescription.UpdatedAt,
		},
	}

	result, err := r.collection.UpdateOne(
		ctx,
		bson.M{"_id": id},
		update,
	)

	if err != nil {
		return err
	}

	if result.MatchedCount == 0 {
		return mongo.ErrNoDocuments
	}

	return nil
}

func (r *prescriptionRepository) Delete(
	ctx context.Context,
	id primitive.ObjectID,
) error {

	result, err := r.collection.DeleteOne(
		ctx,
		bson.M{"_id": id},
	)

	if err != nil {
		return err
	}

	if result.DeletedCount == 0 {
		return mongo.ErrNoDocuments
	}

	return nil
}
