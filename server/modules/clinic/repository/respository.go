package repository

import (
	"context"

	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/clinic/model"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type ClinicRepository interface {
	Create(ctx context.Context, clinic *model.Clinic) error
	GetAll(ctx context.Context) ([]model.Clinic, error)
	GetByID(ctx context.Context, id primitive.ObjectID) (*model.Clinic, error)
	Update(ctx context.Context, id primitive.ObjectID, clinic *model.Clinic) error
	Delete(ctx context.Context, id primitive.ObjectID) error
}

type clinicRepository struct {
	collection *mongo.Collection
}

func NewClinicRepository(collection *mongo.Collection) ClinicRepository {
	return &clinicRepository{
		collection: collection,
	}
}

// Create
func (r *clinicRepository) Create(
	ctx context.Context,
	clinic *model.Clinic,
) error {

	_, err := r.collection.InsertOne(ctx, clinic)

	return err
}

// Get All
func (r *clinicRepository) GetAll(
	ctx context.Context,
) ([]model.Clinic, error) {

	cursor, err := r.collection.Find(
		ctx,
		bson.M{},
	)

	if err != nil {
		return nil, err
	}

	defer cursor.Close(ctx)

	var clinics []model.Clinic

	if err := cursor.All(ctx, &clinics); err != nil {
		return nil, err
	}

	if clinics == nil {
		clinics = []model.Clinic{}
	}

	return clinics, nil
}

// Get By ID
func (r *clinicRepository) GetByID(
	ctx context.Context,
	id primitive.ObjectID,
) (*model.Clinic, error) {

	var clinic model.Clinic

	err := r.collection.FindOne(
		ctx,
		bson.M{
			"_id": id,
		},
	).Decode(&clinic)

	if err != nil {
		return nil, err
	}

	return &clinic, nil
}

// Update
func (r *clinicRepository) Update(
	ctx context.Context,
	id primitive.ObjectID,
	clinic *model.Clinic,
) error {

	update := bson.M{
		"$set": bson.M{
			"name":         clinic.Name,
			"address":      clinic.Address,
			"city":         clinic.City,
			"state":        clinic.State,
			"pincode":      clinic.Pincode,
			"phone":        clinic.Phone,
			"email":        clinic.Email,
			"description":  clinic.Description,
			"opening_time": clinic.OpeningTime,
			"closing_time": clinic.ClosingTime,
			"is_active":    clinic.IsActive,
			"updated_at":   clinic.UpdatedAt,
		},
	}

	result, err := r.collection.UpdateOne(
		ctx,
		bson.M{
			"_id": id,
		},
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

// Delete
func (r *clinicRepository) Delete(
	ctx context.Context,
	id primitive.ObjectID,
) error {

	result, err := r.collection.DeleteOne(
		ctx,
		bson.M{
			"_id": id,
		},
	)

	if err != nil {
		return err
	}

	if result.DeletedCount == 0 {
		return mongo.ErrNoDocuments
	}

	return nil
}
