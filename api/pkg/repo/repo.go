package repo

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/Shy-Boys-Club/dotties/api/pkg/db"
)

func HandleRequest(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		getRepos(w, r)
	case "PATCH":
		fmt.Println("PUT not implemented yet")
	case "DELETE":
		fmt.Println("DELETE not implemented yet")
	case "POST":
		putRepo(w, r)
	}
}

func getRepos(w http.ResponseWriter, r *http.Request) {
	//lets start off by retrieving all repo objects
	var repos []db.Repository
	dbCon := db.GetDB()
	result := dbCon.Find(&repos)
	if result.Error != nil {
		fmt.Println(result.Error)
		fmt.Fprintf(w, "{}")
		return
	}
	json.NewEncoder(w).Encode(repos)
}

func putRepo(w http.ResponseWriter, r *http.Request) {
	//start by checking the form for any errors
	err := r.ParseForm()
	if err != nil {
		fmt.Println("error in parsing the form data")
	}

	//TODO
	// get the users token from the request and lookup there ID in the database
	// username, err := GetUsernameFromToken(w, r)
	// if err != nil {
	// }

	repo := db.Repository{
		URL:         r.Form.Get("repo_url"),
		Name:        r.Form.Get("name"),
		Description: r.Form.Get("description"),
		User:        1,
	}

	dbCon := db.GetDB()
	result := dbCon.Create(&repo)
	if result.Error != nil {
		fmt.Println("failed to write to database")
		return
	}

	json.NewEncoder(w).Encode(repo)
}

//TODO
// Add this function into some utlity package as this function will likely need to be used in other places

// func GetUsernameFromToken(w http.ResponseWriter, r *http.Request) (string, error) {
// 	cookie, err := r.Cookie("dottie-token")
// 	if err != nil {
// 		fmt.Println("no cookie found in request")
// 		fmt.Fprintf(w, "{}")
// 		return "", err
// 	}
// 	token := auth.ReadJWT(&cookie.Value)
// 	claims := auth.GetClaims(token)

// 	return claims["UserName"].(string), nil
// }
