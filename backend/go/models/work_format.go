package models

type WorkFormat struct {
    ID   uint   `json:"id"`
    Name string `json:"name"`
}

func (WorkFormat) TableName() string {
    return "work_format_workformat"
}