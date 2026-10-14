package repository

import (
	"context"
	"time"
	

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/appointment/model"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type AppointmentRepository interface {

	Create(
		ctx context.Context,
		appointment *model.Appointment,
	) error

	GetAll(
		ctx context.Context,
	) ([]model.Appointment, error)

	GetByID(
		ctx context.Context,
		id string,
	) (*model.Appointment, error)

	Update(
		ctx context.Context,
		appointment *model.Appointment,
	) error

	Delete(
		ctx context.Context,
		id string,
	) error

	FindDoctorAppointment(
		ctx context.Context,
		doctorID string,
		appointmentDate time.Time,
		appointmentTime string,
	) (*model.Appointment, error)

	// NEW
	FindUpcomingAppointments(
		ctx context.Context,
		startDate time.Time,
		endDate time.Time,
	) ([]model.Appointment, error)

	// NEW
	MarkReminderSent(
		ctx context.Context,
		id primitive.ObjectID,
	) error
}

type appointmentRepository struct {
	collection *mongo.Collection
}

func NewAppointmentRepository(
	collection *mongo.Collection,
) AppointmentRepository {

	return &appointmentRepository{
		collection: collection,
	}
}

// --------------------------------------------------
// Create
// --------------------------------------------------

func (r *appointmentRepository) Create(
	ctx context.Context,
	appointment *model.Appointment,
) error {

	_, err := r.collection.InsertOne(
		ctx,
		appointment,
	)

	return err
}

// --------------------------------------------------
// Get All
// --------------------------------------------------

func (r *appointmentRepository) GetAll(
	ctx context.Context,
) ([]model.Appointment, error) {

	var appointments []model.Appointment

	cursor, err := r.collection.Find(
		ctx,
		bson.M{},
	)

	if err != nil {
		return nil, err
	}

	defer cursor.Close(ctx)

	if err := cursor.All(
		ctx,
		&appointments,
	); err != nil {
		return nil, err
	}

	return appointments, nil
}

// --------------------------------------------------
// Get By ID
// --------------------------------------------------

func (r *appointmentRepository) GetByID(
	ctx context.Context,
	id string,
) (*model.Appointment, error) {

	objectID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return nil, err
	}

	var appointment model.Appointment

	err = r.collection.FindOne(
		ctx,
		bson.M{
			"_id": objectID,
		},
	).Decode(&appointment)

	if err != nil {
		return nil, err
	}

	return &appointment, nil
}

// --------------------------------------------------
// Update
// --------------------------------------------------

func (r *appointmentRepository) Update(
	ctx context.Context,
	appointment *model.Appointment,
) error {

	filter := bson.M{
		"_id": appointment.ID,
	}

	update := bson.M{
		"$set": bson.M{
			"doctor_id":         appointment.DoctorID,
			"patient_id":        appointment.PatientID,
			"appointment_date":  appointment.AppointmentDate,
			"appointment_time":  appointment.AppointmentTime,
			"reason":            appointment.Reason,
			"status":            appointment.Status,
			"reminder_sent":     appointment.ReminderSent,
			"updated_at":        appointment.UpdatedAt,
		},
	}

	_, err := r.collection.UpdateOne(
		ctx,
		filter,
		update,
	)

	return err
}

// --------------------------------------------------
// Delete
// --------------------------------------------------

func (r *appointmentRepository) Delete(
	ctx context.Context,
	id string,
) error {

	objectID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return err
	}

	_, err = r.collection.DeleteOne(
		ctx,
		bson.M{
			"_id": objectID,
		},
	)

	return err
}

// --------------------------------------------------
// Check Doctor Slot
// --------------------------------------------------

func (r *appointmentRepository) FindDoctorAppointment(
	ctx context.Context,
	doctorID string,
	appointmentDate time.Time,
	appointmentTime string,
) (*model.Appointment, error) {

	objectID, err := primitive.ObjectIDFromHex(
		doctorID,
	)

	if err != nil {
		return nil, err
	}

	filter := bson.M{
		"doctor_id":        objectID,
		"appointment_date": appointmentDate,
		"appointment_time": appointmentTime,
	}

	var appointment model.Appointment

	err = r.collection.FindOne(
		ctx,
		filter,
	).Decode(&appointment)

	if err == mongo.ErrNoDocuments {
		return nil, nil
	}

	if err != nil {
		return nil, err
	}

	return &appointment, nil
}

// ==================================================
// FIND UPCOMING APPOINTMENTS
// ==================================================

func (r *appointmentRepository) FindUpcomingAppointments(
	ctx context.Context,
	startDate time.Time,
	endDate time.Time,
) ([]model.Appointment, error) {

	filter := bson.M{
		"status": "Booked",

		"reminder_sent": false,

		"appointment_date": bson.M{
			"$gte": startDate,
			"$lte": endDate,
		},
	}

	cursor, err := r.collection.Find(
		ctx,
		filter,
	)

	if err != nil {
		return nil, err
	}

	defer cursor.Close(ctx)

	var appointments []model.Appointment

	if err := cursor.All(
		ctx,
		&appointments,
	); err != nil {
		return nil, err
	}

	return appointments, nil
}

// ==================================================
// MARK REMINDER SENT
// ==================================================

func (r *appointmentRepository) MarkReminderSent(
	ctx context.Context,
	id primitive.ObjectID,
) error {

	filter := bson.M{
		"_id": id,

		// Important:
		// Only update if reminder has NOT already been sent.
		"reminder_sent": false,
	}

	update := bson.M{
		"$set": bson.M{
			"reminder_sent": true,
			"updated_at":    time.Now(),
		},
	}

	result, err := r.collection.UpdateOne(
		ctx,
		filter,
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