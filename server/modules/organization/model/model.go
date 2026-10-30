package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Organization struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Name        string             `bson:"name" json:"name"`
	Description string             `bson:"description,omitempty" json:"description,omitempty"`
	Email       string             `bson:"email,omitempty" json:"email,omitempty"`
	Phone       string             `bson:"phone,omitempty" json:"phone,omitempty"`

	OwnerUserID primitive.ObjectID `bson:"owner_user_id" json:"owner_user_id"`

	IsActive  bool      `bson:"is_active" json:"is_active"`
	CreatedAt time.Time `bson:"created_at" json:"created_at"`
	UpdatedAt time.Time `bson:"updated_at" json:"updated_at"`
}
