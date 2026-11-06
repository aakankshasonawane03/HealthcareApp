
package jobs

import (
	"context"
	"log"
	"time"

	"github.com/robfig/cron/v3"

	appointmentServicePackage "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/appointment/service"
	notificationServicePackage "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/notification/service"
)

type CronNotification struct {
	appointmentService appointmentServicePackage.AppointmentService
	notificationService *notificationServicePackage.Service
	cron                *cron.Cron
}

func NewCronNotification(
	appointmentService appointmentServicePackage.AppointmentService,
	notificationService *notificationServicePackage.Service,
) *CronNotification {

	return &CronNotification{
		appointmentService:  appointmentService,
		notificationService: notificationService,
		cron:                cron.New(),
	}
}

// START CRON

func (c *CronNotification) Start() {
	if c == nil {
		log.Println("Appointment reminder cron is nil")
		return
	}

	if c.appointmentService == nil {
		log.Println("Appointment service is not initialized")
		return
	}

	if c.notificationService == nil {
		log.Println("Notification service is not initialized")
		return
	}

	if c.cron == nil {
		c.cron = cron.New()
	}

	_, err := c.cron.AddFunc(
		"*/1 * * * *",
		c.sendAppointmentReminders,
	)

	if err != nil {
		log.Println("Failed to register notification cron:", err)
		return
	}

	c.cron.Start()

	log.Println("Appointment reminder cron started")
}

// STOP CRON

func (c *CronNotification) Stop() {
	if c == nil || c.cron == nil {
		return
	}

	ctx := c.cron.Stop()
	<-ctx.Done()

	log.Println("Appointment reminder cron stopped")
}

// SEND APPOINTMENT REMINDERS

func (c *CronNotification) sendAppointmentReminders() {
	if c == nil {
		return
	}

	ctx, cancel := context.WithTimeout(
		context.Background(),
		30*time.Second,
	)
	defer cancel()

	now := time.Now()

	// Find appointments scheduled approximately 30 minutes from now.
	startTime := now.Add(29 * time.Minute)
	endTime := now.Add(31 * time.Minute)

	appointments, err := c.appointmentService.GetUpcomingAppointments(
		ctx,
		startTime,
		endTime,
	)
	if err != nil {
		log.Println("Failed to get upcoming appointments:", err)
		return
	}

	for _, appointment := range appointments {
		if appointment.ReminderSent {
			continue
		}

		// Send notification.
		err := c.appointmentService.SendAppointmentReminder(
			ctx,
			appointment,
		)
		if err != nil {
			log.Printf(
				"Failed to send reminder for appointment %s: %v",
				appointment.ID.Hex(),
				err,
			)
			continue
		}

		// Mark reminder as sent.
		err = c.appointmentService.MarkReminderSent(
			ctx,
			appointment.ID,
		)
		if err != nil {
			log.Printf(
				"Reminder sent, but failed to update appointment %s: %v",
				appointment.ID.Hex(),
				err,
			)
			continue
		}

		log.Printf(
			"Appointment reminder sent successfully: %s",
			appointment.ID.Hex(),
		)
	}
}
