package Consultation

import (
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"

	consultationHandler "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/Consultation/handler"
	consultationRepository "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/Consultation/repository"
	consultationService "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/Consultation/service"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/middleware"

	"github.com/gin-gonic/gin"
)

const ModuleName = "consultation"

type Module struct {
	handler *consultationHandler.ConsultationController
}

func NewModule() *Module {
	return &Module{}
}

func (m *Module) Name() string {
	return ModuleName
}

func (m *Module) Init(ctx *module.ModuleContext) error {

	collection := ctx.DB.Collection("consultations")

	repo := consultationRepository.NewConsultationRepository(
		collection,
	)

	service := consultationService.NewConsultationService(
		repo,
	)

	m.handler = consultationHandler.NewConsultationController(
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

	protected := r.Group("/consultations")
	protected.Use(middleware.AuthMiddleware())

	protected.POST(
		"/create",
		m.handler.CreateConsultation,
	)

	protected.GET(
		"/list",
		m.handler.GetAllConsultations,
	)

	protected.GET(
		"/view/:id",
		m.handler.GetConsultationByID,
	)

	protected.GET(
		"/appointment/:appointmentId",
		m.handler.GetByAppointment,
	)

	protected.GET(
		"/patient/:patientId",
		m.handler.GetByPatient,
	)

	protected.GET(
		"/doctor/:doctorId",
		m.handler.GetByDoctor,
	)

	protected.GET(
		"/clinic/:clinicId",
		m.handler.GetByClinic,
	)

	protected.PUT(
		"/update/:id",
		m.handler.UpdateConsultation,
	)

	protected.PUT(
		"/status/:id",
		m.handler.UpdateStatus,
	)

	protected.DELETE(
		"/delete/:id",
		m.handler.DeleteConsultation,
	)
}

// compile-time safety
var _ module.Module = (*Module)(nil)
