package queue

import (
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"

	queueHandler "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/queue/handler"
	queueRepository "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/queue/repository"
	queueService "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/queue/service"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/middleware"

	"github.com/gin-gonic/gin"
)

const ModuleName = "queue"

type Module struct {
	handler *queueHandler.QueueController
}

func NewModule() *Module {
	return &Module{}
}

func (m *Module) Name() string {
	return ModuleName
}

func (m *Module) Init(ctx *module.ModuleContext) error {

	collection := ctx.DB.Collection("queues")

	repo := queueRepository.NewQueueRepository(
		collection,
	)

	service := queueService.NewQueueService(
		repo,
	)

	m.handler = queueHandler.NewQueueController(
		service,
	)

	return nil
}

func (m *Module) RegisterRoutes(r *gin.RouterGroup) {

	protected := r.Group("/queues")
	protected.Use(middleware.AuthMiddleware())

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

	protected.POST("/create", m.handler.CreateQueue)

	protected.GET("/list", m.handler.GetAllQueues)

	protected.GET("/view/:id", m.handler.GetQueueByID)

	protected.GET(
		"/appointment/:appointmentId",
		m.handler.GetQueueByAppointment,
	)

	protected.GET(
		"/doctor/:doctorId",
		m.handler.GetDoctorQueue,
	)

	protected.GET(
		"/patient/:patientId",
		m.handler.GetPatientQueue,
	)

	protected.GET(
		"/clinicqueue/:clinicId",
		m.handler.GetClinicQueue,
	)

	protected.PUT(
		"/status/:id",
		m.handler.UpdateQueueStatus,
	)

	protected.DELETE(
		"/delete/:id",
		m.handler.DeleteQueue,
	)
}

// compile-time safety
var _ module.Module = (*Module)(nil)
