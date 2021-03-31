package db

type Repository struct {
    ID uint64 `gorm:"primaryKey"`
    User AuthUser `gorm:"foreignKey:ID"`
    Name string
    Description string
    Score int64
}
