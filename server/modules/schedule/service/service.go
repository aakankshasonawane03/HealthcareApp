package service

import (
	"context"
	"errors"
	"strings"
	"time"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/schedule/model"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/schedule/repository"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ScheduleService interface {
	Create(ctx context.Context, schedule *model.DoctorSchedule) error
	GetAll(ctx context.Context) ([]model.DoctorSchedule, error)
	GetByID(ctx context.Context, id primitive.ObjectID) (*model.DoctorSchedule, error)
	GetByDoctorID(ctx context.Context, doctorID primitive.ObjectID) ([]model.DoctorSchedule, error)
	GetByClinicID(ctx context.Context, clinicID primitive.ObjectID) ([]model.DoctorSchedule, error)
	Update(ctx context.Context, id primitive.ObjectID, schedule *model.DoctorSchedule) error
	Delete(ctx context.Context, id primitive.ObjectID) error
}

type scheduleService struct {
	repository repository.ScheduleRepository
}

func NewScheduleService(
	repository repository.ScheduleRepository,
) ScheduleService {
	return &scheduleService{
		repository: repository,
	}
}

// Create Schedule
func (s *scheduleService) Create(
	ctx context.Context,
	schedule *model.DoctorSchedule,
) error {

	if schedule.DoctorID.IsZero() {
		return errors.New("doctor_id is required")
	}

	if schedule.ClinicID.IsZero() {
		return errors.New("clinic_id is required")
	}

	schedule.DayOfWeek = strings.TrimSpace(schedule.DayOfWeek)
	schedule.StartTime = strings.TrimSpace(schedule.StartTime)
	schedule.EndTime = strings.TrimSpace(schedule.EndTime)
	schedule.BreakStart = strings.TrimSpace(schedule.BreakStart)
	schedule.BreakEnd = strings.TrimSpace(schedule.BreakEnd)

	if schedule.DayOfWeek == "" {
		return errors.New("day_of_week is required")
	}

	if schedule.StartTime == "" {
		return errors.New("start_time is required")
	}

	if schedule.EndTime == "" {
		return errors.New("end_time is required")
	}

	if schedule.SlotDuration <= 0 {
		return errors.New("slot_duration must be greater than 0")
	}

	// Generate ID
	schedule.ID = primitive.NewObjectID()

	// Default availability
	schedule.IsAvailable = true

	// Timestamps
	now := time.Now()

	schedule.CreatedAt = now
	schedule.UpdatedAt = now

	return s.repository.Create(ctx, schedule)
}

// Get All
func (s *scheduleService) GetAll(
	ctx context.Context,
) ([]model.DoctorSchedule, error) {

	return s.repository.GetAll(ctx)
}

// Get By ID
func (s *scheduleService) GetByID(
	ctx context.Context,
	id primitive.ObjectID,
) (*model.DoctorSchedule, error) {

	if id.IsZero() {
		return nil, errors.New("invalid schedule id")
	}

	return s.repository.GetByID(ctx, id)
}

// Get By Doctor ID
func (s *scheduleService) GetByDoctorID(
	ctx context.Context,
	doctorID primitive.ObjectID,
) ([]model.DoctorSchedule, error) {

	if doctorID.IsZero() {
		return nil, errors.New("invalid doctor id")
	}

	return s.repository.GetByDoctorID(ctx, doctorID)
}

// Get By Clinic ID
func (s *scheduleService) GetByClinicID(
	ctx context.Context,
	clinicID primitive.ObjectID,
) ([]model.DoctorSchedule, error) {

	if clinicID.IsZero() {
		return nil, errors.New("invalid clinic id")
	}

	return s.repository.GetByClinicID(ctx, clinicID)
}

// Update Schedule
func (s *scheduleService) Update(
	ctx context.Context,
	id primitive.ObjectID,
	schedule *model.DoctorSchedule,
) error {

	if id.IsZero() {
		return errors.New("invalid schedule id")
	}

	if schedule.DoctorID.IsZero() {
		return errors.New("doctor_id is required")
	}

	if schedule.ClinicID.IsZero() {
		return errors.New("clinic_id is required")
	}

	schedule.DayOfWeek = strings.TrimSpace(schedule.DayOfWeek)
	schedule.StartTime = strings.TrimSpace(schedule.StartTime)
	schedule.EndTime = strings.TrimSpace(schedule.EndTime)
	schedule.BreakStart = strings.TrimSpace(schedule.BreakStart)
	schedule.BreakEnd = strings.TrimSpace(schedule.BreakEnd)

	if schedule.DayOfWeek == "" {
		return errors.New("day_of_week is required")
	}

	if schedule.StartTime == "" {
		return errors.New("start_time is required")
	}

	if schedule.EndTime == "" {
		return errors.New("end_time is required")
	}

	if schedule.SlotDuration <= 0 {
		return errors.New("slot_duration must be greater than 0")
	}

	schedule.UpdatedAt = time.Now()

	return s.repository.Update(
		ctx,
		id,
		schedule,
	)
}

// Delete Schedule
func (s *scheduleService) Delete(
	ctx context.Context,
	id primitive.ObjectID,
) error {

	if id.IsZero() {
		return errors.New("invalid schedule id")
	}

	return s.repository.Delete(ctx, id)
}
