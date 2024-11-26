package services

import (
    "backend/go/models"
    "backend/go/db"
)

func GetAllGrades() ([]models.Grade, error) {
    var grades []models.Grade
    err := db.DB.Find(&grades).Error
    return grades, err
}
