
package config

import (
	"context"
<<<<<<< HEAD
	"fmt"
	"os"
=======
	"os"
	"path/filepath"
	"runtime"
>>>>>>> 164b987 (Healthcare Frontend)

	firebase "firebase.google.com/go/v4"
	"firebase.google.com/go/v4/messaging"
	"google.golang.org/api/option"
)

func InitFirebase() (*messaging.Client, error) {
	ctx := context.Background()

<<<<<<< HEAD
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
=======
	_, currentFile, _, ok := runtime.Caller(0)
	if !ok {
		return nil, os.ErrNotExist
	}

	projectRoot := filepath.Clean(
		filepath.Join(filepath.Dir(currentFile), "../.."),
	)

	credentialsFile := filepath.Join(
		projectRoot,
		"firebase-service-account.json",
	)

	if _, err := os.Stat(credentialsFile); err != nil {
		return nil, err
	}

	opt := option.WithCredentialsFile(credentialsFile)

	app, err := firebase.NewApp(ctx, nil, opt)
>>>>>>> 164b987 (Healthcare Frontend)
	if err != nil {
		return nil, fmt.Errorf("create Firebase app: %w", err)
	}

	client, err := app.Messaging(ctx)
	if err != nil {
		return nil, fmt.Errorf("create Firebase Messaging client: %w", err)
	}

	return client, nil
}
