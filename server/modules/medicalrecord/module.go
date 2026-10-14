package medicalrecord

import (
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/middleware"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/medicalrecord/handler"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/medicalrecord/repository"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/medicalrecord/service"
	"github.com/gin-gonic/gin"
)

const ModuleName = "medicalrecord"

type Module struct {
	controller *handler.MedicalRecordController
}

func NewModule() *Module {
	return &Module{}
}

func (m *Module) Name() string {
	return ModuleName
}

func (m *Module) Init(ctx *module.ModuleContext) error {

	// MongoDB collection
	collection := ctx.DB.Collection("medical_records")

	// Repository
	repo := repository.NewMedicalRecordRepository(collection)

	// Service
	medicalRecordService := service.NewMedicalRecordService(repo)

	// Controller
	m.controller = handler.NewMedicalRecordController(
		medicalRecordService,
	)

	return nil
}

func (m *Module) RegisterRoutes(r *gin.RouterGroup) {

	// Module test route
	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": ModuleName + " module working 🚀",
		})
	})

	// Health check
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status": "ok",
			"module": ModuleName,
		})
	})

	// Protected medical record routes
	protected := r.Group("/medicalrecords")
	protected.Use(middleware.AuthMiddleware())

	// Create
	protected.POST(
		"/createschedule",
		m.controller.CreateMedicalRecord,
	)

	// Get all
	protected.GET(
		"/listschedule",
		m.controller.GetAllMedicalRecords,
	)

	// Get by ID
	protected.GET(
		"/view/:id",
		m.controller.GetMedicalRecordByID,
	)

	// Get by patient ID
	protected.GET(
		"/patient/:patient_id",
		m.controller.GetByPatientID,
	)

	// Get by doctor ID
	protected.GET(
		"/doctor/:doctor_id",
		m.controller.GetByDoctorID,
	)

	// Get by consultation ID
	protected.GET(
		"/consultation/:consultation_id",
		m.controller.GetByConsultationID,
	)

	// Update
	protected.PUT(
		"/update/:id",
		m.controller.UpdateMedicalRecord,
	)

	// Delete
	protected.DELETE(
		"/delete/:id",
		m.controller.DeleteMedicalRecord,
	)
}

// Compile-time safety
var _ module.Module = (*Module)(nil)