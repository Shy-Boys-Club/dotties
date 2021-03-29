package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/Shy-Boys-Club/dotties/api/pkg/auth"
	"github.com/Shy-Boys-Club/dotties/api/pkg/github"
)

func helloWorld(writer http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(writer, `{"hello": "world hello"}`)
}

func ping(writer http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(writer, "Pong")
}

func Middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin")
		if (*r).Method == "OPTIONS" {
			return
		}
		EnableCors(&w, origin)
		next.ServeHTTP(w, r)
	})
}

func EnableCors(w *http.ResponseWriter, origin string) {
	(*w).Header().Set("Access-Control-Allow-Origin", origin)
	(*w).Header().Set("Access-Control-Allow-credentials", "true")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

func handleRequest() {
	mux := http.NewServeMux()

	mux.HandleFunc("/oauth/redirect", github.HandleOAuthRedirect)
	mux.HandleFunc("/ping", ping)
	mux.Handle("/auth/verify", Middleware(http.HandlerFunc(auth.Verify)))

	log.Fatal(http.ListenAndServe(":3001", mux))
}

func main() {
	handleRequest()
}
