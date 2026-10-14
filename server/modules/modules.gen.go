package wiring

import (
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/Consultation"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/admin"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/appointment"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/clinic"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/doctor"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/medicalrecord"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/notification"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/patients"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/prescription"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/queue"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/schedule"
)

func LoadModules() []module.Module {
	return []module.Module{
		notification.NewModule(),
		appointment.NewModule(),
		admin.NewModule(),
		auth.NewModule(),
		doctor.NewModule(),
		patients.NewModule(),
		clinic.NewModule(),
		queue.NewModule(),
		Consultation.NewModule(),
		medicalrecord.NewModule(),
		prescription.NewModule(),
		schedule.NewModule(),
	}
}
