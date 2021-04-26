package db

type Image struct {
    ID uint64 `gorm:"primaryKey"`
    Repository Repository `gorm:"foreignKey:ID"`
    URL string
}
