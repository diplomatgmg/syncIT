package handlers

import (
	"backend/go/models"
	"backend/go/services"
	"encoding/json"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

func GetProfile(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	profileIDStr, ok := vars["profile_id"]
	if !ok {
		http.Error(w, "profile_id parameter is missing", http.StatusBadRequest)
		return
	}

	profileID, err := strconv.Atoi(profileIDStr)
	if err != nil {
		http.Error(w, "Invalid profile_id parameter", http.StatusBadRequest)
		return
	}

	profile, err := services.GetProfile(profileID)
	if err != nil {
		http.Error(w, "Failed to fetch profiles", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(profile)
}

func GetProfileReference(w http.ResponseWriter, r *http.Request) {
	grades, _ := services.GetAllGrades()
	workFormats, _ := services.GetAllWorkFormats()
	professions, _ := services.GetAllProfessions()
	skills, _ := services.GetSkills()

	response := models.ProfileReference{
		Grades:      grades,
		WorkFormats: workFormats,
		Professions: professions,
		Skills:      skills,
	}
	json.NewEncoder(w).Encode(response)
}
