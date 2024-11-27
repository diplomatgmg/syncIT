package services

import (
	"backend/go/db"
	"backend/go/models"
)

func GetAllWorkFormats() ([]models.WorkFormat, error) {
	var workFormats []models.WorkFormat
	err := db.DB.Find(&workFormats).Error
	return workFormats, err
}
