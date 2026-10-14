package module

import (
	"log"

	"github.com/gin-gonic/gin"
)

type Loader struct {
	modules []Module
}

func NewLoader() *Loader {
	return &Loader{
		modules: []Module{},
	}
}

func (l *Loader) Register(m Module) {
	l.modules = append(l.modules, m)
}

func (l *Loader) InitAll(ctx *ModuleContext) {
	for _, m := range l.modules {
		log.Println("🔌 Initializing module:", m.Name())

		if err := m.Init(ctx); err != nil {
			log.Fatalf("❌ Failed to init module %s: %v", m.Name(), err)
		}
	}
}

func (l *Loader) SetupRoutes(r *gin.Engine) {

	// 🔥 THIS WAS MISSING
	api := r.Group("/api")

	for _, m := range l.modules {

		log.Println("🚀 Registering routes for:", m.Name())

		group := api.Group("/" + m.Name())

		m.RegisterRoutes(group)
	}
}
