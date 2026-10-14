package prescription

import (
	"github.com/gin-gonic/gin"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/middleware"

	prescriptionHandler "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/prescription/handler"
	prescriptionRepository "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/prescription/repository"
	prescriptionService "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/prescription/service"
)

const ModuleName = "prescription"

type Module struct {
	handler *prescriptionHandler.PrescriptionController
}

func NewModule() *Module {
	return &Module{}
}

func (m *Module) Name() string {
	return ModuleName
}

func (m *Module) Init(ctx *module.ModuleContext) error {

	collection := ctx.DB.Collection("prescriptions")

	repo := prescriptionRepository.NewPrescriptionRepository(
		collection,
	)

	service := prescriptionService.NewPrescriptionService(
		repo,
	)

	m.handler = prescriptionHandler.NewPrescriptionController(
		service,
	)

	return nil
}

func (m *Module) RegisterRoutes(r *gin.RouterGroup) {

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

	protected := r.Group("/prescriptions")
	protected.Use(middleware.AuthMiddleware())

	protected.POST(
		"/createprescriptions",
		m.handler.CreatePrescription,
	)

	protected.GET(
		"/listprescriptions",
		m.handler.GetAllPrescriptions,
	)

	protected.GET(
		"/viewprescriptions/:id",
		m.handler.GetPrescriptionByID,
	)

	protected.GET(
		"/consultationprescriptions/:consultationId",
		m.handler.GetByConsultation,
	)

	protected.GET(
		"/patientprescriptions/:patientId",
		m.handler.GetByPatient,
	)

	protected.GET(
		"/doctorprescriptions/:doctorId",
		m.handler.GetByDoctor,
	)

	protected.GET(
		"/clinicprescriptions/:clinicId",
		m.handler.GetByClinic,
	)

	protected.PUT(
		"/updateprescriptions/:id",
		m.handler.UpdatePrescription,
	)

	protected.DELETE(
		"/deleteprescriptions/:id",
		m.handler.DeletePrescription,
	)
}

var _ module.Module = (*Module)(nil)