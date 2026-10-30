
package config

import (
	"context"
	"fmt"
	"os"

	firebase "firebase.google.com/go/v4"
	"firebase.google.com/go/v4/messaging"
	"google.golang.org/api/option"
)

func InitFirebase() (*messaging.Client, error) {
	ctx := context.Background()

	projectID := os.Getenv("FIREBASE_PROJECT_ID")
	if projectID == "" {
		return nil, fmt.Errorf("FIREBASE_PROJECT_ID environment variable is not set")
	}

	credentialsFile := "firebase-service-account.json"

	opt := option.WithCredentialsFile(credentialsFile)

	app, err := firebase.NewApp(
		ctx,
		&firebase.Config{
			ProjectID: projectID,
		},
		opt,
	)
	if err != nil {
		return nil, fmt.Errorf("create Firebase app: %w", err)
	}

	client, err := app.Messaging(ctx)
	if err != nil {
		return nil, fmt.Errorf("create Firebase Messaging client: %w", err)
	}

	return client, nil
}
