package doctor

import (
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"
	authMiddleware "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/middleware"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/doctor/handler"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/doctor/repository"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/doctor/service"
	"github.com/gin-gonic/gin"
)

const ModuleName = "doctor"

type Module struct {
	handler *handler.DoctorHandler
}

func NewModule() *Module {
	return &Module{}
}

func (m *Module) Name() string {
	return ModuleName
}

func (m *Module) Init(ctx *module.ModuleContext) error {

	// MongoDB doctors collection
	collection := ctx.DB.Collection("doctors")

	// Repository
	repo := repository.NewDoctorRepository(collection)

	// Service
	doctorService := service.NewDoctorService(repo)

	// Handler
	m.handler = handler.NewDoctorHandler(doctorService)

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

	// Protected doctor routes
	protected := r.Group("/doctors")
	protected.Use(authMiddleware.AuthMiddleware())

	protected.POST("/createdoctor", m.handler.CreateDoctor)
	protected.GET("/listdoctors", m.handler.GetAllDoctors)
	protected.GET("/viewdoctor/:id", m.handler.GetDoctorByID)
	protected.PUT("/updatedoctor/:id", m.handler.UpdateDoctor)
	protected.DELETE("/deletedoctor/:id", m.handler.DeleteDoctor)
}

// Compile-time safety
var _ module.Module = (*Module)(nil)
