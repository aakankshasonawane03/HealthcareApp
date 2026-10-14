package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Patient struct {
	ID               primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	FirstName        string             `bson:"first_name" json:"first_name"`
	LastName         string             `bson:"last_name" json:"last_name"`
	Email            string             `bson:"email" json:"email"`
	Phone            string             `bson:"phone" json:"phone"`
	Gender           string             `bson:"gender" json:"gender"`
	DateOfBirth      time.Time          `bson:"date_of_birth" json:"date_of_birth"`
	BloodGroup       string             `bson:"blood_group" json:"blood_group"`
	Address          string             `bson:"address" json:"address"`
	EmergencyContact string             `bson:"emergency_contact" json:"emergency_contact"`
	IsActive         bool               `bson:"is_active" json:"is_active"`
	CreatedAt        time.Time          `bson:"created_at" json:"created_at"`
	UpdatedAt        time.Time          `bson:"updated_at" json:"updated_at"`
}
