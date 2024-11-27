package models

type Profile struct {
	ID          uint   `json:"id"`
	IsCompleted bool `json:"is_completed"`
}

func (Profile) TableName() string {
	return "user_profile_profile"
}
