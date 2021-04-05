package user

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/Shy-Boys-Club/dotties/api/pkg/auth"
	"github.com/Shy-Boys-Club/dotties/api/pkg/db"
	"gorm.io/gorm/clause"
)

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

func GetUser(w http.ResponseWriter, r *http.Request) {
	userPath := strings.TrimPrefix(r.URL.Path, "/user/")
	dbCon := db.GetDB()

	user := db.AuthUser{}

	w.Header().Set("Content-Type", "application/json")
    res := dbCon.Preload(clause.Associations).Find(&user, db.AuthUser{GithubUsername: userPath})
	if res.RowsAffected == 0 {
		fmt.Fprintf(w, "{}")
		return
	}

	json.NewEncoder(w).Encode(user)
}
