package db

import (
	"fmt"
	"net/http"
	"time"

	"github.com/Shy-Boys-Club/dotties/api/pkg/auth"
)

type AuthUser struct {
	ID                 uint64       `gorm:"primary_key" json:"-"`
	UUID               string       `json:"UUID"`
	GithubUsername     string       `json:"github_username"`
	GithubAccessToken  string       `json:"-"`
	GithubRefreshToken string       `json:"-"`
	GithubURL          string       `json:"github_url"`
	GithubAvatar       string       `json:"github_avatar"`
	Email              string       `json:"email_address"`
	LastActive         time.Time    `json:"-"`
	Admin              bool         `json:"-"`
	Mod                bool         `json:"-"`
	CreatedAt          time.Time    `json:"-"`
	Repositories       []Repository `gorm:"foreignKey:User;references:ID" json:"repositories"`
}

// SetActive sets the users LastActive field to time.Now
func (u *AuthUser) SetActive() {
	u.LastActive = time.Now()
}

func (u *AuthUser) SetAdmin(admin bool) {
	u.Admin = admin
}

func (u *AuthUser) SetMod(mod bool) {
	u.Mod = mod
}

func GetClaimsFromToken(r *http.Request) (map[string]interface{}, error) {
	var claims map[string]interface{}

	cookie, err := r.Cookie("dottie-token")
	if err != nil {
		fmt.Println("no cookie found in request")
		return claims, err
	}
	token := auth.ReadJWT(&cookie.Value)
	claims = auth.GetClaims(token)

	return claims, nil
}

func GetUserFromToken(r *http.Request) (*AuthUser, error) {
	user := &AuthUser{}
	claims, err := GetClaimsFromToken(r)
	if err != nil {
		return user, fmt.Errorf("failed to get claims from user")
	}
	user.GithubUsername = claims["UserName"].(string)
	conn := GetDB()
	result := conn.Where("github_username = ?", user.GithubUsername).First(&user)
	if result.Error != nil {
		return user, fmt.Errorf("User was not found in the database: %s", result.Error)
	}
	return user, nil
}
