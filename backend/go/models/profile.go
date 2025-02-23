package models

// Костылище. gorm пытается обратиться к work_format_id, а не workformat_id
type Workformat struct {
	ID   uint   `json:"id"`
	Name string `json:"name"`
}
type Profile struct {
	ID          uint         `json:"id"`
	Grades      []Grade      `json:"grades" gorm:"many2many:user_profile_profile_grades"`
	Professions []Profession `json:"professions" gorm:"many2many:user_profile_profile_professions"`
	Skills      []Skill      `json:"skills" gorm:"many2many:user_profile_profile_skills"`
	WorkFormats []Workformat `json:"workFormats" gorm:"many2many:user_profile_profile_work_formats"`
}

type ProfileReference struct {
	Grades      []Grade      `json:"grades"`
	WorkFormats []WorkFormat `json:"workFormats"`
	Professions []Profession `json:"professions"`
	Skills      []Skill      `json:"skills"`
}

func (Profile) TableName() string {
	return "user_profile_profile"
}

func (Workformat) TableName() string {
	return "work_format_workformat"
}
