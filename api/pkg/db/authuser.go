package db

import (
	"time"
)

type AuthUser struct {
	ID                 uint64 `gorm:"primary_key"`
	GithubUsername     string `json:"github_username"`
	GithubAccessToken  string `json:"github_access_token"`
	GithubRefreshToken string `json:"github_refresh_token"`
	Email              string `json:"email_address"`
	LastActive         int64  `json:"last_active"`
	Admin              bool   `json:"admin"`
	Mod                bool   `json:"mod"`
}

// SetActive sets the users LastActive field to time.Now
func (u *AuthUser) SetActive() {
	u.LastActive = time.Now().Unix()
}

func (u *AuthUser) SetAdmin(admin bool) {
	u.Admin = admin
}

func (u *AuthUser) SetMod(mod bool) {
	u.Mod = mod
}
