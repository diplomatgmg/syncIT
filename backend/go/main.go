package main

import (
	"backend/go/router"
	"log"
	"net/http"
)

func main() {
	r := router.NewRouter()

	log.Println("Server started on :9000")
	log.Fatal(http.ListenAndServe(":9000", r))
}
