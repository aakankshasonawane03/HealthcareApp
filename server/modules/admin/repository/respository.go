package repository

import (
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/admin/model"
)

type AdminRepository interface {
	GetDashboard(ctx context.Context) (*model.Dashboard, error)

	GetUsers(ctx context.Context) ([]model.UserSummary, error)
	UpdateUserStatus(ctx context.Context, id primitive.ObjectID, isActive bool) error

	GetDoctors(ctx context.Context) ([]model.DoctorSummary, error)
	GetPatients(ctx context.Context) ([]model.PatientSummary, error)

	GetClinics(ctx context.Context) ([]model.ClinicSummary, error)
	CreateClinic(ctx context.Context, data bson.M) (*model.ClinicSummary, error)
	UpdateClinic(ctx context.Context, id primitive.ObjectID, data bson.M) error
	DeleteClinic(ctx context.Context, id primitive.ObjectID) error

	GetAppointments(ctx context.Context) ([]model.AppointmentSummary, error)
}

type repository struct {
	users        *mongo.Collection
	doctors      *mongo.Collection
	patients     *mongo.Collection
	clinics      *mongo.Collection
	appointments *mongo.Collection
}

func NewAdminRepository(
	users *mongo.Collection,
	doctors *mongo.Collection,
	patients *mongo.Collection,
	clinics *mongo.Collection,
	appointments *mongo.Collection,
) AdminRepository {
	return &repository{
		users:        users,
		doctors:      doctors,
		patients:     patients,
		clinics:      clinics,
		appointments: appointments,
	}
}
func (r *repository) GetDashboard(
	ctx context.Context,
) (*model.Dashboard, error) {

	totalUsers, err := r.users.CountDocuments(ctx, bson.M{})
	if err != nil {
		return nil, err
	}

	activeUsers, err := r.users.CountDocuments(
		ctx,
		bson.M{"is_active": true},
	)
	if err != nil {
		return nil, err
	}

	totalDoctors, err := r.doctors.CountDocuments(ctx, bson.M{})
	if err != nil {
		return nil, err
	}

	activeDoctors, err := r.doctors.CountDocuments(
		ctx,
		bson.M{"is_active": true},
	)
	if err != nil {
		return nil, err
	}

	totalPatients, err := r.patients.CountDocuments(ctx, bson.M{})
	if err != nil {
		return nil, err
	}

	activePatients, err := r.patients.CountDocuments(
		ctx,
		bson.M{"is_active": true},
	)
	if err != nil {
		return nil, err
	}

	totalClinics, err := r.clinics.CountDocuments(ctx, bson.M{})
	if err != nil {
		return nil, err
	}

	totalAppointments, err := r.appointments.CountDocuments(ctx, bson.M{})
	if err != nil {
		return nil, err
	}

	pendingAppointments, err := r.appointments.CountDocuments(
		ctx,
		bson.M{"status": "PENDING"},
	)
	if err != nil {
		return nil, err
	}

	completedAppointments, err := r.appointments.CountDocuments(
		ctx,
		bson.M{"status": "COMPLETED"},
	)
	if err != nil {
		return nil, err
	}

	return &model.Dashboard{
		TotalUsers:            totalUsers,
		ActiveUsers:           activeUsers,
		TotalDoctors:          totalDoctors,
		ActiveDoctors:         activeDoctors,
		TotalPatients:         totalPatients,
		ActivePatients:        activePatients,
		TotalClinics:          totalClinics,
		TotalAppointments:     totalAppointments,
		PendingAppointments:   pendingAppointments,
		CompletedAppointments: completedAppointments,
	}, nil
}
func (r *repository) GetUsers(
	ctx context.Context,
) ([]model.UserSummary, error) {

	cursor, err := r.users.Find(
		ctx,
		bson.M{},
	)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var users []model.UserSummary

	for cursor.Next(ctx) {

		var data struct {
			ID        primitive.ObjectID `bson:"_id"`
			Name      string             `bson:"name"`
			Email     string             `bson:"email"`
			Role      string             `bson:"role"`
			IsActive  bool               `bson:"is_active"`
			CreatedAt time.Time          `bson:"created_at"`
		}

		if err := cursor.Decode(&data); err != nil {
			return nil, err
		}

		users = append(users, model.UserSummary{
			ID:        data.ID.Hex(),
			Name:      data.Name,
			Email:     data.Email,
			Role:      data.Role,
			IsActive:  data.IsActive,
			CreatedAt: data.CreatedAt,
		})
	}

	if err := cursor.Err(); err != nil {
		return nil, err
	}

	return users, nil
}
func (r *repository) UpdateUserStatus(
	ctx context.Context,
	id primitive.ObjectID,
	isActive bool,
) error {

	result, err := r.users.UpdateOne(
		ctx,
		bson.M{"_id": id},
		bson.M{
			"$set": bson.M{
				"is_active":  isActive,
				"updated_at": time.Now(),
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
func (r *repository) GetDoctors(
	ctx context.Context,
) ([]model.DoctorSummary, error) {

	cursor, err := r.doctors.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var doctors []model.DoctorSummary

	for cursor.Next(ctx) {

		var data struct {
			ID        primitive.ObjectID `bson:"_id"`
			Name      string             `bson:"name"`
			Email     string             `bson:"email"`
			Specialty string             `bson:"specialty"`
			IsActive  bool               `bson:"is_active"`
		}

		if err := cursor.Decode(&data); err != nil {
			return nil, err
		}

		doctors = append(doctors, model.DoctorSummary{
			ID:        data.ID.Hex(),
			Name:      data.Name,
			Email:     data.Email,
			Specialty: data.Specialty,
			IsActive:  data.IsActive,
		})
	}

	return doctors, cursor.Err()
}
func (r *repository) GetPatients(
	ctx context.Context,
) ([]model.PatientSummary, error) {

	cursor, err := r.patients.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var patients []model.PatientSummary

	for cursor.Next(ctx) {

		var data struct {
			ID       primitive.ObjectID `bson:"_id"`
			Name     string             `bson:"name"`
			Email    string             `bson:"email"`
			IsActive bool               `bson:"is_active"`
		}

		if err := cursor.Decode(&data); err != nil {
			return nil, err
		}

		patients = append(patients, model.PatientSummary{
			ID:       data.ID.Hex(),
			Name:     data.Name,
			Email:    data.Email,
			IsActive: data.IsActive,
		})
	}

	return patients, cursor.Err()
}
func (r *repository) GetClinics(
	ctx context.Context,
) ([]model.ClinicSummary, error) {

	cursor, err := r.clinics.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var clinics []model.ClinicSummary

	for cursor.Next(ctx) {

		var data struct {
			ID        primitive.ObjectID `bson:"_id"`
			Name      string             `bson:"name"`
			Address   string             `bson:"address"`
			Phone     string             `bson:"phone"`
			CreatedAt time.Time          `bson:"created_at"`
		}

		if err := cursor.Decode(&data); err != nil {
			return nil, err
		}

		clinics = append(clinics, model.ClinicSummary{
			ID:        data.ID.Hex(),
			Name:      data.Name,
			Address:   data.Address,
			Phone:     data.Phone,
			CreatedAt: data.CreatedAt,
		})
	}

	return clinics, cursor.Err()
}
func (r *repository) GetAppointments(
	ctx context.Context,
) ([]model.AppointmentSummary, error) {

	cursor, err := r.appointments.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var appointments []model.AppointmentSummary

	for cursor.Next(ctx) {

		var data struct {
			ID        primitive.ObjectID `bson:"_id"`
			DoctorID  primitive.ObjectID `bson:"doctor_id"`
			PatientID primitive.ObjectID `bson:"patient_id"`
			Date      string             `bson:"date"`
			Time      string             `bson:"time"`
			Status    string             `bson:"status"`
			Reason    string             `bson:"reason"`
			CreatedAt time.Time          `bson:"created_at"`
		}

		if err := cursor.Decode(&data); err != nil {
			return nil, err
		}

		appointments = append(
			appointments,
			model.AppointmentSummary{
				ID:        data.ID.Hex(),
				DoctorID:  data.DoctorID.Hex(),
				PatientID: data.PatientID.Hex(),
				Date:      data.Date,
				Time:      data.Time,
				Status:    data.Status,
				Reason:    data.Reason,
				CreatedAt: data.CreatedAt,
			},
		)
	}

	return appointments, cursor.Err()
}
func (r *repository) CreateClinic(
	ctx context.Context,
	data bson.M,
) (*model.ClinicSummary, error) {

	now := time.Now()

	data["created_at"] = now
	data["updated_at"] = now

	result, err := r.clinics.InsertOne(ctx, data)
	if err != nil {
		return nil, err
	}

	id, ok := result.InsertedID.(primitive.ObjectID)
	if !ok {
		return nil, fmt.Errorf("invalid inserted clinic ID")
	}

	return &model.ClinicSummary{
		ID:        id.Hex(),
		Name:      data["name"].(string),
		Address:   data["address"].(string),
		Phone:     data["phone"].(string),
		CreatedAt: now,
	}, nil
}

func (r *repository) UpdateClinic(
	ctx context.Context,
	id primitive.ObjectID,
	data bson.M,
) error {

	data["updated_at"] = time.Now()

	result, err := r.clinics.UpdateOne(
		ctx,
		bson.M{"_id": id},
		bson.M{
			"$set": data,
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

func (r *repository) DeleteClinic(
    ctx context.Context,
    id primitive.ObjectID,
) error {

    result, err := r.clinics.DeleteOne(
        ctx,
        bson.M{"_id": id},
    )

    if err != nil {
        return err
    }

    if result.DeletedCount == 0 {
        return mongo.ErrNoDocuments
    }

    return nil
}
