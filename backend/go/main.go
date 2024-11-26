package main

import (
    "log"
    "net/http"
    "backend/go/router"
)

func main() {
    r := router.NewRouter()

    log.Println("Server started on :8080")
    log.Fatal(http.ListenAndServe(":8080", r))
}
