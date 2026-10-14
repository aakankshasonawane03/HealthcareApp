package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Doctor struct {
	ID              primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Name            string             `bson:"name" json:"name"`
	Email           string             `bson:"email" json:"email"`
	Phone           string             `bson:"phone" json:"phone"`
	Specialization  string             `bson:"specialization" json:"specialization"`
	Qualification   string             `bson:"qualification" json:"qualification"`
	Experience      int                `bson:"experience" json:"experience"`
	ConsultationFee float64            `bson:"consultation_fee" json:"consultation_fee"`
	IsActive        bool               `bson:"is_active" json:"is_active"`
	CreatedAt       time.Time          `bson:"created_at" json:"created_at"`
	UpdatedAt       time.Time          `bson:"updated_at" json:"updated_at"`
}//
