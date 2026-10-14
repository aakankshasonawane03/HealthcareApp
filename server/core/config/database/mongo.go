package database

import (
	"context"
	"log"
	"time"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/config"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var Client *mongo.Client
var DB *mongo.Database

// Connect connects to MongoDB using the application configuration.
func Connect(cfg *config.Config) *mongo.Database {
	if cfg == nil {
		cfg = &config.Config{
			DBUri: "mongodb://localhost:27017",
		}
	}

	ctx, cancel := context.WithTimeout(
		context.Background(),
		10*time.Second,
	)
	defer cancel()

	clientOptions := options.Client().ApplyURI(cfg.DBUri)

	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatalf("MongoDB connection failed: %v", err)
	}

	// Verify connection
	if err := client.Ping(ctx, nil); err != nil {
		log.Fatalf("MongoDB ping failed: %v", err)
	}

	Client = client
	DB = client.Database("healthcare")

	log.Println("MongoDB connected successfully")

	return DB
}

// Disconnect closes the MongoDB connection.
func DisconnectMongoDB() error {
	if Client == nil {
		return nil
	}

	ctx, cancel := context.WithTimeout(
		context.Background(),
		10*time.Second,
	)
	defer cancel()

	err := Client.Disconnect(ctx)

	if err == nil {
		log.Println("MongoDB disconnected successfully")
	}

	return err
}

// GetDatabase returns the current MongoDB database.
func GetDatabase() *mongo.Database {
	return DB
}

// GetCollection returns a MongoDB collection.
func GetCollection(name string) *mongo.Collection {
	if DB == nil {
		log.Fatal("MongoDB database is not initialized")
	}

	return DB.Collection(name)
}