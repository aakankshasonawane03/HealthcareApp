package repository

import (
	"context"
	"log"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/doctor/model"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type DoctorRepository interface {
	Create(ctx context.Context, doctor *model.Doctor) error
	GetAll(ctx context.Context) ([]model.Doctor, error)
	GetByID(ctx context.Context, id string) (*model.Doctor, error)
	Update(ctx context.Context, doctor *model.Doctor) error
	Delete(ctx context.Context, id string) error
	GetByEmail(ctx context.Context, email string) (*model.Doctor, error)
	GetByPhone(ctx context.Context, phone string) (*model.Doctor, error)
}

type doctorRepository struct {
	collection *mongo.Collection
}

func NewDoctorRepository(collection *mongo.Collection) DoctorRepository {
	if err := ensureDoctorCollection(collection); err != nil {
		log.Printf("warning: failed to create doctor collection: %v", err)
	}

	return &doctorRepository{
		collection: collection,
	}
}

func ensureDoctorCollection(collection *mongo.Collection) error {
	db := collection.Database()
	name := collection.Name()

	err := db.CreateCollection(context.Background(), name)
	if err != nil {
		if commandErr, ok := err.(mongo.CommandError); ok && commandErr.Code == 48 {
			return nil
		}
		return err
	}

	return nil
}

// Create Doctor
func (r *doctorRepository) Create(ctx context.Context, doctor *model.Doctor) error {
	result, err := r.collection.InsertOne(ctx, doctor)
	if err != nil {
		log.Printf("ERROR: failed to insert doctor: %v", err)
		return err
	}

	log.Printf("Doctor inserted successfully")
	log.Printf("Database: %s", r.collection.Database().Name())
	log.Printf("Collection: %s", r.collection.Name())
	log.Printf("Inserted ID: %v", result.InsertedID)

	return nil
}

// Get All Doctors
func (r *doctorRepository) GetAll(ctx context.Context) ([]model.Doctor, error) {

	var doctors []model.Doctor

	log.Printf("Reading doctors from database: %s", r.collection.Database().Name())
	log.Printf("Reading doctors from collection: %s", r.collection.Name())

	cursor, err := r.collection.Find(ctx, bson.M{})
	if err != nil {
		log.Printf("ERROR: failed to get doctors: %v", err)
		return nil, err
	}

	defer cursor.Close(ctx)

	if err := cursor.All(ctx, &doctors); err != nil {
		log.Printf("ERROR: failed to decode doctors: %v", err)
		return nil, err
	}

	log.Printf("Doctors found: %d", len(doctors))

	return doctors, nil
}

// Get Doctor By ID
func (r *doctorRepository) GetByID(ctx context.Context, id string) (*model.Doctor, error) {

	objectID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return nil, err
	}

	var doctor model.Doctor

	err = r.collection.FindOne(
		ctx,
		bson.M{"_id": objectID},
	).Decode(&doctor)

	if err != nil {
		return nil, err
	}

	return &doctor, nil
}

// Update Doctor
func (r *doctorRepository) Update(ctx context.Context, doctor *model.Doctor) error {

	filter := bson.M{
		"_id": doctor.ID,
	}

	update := bson.M{
		"$set": bson.M{
			"name":             doctor.Name,
			"email":            doctor.Email,
			"phone":            doctor.Phone,
			"specialization":   doctor.Specialization,
			"qualification":    doctor.Qualification,
			"experience":       doctor.Experience,
			"consultation_fee": doctor.ConsultationFee,
			"is_active":        doctor.IsActive,
			"created_at":       doctor.CreatedAt,
			"updated_at":       doctor.UpdatedAt,
		},
	}

	_, err := r.collection.UpdateOne(
		ctx,
		filter,
		update,
	)

	return err
}

// Delete Doctor
func (r *doctorRepository) Delete(ctx context.Context, id string) error {

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

// Find Doctor By Email
func (r *doctorRepository) GetByEmail(ctx context.Context, email string) (*model.Doctor, error) {

	var doctor model.Doctor

	err := r.collection.FindOne(
		ctx,
		bson.M{"email": email},
	).Decode(&doctor)

	if err != nil {
		return nil, err
	}

	return &doctor, nil
}

// Find Doctor By Phone
func (r *doctorRepository) GetByPhone(ctx context.Context, phone string) (*model.Doctor, error) {

	var doctor model.Doctor

	err := r.collection.FindOne(
		ctx,
		bson.M{"phone": phone},
	).Decode(&doctor)

	if err != nil {
		return nil, err
	}

	return &doctor, nil
}
