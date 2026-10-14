package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type MedicalRecord struct {
	ID primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`

	PatientID      primitive.ObjectID `bson:"patient_id" json:"patient_id"`
	DoctorID       primitive.ObjectID `bson:"doctor_id" json:"doctor_id"`
	ClinicID       primitive.ObjectID `bson:"clinic_id" json:"clinic_id"`
	ConsultationID primitive.ObjectID `bson:"consultation_id" json:"consultation_id"`

	Diagnosis string `bson:"diagnosis,omitempty" json:"diagnosis,omitempty"`
	Symptoms  string `bson:"symptoms,omitempty" json:"symptoms,omitempty"`
	Treatment string `bson:"treatment,omitempty" json:"treatment,omitempty"`
	Notes     string `bson:"notes,omitempty" json:"notes,omitempty"`

	RecordDate time.Time `bson:"record_date" json:"record_date"`

	CreatedAt time.Time `bson:"created_at" json:"created_at"`
	UpdatedAt time.Time `bson:"updated_at" json:"updated_at"`
}
