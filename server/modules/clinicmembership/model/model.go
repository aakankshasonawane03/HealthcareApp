package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ClinicMembership struct {
	ID             primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	UserID         primitive.ObjectID `bson:"user_id" json:"user_id"`
	OrganizationID primitive.ObjectID `bson:"organization_id" json:"organization_id"`
	ClinicID       primitive.ObjectID `bson:"clinic_id" json:"clinic_id"`

	Role        string   `bson:"role" json:"role"`
	Permissions []string `bson:"permissions" json:"permissions"`

	IsActive  bool      `bson:"is_active" json:"is_active"`
	CreatedAt time.Time `bson:"created_at" json:"created_at"`
	UpdatedAt time.Time `bson:"updated_at" json:"updated_at"`
}