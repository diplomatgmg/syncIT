package services

import (
	"backend/go/db"
	"backend/go/models"
	"sort"
)

func sortChildren(children []models.HardSkill) {
	for i := range children {
		// Сортируем дочерние элементы текущей ноды
		sort.Slice(children, func(i, j int) bool {
			return children[i].Name < children[j].Name
		})
		// Рекурсивно сортируем детей
		if len(children[i].Children) > 0 {
			sortChildren(children[i].Children)
		}
	}
}

func GetHardSkills() ([]models.HardSkill, error) {
	var hardSkills []models.HardSkill
	err := db.DB.Preload("Children.Children.Children.Children").Where("parent_id IS NULL").Order("ordering").Find(&hardSkills).Error
	if err != nil {
		return nil, err
	}

	// Сортируем только children
	for i := range hardSkills {
		if len(hardSkills[i].Children) > 0 {
			sortChildren(hardSkills[i].Children)
		}
	}
	return hardSkills, nil
}
