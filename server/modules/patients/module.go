package patients

import (
	"github.com/gin-gonic/gin"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/authorization"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"
	authMiddleware "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/middleware"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/patients/handler"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/patients/repository"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/patients/service"
)

const ModuleName = "patients"

type Module struct {
	handler *handler.PatientHandler
}

func NewModule() *Module {
	return &Module{}
}

func (m *Module) Name() string {
	return ModuleName
}

func (m *Module) Init(ctx *module.ModuleContext) error {
	// MongoDB collection
	patientCollection := ctx.DB.Collection("patients")

	// Initialize repository and service
	repo := repository.NewPatientRepository(patientCollection)
	patientService := service.NewPatientService(repo)

	// Initialize handler
	m.handler = handler.NewPatientHandler(patientService)

	return nil
}

func (m *Module) RegisterRoutes(r *gin.RouterGroup) {
	// Public health routes
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

	// Authentication middleware
	protected := r.Group("")
	protected.Use(authMiddleware.AuthMiddleware())

	// Only administrators can create patient records
	protected.POST(
		"/createpatient",
		authorization.RequireRoles("ADMIN"),
		m.handler.CreatePatient,
	)

	// Only administrators can list all patient records
	protected.GET(
		"/listpatients",
		authorization.RequireRoles("ADMIN"),
		m.handler.GetAllPatients,
	)

	// Administrators and doctors can view patient records.
	// Ensure ownership/clinic access is checked in the service or handler.
	protected.GET(
		"/viewpatient/:id",
		authorization.RequireRoles("ADMIN", "DOCTOR"),
		m.handler.GetPatientByID,
	)
	protected.GET(
		"/me",
		authorization.RequireRoles("PATIENT"),
		m.handler.GetMyPatient,
	)
	// Patients can create their own profile
	protected.POST(
		"/me/profile",
		authorization.RequireRoles("PATIENT"),
		m.handler.CreateMyPatientProfile,
	)

	// Only administrators can update or delete patient records
	protected.PUT(
		"/updatepatient/:id",
		authorization.RequireRoles("ADMIN"),
		m.handler.UpdatePatient,
	)

	protected.DELETE(
		"/deletepatient/:id",
		authorization.RequireRoles("ADMIN"),
		m.handler.DeletePatient,
	)

}

var _ module.Module = (*Module)(nil)
