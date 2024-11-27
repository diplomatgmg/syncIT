package services

import (
	"backend/go/db"
	"backend/go/models"
)

func GetProfile(userID int) (models.Profile, error) {
	var profile models.Profile
	err := db.DB.Where("user_id = ?", userID).First(&profile).Error
	return profile, err
}
