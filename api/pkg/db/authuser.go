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

func (u *AuthUser) SetAdmin() {
	u.Admin = true
}

func (u *AuthUser) UnsetAdmin() {
	u.Admin = false
}

func (u *AuthUser) SetMod() {
	u.Mod = true
}

func (u *AuthUser) UnsetMod() {
	u.Mod = false
}
