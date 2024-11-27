package services

import (
	"backend/go/db"
	"backend/go/models"
)

func GetHardSkills() ([]models.HardSkill, error) {
	var hardSkills []models.HardSkill
	err := db.DB.Preload("Children.Children.Children.Children").Where("parent_id IS NULL").Find(&hardSkills).Error
	if err != nil {
		return nil, err
	}
	return hardSkills, nil
}
