package service

import (
	"context"
	"errors"
	"time"

	appointmentDTO "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/appointment/dto"
	appointmentModel "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/appointment/model"
	appointmentRepository "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/appointment/repository"

	doctorRepository "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/doctor/repository"
	patientRepository "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/patients/repository"

	notificationService "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/notification/service"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// ============================================================
// APPOINTMENT SERVICE INTERFACE
// ============================================================

type AppointmentService interface {

	// Create
	CreateAppointment(
		ctx context.Context,
		req appointmentDTO.CreateAppointmentRequest,
	) (*appointmentModel.Appointment, error)

	// Get all
	GetAllAppointments(
		ctx context.Context,
	) ([]appointmentModel.Appointment, error)

	// Get by ID
	GetAppointmentByID(
		ctx context.Context,
		id string,
	) (*appointmentModel.Appointment, error)

	// Get appointments for reminder
	GetUpcomingAppointments(
		ctx context.Context,
		startTime time.Time,
		endTime time.Time,
	) ([]appointmentModel.Appointment, error)

	// Update
	UpdateAppointment(
		ctx context.Context,
		id string,
		req appointmentDTO.UpdateAppointmentRequest,
	) (*appointmentModel.Appointment, error)

	// Delete
	DeleteAppointment(
		ctx context.Context,
		id string,
	) error

	// Mark reminder as sent
	MarkReminderSent(
		ctx context.Context,
		id string,
	) error
}

// ============================================================
// SERVICE STRUCT
// ============================================================

type appointmentService struct {
	appointmentRepo appointmentRepository.AppointmentRepository
	doctorRepo      doctorRepository.DoctorRepository
	patientRepo     patientRepository.PatientRepository
	notificationSvc *notificationService.Service
}

// ============================================================
// CONSTRUCTOR
// ============================================================

func NewAppointmentService(
	appointmentRepo appointmentRepository.AppointmentRepository,
	doctorRepo doctorRepository.DoctorRepository,
	patientRepo patientRepository.PatientRepository,
	notificationSvc *notificationService.Service,
) AppointmentService {

	return &appointmentService{
		appointmentRepo: appointmentRepo,
		doctorRepo:      doctorRepo,
		patientRepo:     patientRepo,
		notificationSvc: notificationSvc,
	}
}

// ============================================================
// CREATE APPOINTMENT
// ============================================================

func (s *appointmentService) CreateAppointment(
	ctx context.Context,
	req appointmentDTO.CreateAppointmentRequest,
) (*appointmentModel.Appointment, error) {

	// --------------------------------------------------------
	// Validate Doctor ID
	// --------------------------------------------------------

	doctorID, err := primitive.ObjectIDFromHex(req.DoctorID)

	if err != nil {
		return nil, errors.New("invalid doctor id")
	}

	// --------------------------------------------------------
	// Validate Patient ID
	// --------------------------------------------------------

	patientID, err := primitive.ObjectIDFromHex(req.PatientID)

	if err != nil {
		return nil, errors.New("invalid patient id")
	}

	// --------------------------------------------------------
	// Check Doctor Exists
	// --------------------------------------------------------

	_, err = s.doctorRepo.GetByID(
		ctx,
		req.DoctorID,
	)

	if err != nil {
		return nil, errors.New("doctor not found")
	}

	// --------------------------------------------------------
	// Check Patient Exists
	// --------------------------------------------------------

	_, err = s.patientRepo.GetByID(
		ctx,
		req.PatientID,
	)

	if err != nil {
		return nil, errors.New("patient not found")
	}

	// --------------------------------------------------------
	// Check Doctor Slot
	// --------------------------------------------------------

	existingAppointment, err :=
		s.appointmentRepo.FindDoctorAppointment(
			ctx,
			req.DoctorID,
			req.AppointmentDate,
			req.AppointmentTime,
		)

	if err != nil {
		return nil, err
	}

	if existingAppointment != nil {
		return nil, errors.New(
			"doctor already has an appointment at this time",
		)
	}

	// --------------------------------------------------------
	// Create Appointment
	// --------------------------------------------------------

	now := time.Now()

	appointment := &appointmentModel.Appointment{
		ID:              primitive.NewObjectID(),
		DoctorID:        doctorID,
		PatientID:       patientID,
		AppointmentDate: req.AppointmentDate,
		AppointmentTime: req.AppointmentTime,
		Reason:          req.Reason,
		Status:          "Booked",

		// Important:
		// Reminder has NOT been sent yet.
		ReminderSent: false,

		CreatedAt: now,
		UpdatedAt: now,
	}

	// --------------------------------------------------------
	// Save Appointment
	// --------------------------------------------------------

	err = s.appointmentRepo.Create(
		ctx,
		appointment,
	)

	if err != nil {
		return nil, err
	}

	// IMPORTANT:
	// Do NOT send notification here.
	//
	// Cron will check every minute and send the
	// notification approximately 30 minutes before
	// appointment time.

	return appointment, nil
}

// ============================================================
// GET ALL APPOINTMENTS
// ============================================================

func (s *appointmentService) GetAllAppointments(
	ctx context.Context,
) ([]appointmentModel.Appointment, error) {

	return s.appointmentRepo.GetAll(ctx)
}

// ============================================================
// GET APPOINTMENT BY ID
// ============================================================

func (s *appointmentService) GetAppointmentByID(
	ctx context.Context,
	id string,
) (*appointmentModel.Appointment, error) {

	if id == "" {
		return nil, errors.New("appointment id is required")
	}

	return s.appointmentRepo.GetByID(
		ctx,
		id,
	)
}

// ============================================================
// GET UPCOMING APPOINTMENTS
// ============================================================
//
// Used by:
//
// appointmentreminder/cron.go
//
// Cron asks:
//
// "Give me appointments approximately 30 minutes
// from now."
//
// ============================================================

func (s *appointmentService) GetUpcomingAppointments(
	ctx context.Context,
	startTime time.Time,
	endTime time.Time,
) ([]appointmentModel.Appointment, error) {

	if endTime.Before(startTime) {
		return nil, errors.New(
			"invalid appointment time range",
		)
	}

	// --------------------------------------------------------
	// Get appointments from repository
	// --------------------------------------------------------

	appointments, err :=
		s.appointmentRepo.FindUpcomingAppointments(
			ctx,
			startTime,
			endTime,
		)

	if err != nil {
		return nil, err
	}

	result :=
		make([]appointmentModel.Appointment, 0)

	// --------------------------------------------------------
	// Convert appointment date + time
	// --------------------------------------------------------

	for _, appointment := range appointments {

		// Only booked appointments
		if appointment.Status != "Booked" {
			continue
		}

		// Already reminded?
		if appointment.ReminderSent {
			continue
		}

		// ----------------------------------------------------
		// Parse appointment time
		// Example:
		//
		// "14:30"
		// ----------------------------------------------------

		parsedTime, err :=
			time.Parse(
				"15:04",
				appointment.AppointmentTime,
			)

		if err != nil {
			continue
		}

		// ----------------------------------------------------
		// Combine date + time
		// ----------------------------------------------------

		appointmentDateTime := time.Date(
			appointment.AppointmentDate.Year(),
			appointment.AppointmentDate.Month(),
			appointment.AppointmentDate.Day(),
			parsedTime.Hour(),
			parsedTime.Minute(),
			0,
			0,
			time.Local,
		)

		// ----------------------------------------------------
		// Check reminder window
		// ----------------------------------------------------

		if !appointmentDateTime.Before(startTime) &&
			appointmentDateTime.Before(endTime) {

			result = append(
				result,
				appointment,
			)
		}
	}

	return result, nil
}

// ============================================================
// UPDATE APPOINTMENT
// ============================================================

func (s *appointmentService) UpdateAppointment(
	ctx context.Context,
	id string,
	req appointmentDTO.UpdateAppointmentRequest,
) (*appointmentModel.Appointment, error) {

	// --------------------------------------------------------
	// Get Existing Appointment
	// --------------------------------------------------------

	appointment, err :=
		s.appointmentRepo.GetByID(
			ctx,
			id,
		)

	if err != nil {
		return nil, errors.New(
			"appointment not found",
		)
	}

	// --------------------------------------------------------
	// Update Doctor
	// --------------------------------------------------------

	if req.DoctorID != "" {

		_, err :=
			s.doctorRepo.GetByID(
				ctx,
				req.DoctorID,
			)

		if err != nil {
			return nil, errors.New(
				"doctor not found",
			)
		}

		doctorID, err :=
			primitive.ObjectIDFromHex(
				req.DoctorID,
			)

		if err != nil {
			return nil, errors.New(
				"invalid doctor id",
			)
		}

		appointment.DoctorID = doctorID

		// Appointment changed.
		// Allow reminder to be sent again.
		appointment.ReminderSent = false
	}

	// --------------------------------------------------------
	// Update Patient
	// --------------------------------------------------------

	if req.PatientID != "" {

		_, err :=
			s.patientRepo.GetByID(
				ctx,
				req.PatientID,
			)

		if err != nil {
			return nil, errors.New(
				"patient not found",
			)
		}

		patientID, err :=
			primitive.ObjectIDFromHex(
				req.PatientID,
			)

		if err != nil {
			return nil, errors.New(
				"invalid patient id",
			)
		}

		appointment.PatientID = patientID

		appointment.ReminderSent = false
	}

	// --------------------------------------------------------
	// Update Appointment Date
	// --------------------------------------------------------

	if !req.AppointmentDate.IsZero() {

		appointment.AppointmentDate =
			req.AppointmentDate

		// Date changed.
		// Allow reminder again.
		appointment.ReminderSent = false
	}

	// --------------------------------------------------------
	// Update Appointment Time
	// --------------------------------------------------------

	if req.AppointmentTime != "" {

		appointment.AppointmentTime =
			req.AppointmentTime

		// Time changed.
		// Allow reminder again.
		appointment.ReminderSent = false
	}

	// --------------------------------------------------------
	// Update Reason
	// --------------------------------------------------------

	if req.Reason != "" {

		appointment.Reason =
			req.Reason
	}

	// --------------------------------------------------------
	// Update Status
	// --------------------------------------------------------

	if req.Status != "" {

		appointment.Status =
			req.Status
	}

	appointment.UpdatedAt = time.Now()

	// --------------------------------------------------------
	// Save
	// --------------------------------------------------------

	err = s.appointmentRepo.Update(
		ctx,
		appointment,
	)

	if err != nil {
		return nil, err
	}

	return appointment, nil
}

// ============================================================
// DELETE APPOINTMENT
// ============================================================

func (s *appointmentService) DeleteAppointment(
	ctx context.Context,
	id string,
) error {

	// --------------------------------------------------------
	// Check Appointment Exists
	// --------------------------------------------------------

	_, err :=
		s.appointmentRepo.GetByID(
			ctx,
			id,
		)

	if err != nil {
		return errors.New(
			"appointment not found",
		)
	}

	// --------------------------------------------------------
	// Delete
	// --------------------------------------------------------

	return s.appointmentRepo.Delete(
		ctx,
		id,
	)
}

// ============================================================
// MARK REMINDER SENT
// ============================================================
//
// Called by:
//
// appointmentreminder/cron.go
//
// After Firebase notification succeeds:
//
// ReminderSent = true
//
// This prevents duplicate notifications.
//
// ============================================================

func (s *appointmentService) MarkReminderSent(
	ctx context.Context,
	id string,
) error {

	if id == "" {
		return errors.New(
			"appointment id is required",
		)
	}

	objectID, err :=
		primitive.ObjectIDFromHex(id)

	if err != nil {
		return errors.New(
			"invalid appointment ID",
		)
	}

	return s.appointmentRepo.MarkReminderSent(
		ctx,
		objectID,
	)
}

// ============================================================
// COMPILE-TIME SAFETY
// ============================================================

var _ AppointmentService = (*appointmentService)(nil)
