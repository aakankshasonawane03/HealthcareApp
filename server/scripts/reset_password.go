
package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"strings"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/crypto/bcrypt"
)

func main() {
	email := strings.ToLower(strings.TrimSpace(os.Getenv("RESET_EMAIL")))
	password := os.Getenv("RESET_PASSWORD")

	if email == "" || password == "" {
		log.Fatal("Set RESET_EMAIL and RESET_PASSWORD first.")
	}
	if len(password) < 8 {
		log.Fatal("Password must contain at least 8 characters.")
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	uri := os.Getenv("MONGO_URI")
	if uri == "" {
		uri = "mongodb://localhost:27017"
	}

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(context.Background())

	if err := client.Ping(ctx, nil); err != nil {
		log.Fatal(err)
	}

	users := client.Database("healthcare").Collection("users")

	var existing bson.M
	err = users.FindOne(ctx, bson.M{"email": email}).Decode(&existing)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Fatal("No account found for that exact email.")
		}
		log.Fatal(err)
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		log.Fatal(err)
	}

	result, err := users.UpdateOne(
		ctx,
		bson.M{"_id": existing["_id"], "email": email},
		bson.M{"$set": bson.M{
			"password":   string(hash),
			"updated_at": time.Now(),
		}},
	)
	if err != nil {
		log.Fatal(err)
	}
	if result.MatchedCount != 1 {
		log.Fatal("Expected exactly one matching account; no reset confirmed.")
	}

	fmt.Println("Password reset successful for the selected account.")
	fmt.Println("Your account ID and role were not changed.")
}
