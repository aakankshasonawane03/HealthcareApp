package main

import (
	"log"

	"github.com/gin-gonic/gin"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/config"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/config/database"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/events"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/middleware"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"

	modules "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules"
)

func main() {
	// Load configuration
	cfg := config.Load()

	// Connect MongoDB
	db := database.Connect(cfg)

	// Initialize event bus
	bus := events.New()

	// Initialize Firebase
	firebaseClient, err := config.InitFirebase()
	if err != nil {
		log.Fatalf("Failed to initialize Firebase: %v", err)
	}

	log.Println("Firebase initialized successfully")

	// Start notification scheduler after Firebase succeeds
	// Create module context
	ctx := &module.ModuleContext{
		DB:             db,
		Config:         cfg,
		EventBus:       bus,
		FirebaseClient: firebaseClient,
	}

	// Configure Gin
	gin.SetMode(gin.ReleaseMode)

	r := gin.New()
	if err := r.SetTrustedProxies([]string{"127.0.0.1", "::1"}); err != nil {
		log.Fatalf("Failed to set trusted proxies: %v", err)
	}

	r.Use(
		middleware.Recovery(),
		middleware.Logger(),
		middleware.CORS(),
		middleware.SecurityHeaders(),
		middleware.RateLimit(),
	)

	// Register modules
	loader := module.NewLoader()
	for _, m := range modules.LoadModules() {
		loader.Register(m)
	}

	// Initialize modules and register routes
	loader.InitAll(ctx)
	loader.SetupRoutes(r)

	// Start server
	log.Printf("Server running on :%s", cfg.Port)
	if err := r.Run(":" + cfg.Port); err != nil {
		log.Fatal(err)
	}
}
