package db

import (
	"time"
)

type AuthUser struct {
	ID                 uint64 `gorm:"primaryKey"`
	GithubUsername     string `json:"github_username"`
	GithubAccessToken  string `json:"github_access_token"`
	GithubRefreshToken string `json:"github_refresh_token"`
	Email              string `json:"email_address"`
	LastActive         int64  `json:"last_active"`
}

// SetActive sets the users LastActive field to time.Now
func (u *AuthUser) SetActive() {
	u.LastActive = time.Now().Unix()
}
