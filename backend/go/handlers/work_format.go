package handlers

import (
	"backend/go/services"
	"encoding/json"
	"net/http"
)

func GetWorkFormats(w http.ResponseWriter, r *http.Request) {
	workFormats, err := services.GetAllWorkFormats()
	if err != nil {
		http.Error(w, "Failed to fetch work formats", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(workFormats)
}
