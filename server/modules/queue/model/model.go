package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type QueueStatus string

const (
	QueueWaiting        QueueStatus = "WAITING"
	QueueCalled         QueueStatus = "CALLED"
	QueueInConsultation QueueStatus = "IN_CONSULTATION"
	QueueCompleted      QueueStatus = "COMPLETED"
	QueueCancelled      QueueStatus = "CANCELLED"
)

type Queue struct {
	ID primitive.ObjectID `bson:"_id,omitempty" json:"id"`

	AppointmentID primitive.ObjectID `bson:"appointment_id" json:"appointment_id"`
	PatientID     primitive.ObjectID `bson:"patient_id" json:"patient_id"`
	DoctorID      primitive.ObjectID `bson:"doctor_id" json:"doctor_id"`
	ClinicID      primitive.ObjectID `bson:"clinic_id" json:"clinic_id"`

	TokenNumber int `bson:"token_number" json:"token_number"`

	QueueDate time.Time `bson:"queue_date" json:"queue_date"`

	Status QueueStatus `bson:"status" json:"status"`

	CheckInTime *time.Time `bson:"check_in_time,omitempty" json:"check_in_time,omitempty"`
	CalledAt    *time.Time `bson:"called_at,omitempty" json:"called_at,omitempty"`
	CompletedAt *time.Time `bson:"completed_at,omitempty" json:"completed_at,omitempty"`

	CreatedAt time.Time `bson:"created_at" json:"created_at"`
	UpdatedAt time.Time `bson:"updated_at" json:"updated_at"`
}
