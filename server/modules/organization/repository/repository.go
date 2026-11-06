package repository

import (
	"context"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/organization/model"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type OrganizationRepository interface {
	Create(ctx context.Context, org *model.Organization) error

	GetByOwnerID(
		ctx context.Context,
		ownerID primitive.ObjectID,
	) (*model.Organization, error)
}

type organizationRepository struct {
	collection *mongo.Collection
}

func NewOrganizationRepository(
	collection *mongo.Collection,
) OrganizationRepository {
	return &organizationRepository{
		collection: collection,
	}
}

func (r *organizationRepository) Create(
	ctx context.Context,
	org *model.Organization,
) error {
	_, err := r.collection.InsertOne(ctx, org)
	return err
}

func (r *organizationRepository) GetByOwnerID(
	ctx context.Context,
	ownerID primitive.ObjectID,
) (*model.Organization, error) {
	var org model.Organization

	err := r.collection.FindOne(
		ctx,
		bson.M{"owner_user_id": ownerID},
		options.FindOne(),
	).Decode(&org)

	if err != nil {
		return nil, err
	}

	return &org, nil
}
