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
	err := r.ParseMultipartForm(10000000)
	if err != nil {
		fmt.Println("error in parsing the form data")
        fmt.Println(err)
        // TODO: Handle error cases
		fmt.Fprintf(w, "{}")
        return;
	}

	user, err := db.GetUserFromToken(r)

	if err != nil {
		fmt.Println("yikes")
        fmt.Println(err)
		fmt.Fprintf(w, "{}")
		return
	}

	repo := db.Repository{
		Name:        r.Form.Get("repository"),
		Description: r.Form.Get("description"),
		User:        user.ID,
	}

	dbCon := db.GetDB()
	result := dbCon.Create(&repo)
	if result.Error != nil {
		fmt.Println("failed to write to database")
		return
	}

	json.NewEncoder(w).Encode(repo)
}
