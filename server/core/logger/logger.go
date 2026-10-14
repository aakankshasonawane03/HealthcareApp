package logger

import "log"

type Logger struct{}

func New() *Logger {
	return &Logger{}
}

func (l *Logger) Info(msg string) {
	log.Println("[INFO]", msg)
}

func (l *Logger) Error(msg string) {
	log.Println("[ERROR]", msg)
}

func (l *Logger) Debug(msg string) {
	log.Println("[DEBUG]", msg)
}
