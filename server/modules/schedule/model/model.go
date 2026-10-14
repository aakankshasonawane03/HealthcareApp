package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type DoctorSchedule struct {
	ID primitive.ObjectID `bson:"_id,omitempty" json:"id"`

	DoctorID primitive.ObjectID `bson:"doctor_id" json:"doctor_id"`
	ClinicID primitive.ObjectID `bson:"clinic_id" json:"clinic_id"`

	DayOfWeek string `bson:"day_of_week" json:"day_of_week"`

	StartTime string `bson:"start_time" json:"start_time"`
	EndTime   string `bson:"end_time" json:"end_time"`

	SlotDuration int `bson:"slot_duration" json:"slot_duration"`

	BreakStart string `bson:"break_start,omitempty" json:"break_start,omitempty"`
	BreakEnd   string `bson:"break_end,omitempty" json:"break_end,omitempty"`

	IsAvailable bool `bson:"is_available" json:"is_available"`

	CreatedAt time.Time `bson:"created_at" json:"created_at"`
	UpdatedAt time.Time `bson:"updated_at" json:"updated_at"`
}
