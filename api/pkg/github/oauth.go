package github

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/Shy-Boys-Club/dotties/api/pkg/auth"
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
	log.Debug(t.AccessToken)
	if err != nil {
		w.WriteHeader(http.StatusNotAcceptable)
		w.Write([]byte(`{"error": "failed to authenicate with Github"}`))
		return
	}

	u, err := NewClient(t.AccessToken)
	if err != nil {
		log.Error(err.Error())
		return
	}

	j := auth.JwtHandler{
		SecretKey:  jwtKey,
		Issuer:     "dottie",
		Expiration: 60 * 24,
	}

	jwt, err := j.GenerateToken(auth.Claims{
		Email:     *u.User.Email,
		UserName:  *u.User.Name,
		AvatarURL: *u.User.AvatarURL,
		Admin:     false,
		Mod:       false,
	})

	http.SetCookie(w, &http.Cookie{
		Name:  "token",
		Value: jwt,
		Path:  "/",
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
	if err := json.NewDecoder(r.Body).Decode(&t); err != nil {
		return t, fmt.Errorf("Failed to parse json repsonse from GitHub: %v", err)
	}

	return t, nil
}
