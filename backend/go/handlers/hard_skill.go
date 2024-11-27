package handlers

import (
	"backend/go/services"
	"encoding/json"
	"net/http"
)

func GetHardSkills(w http.ResponseWriter, r *http.Request) {
	hardSkills, err := services.GetHardSkills()
	if err != nil {
		http.Error(w, "Failed to fetch hark skills", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(hardSkills)
}
