package router

import (
	"backend/go/handlers"
	"github.com/gorilla/mux"
)

func NewRouter() *mux.Router {
	r := mux.NewRouter()

	r.HandleFunc("/api/grades", handlers.GetGrades).Methods("GET")
	r.HandleFunc("/api/work_formats", handlers.GetWorkFormats).Methods("GET")
	r.HandleFunc("/api/hard_skills", handlers.GetHardSkills).Methods("GET")

	return r
}
