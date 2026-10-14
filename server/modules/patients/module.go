package patients

import (
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/middleware"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/patients/handler"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/patients/repository"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/patients/service"

	"github.com/gin-gonic/gin"
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

	collection := ctx.DB.Collection("patients")

	repo := repository.NewPatientRepository(collection)

	patientService := service.NewPatientService(repo)

	m.handler = handler.NewPatientHandler(patientService)

	return nil
}

func (m *Module) RegisterRoutes(r *gin.RouterGroup) {

	// =========================
	// PUBLIC ROUTES
	// =========================

	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": ModuleName + " module working 🚀",
		})
	})

	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status": "ok",
			"module": ModuleName,
		})
	})

	// =========================
	// PROTECTED ROUTES
	// =========================

	protected := r.Group("")
	protected.Use(middleware.AuthMiddleware())

	{
		protected.POST(
			"/createpatient",
			m.handler.CreatePatient,
		)

		protected.GET(
			"/listpatients",
			m.handler.GetAllPatients,
		)

		protected.GET(
			"/viewpatient/:id",
			m.handler.GetPatientByID,
		)

		protected.PUT(
			"/updatepatient/:id",
			m.handler.UpdatePatient,
		)

		protected.DELETE(
			"/deletepatient/:id",
			m.handler.DeletePatient,
		)
	}
}

// Compile-time safety
var _ module.Module = (*Module)(nil)
