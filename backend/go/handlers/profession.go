package handlers

import (
	"backend/go/services"
	"encoding/json"
	"net/http"
)

func GetProfessions(w http.ResponseWriter, r *http.Request) {
	professions, err := services.GetAllProfessions()
	if err != nil {
		http.Error(w, "Failed to fetch grades", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(professions)
}
