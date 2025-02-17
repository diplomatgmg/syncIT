package router

import (
	"backend/go/handlers"
	"github.com/gorilla/mux"
	"net/http"
)

func HealthCheckHandler(w http.ResponseWriter, _ *http.Request) {
	w.WriteHeader(http.StatusNoContent)
}

func NewRouter() *mux.Router {
	r := mux.NewRouter()

	r.HandleFunc("/health-check", HealthCheckHandler).Methods("GET")

	r.HandleFunc("/api/grades", handlers.GetGrades).Methods("GET")
	r.HandleFunc("/api/work_formats", handlers.GetWorkFormats).Methods("GET")
	r.HandleFunc("/api/professions", handlers.GetProfessions).Methods("GET")
	r.HandleFunc("/api/hard_skills", handlers.GetHardSkills).Methods("GET")
	r.HandleFunc("/api/profile/{profile_id}", handlers.GetProfile).Methods("GET")

	return r
}
