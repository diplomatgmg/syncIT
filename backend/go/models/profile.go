package models

// Костылище. gorm пытается обратиться к hard_skill_id, а не hardskill_id
type Hardskill struct {
	ID   uint   `json:"id"`
	Name string `json:"name"`
}

type Workformat struct {
	ID   uint   `json:"id"`
	Name string `json:"name"`
}
type Profile struct {
	ID          uint         `json:"id"`
	Grades      []Grade      `json:"grades" gorm:"many2many:user_profile_profile_grades"`
	Professions []Profession `json:"professions" gorm:"many2many:user_profile_profile_professions"`
	HardSkills  []Hardskill  `json:"hardSkills" gorm:"many2many:user_profile_profile_hard_skills"`
	WorkFormats []Workformat `json:"workFormats" gorm:"many2many:user_profile_profile_work_formats"`
}

func (Profile) TableName() string {
	return "user_profile_profile"
}

func (Hardskill) TableName() string {
	return "hard_skill_hardskill"
}

func (Workformat) TableName() string {
	return "work_format_workformat"
}
