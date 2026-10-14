package config

import (
	"context"

	firebase "firebase.google.com/go/v4"
	"firebase.google.com/go/v4/messaging"
	"google.golang.org/api/option"
)

func InitFirebase() (*messaging.Client, error) {
	ctx := context.Background()

	opt := option.WithCredentialsFile(
		"firebase-service-account.json",
	)

	app, err := firebase.NewApp(
		ctx,
		nil,
		opt,
	)
	if err != nil {
		return nil, err
	}

	client, err := app.Messaging(ctx)
	if err != nil {
		return nil, err
	}

	return client, nil
}