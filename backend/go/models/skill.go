package models

type Skill struct {
	ID         uint    `json:"id"`
	Name       string  `json:"name"`
	Selectable bool    `json:"selectable"`
	ParentID   *uint   `json:"-"`
	Parent     *Skill  `json:"-"`
	Children   []Skill `json:"children" gorm:"foreignKey:ParentID"`
}

func (Skill) TableName() string {
	return "skill_skill"
}
