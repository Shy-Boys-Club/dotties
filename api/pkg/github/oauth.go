package github

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/Shy-Boys-Club/dotties/api/pkg/auth"
	"github.com/Shy-Boys-Club/dotties/api/pkg/db"
	"github.com/google/uuid"
	"github.com/sam-lane/loki"
)

var (
	ghClientId  string
	ghClientSec string
	jwtKey      string
)

type GithubAccessResponse struct {
	AccessToken string `json:"access_token"`
}

func init() {
	ghClientId = os.Getenv("GITHUB_CLIENT_ID")
	ghClientSec = os.Getenv("GITHUB_CLIENT_SECRET")
	jwtKey = os.Getenv("JWT_SECRET_KEY")
}

func HandleOAuthRedirect(w http.ResponseWriter, r *http.Request) {
	log := loki.NewJsonLogger()
	log.Set(loki.TRACE)
	code, err := retrieveCode(r)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	log.Debug(code)

	t, err := getTokenFromGB(code)
	log.Debug("Access token: " + t.AccessToken)
	if err != nil {
		log.Error(err.Error())
		w.WriteHeader(http.StatusNotAcceptable)
		w.Write([]byte(`{"error": "failed to authenicate with Github"}`))
		return
	}

	u, err := NewClient(t.AccessToken)
	if err != nil {
		log.Error(err.Error())
		return
	}

	conn := db.GetDB()
	dbUser := db.AuthUser{GithubUsername: *u.User.Login}

	res := conn.Find(&dbUser)
	if res.RowsAffected == 0 {
		//user doesn't exist commit them to database
		newUser := db.AuthUser{
			GithubUsername:     *u.User.Login,
			UUID:               uuid.New().String(),
			GithubAccessToken:  t.AccessToken,
			GithubRefreshToken: "",
			Email:              *u.User.Email,
			GithubAvatar:       *u.User.AvatarURL,
			GithubURL:          *u.User.HTMLURL,
			LastActive:         time.Now(),
		}
		conn.Create(&newUser)
	} else {
		//TODO
		//update last active
	}

	j := auth.JwtHandler{
		SecretKey:  jwtKey,
		Issuer:     "dottie",
		Expiration: 60 * 24,
	}

	jwt, err := j.GenerateToken(auth.Claims{
		UserName:  *u.User.Login,
		AvatarURL: *u.User.AvatarURL,
		Admin:     false,
		Mod:       false,
	})

	expiryTime := time.Now().Local().Add(time.Minute * time.Duration(j.Expiration))
	http.SetCookie(w, &http.Cookie{
		Name:    "dottie-token",
		Value:   jwt,
		Path:    "/",
		Expires: expiryTime,
	})

	http.Redirect(w, r, "http://127.0.0.1:8000", http.StatusTemporaryRedirect)
}

func retrieveCode(r *http.Request) (string, error) {
	err := r.ParseForm()
	if err != nil {
		return "", fmt.Errorf("Could not parse form from GitHub: %v", err)
	}

	return r.FormValue("code"), nil
}

func getTokenFromGB(code string) (GithubAccessResponse, error) {

	ghU := fmt.Sprintf("https://github.com/login/oauth/access_token?client_id=%s&client_secret=%s&code=%s", ghClientId, ghClientSec, code)

	fmt.Println(ghU)
	req, err := http.NewRequest(http.MethodPost, ghU, nil)
	if err != nil {
		return GithubAccessResponse{}, fmt.Errorf("failed to create request struct: %v", err)
	}

	req.Header.Set("accept", "application/json")
	client := http.Client{}
	r, err := client.Do(req)
	if err != nil {
		return GithubAccessResponse{}, fmt.Errorf("Request to github failed: %v", err)
	}

	defer r.Body.Close()

	t := GithubAccessResponse{}
	json.NewDecoder(r.Body).Decode(&t)
	if len(t.AccessToken) <= 0 {
		fmt.Println("FAILED TO PARSE JSON")
		fmt.Println(r.Body)
		return t, fmt.Errorf("Failed to parse json repsonse from GitHub: %v", err)
	}

	return t, nil
}
