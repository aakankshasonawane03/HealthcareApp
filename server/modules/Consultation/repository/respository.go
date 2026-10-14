package repository

import (
	"context"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/Consultation/model"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type ConsultationRepository interface {
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

type consultationRepository struct {
	collection *mongo.Collection
}

func NewConsultationRepository(
	collection *mongo.Collection,
) ConsultationRepository {
	return &consultationRepository{
		collection: collection,
	}
}

func (r *consultationRepository) Create(
	ctx context.Context,
	consultation *model.Consultation,
) error {

	_, err := r.collection.InsertOne(
		ctx,
		consultation,
	)

	return err
}

func (r *consultationRepository) GetAll(
	ctx context.Context,
) ([]model.Consultation, error) {

	cursor, err := r.collection.Find(
		ctx,
		bson.M{},
	)

	if err != nil {
		return nil, err
	}

	defer cursor.Close(ctx)

	var consultations []model.Consultation

	if err := cursor.All(ctx, &consultations); err != nil {
		return nil, err
	}

	if consultations == nil {
		consultations = []model.Consultation{}
	}

	return consultations, nil
}

func (r *consultationRepository) GetByID(
	ctx context.Context,
	id primitive.ObjectID,
) (*model.Consultation, error) {

	var consultation model.Consultation

	err := r.collection.FindOne(
		ctx,
		bson.M{
			"_id": id,
		},
	).Decode(&consultation)

	if err != nil {
		return nil, err
	}

	return &consultation, nil
}

func (r *consultationRepository) GetByAppointmentID(
	ctx context.Context,
	appointmentID primitive.ObjectID,
) (*model.Consultation, error) {

	var consultation model.Consultation

	err := r.collection.FindOne(
		ctx,
		bson.M{
			"appointment_id": appointmentID,
		},
	).Decode(&consultation)

	if err != nil {
		return nil, err
	}

	return &consultation, nil
}

func (r *consultationRepository) GetByPatientID(
	ctx context.Context,
	patientID primitive.ObjectID,
) ([]model.Consultation, error) {

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

	var consultations []model.Consultation

	if err := cursor.All(ctx, &consultations); err != nil {
		return nil, err
	}

	if consultations == nil {
		consultations = []model.Consultation{}
	}

	return consultations, nil
}

func (r *consultationRepository) GetByDoctorID(
	ctx context.Context,
	doctorID primitive.ObjectID,
) ([]model.Consultation, error) {

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

	var consultations []model.Consultation

	if err := cursor.All(ctx, &consultations); err != nil {
		return nil, err
	}

	if consultations == nil {
		consultations = []model.Consultation{}
	}

	return consultations, nil
}

func (r *consultationRepository) GetByClinicID(
	ctx context.Context,
	clinicID primitive.ObjectID,
) ([]model.Consultation, error) {

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

	var consultations []model.Consultation

	if err := cursor.All(ctx, &consultations); err != nil {
		return nil, err
	}

	if consultations == nil {
		consultations = []model.Consultation{}
	}

	return consultations, nil
}

func (r *consultationRepository) Update(
	ctx context.Context,
	id primitive.ObjectID,
	consultation *model.Consultation,
) error {

	update := bson.M{
		"$set": bson.M{
			"symptoms":       consultation.Symptoms,
			"diagnosis":      consultation.Diagnosis,
			"notes":          consultation.Notes,
			"follow_up_date": consultation.FollowUpDate,
			"status":         consultation.Status,
			"updated_at":     consultation.UpdatedAt,
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

func (r *consultationRepository) UpdateStatus(
	ctx context.Context,
	id primitive.ObjectID,
	status model.ConsultationStatus,
) error {

	result, err := r.collection.UpdateOne(
		ctx,
		bson.M{"_id": id},
		bson.M{
			"$set": bson.M{
				"status":     status,
				"updated_at": primitive.Timestamp{},
			},
		},
	)

	if err != nil {
		return err
	}

	if result.MatchedCount == 0 {
		return mongo.ErrNoDocuments
	}

	return nil
}

func (r *consultationRepository) Delete(
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
