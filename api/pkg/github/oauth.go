package github

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
)

var (
	ghClientId  string
	ghClientSec string
)

type GithubAccessResponse struct {
	AccessToken string `json:"access_token"`
}

func init() {
	ghClientId = os.Getenv("GITHUB_CLIENT_ID")
	ghClientSec = os.Getenv("GITHUB_CLIENT_SECRET")
}

func HandleOAuthRedirect(w http.ResponseWriter, r *http.Request) {
	code, err := retrieveCode(r)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
	}

	t, err := getTokenFromGB(code)
	if err != nil {
		w.WriteHeader(http.StatusNotAcceptable)
		w.Write([]byte(`{"error": "failed to authenicate with Github"}`))
	}

	u, err := NewClient(t.AccessToken)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Fprintf(w, "<html>Welcome %s<br><img src='%s'></html>", *u.User.Name, *u.User.AvatarURL)
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
