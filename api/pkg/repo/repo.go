package repo

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strings"

	"github.com/Shy-Boys-Club/dotties/api/pkg/db"
	"github.com/Shy-Boys-Club/dotties/api/pkg/dottiesaws"
	"gorm.io/gorm"
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
	repository := &db.Repository{}
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

func updateOrInsertRepo(repo *db.Repository) error {

	existingRepository, err := getRepoByName(repo.Name)
	dbCon := db.GetDB()
	// Record not found
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			dbCon.Create(&repo)
		} else {
			return err
		}
	} else {
		// TODO: Update all the fields we want to update
		existingRepository.Description = repo.Description
		existingRepository.ImageURL = repo.ImageURL
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
		http.Error(w, "Error parsing form data: "+err.Error(), 500)
		return
	}

	user, err := db.GetUserFromToken(r)

	// User auth error
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), 500)
		return
	}

	file, handler, err := r.FormFile("image")
	// TODO: Maybe some security on file upload
	// File read error
	repoName := r.Form.Get("repository")
	fileurl := ""

	// Add image if exists
	if !errors.Is(err, http.ErrMissingFile) {
		if err != nil {
			fmt.Println(err)
			http.Error(w, err.Error(), 500)
			return
		}

		// Image is repo-name.jpg/whatever the file extension is
		fileExtension := string(handler.Filename[strings.Index(handler.Filename, "."):])
		imageName := strings.Replace(repoName, "/", "-", -1) + fileExtension
		_, err, fileurl = dottiesaws.UploadImageToS3(imageName, file)
		file.Close()

	}

	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), 500)
		return
	}

	repo := db.Repository{
		Name:        repoName,
		Description: r.Form.Get("description"),
		User:        user.ID,
		ImageURL:    fileurl,
	}

	fmt.Println(repo)

	err = updateOrInsertRepo(&repo)

	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), 500)
		return
	}

	json.NewEncoder(w).Encode(repo)
}
