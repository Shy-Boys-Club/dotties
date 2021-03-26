package main

import (
    "fmt"
    "log"
    "net/http"
)

func helloWorld(writer http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(writer, "Hello world");
}

func ping(writer http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(writer, "Pong");
}

func handleRequest() {
    http.HandleFunc("/", helloWorld)
    http.HandleFunc("/ping", ping)
    log.Fatal(http.ListenAndServe(":42069", nil))
}

func main() {
    handleRequest();
}
