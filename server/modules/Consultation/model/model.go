package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ConsultationStatus string

const (
	StatusStarted   ConsultationStatus = "STARTED"
	StatusCompleted ConsultationStatus = "COMPLETED"
	StatusCancelled ConsultationStatus = "CANCELLED"
)

type Consultation struct {
	ID primitive.ObjectID `bson:"_id,omitempty" json:"id"`

	AppointmentID primitive.ObjectID `bson:"appointment_id" json:"appointment_id"`
	PatientID     primitive.ObjectID `bson:"patient_id" json:"patient_id"`
	DoctorID      primitive.ObjectID `bson:"doctor_id" json:"doctor_id"`
	ClinicID      primitive.ObjectID `bson:"clinic_id" json:"clinic_id"`
	QueueID       primitive.ObjectID `bson:"queue_id,omitempty" json:"queue_id,omitempty"`

	Symptoms  string `bson:"symptoms,omitempty" json:"symptoms,omitempty"`
	Diagnosis string `bson:"diagnosis,omitempty" json:"diagnosis,omitempty"`
	Notes     string `bson:"notes,omitempty" json:"notes,omitempty"`

	ConsultationDate time.Time  `bson:"consultation_date" json:"consultation_date"`
	FollowUpDate     *time.Time `bson:"follow_up_date,omitempty" json:"follow_up_date,omitempty"`

	Status ConsultationStatus `bson:"status" json:"status"`

	CreatedAt time.Time `bson:"created_at" json:"created_at"`
	UpdatedAt time.Time `bson:"updated_at" json:"updated_at"`
}
