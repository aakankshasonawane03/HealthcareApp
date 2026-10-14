package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Appointment struct {
	ID primitive.ObjectID `bson:"_id,omitempty" json:"id"`

	DoctorID primitive.ObjectID `bson:"doctor_id" json:"doctor_id"`

	PatientID primitive.ObjectID `bson:"patient_id" json:"patient_id"`

	AppointmentDate time.Time `bson:"appointment_date" json:"appointment_date"`

	AppointmentTime string `bson:"appointment_time" json:"appointment_time"`

	Reason string `bson:"reason" json:"reason"`

	Status string `bson:"status" json:"status"`

	// Used by Cron to prevent duplicate reminders
	ReminderSent bool `bson:"reminder_sent" json:"reminder_sent"`

	CreatedAt time.Time `bson:"created_at" json:"created_at"`

	UpdatedAt time.Time `bson:"updated_at" json:"updated_at"`
}
