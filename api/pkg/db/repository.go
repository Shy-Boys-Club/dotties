package db

type Repository struct {
    ID uint64 `gorm:"primaryKey"`
    User AuthUser `gorm:"foreignKey:ID"`
    Name string
    Score int64
}
