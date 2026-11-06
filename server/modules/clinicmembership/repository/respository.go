package repository

import (
	"context"
	"errors"
	"time"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/clinicmembership/model"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type ClinicMembershipRepository interface {
	GetClinic(
		ctx context.Context,
		clinicID primitive.ObjectID,
	) (primitive.ObjectID, error)

	IsOrganizationOwner(
		ctx context.Context,
		organizationID primitive.ObjectID,
		userID primitive.ObjectID,
	) (bool, error)

	GetUserRole(
		ctx context.Context,
		userID primitive.ObjectID,
	) (string, bool, error)

	Create(
		ctx context.Context,
		membership *model.ClinicMembership,
	) error

	GetByUserAndClinic(
		ctx context.Context,
		userID primitive.ObjectID,
		clinicID primitive.ObjectID,
	) (*model.ClinicMembership, error)

	GetAllByClinic(
		ctx context.Context,
		clinicID primitive.ObjectID,
	) ([]model.ClinicMembership, error)

	Update(
		ctx context.Context,
		membershipID primitive.ObjectID,
		clinicID primitive.ObjectID,
		role string,
		permissions []string,
	) error

	Deactivate(
		ctx context.Context,
		userID primitive.ObjectID,
		clinicID primitive.ObjectID,
	) error

	CreateIndexes(ctx context.Context) error
}

type clinicMembershipRepository struct {
	membershipCollection *mongo.Collection
	clinicCollection     *mongo.Collection
	organizationCollection *mongo.Collection
	userCollection       *mongo.Collection
}

func NewClinicMembershipRepository(
	membershipCollection *mongo.Collection,
	clinicCollection *mongo.Collection,
	organizationCollection *mongo.Collection,
	userCollection *mongo.Collection,
) ClinicMembershipRepository {
	return &clinicMembershipRepository{
		membershipCollection: membershipCollection,
		clinicCollection: clinicCollection,
		organizationCollection: organizationCollection,
		userCollection: userCollection,
	}
}

func (r *clinicMembershipRepository) GetClinic(
	ctx context.Context,
	clinicID primitive.ObjectID,
) (primitive.ObjectID, error) {
	var clinic struct {
		ID             primitive.ObjectID `bson:"_id"`
		OrganizationID primitive.ObjectID `bson:"organization_id"`
	}

	err := r.clinicCollection.FindOne(
		ctx,
		bson.M{"_id": clinicID},
	).Decode(&clinic)

	if err != nil {
		return primitive.NilObjectID, err
	}

	if clinic.OrganizationID.IsZero() {
		return primitive.NilObjectID, errors.New(
			"clinic has no organization_id",
		)
	}

	return clinic.OrganizationID, nil
}

func (r *clinicMembershipRepository) IsOrganizationOwner(
	ctx context.Context,
	organizationID primitive.ObjectID,
	userID primitive.ObjectID,
) (bool, error) {
	count, err := r.organizationCollection.CountDocuments(
		ctx,
		bson.M{
			"_id":          organizationID,
			"owner_user_id": userID,
			"is_active":    true,
		},
	)

	if err != nil {
		return false, err
	}

	return count > 0, nil
}

func (r *clinicMembershipRepository) GetUserRole(
	ctx context.Context,
	userID primitive.ObjectID,
) (string, bool, error) {
	var user struct {
		Role     string `bson:"role"`
		IsActive bool   `bson:"is_active"`
	}

	err := r.userCollection.FindOne(
		ctx,
		bson.M{"_id": userID},
	).Decode(&user)

	if err != nil {
		return "", false, err
	}

	return user.Role, user.IsActive, nil
}

func (r *clinicMembershipRepository) Create(
	ctx context.Context,
	membership *model.ClinicMembership,
) error {
	if membership == nil {
		return errors.New("membership is required")
	}

	_, err := r.membershipCollection.InsertOne(ctx, membership)
	return err
}

func (r *clinicMembershipRepository) GetByUserAndClinic(
	ctx context.Context,
	userID primitive.ObjectID,
	clinicID primitive.ObjectID,
) (*model.ClinicMembership, error) {
	var membership model.ClinicMembership

	err := r.membershipCollection.FindOne(
		ctx,
		bson.M{
			"user_id":   userID,
			"clinic_id": clinicID,
		},
	).Decode(&membership)

	if err != nil {
		return nil, err
	}

	return &membership, nil
}

func (r *clinicMembershipRepository) GetAllByClinic(
	ctx context.Context,
	clinicID primitive.ObjectID,
) ([]model.ClinicMembership, error) {
	cursor, err := r.membershipCollection.Find(
		ctx,
		bson.M{"clinic_id": clinicID},
		options.Find().SetSort(bson.D{
			{Key: "created_at", Value: -1},
		}),
	)

	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var memberships []model.ClinicMembership

	if err := cursor.All(ctx, &memberships); err != nil {
		return nil, err
	}

	if memberships == nil {
		memberships = []model.ClinicMembership{}
	}

	return memberships, nil
}

func (r *clinicMembershipRepository) Update(
	ctx context.Context,
	membershipID primitive.ObjectID,
	clinicID primitive.ObjectID,
	role string,
	permissions []string,
) error {
	result, err := r.membershipCollection.UpdateOne(
		ctx,
		bson.M{
			"_id":       membershipID,
			"clinic_id": clinicID,
			"is_active": true,
		},
		bson.M{
			"$set": bson.M{
				"role":        role,
				"permissions": permissions,
				"updated_at":  primitive.NewDateTimeFromTime(time.Now()),
			},
		},
	)

	if err != nil {
		return err
	}

	if result.MatchedCount == 0 {
		return mongo.ErrNoDocuments
	}

	return nil
}

func (r *clinicMembershipRepository) Deactivate(
	ctx context.Context,
	userID primitive.ObjectID,
	clinicID primitive.ObjectID,
) error {
	result, err := r.membershipCollection.UpdateOne(
		ctx,
		bson.M{
			"user_id":   userID,
			"clinic_id": clinicID,
			"is_active": true,
		},
		bson.M{
			"$set": bson.M{
				"is_active":  false,
				"updated_at": primitive.NewDateTimeFromTime(time.Now()),
			},
		},
	)

	if err != nil {
		return err
	}

	if result.MatchedCount == 0 {
		return mongo.ErrNoDocuments
	}

	return nil
}

func (r *clinicMembershipRepository) CreateIndexes(
	ctx context.Context,
) error {
	_, err := r.membershipCollection.Indexes().CreateOne(
		ctx,
		mongo.IndexModel{
			Keys: bson.D{
				{Key: "user_id", Value: 1},
				{Key: "clinic_id", Value: 1},
			},
			Options: options.Index().SetUnique(true),
		},
	)

	return err
}