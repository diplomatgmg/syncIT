package services

import (
	"backend/go/db"
	"backend/go/models"
)

func GetAllGrades() ([]models.Grade, error) {
	var grades []models.Grade
	err := db.DB.Find(&grades).Order("order").Error
	return grades, err
}
