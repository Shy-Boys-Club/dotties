package db

import (
	"time"
)

type AuthUser struct {
	ID                 uint64 `gorm:"primaryKey"`
	GithubUsername     string
	GithubAccessToken  string
	GithubRefreshToken string
	Email              string
	LastActive         int64
}

// SetActive sets the users LastActive field to time.Now
func (u *AuthUser) SetActive() {
	u.LastActive = time.Now().Unix()
}
