package clinic

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Clinic struct {
	ID             primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	OrganizationID primitive.ObjectID `bson:"organization_id" json:"organization_id"`
	Name           string             `bson:"name" json:"name" binding:"required"`
	Address        string             `bson:"address" json:"address" binding:"required"`
	City           string             `bson:"city" json:"city" binding:"required"`
	State          string             `bson:"state" json:"state" binding:"required"`
	Pincode        string             `bson:"pincode" json:"pincode" binding:"required"`
	Phone          string             `bson:"phone" json:"phone" binding:"required"`
	Email          string             `bson:"email" json:"email"`
	Description    string             `bson:"description" json:"description"`

	OpeningTime string `bson:"opening_time" json:"opening_time"`
	ClosingTime string `bson:"closing_time" json:"closing_time"`

	// Actual clinic coordinates for nearby search.
	// Pointers allow existing records to have no coordinates.
	Latitude  *float64 `bson:"latitude,omitempty" json:"latitude,omitempty"`
	Longitude *float64 `bson:"longitude,omitempty" json:"longitude,omitempty"`

	// Calculated at search time; never stored in MongoDB.
	DistanceKm float64 `bson:"-" json:"distance_km,omitempty"`

	IsActive bool `bson:"is_active" json:"is_active"`

	CreatedAt time.Time `bson:"created_at" json:"created_at"`
	UpdatedAt time.Time `bson:"updated_at" json:"updated_at"`
}
