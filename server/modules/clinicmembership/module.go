package clinicmembership

import (
	"context"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/middleware"
	membershipHandler "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/clinicmembership/handler"
	membershipRepository "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/clinicmembership/repository"
	membershipService "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/clinicmembership/service"
	"github.com/gin-gonic/gin"
)

const ModuleName = "clinicmembership"

type Module struct {
	handler *membershipHandler.ClinicMembershipController
}

func NewModule() *Module {
	return &Module{}
}

func (m *Module) Name() string {
	return ModuleName
}

func (m *Module) Init(ctx *module.ModuleContext) error {
	membershipCollection := ctx.DB.Collection("clinic_memberships")
	clinicCollection := ctx.DB.Collection("clinics")
	organizationCollection := ctx.DB.Collection("organizations")
	userCollection := ctx.DB.Collection("users")

	repo := membershipRepository.NewClinicMembershipRepository(
		membershipCollection,
		clinicCollection,
		organizationCollection,
		userCollection,
	)

	// Create the unique index for user_id + clinic_id.
	if err := repo.CreateIndexes(context.Background()); err != nil {
		return err
	}

	svc := membershipService.NewClinicMembershipService(repo)

	m.handler = membershipHandler.NewClinicMembershipController(svc)

	return nil
}

func (m *Module) RegisterRoutes(r *gin.RouterGroup) {
	protected := r.Group("/clinics")
	protected.Use(middleware.AuthMiddleware())

	protected.POST(
		"/:clinicId/members",
		m.handler.AddMember,
	)

	protected.GET(
		"/:clinicId/members",
		m.handler.GetMembers,
	)

	protected.GET(
		"/:clinicId/members/me",
		m.handler.GetMyMembership,
	)

	protected.PUT(
		"/:clinicId/members/:userId",
		m.handler.UpdateMember,
	)

	protected.DELETE(
		"/:clinicId/members/:userId",
		m.handler.DeactivateMember,
	)
}

var _ module.Module = (*Module)(nil)