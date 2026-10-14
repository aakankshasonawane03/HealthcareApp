package schedule

import (
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"
	scheduleHandler "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/schedule/handler"
	scheduleRepository "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/schedule/repository"
	scheduleService "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/schedule/service"

	"github.com/gin-gonic/gin"
)

const ModuleName = "schedule"

type Module struct {
	handler *scheduleHandler.ScheduleHandler
}

func NewModule() *Module {
	return &Module{}
}

func (m *Module) Name() string {
	return ModuleName
}

func (m *Module) Init(ctx *module.ModuleContext) error {

	collection := ctx.DB.Collection("doctor_schedules")

	repo := scheduleRepository.NewScheduleRepository(collection)

	service := scheduleService.NewScheduleService(repo)

	m.handler = scheduleHandler.NewScheduleHandler(service)

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
	protected := r.Group("/schedules")
	// protected.Use(middleware.AuthMiddleware())

	protected.POST("/createschedule", m.handler.Create)

	protected.GET("/listschedule", m.handler.GetAll)

	protected.GET("/viewschedule/:id", m.handler.GetByID)

	protected.GET("/doctorschedule/:doctorId", m.handler.GetByDoctorID)

	protected.GET("/clinicschedule/:clinicId", m.handler.GetByClinicID)

	protected.PUT("/updateschedule/:id", m.handler.Update)

	protected.DELETE("/deleteschedule/:id", m.handler.Delete)
}

// compile-time safety
var _ module.Module = (*Module)(nil)
