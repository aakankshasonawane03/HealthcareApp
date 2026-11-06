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
		organizationID primitive.ObjectID,
	) ([]model.Appointment, error)

	GetByID(
		ctx context.Context,
		organizationID primitive.ObjectID,
		id string,
	) (*model.Appointment, error)

	Update(
		ctx context.Context,
		organizationID primitive.ObjectID,
		appointment *model.Appointment,
	) error

	Delete(
		ctx context.Context,
		organizationID primitive.ObjectID,
		id string,
	) error

	FindDoctorAppointment(
		ctx context.Context,
		organizationID primitive.ObjectID,
		doctorID string,
		date time.Time,
		appointmentTime string,
	) (*model.Appointment, error)

	FindUpcomingAppointments(
		ctx context.Context,
		startTime time.Time,
		endTime time.Time,
	) ([]model.Appointment, error)

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

// CREATE APPOINTMENT
func (r *appointmentRepository) Create(
	ctx context.Context,
	appointment *model.Appointment,
) error {
	if appointment == nil {
		return mongo.ErrNilDocument
	}

	if appointment.OrganizationID.IsZero() {
		return mongo.ErrNoDocuments
	}

	_, err := r.collection.InsertOne(ctx, appointment)
	return err
}

// GET ALL APPOINTMENTS BY ORGANIZATION
func (r *appointmentRepository) GetAll(
	ctx context.Context,
	organizationID primitive.ObjectID,
) ([]model.Appointment, error) {
	if organizationID.IsZero() {
		return nil, mongo.ErrNoDocuments
	}

	filter := bson.M{
		"organization_id": organizationID,
	}

	cursor, err := r.collection.Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	appointments := make([]model.Appointment, 0)

	if err := cursor.All(ctx, &appointments); err != nil {
		return nil, err
	}

	return appointments, nil
}

// GET APPOINTMENT BY ID AND ORGANIZATION
func (r *appointmentRepository) GetByID(
	ctx context.Context,
	organizationID primitive.ObjectID,
	id string,
) (*model.Appointment, error) {
	if organizationID.IsZero() {
		return nil, mongo.ErrNoDocuments
	}

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	filter := bson.M{
		"_id":             objectID,
		"organization_id": organizationID,
	}

	var appointment model.Appointment

	err = r.collection.FindOne(ctx, filter).Decode(&appointment)
	if err != nil {
		return nil, err
	}

	return &appointment, nil
}

// UPDATE APPOINTMENT BY ID AND ORGANIZATION
func (r *appointmentRepository) Update(
	ctx context.Context,
	organizationID primitive.ObjectID,
	appointment *model.Appointment,
) error {
	if appointment == nil {
		return mongo.ErrNilDocument
	}

	if organizationID.IsZero() {
		return mongo.ErrNoDocuments
	}

	filter := bson.M{
		"_id":             appointment.ID,
		"organization_id": organizationID,
	}

	update := bson.M{
		"$set": bson.M{
			"doctor_id":        appointment.DoctorID,
			"patient_id":       appointment.PatientID,
			"appointment_date": appointment.AppointmentDate,
			"appointment_time": appointment.AppointmentTime,
			"reason":           appointment.Reason,
			"status":           appointment.Status,
			"reminder_sent":    appointment.ReminderSent,
			"updated_at":       appointment.UpdatedAt,
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

// DELETE APPOINTMENT BY ID AND ORGANIZATION
func (r *appointmentRepository) Delete(
	ctx context.Context,
	organizationID primitive.ObjectID,
	id string,
) error {
	if organizationID.IsZero() {
		return mongo.ErrNoDocuments
	}

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	filter := bson.M{
		"_id":             objectID,
		"organization_id": organizationID,
	}

	result, err := r.collection.DeleteOne(ctx, filter)
	if err != nil {
		return err
	}

	if result.DeletedCount == 0 {
		return mongo.ErrNoDocuments
	}

	return nil
}

// CHECK DOCTOR APPOINTMENT SLOT WITHIN ORGANIZATION
func (r *appointmentRepository) FindDoctorAppointment(
	ctx context.Context,
	organizationID primitive.ObjectID,
	doctorID string,
	date time.Time,
	appointmentTime string,
) (*model.Appointment, error) {
	if organizationID.IsZero() {
		return nil, mongo.ErrNoDocuments
	}

	objectID, err := primitive.ObjectIDFromHex(doctorID)
	if err != nil {
		return nil, err
	}

	filter := bson.M{
		"organization_id":  organizationID,
		"doctor_id":        objectID,
		"appointment_date": date,
		"appointment_time": appointmentTime,
		"status": bson.M{
			"$nin": []string{"Cancelled", "Rejected"},
		},
	}

	var appointment model.Appointment

	err = r.collection.FindOne(ctx, filter).Decode(&appointment)

	if err == mongo.ErrNoDocuments {
		return nil, nil
	}

	if err != nil {
		return nil, err
	}

	return &appointment, nil
}

// FIND UPCOMING APPOINTMENTS - CRON
func (r *appointmentRepository) FindUpcomingAppointments(
	ctx context.Context,
	startTime time.Time,
	endTime time.Time,
) ([]model.Appointment, error) {
	filter := bson.M{
		"status":        "Booked",
		"reminder_sent": false,
		"appointment_date": bson.M{
			"$gte": startTime,
			"$lte": endTime,
		},
	}

	cursor, err := r.collection.Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	appointments := make([]model.Appointment, 0)

	if err := cursor.All(ctx, &appointments); err != nil {
		return nil, err
	}

	return appointments, nil
}

// MARK REMINDER SENT - CRON
func (r *appointmentRepository) MarkReminderSent(
	ctx context.Context,
	id primitive.ObjectID,
) error {
	filter := bson.M{
		"_id":           id,
		"reminder_sent": false,
	}

	update := bson.M{
		"$set": bson.M{
			"reminder_sent": true,
			"updated_at":    time.Now(),
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

var _ AppointmentRepository = (*appointmentRepository)(nil)
