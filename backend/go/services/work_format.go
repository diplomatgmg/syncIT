package services

import (
    "backend/go/models"
    "backend/go/db"
)

func GetAllWorkFormats() ([]models.WorkFormat, error) {
    var workFormats []models.WorkFormat
    err := db.DB.Find(&workFormats).Error
    return workFormats, err
}
