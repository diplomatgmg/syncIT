package models

type HardSkill struct {
    ID        uint        `json:"id"`
    Name      string      `json:"name"`
    Selectable bool       `json:"selectable"`
    ParentID  *uint       `json:"-"`
    Parent    *HardSkill  `json:"-"`
    Children  []HardSkill `json:"children" gorm:"foreignKey:ParentID"`
}

func (HardSkill) TableName() string {
	return "hard_skill_hardskill"
}
