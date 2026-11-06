package doctor

import (
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"
	authMiddleware "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/middleware"
	doctorHandler "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/doctor/handler"
	doctorRepository "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/doctor/repository"
	doctorService "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/doctor/service"
	organizationRepository "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/organization/repository"
	organizationService "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/organization/service"

	"github.com/gin-gonic/gin"
)

const ModuleName = "doctor"

type Module struct {
	handler *doctorHandler.DoctorHandler
}

func NewModule() *Module {
	return &Module{}
}

func (m *Module) Name() string {
	return ModuleName
}

func (m *Module) Init(ctx *module.ModuleContext) error {
	// MongoDB collections
	doctorCollection := ctx.DB.Collection("doctors")
	organizationCollection := ctx.DB.Collection("organizations")

	// Doctor repository
	doctorRepo := doctorRepository.NewDoctorRepository(doctorCollection)

	// Organization repository
	orgRepo := organizationRepository.NewOrganizationRepository(organizationCollection)

	// Organization service
	orgService := organizationService.NewOrganizationService(orgRepo)

	// Doctor service
	docService := doctorService.NewDoctorService(doctorRepo)

	// Doctor handler
	m.handler = doctorHandler.NewDoctorHandler(docService, orgService)

	return nil
}

func (m *Module) RegisterRoutes(r *gin.RouterGroup) {
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

	protected := r.Group("/doctors")
	protected.Use(authMiddleware.AuthMiddleware())

	protected.POST("/createdoctor", m.handler.CreateDoctor)
	protected.GET("/listdoctors", m.handler.GetAllDoctors)
	protected.GET("/viewdoctor/:id", m.handler.GetDoctorByID)
	protected.PUT("/updatedoctor/:id", m.handler.UpdateDoctor)
	protected.DELETE("/deletedoctor/:id", m.handler.DeleteDoctor)
}

var _ module.Module = (*Module)(nil)
