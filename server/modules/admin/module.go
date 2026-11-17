
package admin

import (
	"github.com/gin-gonic/gin"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"

	adminHandler "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/admin/handler"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/admin/repository"
	adminService "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/admin/service"

	adminMiddleware "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/admin/middleware"
	authMiddleware "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/middleware"
	authrepository "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/repository"
	authservice "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/service"
)

const ModuleName = "admin"

type Module struct {
	handler *adminHandler.AdminHandler
}

func NewModule() *Module {
	return &Module{}
}

func (m *Module) Name() string {
	return ModuleName
}

func (m *Module) Init(ctx *module.ModuleContext) error {
	// MongoDB collections.
	usersCollection := ctx.DB.Collection("users")
	doctorsCollection := ctx.DB.Collection("doctors")
	patientsCollection := ctx.DB.Collection("patients")
	clinicsCollection := ctx.DB.Collection("clinics")
	appointmentsCollection := ctx.DB.Collection("appointments")
	refreshTokenCollection := ctx.DB.Collection("refresh_tokens")
	organizationsCollection := ctx.DB.Collection("organizations")

	// Initialize Admin repository.
	adminRepository := repository.NewAdminRepository(
		usersCollection,
		doctorsCollection,
		patientsCollection,
		clinicsCollection,
		appointmentsCollection,
		organizationsCollection,
	)

	// Initialize Auth repository and service.
	authRepo := authrepository.NewUserRepository(
		usersCollection,
		refreshTokenCollection,
	)

	authSvc := authservice.NewAuthService(authRepo)

	// Initialize Admin service.
	adminSvc := adminService.NewAdminService(
		adminRepository,
		authSvc,
	)

	// Initialize Admin handler.
	m.handler = adminHandler.NewAdminHandler(adminSvc)

	return nil
}

func (m *Module) RegisterRoutes(r *gin.RouterGroup) {
	admin := r.Group("")

	// All Admin APIs require authentication and ADMIN role.
	admin.Use(authMiddleware.AuthMiddleware())
	admin.Use(adminMiddleware.AdminMiddleware())

	// Dashboard.
	admin.GET("/dashboard", m.handler.Dashboard)

	// Users.
	admin.GET("/users", m.handler.GetUsers)
	admin.PUT("/users/:id/status", m.handler.UpdateUserStatus)

	// Doctors and patients.
	admin.GET("/doctors", m.handler.GetDoctors)
	admin.GET("/patients", m.handler.GetPatients)

	// Admin clinic management.
	admin.GET("/clinics", m.handler.GetClinics)
	admin.POST("/clinics", m.handler.CreateClinic)
	admin.PUT("/clinics/:id", m.handler.UpdateClinic)
	admin.DELETE("/clinics/:id", m.handler.DeleteClinic)

	// Create organization and its owner in one request.
	admin.POST("/organizations", m.handler.CreateOrganization)

	// Legacy endpoint: creates an owner without an organization.
	// Keep only while this separate workflow is still required.
	admin.POST(
		"/users/organization-owner",
		m.handler.CreateOrganizationOwner,
	)

	// Appointments.
	admin.GET("/appointments", m.handler.GetAppointments)
}

var _ module.Module = (*Module)(nil)
