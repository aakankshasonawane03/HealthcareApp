package service

import (
	"context"
	"errors"
	"time"

	firebaseMessaging "firebase.google.com/go/v4/messaging"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/config/database"
	appointmentModel "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/appointment/model"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/notification/dto"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/notification/model"
)

type Service struct {
	firebaseClient *firebaseMessaging.Client
}

// =====================================================
// CONSTRUCTOR
// =====================================================

func NewService(firebaseClient *firebaseMessaging.Client) *Service {
	return &Service{
		firebaseClient: firebaseClient,
	}
}

// =====================================================
// CREATE NOTIFICATION
// =====================================================

func (s *Service) CreateNotification(
	ctx context.Context,
	req dto.CreateNotificationDTO,
) (*model.Notification, error) {

	if req.UserID == "" {
		return nil, errors.New("user ID is required")
	}

	if req.Title == "" {
		return nil, errors.New("notification title is required")
	}

	if req.Message == "" {
		return nil, errors.New("notification message is required")
	}

	userID, err := primitive.ObjectIDFromHex(req.UserID)
	if err != nil {
		return nil, errors.New("invalid user ID")
	}

	var referenceID primitive.ObjectID
	if req.ReferenceID != "" {
		referenceID, err = primitive.ObjectIDFromHex(req.ReferenceID)
		if err != nil {
			return nil, errors.New("invalid reference ID")
		}
	}

	notification := &model.Notification{
		ID:          primitive.NewObjectID(),
		UserID:      userID,
		Title:       req.Title,
		Message:     req.Message,
		Type:        req.Type,
		ReferenceID: referenceID,
		IsRead:      false,
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	collection := database.GetCollection("notifications")

	_, err = collection.InsertOne(ctx, notification)
	if err != nil {
		return nil, err
	}

	return notification, nil
}

// =====================================================
// GET ALL NOTIFICATIONS
// =====================================================

func (s *Service) GetUserNotifications(
	ctx context.Context,
	userID string,
) ([]model.Notification, error) {

	userObjID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return nil, errors.New("invalid user ID")
	}

	collection := database.GetCollection("notifications")

	filter := bson.M{
		"user_id": userObjID,
	}

	opts := options.Find().
		SetSort(bson.D{
			{Key: "created_at", Value: -1},
		})

	cursor, err := collection.Find(ctx, filter, opts)
	if err != nil {
		return nil, err
	}

	defer cursor.Close(ctx)

	var notifications []model.Notification

	if err := cursor.All(ctx, &notifications); err != nil {
		return nil, err
	}

	return notifications, nil
}

// =====================================================
// GET UNREAD NOTIFICATIONS
// =====================================================

func (s *Service) GetUnreadNotifications(
	ctx context.Context,
	userID string,
) ([]model.Notification, error) {

	userObjID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return nil, errors.New("invalid user ID")
	}

	collection := database.GetCollection("notifications")

	filter := bson.M{
		"user_id": userObjID,
		"is_read": false,
	}

	opts := options.Find().
		SetSort(bson.D{
			{Key: "created_at", Value: -1},
		})

	cursor, err := collection.Find(ctx, filter, opts)
	if err != nil {
		return nil, err
	}

	defer cursor.Close(ctx)

	var notifications []model.Notification

	if err := cursor.All(ctx, &notifications); err != nil {
		return nil, err
	}

	return notifications, nil
}

// =====================================================
// MARK AS READ
// =====================================================

func (s *Service) MarkAsRead(
	ctx context.Context,
	notificationID string,
	userID string,
) error {

	notificationObjID, err := primitive.ObjectIDFromHex(notificationID)
	if err != nil {
		return errors.New("invalid notification ID")
	}

	userObjID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return errors.New("invalid user ID")
	}

	collection := database.GetCollection("notifications")

	filter := bson.M{
		"_id":     notificationObjID,
		"user_id": userObjID,
	}

	update := bson.M{
		"$set": bson.M{
			"is_read":    true,
			"updated_at": time.Now(),
		},
	}

	result, err := collection.UpdateOne(
		ctx,
		filter,
		update,
	)

	if err != nil {
		return err
	}

	if result.MatchedCount == 0 {
		return errors.New("notification not found")
	} 

	return nil
}

// =====================================================
// MARK ALL AS READ
// =====================================================

