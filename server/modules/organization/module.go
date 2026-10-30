package organization

import (
	"context"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/authorization"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"
	authMiddleware "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/middleware"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/organization/handler"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/organization/repository"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/organization/service"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const ModuleName = "organization"

type Module struct {
	handler *handler.OrganizationHandler
}

func NewModule() *Module {
	return &Module{}
}

func (m *Module) Name() string {
	return ModuleName
}

func (m *Module) Init(ctx *module.ModuleContext) error {
	collection := ctx.DB.Collection("organizations")

	// Enforce one organization per owner at the database level too.
	// This prevents concurrent requests from creating duplicates.
	_, err := collection.Indexes().CreateOne(
		context.Background(),
		mongo.IndexModel{
			Keys: bson.D{{Key: "owner_user_id", Value: 1}},
			Options: options.Index().
				SetUnique(true).
				SetName("unique_organization_owner"),
		},
	)
	if err != nil {
		return err
	}

	repo := repository.NewOrganizationRepository(collection)
	orgService := service.NewOrganizationService(repo)
	m.handler = handler.NewOrganizationHandler(orgService)

	return nil
}

func (m *Module) RegisterRoutes(r *gin.RouterGroup) {
	protected := r.Group("")
	protected.Use(authMiddleware.AuthMiddleware())

	// Only a DOCTOR can create an organization or retrieve their own.
	protected.POST(
		"/create",
		authorization.RequireRoles("DOCTOR"),
		m.handler.Create,
	)

	protected.GET(
		"/me",
		authorization.RequireRoles("DOCTOR"),
		m.handler.GetMine,
	)
}

var _ module.Module = (*Module)(nil)
