package authorization

const (
	UsersRead          = "users.read"
	UsersManage        = "users.manage"
	ClinicsRead        = "clinics.read"
	ClinicsManage      = "clinics.manage"
	MedicalRecordsRead = "medicalrecords.read"
)

// This is a starter policy, not a per-admin permission system.
// Replace it with a lookup from trusted permission storage.
func HasAdminPermission(p Principal, permission string) bool {
	if p.Role != "ADMIN" {
		return false
	}

	switch permission {
	case UsersRead, UsersManage,
		ClinicsRead, ClinicsManage:
		return true
	default:
		return false
	}
}
