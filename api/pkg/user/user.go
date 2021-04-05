package user

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/Shy-Boys-Club/dotties/api/pkg/auth"
	"github.com/Shy-Boys-Club/dotties/api/pkg/db"
	"gorm.io/gorm/clause"
)

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
	dbCon := db.GetDB()
	cookie, err := r.Cookie("dottie-token")
	if err != nil {
		fmt.Println("no cookie found in request")
		fmt.Fprintf(w, "{}")
		return
	}
	token := auth.ReadJWT(&cookie.Value)
	claims := auth.GetClaims(token)

	user := db.AuthUser{
		GithubUsername: claims["UserName"].(string),
	}
	dbCon.Preload(clause.Associations).Find(&user)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}

func GetUserByName(w http.ResponseWriter, r *http.Request, username string) {
	dbCon := db.GetDB()
	user := db.AuthUser{}

	w.Header().Set("Content-Type", "application/json")
	res := dbCon.Preload(clause.Associations).Find(&user, db.AuthUser{GithubUsername: username})
	if res.RowsAffected == 0 {
		w.WriteHeader(404)
		return
	}

	json.NewEncoder(w).Encode(user)
}
