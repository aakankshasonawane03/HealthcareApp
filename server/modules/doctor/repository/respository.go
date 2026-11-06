
package repository

import (
	"context"
	"strings"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/doctor/model"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type DoctorRepository interface {
	Create(ctx context.Context, doctor *model.Doctor) error

	GetAll(ctx context.Context, organizationID primitive.ObjectID) ([]model.Doctor, error)

	GetByID(ctx context.Context, organizationID primitive.ObjectID, id string) (*model.Doctor, error)

	GetByUserID(ctx context.Context, organizationID, userID primitive.ObjectID) (*model.Doctor, error)

	GetByEmail(ctx context.Context, organizationID primitive.ObjectID, email string) (*model.Doctor, error)

	GetByPhone(ctx context.Context, organizationID primitive.ObjectID, phone string) (*model.Doctor, error)

	Update(ctx context.Context, organizationID primitive.ObjectID, doctor *model.Doctor) error

	Delete(ctx context.Context, organizationID primitive.ObjectID, id string) error
}

type doctorRepository struct {
	collection *mongo.Collection
}

func NewDoctorRepository(collection *mongo.Collection) DoctorRepository {
	return &doctorRepository{
		collection: collection,
	}
}

func (r *doctorRepository) Create(
	ctx context.Context,
	doctor *model.Doctor,
) error {
	_, err := r.collection.InsertOne(ctx, doctor)
	return err
}

func (r *doctorRepository) GetAll(
	ctx context.Context,
	organizationID primitive.ObjectID,
) ([]model.Doctor, error) {

	var doctors []model.Doctor

	cursor, err := r.collection.Find(ctx, bson.M{
		"organization_id": organizationID,
		"is_active":       true,
	})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	if err := cursor.All(ctx, &doctors); err != nil {
		return nil, err
	}

	if doctors == nil {
		doctors = []model.Doctor{}
	}

	return doctors, nil
}

func (r *doctorRepository) GetByID(
	ctx context.Context,
	organizationID primitive.ObjectID,
	id string,
) (*model.Doctor, error) {

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	var doctor model.Doctor

	err = r.collection.FindOne(ctx, bson.M{
		"_id":             objectID,
		"organization_id": organizationID,
	}).Decode(&doctor)

	if err != nil {
		return nil, err
	}

	return &doctor, nil
}

func (r *doctorRepository) GetByUserID(
	ctx context.Context,
	organizationID, userID primitive.ObjectID,
) (*model.Doctor, error) {

	var doctor model.Doctor

	err := r.collection.FindOne(ctx, bson.M{
		"user_id":         userID,
		"organization_id": organizationID,
	}).Decode(&doctor)

	if err != nil {
		return nil, err
	}

	return &doctor, nil
}

func (r *doctorRepository) GetByEmail(
	ctx context.Context,
	organizationID primitive.ObjectID,
	email string,
) (*model.Doctor, error) {

	var doctor model.Doctor

	err := r.collection.FindOne(ctx, bson.M{
		"organization_id": organizationID,
		"email":            strings.ToLower(strings.TrimSpace(email)),
	}).Decode(&doctor)

	if err != nil {
		return nil, err
	}

	return &doctor, nil
}

func (r *doctorRepository) GetByPhone(
	ctx context.Context,
	organizationID primitive.ObjectID,
	phone string,
) (*model.Doctor, error) {

	var doctor model.Doctor

	err := r.collection.FindOne(ctx, bson.M{
		"organization_id": organizationID,
		"phone":           strings.TrimSpace(phone),
	}).Decode(&doctor)

	if err != nil {
		return nil, err
	}

	return &doctor, nil
}

func (r *doctorRepository) Update(
	ctx context.Context,
	organizationID primitive.ObjectID,
	doctor *model.Doctor,
) error {

	filter := bson.M{
		"_id":             doctor.ID,
		"organization_id": organizationID,
	}

	update := bson.M{
		"$set": bson.M{
			"name":             doctor.Name,
			"phone":            doctor.Phone,
			"specialization":   doctor.Specialization,
			"qualification":    doctor.Qualification,
			"experience":       doctor.Experience,
			"consultation_fee": doctor.ConsultationFee,
			"is_active":        doctor.IsActive,
			"updated_at":       doctor.UpdatedAt,
		},
	}

	result, err := r.collection.UpdateOne(ctx, filter, update)
	if err != nil {
		return err
	}

	if result.MatchedCount == 0 {
		return mongo.ErrNoDocuments
	}

	return nil
}

func (r *doctorRepository) Delete(
	ctx context.Context,
	organizationID primitive.ObjectID,
	id string,
) error {

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	result, err := r.collection.DeleteOne(ctx, bson.M{
		"_id":             objectID,
		"organization_id": organizationID,
	})
	if err != nil {
		return err
	}

	if result.DeletedCount == 0 {
		return mongo.ErrNoDocuments
	}

	return nil
}
