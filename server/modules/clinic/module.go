package clinic

import (
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"
	clinicHandler "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/clinic/handler"
	clinicRepository "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/clinic/repository"
	clinicService "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/clinic/service"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/middleware"
	"github.com/gin-gonic/gin"
)

const ModuleName = "clinic"

type Module struct {
	handler *clinicHandler.ClinicController
}

func NewModule() *Module {
	return &Module{}
}

func (m *Module) Name() string {
	return ModuleName
}

func (m *Module) Init(ctx *module.ModuleContext) error {
	collection := ctx.DB.Collection("clinics")

	repo := clinicRepository.NewClinicRepository(collection)
	service := clinicService.NewClinicService(repo)
	m.handler = clinicHandler.NewClinicController(service)

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
	protected := r.Group("/clinics")
	protected.Use(middleware.AuthMiddleware())

	protected.POST("/createclinic", m.handler.CreateClinic)
	protected.GET("/list", m.handler.GetAllClinics)
	protected.GET("/view/:id", m.handler.GetClinicByID)
	protected.PUT("/update/:id", m.handler.UpdateClinic)
	protected.DELETE("/delete/:id", m.handler.DeleteClinic)
}

// compile-time safety
var _ module.Module = (*Module)(nil)
