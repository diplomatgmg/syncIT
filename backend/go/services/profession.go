package services

import (
	"backend/go/db"
	"backend/go/models"
)

func GetAllProfessions() ([]models.Profession, error) {
	var professions []models.Profession
	err := db.DB.Order("ordering").Find(&professions).Error
	return professions, err
}
