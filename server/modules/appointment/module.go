package appointment

import (
	"fmt"

	"github.com/gin-gonic/gin"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/middleware"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"

	jobs "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/cronnotification"

	appointmentHandler "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/appointment/handler"
	appointmentRepository "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/appointment/repository"
	appointmentService "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/appointment/service"

	doctorRepository "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/doctor/repository"
	notificationModule "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/notification"
	patientRepository "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/patients/repository"
)

const ModuleName = "appointment"

// Appointment handler interface
type appointmentHandlerInterface interface {
	CreateAppointment(c *gin.Context)
	GetAllAppointments(c *gin.Context)
	GetAppointmentByID(c *gin.Context)
	UpdateAppointment(c *gin.Context)
	DeleteAppointment(c *gin.Context)
}

type Module struct {
	handler          appointmentHandlerInterface
	cronNotification *jobs.CronNotification
}

func NewModule() *Module {
	return &Module{}
}

func (m *Module) Name() string {
	return ModuleName
}

// INIT MODULE

func (m *Module) Init(ctx *module.ModuleContext) error {
	if ctx == nil {
		return fmt.Errorf("%s module: module context is nil", ModuleName)
	}

	if ctx.DB == nil {
		return fmt.Errorf("%s module: database is not initialized", ModuleName)
	}

	if m.handler != nil {
		return fmt.Errorf("%s module: already initialized", ModuleName)
	}

	// MongoDB collections
	appointmentCollection := ctx.DB.Collection("appointments")
	doctorCollection := ctx.DB.Collection("doctors")
	patientCollection := ctx.DB.Collection("patients")

	// Initialize repositories
	appointmentRepo := appointmentRepository.NewAppointmentRepository(
		appointmentCollection,
	)

	doctorRepo := doctorRepository.NewDoctorRepository(
		doctorCollection,
	)

	patientRepo := patientRepository.NewPatientRepository(
		patientCollection,
	)

	// Get notification service
	notificationSvc := notificationModule.GetService()
	if notificationSvc == nil {
		return fmt.Errorf("%s module: notification service is not available", ModuleName)
	}

	// Initialize appointment service
	appointmentSvc := appointmentService.NewAppointmentService(
		appointmentRepo,
		doctorRepo,
		patientRepo,
		notificationSvc,
	)

	if appointmentSvc == nil {
		return fmt.Errorf("%s module: appointment service initialization failed", ModuleName)
	}

	// Initialize handler
	handler := appointmentHandler.NewHandler(appointmentSvc)
	if handler == nil {
		return fmt.Errorf("%s module: handler initialization failed", ModuleName)
	}

	// Initialize reminder cron
	cronNotification := jobs.NewCronNotification(
		appointmentSvc,
		notificationSvc,
	)

	if cronNotification == nil {
		return fmt.Errorf("%s module: cron initialization failed", ModuleName)
	}

	// Assign initialized dependencies
	m.handler = handler
	m.cronNotification = cronNotification

	// Start reminder cron
	m.cronNotification.Start()

	return nil
}

// REGISTER ROUTES

func (m *Module) RegisterRoutes(r *gin.RouterGroup) {
	if r == nil {
		panic("appointment module: router group is nil")
	}

	if m.handler == nil {
		panic("appointment module: handler is not initialized; call Init first")
	}

	// Health routes
	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": ModuleName + " module working",
		})
	})

	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status": "ok",
			"module": ModuleName,
		})
	})

	// Protected appointment routes
	protected := r.Group("/appointments")
	protected.Use(middleware.AuthMiddleware())

	protected.POST("/createappointment", m.handler.CreateAppointment)
	protected.GET("/list", m.handler.GetAllAppointments)
	protected.GET("/view/:id", m.handler.GetAppointmentByID)
	protected.PUT("/update/:id", m.handler.UpdateAppointment)
	protected.DELETE("/delete/:id", m.handler.DeleteAppointment)
}

var _ module.Module = (*Module)(nil)
