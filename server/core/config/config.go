package config

import (
	"log"
	"os"
	"strings"

	"github.com/joho/godotenv"
)

type Config struct {
	Port  string
	DBUri string
}

func Load() *Config {
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found, using environment variables")
	}

	return &Config{
		Port:  getEnv("PORT", "8080"),
		DBUri: getEnv("MONGO_URI", "mongodb://localhost:27017"),
	}
}

func getEnv(key string, fallback string) string {
	value := strings.TrimSpace(os.Getenv(key))

	if value != "" {
		return value
	}

	return fallback
}