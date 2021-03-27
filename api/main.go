package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/Shy-Boys-Club/dotties/api/pkg/github"
)

func helloWorld(writer http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(writer, `{"hello": "world hello"}`)
}

func ping(writer http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(writer, "Pong")
}

func handleRequest() {
	http.HandleFunc("/oauth/redirect", github.HandleOAuthRedirect)
	http.HandleFunc("/ping", ping)
	log.Fatal(http.ListenAndServe(":3001", nil))
}

func main() {
	handleRequest()
}
