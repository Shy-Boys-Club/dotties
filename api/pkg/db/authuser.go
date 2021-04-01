package db

type AuthUser struct {
    ID uint64 `gorm:"primaryKey"`
    GithubUsername string
    GithubAccessToken string
    GithubRefreshToken string
    Email string
}