func (s *Service) MarkAllAsRead(
	ctx context.Context,
	userID string,
) error {

	userObjID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return errors.New("invalid user ID")
	}

	collection := database.GetCollection("notifications")

	filter := bson.M{
		"user_id": userObjID,
		"is_read": false,
	}

	update := bson.M{
		"$set": bson.M{
			"is_read":    true,
			"updated_at": time.Now(),
		},
	}

	_, err = collection.UpdateMany(
		ctx,
		filter,
		update,
	)

	return err
}

// =====================================================
// DELETE NOTIFICATION
// =====================================================
// Delete notification
// =====================================================
// DELETE NOTIFICATION
// =====================================================

func (s *Service) DeleteNotification(
	ctx context.Context,
	notificationID string,
	userID string,
) error {

	notificationObjID, err := primitive.ObjectIDFromHex(notificationID)
	if err != nil {
		return errors.New("invalid notification ID")
	}

	userObjID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return errors.New("invalid user ID")
	}

	collection := database.GetCollection("notifications")

	filter := bson.M{
		"_id":     notificationObjID,
		"user_id": userObjID,
	}

	result, err := collection.DeleteOne(
		ctx,
		filter,
	)

	if err != nil {
		return err
	}

	if result.DeletedCount == 0 {
		return errors.New("notification not found")
	}

	return nil
}
// =====================================================
// REGISTER FCM DEVICE TOKEN
// =====================================================

func (s *Service) RegisterDeviceToken(
	ctx context.Context,
	userID string,
	req dto.RegisterDeviceTokenDTO,
) error {

	if req.Token == "" {
		return errors.New("FCM token is required")
	}

	userObjID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return errors.New("invalid user ID")
	}

	collection := database.GetCollection("device_tokens")

	now := time.Now()

	filter := bson.M{
		"user_id": userObjID,
		"token":   req.Token,
	}

	update := bson.M{
		"$set": bson.M{
			"platform":   req.Platform,
			"is_active":  true,
			"updated_at": now,
		},

		"$setOnInsert": bson.M{
			"_id":        primitive.NewObjectID(),
			"user_id":    userObjID,
			"token":      req.Token,
			"created_at": now,
		},
	}

	_, err = collection.UpdateOne(
		ctx,
		filter,
		update,
		options.Update().SetUpsert(true),
	)

	return err
}

// =====================================================
// SEND FIREBASE PUSH NOTIFICATION
// =====================================================

func (s *Service) SendPushNotification(
	ctx context.Context,
	userID string,
	title string,
	message string,
) error {

	if s.firebaseClient == nil {
		return errors.New("firebase client is not initialized")
	}

	userObjID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return errors.New("invalid user ID")
	}

	collection := database.GetCollection("device_tokens")

	filter := bson.M{
		"user_id":   userObjID,
		"is_active": true,
	}

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		return err
	}

	defer cursor.Close(ctx)

	var devices []model.DeviceToken

	if err := cursor.All(ctx, &devices); err != nil {
		return err
	}

	if len(devices) == 0 {
		return errors.New("no active FCM device token found")
	}

	successCount := 0

	for _, device := range devices {

		msg := &firebaseMessaging.Message{
			Token: device.Token,

			Notification: &firebaseMessaging.Notification{
				Title: title,
				Body:  message,
			},

			Data: map[string]string{
				"type": "appointment_reminder",
			},
		}

		_, err := s.firebaseClient.Send(
			ctx,
			msg,
		)

		if err != nil {
			continue
		}

		successCount++
	}

	if successCount == 0 {
		return errors.New("failed to send Firebase notification")
	}

	return nil
}

// =====================================================
// APPOINTMENT NOTIFICATION
// =====================================================

func (s *Service) SendAppointmentReminder(
	ctx context.Context,
	appointment appointmentModel.Appointment,
) error {

	if appointment.PatientID.IsZero() {
		return errors.New("invalid patient ID")
	}

	patientID := appointment.PatientID.Hex()

	// ---------------------------------------------
	// 1. Save notification in MongoDB
	// ---------------------------------------------

	_, err := s.CreateNotification(
		ctx,
		dto.CreateNotificationDTO{
			UserID:      patientID,
			Title:       "Appointment Reminder",
			Message:     "You have an appointment scheduled soon.",
			Type:        "appointment_reminder",
			ReferenceID: appointment.ID.Hex(),
		},
	)

	if err != nil {
		return err
	}

	// ---------------------------------------------
	// 2. Send Firebase push notification
	// ---------------------------------------------

	err = s.SendPushNotification(
		ctx,
		patientID,
		"Appointment Reminder",
		"You have an appointment scheduled soon.",
	)

	if err != nil {
		return err
	}

	return nil
}
