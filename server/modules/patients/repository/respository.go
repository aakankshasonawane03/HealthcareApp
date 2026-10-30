
package repository

import (
	"context"
	"errors"

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
	GetByUserID(ctx context.Context, userID string) (*model.Patient, error)
	UpdateByUserID(ctx context.Context, userID string, patient *model.Patient) error
	ExistsByUserID(ctx context.Context, userID string) (bool, error)
}

type patientRepository struct {
	collection *mongo.Collection
}

var ErrPatientNotFound = errors.New("patient not found")

func NewPatientRepository(collection *mongo.Collection) PatientRepository {
	return &patientRepository{
		collection: collection,
	}
}

// Create inserts a patient record.
func (r *patientRepository) Create(
	ctx context.Context,
	patient *model.Patient,
) error {
	_, err := r.collection.InsertOne(ctx, patient)
	return err
}

// GetAll retrieves all patient records.
func (r *patientRepository) GetAll(
	ctx context.Context,
) ([]model.Patient, error) {
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

// GetByID retrieves a patient by MongoDB ObjectID.
func (r *patientRepository) GetByID(
	ctx context.Context,
	id string,
) (*model.Patient, error) {
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	var patient model.Patient
	err = r.collection.FindOne(
		ctx,
		bson.M{"_id": objectID},
	).Decode(&patient)

	if errors.Is(err, mongo.ErrNoDocuments) {
		return nil, ErrPatientNotFound
	}
	if err != nil {
		return nil, err
	}

	return &patient, nil
}

// Update updates an existing patient record.
func (r *patientRepository) Update(
	ctx context.Context,
	patient *model.Patient,
) error {
	result, err := r.collection.UpdateOne(
		ctx,
		bson.M{"_id": patient.ID},
		bson.M{
			"$set": bson.M{
				"first_name":        patient.FirstName,
				"last_name":         patient.LastName,
				"email":             patient.Email,
				"phone":             patient.Phone,
				"gender":            patient.Gender,
				"date_of_birth":     patient.DateOfBirth,
				"blood_group":       patient.BloodGroup,
				"address":           patient.Address,
				"emergency_contact": patient.EmergencyContact,
				"is_active":         patient.IsActive,
				"updated_at":        patient.UpdatedAt,
			},
		},
	)
	if err != nil {
		return err
	}
	if result.MatchedCount == 0 {
		return ErrPatientNotFound
	}

	return nil
}

// Delete removes a patient record by ID.
func (r *patientRepository) Delete(
	ctx context.Context,
	id string,
) error {
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	result, err := r.collection.DeleteOne(
		ctx,
		bson.M{"_id": objectID},
	)
	if err != nil {
		return err
	}
	if result.DeletedCount == 0 {
		return ErrPatientNotFound
	}

	return nil
}

// GetByEmail retrieves a patient by email.
func (r *patientRepository) GetByEmail(
	ctx context.Context,
	email string,
) (*model.Patient, error) {
	var patient model.Patient

	err := r.collection.FindOne(
		ctx,
		bson.M{"email": email},
	).Decode(&patient)

	if errors.Is(err, mongo.ErrNoDocuments) {
		return nil, ErrPatientNotFound
	}
	if err != nil {
		return nil, err
	}

	return &patient, nil
}

// GetByPhone retrieves a patient by phone number.
func (r *patientRepository) GetByPhone(
	ctx context.Context,
	phone string,
) (*model.Patient, error) {
	var patient model.Patient

	err := r.collection.FindOne(
		ctx,
		bson.M{"phone": phone},
	).Decode(&patient)

	if errors.Is(err, mongo.ErrNoDocuments) {
		return nil, ErrPatientNotFound
	}
	if err != nil {
		return nil, err
	}

	return &patient, nil
}

// GetByUserID retrieves the patient linked to a registered user.
func (r *patientRepository) GetByUserID(
	ctx context.Context,
	userID string,
) (*model.Patient, error) {
	var patient model.Patient

	err := r.collection.FindOne(
		ctx,
		bson.M{"user_id": userID},
	).Decode(&patient)

	if errors.Is(err, mongo.ErrNoDocuments) {
		return nil, ErrPatientNotFound
	}
	if err != nil {
		return nil, err
	}

	return &patient, nil
}

// ExistsByUserID checks whether a user already has a patient profile.
func (r *patientRepository) ExistsByUserID(
	ctx context.Context,
	userID string,
) (bool, error) {
	count, err := r.collection.CountDocuments(
		ctx,
		bson.M{"user_id": userID},
	)
	if err != nil {
		return false, err
	}

	return count > 0, nil
}

// UpdateByUserID updates only the patient record owned by userID.
func (r *patientRepository) UpdateByUserID(
	ctx context.Context,
	userID string,
	patient *model.Patient,
) error {
	filter := bson.M{
		"_id":     patient.ID,
		"user_id": userID,
	}

	update := bson.M{
		"$set": bson.M{
			"first_name":        patient.FirstName,
			"last_name":         patient.LastName,
			"email":             patient.Email,
			"phone":             patient.Phone,
			"gender":            patient.Gender,
			"date_of_birth":     patient.DateOfBirth,
			"blood_group":       patient.BloodGroup,
			"address":           patient.Address,
			"emergency_contact": patient.EmergencyContact,
			"updated_at":        patient.UpdatedAt,
		},
	}

	result, err := r.collection.UpdateOne(ctx, filter, update)
	if err != nil {
		return err
	}
	if result.MatchedCount == 0 {
		return ErrPatientNotFound
	}

	return nil
}
