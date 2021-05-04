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

	repositoryQuery := r.URL.Query()["repository"]
	if len(repositoryQuery) < 1 {
        repos, err := getAllRepos()
        if err != nil {    
		    fmt.Println(fmt.Errorf("Repositories were not found in the database: %s", err))
            return
        }
	    json.NewEncoder(w).Encode(repos)
        return
	}

    fmt.Println(repositoryQuery)
    repository, err := getRepoByName(repositoryQuery[0])
    if err != nil { 
		fmt.Println(fmt.Errorf("Repository was not found in the database: %s", err))
        return
    }
    json.NewEncoder(w).Encode(repository)
}

func getRepoByName(name string) (db.Repository, error) {    
    repository := &db.Repository{};
	dbCon := db.GetDB()

	err := dbCon.Where("name = ?", name).First(&repository).Error
    return *repository, err 
}

func getAllRepos() ([]db.Repository, error) {
	var repos []db.Repository
	dbCon := db.GetDB()
	result := dbCon.Find(&repos)
	if result.Error != nil {
		fmt.Println(result.Error)
		return make([]db.Repository, 0), result.Error
	}
    return repos, nil
}

func updateOrInsertRepo(repo *db.Repository) (error) {

    existingRepository, err := getRepoByName(repo.Name);
	dbCon := db.GetDB()
    // Record not found
    if err != nil {
        dbCon.Create(&repo)
    } else {
        // TODO: Update all the fields we want to update
        existingRepository.Description = repo.Description
        dbCon.Save(&existingRepository)
    }

    return nil
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

    updateOrInsertRepo(&repo)

    /*
	dbCon := db.GetDB()
	result := dbCon.Create(&repo)
	if result.Error != nil {
		fmt.Println("failed to write to database")
		return
	}
    */

	json.NewEncoder(w).Encode(repo)
}
