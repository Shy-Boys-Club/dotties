package db

import (
	"time"
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
