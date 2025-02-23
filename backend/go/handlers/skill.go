package handlers

import (
	"backend/go/services"
	"encoding/json"
	"net/http"
)

func GetSkills(w http.ResponseWriter, r *http.Request) {
	skills, err := services.GetSkills()
	if err != nil {
		http.Error(w, "Failed to fetch skills", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(skills)
}
