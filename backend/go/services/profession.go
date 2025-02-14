package services

import (
	"backend/go/db"
	"backend/go/models"
)

func GetAllProfessions() ([]models.Profession, error) {
	var professions []models.Profession
	err := db.DB.Find(&professions).Order("order").Error
	return professions, err
}
