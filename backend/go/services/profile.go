package services

import (
	"backend/go/db"
	"backend/go/models"
)

func GetProfile(profileID int) (models.Profile, error) {
	var profile models.Profile
	err := db.DB.
		Preload("Grades").
		Preload("Professions").
		Preload("HardSkills").
		Preload("WorkFormats").
		Where("id = ?", profileID).
		First(&profile).Error
	return profile, err
}
