package service

import (
	"context"
	"errors"
	"math"
	"sort"
	"strings"
	"time"

	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/clinic/model"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/clinic/repository"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ClinicService interface {
	CreateClinic(ctx context.Context, clinic *model.Clinic) error
	GetAllClinics(ctx context.Context) ([]model.Clinic, error)
	GetClinicByID(ctx context.Context, id primitive.ObjectID) (*model.Clinic, error)
	UpdateClinic(ctx context.Context, id primitive.ObjectID, clinic *model.Clinic) error
	DeleteClinic(ctx context.Context, id primitive.ObjectID) error

	GetNearbyClinics(
		ctx context.Context,
		latitude float64,
		longitude float64,
		radiusKm float64,
	) ([]model.Clinic, error)
}

type clinicService struct {
	repo repository.ClinicRepository
}

func NewClinicService(repo repository.ClinicRepository) ClinicService {
	return &clinicService{repo: repo}
}

// Validate optional clinic coordinates.
func validateCoordinates(latitude, longitude *float64) error {
	if latitude == nil && longitude == nil {
		return nil
	}

	if latitude == nil || longitude == nil {
		return errors.New("both latitude and longitude are required")
	}

	if math.IsNaN(*latitude) || math.IsInf(*latitude, 0) ||
		math.IsNaN(*longitude) || math.IsInf(*longitude, 0) {
		return errors.New("invalid clinic coordinates")
	}

	if *latitude < -90 || *latitude > 90 {
		return errors.New("latitude must be between -90 and 90")
	}

	if *longitude < -180 || *longitude > 180 {
		return errors.New("longitude must be between -180 and 180")
	}

	return nil
}

func (s *clinicService) CreateClinic(
	ctx context.Context,
	organizationID primitive.ObjectID,
	clinic *model.Clinic,
) error {
	clinic.Name = strings.TrimSpace(clinic.Name)
	clinic.Address = strings.TrimSpace(clinic.Address)
	clinic.City = strings.TrimSpace(clinic.City)
	clinic.State = strings.TrimSpace(clinic.State)
	clinic.Pincode = strings.TrimSpace(clinic.Pincode)
	clinic.Phone = strings.TrimSpace(clinic.Phone)
	clinic.Email = strings.TrimSpace(clinic.Email)

	if clinic.Name == "" {
		return errors.New("clinic name is required")
	}
	if clinic.Address == "" {
		return errors.New("clinic address is required")
	}
	if clinic.City == "" {
		return errors.New("clinic city is required")
	}
	if clinic.State == "" {
		return errors.New("clinic state is required")
	}
	if clinic.Pincode == "" {
		return errors.New("clinic pincode is required")
	}
	if clinic.Phone == "" {
		return errors.New("clinic phone is required")
	}

	if err := validateCoordinates(clinic.Latitude, clinic.Longitude); err != nil {
		return err
	}

	clinic.ID = primitive.NewObjectID()
	clinic.IsActive = true

	now := time.Now()
	clinic.CreatedAt = now
	clinic.UpdatedAt = now

	return s.repo.Create(ctx, clinic)
}

func (s *clinicService) GetAllClinics(
	ctx context.Context,
	organizationID primitive.ObjectID,
) ([]model.Clinic, error) {
	clinics, err := s.repo.GetAll(ctx)
	if err != nil {
		return nil, err
	}

	if clinics == nil {
		clinics = []model.Clinic{}
	}

	// Return complete clinic objects, including coordinates.
	return clinics, nil
}

func (s *clinicService) GetClinicByID(
	ctx context.Context,
	organizationID, id primitive.ObjectID,
) (*model.Clinic, error) {
	return s.repo.GetByID(ctx, id)
}

func (s *clinicService) UpdateClinic(
	ctx context.Context,
	organizationID, id primitive.ObjectID,
	clinic *model.Clinic,
) error {
	clinic.Name = strings.TrimSpace(clinic.Name)
	clinic.Address = strings.TrimSpace(clinic.Address)
	clinic.City = strings.TrimSpace(clinic.City)
	clinic.State = strings.TrimSpace(clinic.State)
	clinic.Pincode = strings.TrimSpace(clinic.Pincode)
	clinic.Phone = strings.TrimSpace(clinic.Phone)
	clinic.Email = strings.TrimSpace(clinic.Email)

	if clinic.Name == "" {
		return errors.New("clinic name is required")
	}
	if clinic.Address == "" {
		return errors.New("clinic address is required")
	}
	if clinic.City == "" {
		return errors.New("clinic city is required")
	}
	if clinic.State == "" {
		return errors.New("clinic state is required")
	}
	if clinic.Pincode == "" {
		return errors.New("clinic pincode is required")
	}
	if clinic.Phone == "" {
		return errors.New("clinic phone is required")
	}

	if err := validateCoordinates(clinic.Latitude, clinic.Longitude); err != nil {
		return err
	}

	clinic.UpdatedAt = time.Now()

	return s.repo.Update(ctx, organizationID, id, clinic)
}

// Calculate distance between two GPS coordinates using Haversine formula.
func calculateDistance(
	lat1, lon1, lat2, lon2 float64,
) float64 {
	toRadians := func(degrees float64) float64 {
		return degrees * math.Pi / 180
	}

	dLat := toRadians(lat2 - lat1)
	dLon := toRadians(lon2 - lon1)

	a := math.Sin(dLat/2)*math.Sin(dLat/2) +
		math.Cos(toRadians(lat1))*
			math.Cos(toRadians(lat2))*
			math.Sin(dLon/2)*math.Sin(dLon/2)

	c := 2 * math.Atan2(math.Sqrt(a), math.Sqrt(1-a))

	return 6371 * c
}

// Get Nearby Clinics
func (s *clinicService) GetNearbyClinics(
	ctx context.Context,
	latitude float64,
	longitude float64,
	radiusKm float64,
) ([]model.Clinic, error) {
	if math.IsNaN(latitude) || math.IsInf(latitude, 0) ||
		latitude < -90 || latitude > 90 {
		return nil, errors.New("invalid latitude")
	}

	if math.IsNaN(longitude) || math.IsInf(longitude, 0) ||
		longitude < -180 || longitude > 180 {
		return nil, errors.New("invalid longitude")
	}

	if math.IsNaN(radiusKm) || math.IsInf(radiusKm, 0) ||
		radiusKm <= 0 || radiusKm > 100 {
		return nil, errors.New("radius must be greater than 0 and at most 100 km")
	}

	clinics, err := s.repo.GetAll(ctx)
	if err != nil {
		return nil, err
	}

	nearby := make([]model.Clinic, 0)

	for _, clinic := range clinics {
		if !clinic.IsActive ||
			clinic.Latitude == nil ||
			clinic.Longitude == nil {
			continue
		}

		distance := calculateDistance(
			latitude,
			longitude,
			*clinic.Latitude,
			*clinic.Longitude,
		)

		if distance <= radiusKm {
			clinic.DistanceKm = math.Round(distance*100) / 100
			nearby = append(nearby, clinic)
		}
	}

	sort.Slice(nearby, func(i, j int) bool {
		return nearby[i].DistanceKm < nearby[j].DistanceKm
	})

	return nearby, nil
}

// Delete Clinic
func (s *clinicService) DeleteClinic(
	ctx context.Context,
	organizationID, id primitive.ObjectID,
) error {
	return s.repo.Delete(ctx, id)
}
