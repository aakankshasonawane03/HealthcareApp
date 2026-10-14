package clinic

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Clinic struct {
	ID primitive.ObjectID `bson:"_id,omitempty" json:"id"`

	Name        string `bson:"name" json:"name" binding:"required"`
	Address     string `bson:"address" json:"address" binding:"required"`
	City        string `bson:"city" json:"city" binding:"required"`
	State       string `bson:"state" json:"state" binding:"required"`
	Pincode     string `bson:"pincode" json:"pincode" binding:"required"`
	Phone       string `bson:"phone" json:"phone" binding:"required"`
	Email       string `bson:"email" json:"email"`
	Description string `bson:"description" json:"description"`

	OpeningTime string `bson:"opening_time" json:"opening_time"`
	ClosingTime string `bson:"closing_time" json:"closing_time"`

	IsActive bool `bson:"is_active" json:"is_active"`

	CreatedAt time.Time `bson:"created_at" json:"created_at"`
	UpdatedAt time.Time `bson:"updated_at" json:"updated_at"`
}
