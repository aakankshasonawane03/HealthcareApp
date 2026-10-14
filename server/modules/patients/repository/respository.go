package repository

import (
	"context"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/patients/model"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type PatientRepository interface {
	Create(ctx context.Context, patient *model.Patient) error
	GetAll(ctx context.Context) ([]model.Patient, error)
	GetByID(ctx context.Context, id string) (*model.Patient, error)
	Update(ctx context.Context, patient *model.Patient) error
	Delete(ctx context.Context, id string) error
	GetByEmail(ctx context.Context, email string) (*model.Patient, error)
	GetByPhone(ctx context.Context, phone string) (*model.Patient, error)
}

type patientRepository struct {
	collection *mongo.Collection
}

func NewPatientRepository(collection *mongo.Collection) PatientRepository {
	return &patientRepository{
		collection: collection,
	}
}

// Create Patient
func (r *patientRepository) Create(ctx context.Context, patient *model.Patient) error {

	_, err := r.collection.InsertOne(ctx, patient)
	return err
}

// Get All Patients
func (r *patientRepository) GetAll(ctx context.Context) ([]model.Patient, error) {

	var patients []model.Patient

	cursor, err := r.collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}

	defer cursor.Close(ctx)

	if err := cursor.All(ctx, &patients); err != nil {
		return nil, err
	}

	return patients, nil
}

// Get Patient By ID
func (r *patientRepository) GetByID(ctx context.Context, id string) (*model.Patient, error) {

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	var patient model.Patient

	err = r.collection.FindOne(
		ctx,
		bson.M{"_id": objectID},
	).Decode(&patient)

	if err != nil {
		return nil, err
	}

	return &patient, nil
}

// Update Patient
func (r *patientRepository) Update(ctx context.Context, patient *model.Patient) error {

	filter := bson.M{
		"_id": patient.ID,
	}

	update := bson.M{
		"$set": patient,
	}

	_, err := r.collection.UpdateOne(ctx, filter, update)

	return err
}

// Delete Patient
func (r *patientRepository) Delete(ctx context.Context, id string) error {

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	_, err = r.collection.DeleteOne(
		ctx,
		bson.M{"_id": objectID},
	)

	return err
}

// Get Patient By Email
func (r *patientRepository) GetByEmail(ctx context.Context, email string) (*model.Patient, error) {

	var patient model.Patient

	err := r.collection.FindOne(
		ctx,
		bson.M{"email": email},
	).Decode(&patient)

	if err != nil {
		return nil, err
	}

	return &patient, nil
}

// Get Patient By Phone
func (r *patientRepository) GetByPhone(ctx context.Context, phone string) (*model.Patient, error) {

	var patient model.Patient

	err := r.collection.FindOne(
		ctx,
		bson.M{"phone": phone},
	).Decode(&patient)

	if err != nil {
		return nil, err
	}

	return &patient, nil
}
