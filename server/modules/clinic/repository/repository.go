package repository

import (
	"context"
	"errors"

	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/clinic/model"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type ClinicRepository interface {
    Create(ctx context.Context, clinic *model.Clinic) error

    GetAll(ctx context.Context, organizationID primitive.ObjectID) ([]model.Clinic, error)

    GetByID(ctx context.Context, organizationID, id primitive.ObjectID) (*model.Clinic, error)

    Update(ctx context.Context, organizationID, id primitive.ObjectID, clinic *model.Clinic) error

    Delete(ctx context.Context, organizationID, id primitive.ObjectID) error

    // Geospatial methods
    CreateLocationIndex(ctx context.Context) error

    FindNearby(
        ctx context.Context,
        longitude float64,
        latitude float64,
        radiusInMeters float64,
    ) ([]model.Clinic, error)
}

type clinicRepository struct {
	collection *mongo.Collection
}

func NewClinicRepository(collection *mongo.Collection) ClinicRepository {
	return &clinicRepository{
		collection: collection,
	}
}

func (r *clinicRepository) Create(
	ctx context.Context,
	clinic *model.Clinic,
) error {
	if clinic == nil {
		return mongo.ErrNilDocument
	}

	if clinic.OrganizationID.IsZero() {
		return errors.New("organization ID is required")
	}

	_, err := r.collection.InsertOne(ctx, clinic)
	return err
}

func (r *clinicRepository) GetAll(
	ctx context.Context,
	organizationID primitive.ObjectID,
) ([]model.Clinic, error) {
	cursor, err := r.collection.Find(ctx, bson.M{
		"organization_id": organizationID,
	})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var clinics []model.Clinic
	if err := cursor.All(ctx, &clinics); err != nil {
		return nil, err
	}

	if clinics == nil {
		clinics = []model.Clinic{}
	}

	return clinics, nil
}

func (r *clinicRepository) GetByID(
	ctx context.Context,
	organizationID, id primitive.ObjectID,
) (*model.Clinic, error) {
	var clinic model.Clinic

	err := r.collection.FindOne(ctx, bson.M{
		"_id":             id,
		"organization_id": organizationID,
	}).Decode(&clinic)
	if err != nil {
		return nil, err
	}

	return &clinic, nil
}

func (r *clinicRepository) Update(
	ctx context.Context,
	organizationID, id primitive.ObjectID,
	clinic *model.Clinic,
) error {
	update := bson.M{
		"$set": bson.M{
			"name":         clinic.Name,
			"address":      clinic.Address,
			"city":         clinic.City,
			"state":        clinic.State,
			"pincode":      clinic.Pincode,
			"phone":        clinic.Phone,
			"email":        clinic.Email,
			"description":  clinic.Description,
			"opening_time": clinic.OpeningTime,
			"closing_time": clinic.ClosingTime,
			"is_active":    clinic.IsActive,
			"updated_at":   clinic.UpdatedAt,
		},
	}

	result, err := r.collection.UpdateOne(
		ctx,
		bson.M{
			"_id":             id,
			"organization_id": organizationID,
		},
		update,
	)
	if err != nil {
		return err
	}

	if result.MatchedCount == 0 {
		return mongo.ErrNoDocuments
	}

	return nil
}

func (r *clinicRepository) Delete(
	ctx context.Context,
	organizationID, id primitive.ObjectID,
) error {
	result, err := r.collection.DeleteOne(ctx, bson.M{
		"_id":             id,
		"organization_id": organizationID,
	})
	if err != nil {
		return err
	}

	if result.DeletedCount == 0 {
		return mongo.ErrNoDocuments
	}

	return nil
}
func (r *clinicRepository) CreateLocationIndex(
    ctx context.Context,
) error {
    indexModel := mongo.IndexModel{
        Keys: bson.D{
            {Key: "location", Value: "2dsphere"},
        },
    }

    _, err := r.collection.Indexes().CreateOne(ctx, indexModel)
    return err
}
func (r *clinicRepository) FindNearby(
    ctx context.Context,
    longitude float64,
    latitude float64,
    radiusInMeters float64,
) ([]model.Clinic, error) {

    filter := bson.M{
        "location": bson.M{
            "$nearSphere": bson.M{
                "$geometry": bson.M{
                    "type": "Point",
                    "coordinates": []float64{
                        longitude,
                        latitude,
                    },
                },
                "$maxDistance": radiusInMeters,
            },
        },
        "is_active": true,
    }

    cursor, err := r.collection.Find(ctx, filter)
    if err != nil {
        return nil, err
    }
    defer cursor.Close(ctx)

    var clinics []model.Clinic

    if err := cursor.All(ctx, &clinics); err != nil {
        return nil, err
    }

    if clinics == nil {
        clinics = []model.Clinic{}
    }

    return clinics, nil
}
