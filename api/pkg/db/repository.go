package db

import (
	"time"
)

type Repository struct {
	ID          uint64 `gorm:"primaryKey"`
	User        uint64
	Name        string
	Description string
	ImageURL    string
	Score       int64
	CreatedAt   time.Time
}
