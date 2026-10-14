package repository

import (
	"context"
	"time"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/queue/model"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type QueueRepository interface {
	Create(ctx context.Context, queue *model.Queue) error

	GetAll(ctx context.Context) ([]model.Queue, error)

	GetByID(
		ctx context.Context,
		id primitive.ObjectID,
	) (*model.Queue, error)

	GetByAppointmentID(
		ctx context.Context,
		appointmentID primitive.ObjectID,
	) (*model.Queue, error)

	GetByDoctorID(
		ctx context.Context,
		doctorID primitive.ObjectID,
		date time.Time,
	) ([]model.Queue, error)

	GetByPatientID(
		ctx context.Context,
		patientID primitive.ObjectID,
	) ([]model.Queue, error)

	GetByClinicID(
		ctx context.Context,
		clinicID primitive.ObjectID,
		date time.Time,
	) ([]model.Queue, error)

	GetNextToken(
		ctx context.Context,
		clinicID primitive.ObjectID,
		doctorID primitive.ObjectID,
		date time.Time,
	) (int, error)

	UpdateStatus(
		ctx context.Context,
		id primitive.ObjectID,
		status model.QueueStatus,
		updatedAt time.Time,
	) error

	Delete(
		ctx context.Context,
		id primitive.ObjectID,
	) error
}

type queueRepository struct {
	collection *mongo.Collection
}

func NewQueueRepository(
	collection *mongo.Collection,
) QueueRepository {
	return &queueRepository{
		collection: collection,
	}
}

// Create Queue
func (r *queueRepository) Create(
	ctx context.Context,
	queue *model.Queue,
) error {

	_, err := r.collection.InsertOne(ctx, queue)

	return err
}

// Get All Queues
func (r *queueRepository) GetAll(
	ctx context.Context,
) ([]model.Queue, error) {

	cursor, err := r.collection.Find(
		ctx,
		bson.M{},
	)

	if err != nil {
		return nil, err
	}

	defer cursor.Close(ctx)

	var queues []model.Queue

	if err := cursor.All(ctx, &queues); err != nil {
		return nil, err
	}

	if queues == nil {
		queues = []model.Queue{}
	}

	return queues, nil
}

// Get Queue By ID
func (r *queueRepository) GetByID(
	ctx context.Context,
	id primitive.ObjectID,
) (*model.Queue, error) {

	var queue model.Queue

	err := r.collection.FindOne(
		ctx,
		bson.M{
			"_id": id,
		},
	).Decode(&queue)

	if err != nil {
		return nil, err
	}

	return &queue, nil
}

// Get Queue By Appointment ID
func (r *queueRepository) GetByAppointmentID(
	ctx context.Context,
	appointmentID primitive.ObjectID,
) (*model.Queue, error) {

	var queue model.Queue

	err := r.collection.FindOne(
		ctx,
		bson.M{
			"appointment_id": appointmentID,
		},
	).Decode(&queue)

	if err != nil {
		return nil, err
	}

	return &queue, nil
}

// Get Queues By Doctor
func (r *queueRepository) GetByDoctorID(
	ctx context.Context,
	doctorID primitive.ObjectID,
	date time.Time,
) ([]model.Queue, error) {

	startOfDay := time.Date(
		date.Year(),
		date.Month(),
		date.Day(),
		0,
		0,
		0,
		0,
		date.Location(),
	)

	endOfDay := startOfDay.Add(24 * time.Hour)

	filter := bson.M{
		"doctor_id": doctorID,
		"queue_date": bson.M{
			"$gte": startOfDay,
			"$lt":  endOfDay,
		},
	}

	cursor, err := r.collection.Find(
		ctx,
		filter,
		bsonOptionsByToken(),
	)

	if err != nil {
		return nil, err
	}

	defer cursor.Close(ctx)

	var queues []model.Queue

	if err := cursor.All(ctx, &queues); err != nil {
		return nil, err
	}

	if queues == nil {
		queues = []model.Queue{}
	}

	return queues, nil
}

// Get Queues By Patient
func (r *queueRepository) GetByPatientID(
	ctx context.Context,
	patientID primitive.ObjectID,
) ([]model.Queue, error) {

	cursor, err := r.collection.Find(
		ctx,
		bson.M{
			"patient_id": patientID,
		},
		bsonOptionsByDate(),
	)

	if err != nil {
		return nil, err
	}

	defer cursor.Close(ctx)

	var queues []model.Queue

	if err := cursor.All(ctx, &queues); err != nil {
		return nil, err
	}

	if queues == nil {
		queues = []model.Queue{}
	}

	return queues, nil
}

// Get Queues By Clinic
func (r *queueRepository) GetByClinicID(
	ctx context.Context,
	clinicID primitive.ObjectID,
	date time.Time,
) ([]model.Queue, error) {

	startOfDay := time.Date(
		date.Year(),
		date.Month(),
		date.Day(),
		0,
		0,
		0,
		0,
		date.Location(),
	)

	endOfDay := startOfDay.Add(24 * time.Hour)

	filter := bson.M{
		"clinic_id": clinicID,
		"queue_date": bson.M{
			"$gte": startOfDay,
			"$lt":  endOfDay,
		},
	}

	cursor, err := r.collection.Find(
		ctx,
		filter,
		bsonOptionsByToken(),
	)

	if err != nil {
		return nil, err
	}

	defer cursor.Close(ctx)

	var queues []model.Queue

	if err := cursor.All(ctx, &queues); err != nil {
		return nil, err
	}

	if queues == nil {
		queues = []model.Queue{}
	}

	return queues, nil
}

// Get Next Token
func (r *queueRepository) GetNextToken(
	ctx context.Context,
	clinicID primitive.ObjectID,
	doctorID primitive.ObjectID,
	date time.Time,
) (int, error) {

	startOfDay := time.Date(
		date.Year(),
		date.Month(),
		date.Day(),
		0,
		0,
		0,
		0,
		date.Location(),
	)

	endOfDay := startOfDay.Add(24 * time.Hour)

	filter := bson.M{
		"clinic_id": clinicID,
		"doctor_id": doctorID,
		"queue_date": bson.M{
			"$gte": startOfDay,
			"$lt":  endOfDay,
		},
	}

	opts := bsonOptionsByToken()

	cursor, err := r.collection.Find(
		ctx,
		filter,
		opts,
	)

	if err != nil {
		return 0, err
	}

	defer cursor.Close(ctx)

	var queues []model.Queue

	if err := cursor.All(ctx, &queues); err != nil {
		return 0, err
	}

	if len(queues) == 0 {
		return 1, nil
	}

	return queues[len(queues)-1].TokenNumber + 1, nil
}

// Update Queue Status
func (r *queueRepository) UpdateStatus(
	ctx context.Context,
	id primitive.ObjectID,
	status model.QueueStatus,
	updatedAt time.Time,
) error {

	update := bson.M{
		"$set": bson.M{
			"status":     status,
			"updated_at": updatedAt,
		},
	}

	now := time.Now()

	switch status {

	case model.QueueCalled:
		update["$set"].(bson.M)["called_at"] = now

	case model.QueueCompleted:
		update["$set"].(bson.M)["completed_at"] = now
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

// Delete Queue
func (r *queueRepository) Delete(
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

func bsonOptionsByToken() *options.FindOptions {
	return &options.FindOptions{
		Sort: bson.D{
			{Key: "token_number", Value: 1},
		},
	}
}

func bsonOptionsByDate() *options.FindOptions {
	return &options.FindOptions{
		Sort: bson.D{
			{Key: "queue_date", Value: -1},
		},
	}
}
