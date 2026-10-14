package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Medicine struct {
	MedicineName string `bson:"medicine_name" json:"medicine_name"`
	Dosage       string `bson:"dosage" json:"dosage"`
	Frequency    string `bson:"frequency" json:"frequency"`
	Duration     string `bson:"duration" json:"duration"`
}

type Prescription struct {
	ID primitive.ObjectID `bson:"_id,omitempty" json:"id"`

	ConsultationID primitive.ObjectID `bson:"consultation_id" json:"consultation_id"`
	AppointmentID  primitive.ObjectID `bson:"appointment_id" json:"appointment_id"`
	PatientID      primitive.ObjectID `bson:"patient_id" json:"patient_id"`
	DoctorID       primitive.ObjectID `bson:"doctor_id" json:"doctor_id"`
	ClinicID       primitive.ObjectID `bson:"clinic_id" json:"clinic_id"`

	Medicines []Medicine `bson:"medicines" json:"medicines"`

	Notes string `bson:"notes,omitempty" json:"notes,omitempty"`

	PrescriptionDate time.Time `bson:"prescription_date" json:"prescription_date"`
	CreatedAt        time.Time `bson:"created_at" json:"created_at"`
	UpdatedAt        time.Time `bson:"updated_at" json:"updated_at"`
}
