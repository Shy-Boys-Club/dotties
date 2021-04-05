package user

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/Shy-Boys-Club/dotties/api/pkg/auth"
	"github.com/Shy-Boys-Club/dotties/api/pkg/db"
	"gorm.io/gorm/clause"
)

func HandleRequest(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		GetUser(w, r)
	case "PATCH":
		UpdateUser(w, r)
	case "DELETE":
		DeleteUser(w, r)
	}
}

// Handle GET requests. If query params length is less than 1,
// we can assume we are on profile page and want the logged in user
func GetUser(w http.ResponseWriter, r *http.Request) {
	usernameQuery := r.URL.Query()["username"]
	if len(usernameQuery) < 1 {
		GetCurrentUser(w, r)
		return
	}
	username := usernameQuery[0]
	GetUserByName(w, r, username)
}

func GetCurrentUser(w http.ResponseWriter, r *http.Request) {
	user, err := GetLoggedInUser(w, r)
	if err != nil {
		w.WriteHeader(404)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}

func GetUserByName(w http.ResponseWriter, r *http.Request, username string) {
	user, err := GetUserByUsername(username)
	if err != nil {
		w.WriteHeader(404)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}

func GetLoggedInUser(w http.ResponseWriter, r *http.Request) (db.AuthUser, error) {
	username, err := GetUsernameFromToken(w, r)
	if err != nil {
		return db.AuthUser{}, err
	}

	user, err := GetUserByUsername(username)
	if err != nil {
		return db.AuthUser{}, err
	}
	return user, nil
}

func GetUsernameFromToken(w http.ResponseWriter, r *http.Request) (string, error) {
	cookie, err := r.Cookie("dottie-token")
	if err != nil {
		fmt.Println("no cookie found in request")
		fmt.Fprintf(w, "{}")
		return "", err
	}
	token := auth.ReadJWT(&cookie.Value)
	claims := auth.GetClaims(token)

	return claims["UserName"].(string), nil
}

func GetUserByUsername(username string) (db.AuthUser, error) {
	dbCon := db.GetDB()
	user := db.AuthUser{}
	res := dbCon.Preload(clause.Associations).Find(&user, db.AuthUser{GithubUsername: username})
	if res.RowsAffected == 0 {
		return db.AuthUser{}, fmt.Errorf("User not found")
	}

	return user, nil
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	dbCon := db.GetDB()
	user, err := GetLoggedInUser(w, r)
    if err != nil {
        fmt.Println("Not logged in")
        w.WriteHeader(500)
        return
    }

    var requestUser db.AuthUser
    err = json.NewDecoder(r.Body).Decode(&requestUser)
    if err != nil {
        fmt.Println("Error parsing body")
    }

    user.Email = requestUser.Email

    dbCon.Save(&user)
}

func DeleteUser(w http.ResponseWriter, r *http.Request) {

}
