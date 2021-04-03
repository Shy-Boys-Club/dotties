package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/Shy-Boys-Club/dotties/api/pkg/auth"
	"github.com/Shy-Boys-Club/dotties/api/pkg/db"
	"github.com/Shy-Boys-Club/dotties/api/pkg/github"
	"github.com/Shy-Boys-Club/dotties/api/pkg/user"
)

func helloWorld(writer http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(writer, `{"hello": "world hello"}`)
}

func ping(writer http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(writer, "Pong")

	var users []db.AuthUser
	var repositories []db.Repository
	var images []db.Image

	dbCon := db.GetDB()

	dbCon.Find(&users)
	dbCon.Find(&repositories)
	dbCon.Find(&images)

	fmt.Println(users)
	fmt.Println(repositories)
	fmt.Println(images)
}

func handleRequest() {
	mux := http.NewServeMux()

	mux.HandleFunc("/user", user.GetCurrentUser)
	mux.HandleFunc("/user/", user.GetUser)
	mux.HandleFunc("/oauth/redirect", github.HandleOAuthRedirect)
	mux.HandleFunc("/ping", ping)
	mux.Handle("/auth/verify", Middleware(http.HandlerFunc(auth.Verify)))
	mux.Handle("/auth/logout", Middleware(http.HandlerFunc(auth.InvaidateCookie)))

	log.Fatal(http.ListenAndServe(":3001", mux))
}

func main() {
	db.Migrate()

	handleRequest()
}

func Middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin")
		EnableCors(&w, origin)
		if (*r).Method == "OPTIONS" {
			return
		}
		next.ServeHTTP(w, r)
	})
}

func EnableCors(w *http.ResponseWriter, origin string) {
	(*w).Header().Set("Access-Control-Allow-Origin", origin)
	(*w).Header().Set("Access-Control-Allow-credentials", "true")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}
