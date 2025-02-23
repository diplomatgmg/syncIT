package services

import (
	"backend/go/db"
	"backend/go/models"
	"sort"
)

func sortChildren(children []models.Skill) {
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

func GetSkills() ([]models.Skill, error) {
	var skills []models.Skill
	err := db.DB.Preload("Children.Children.Children.Children").Where("parent_id IS NULL").Order("ordering").Find(&skills).Error
	if err != nil {
		return nil, err
	}

	// Сортируем только children
	for i := range skills {
		if len(skills[i].Children) > 0 {
			sortChildren(skills[i].Children)
		}
	}
	return skills, nil
}
