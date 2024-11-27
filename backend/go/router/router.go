package router

import (
    "github.com/gorilla/mux"
    "backend/go/handler"
)

func NewRouter() *mux.Router {
    r := mux.NewRouter()

    r.HandleFunc("/api/grades", handler.GetGrades).Methods("GET")
    r.HandleFunc("/api/work_formats", handler.GetWorkFormats).Methods("GET")

    return r
}
