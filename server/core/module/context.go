package module

import (
	"firebase.google.com/go/v4/messaging"
	"go.mongodb.org/mongo-driver/mongo"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/config"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/events"
)

type ModuleContext struct {
	DB       *mongo.Database
	Config   *config.Config
	EventBus *events.EventBus

	// Firebase Cloud Messaging client
	FirebaseClient *messaging.Client
}