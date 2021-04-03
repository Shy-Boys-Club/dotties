package user

import (
	"encoding/json"
	"fmt"
	"github.com/Shy-Boys-Club/dotties/api/pkg/auth"
	"github.com/Shy-Boys-Club/dotties/api/pkg/db"
	"net/http"
	"strings"
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
	dbCon.Find(&user)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}

func GetUser(w http.ResponseWriter, r *http.Request) {
	userPath := strings.TrimPrefix(r.URL.Path, "/user/")
	dbCon := db.GetDB()

	user := db.AuthUser{
		GithubUsername: userPath,
	}

	w.Header().Set("Content-Type", "application/json")
	res := dbCon.Find(&user)
	if res.RowsAffected == 0 {
		fmt.Fprintf(w, "{}")
		return
	}

	json.NewEncoder(w).Encode(user)
}
