package repository

import (
	"context"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/schedule/model"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type ScheduleRepository interface {
	Create(ctx context.Context, schedule *model.DoctorSchedule) error
	GetAll(ctx context.Context) ([]model.DoctorSchedule, error)
	GetByID(ctx context.Context, id primitive.ObjectID) (*model.DoctorSchedule, error)
	GetByDoctorID(ctx context.Context, doctorID primitive.ObjectID) ([]model.DoctorSchedule, error)
	GetByClinicID(ctx context.Context, clinicID primitive.ObjectID) ([]model.DoctorSchedule, error)
	Update(ctx context.Context, id primitive.ObjectID, schedule *model.DoctorSchedule) error
	Delete(ctx context.Context, id primitive.ObjectID) error
}

type scheduleRepository struct {
	collection *mongo.Collection
}

func NewScheduleRepository(
	collection *mongo.Collection,
) ScheduleRepository {
	return &scheduleRepository{
		collection: collection,
	}
}

// Create Schedule
func (r *scheduleRepository) Create(
	ctx context.Context,
	schedule *model.DoctorSchedule,
) error {

	_, err := r.collection.InsertOne(ctx, schedule)

	return err
}

// Get All Schedules
func (r *scheduleRepository) GetAll(
	ctx context.Context,
) ([]model.DoctorSchedule, error) {

	cursor, err := r.collection.Find(
		ctx,
		bson.M{},
	)

	if err != nil {
		return nil, err
	}

	defer cursor.Close(ctx)

	var schedules []model.DoctorSchedule

	if err := cursor.All(ctx, &schedules); err != nil {
		return nil, err
	}

	if schedules == nil {
		schedules = []model.DoctorSchedule{}
	}

	return schedules, nil
}

// Get Schedule By ID
func (r *scheduleRepository) GetByID(
	ctx context.Context,
	id primitive.ObjectID,
) (*model.DoctorSchedule, error) {

	var schedule model.DoctorSchedule

	err := r.collection.FindOne(
		ctx,
		bson.M{
			"_id": id,
		},
	).Decode(&schedule)

	if err != nil {
		return nil, err
	}

	return &schedule, nil
}

// Get Schedules By Doctor ID
func (r *scheduleRepository) GetByDoctorID(
	ctx context.Context,
	doctorID primitive.ObjectID,
) ([]model.DoctorSchedule, error) {

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

	var schedules []model.DoctorSchedule

	if err := cursor.All(ctx, &schedules); err != nil {
		return nil, err
	}

	if schedules == nil {
		schedules = []model.DoctorSchedule{}
	}

	return schedules, nil
}

// Get Schedules By Clinic ID
func (r *scheduleRepository) GetByClinicID(
	ctx context.Context,
	clinicID primitive.ObjectID,
) ([]model.DoctorSchedule, error) {

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

	var schedules []model.DoctorSchedule

	if err := cursor.All(ctx, &schedules); err != nil {
		return nil, err
	}

	if schedules == nil {
		schedules = []model.DoctorSchedule{}
	}

	return schedules, nil
}

// Update Schedule
func (r *scheduleRepository) Update(
	ctx context.Context,
	id primitive.ObjectID,
	schedule *model.DoctorSchedule,
) error {

	update := bson.M{
		"$set": bson.M{
			"doctor_id":     schedule.DoctorID,
			"clinic_id":     schedule.ClinicID,
			"day_of_week":   schedule.DayOfWeek,
			"start_time":    schedule.StartTime,
			"end_time":      schedule.EndTime,
			"slot_duration": schedule.SlotDuration,
			"break_start":   schedule.BreakStart,
			"break_end":     schedule.BreakEnd,
			"is_available":  schedule.IsAvailable,
			"updated_at":    schedule.UpdatedAt,
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

// Delete Schedule
func (r *scheduleRepository) Delete(
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
