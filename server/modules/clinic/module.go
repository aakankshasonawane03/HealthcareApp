package clinic

import (
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/middleware"
	clinicHandler "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/clinic/handler"
	clinicRepository "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/clinic/repository"
	clinicService "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/clinic/service"
	organizationRepository "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/organization/repository"
	organizationService "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/organization/service"

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
	// MongoDB collections
	clinicCollection := ctx.DB.Collection("clinics")
	organizationCollection := ctx.DB.Collection("organizations")

	// Clinic repository and service
	clinicRepo := clinicRepository.NewClinicRepository(clinicCollection)
	clinicSvc := clinicService.NewClinicService(clinicRepo)

	// Organization repository and service
	orgRepo := organizationRepository.NewOrganizationRepository(
		organizationCollection,
	)
	orgSvc := organizationService.NewOrganizationService(orgRepo)

	// Initialize clinic handler with both services
	m.handler = clinicHandler.NewClinicController(
		clinicSvc,
		orgSvc,
	)

	return nil
}

func (m *Module) RegisterRoutes(r *gin.RouterGroup) {
	// Public module health routes
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

	// Protected clinic routes
	protected := r.Group("/clinics")
	protected.Use(middleware.AuthMiddleware())

	protected.POST("/createclinic", m.handler.CreateClinic)
	protected.GET("/list", m.handler.GetAllClinics)
	protected.GET("/view/:id", m.handler.GetClinicByID)
	protected.PUT("/update/:id", m.handler.UpdateClinic)
	protected.DELETE("/delete/:id", m.handler.DeleteClinic)
}

// Compile-time interface check
var _ module.Module = (*Module)(nil)