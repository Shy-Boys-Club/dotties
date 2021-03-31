package db

import (
	"os"

	"gorm.io/gorm"
	"gorm.io/driver/postgres"
)

type User struct {
    gorm.Model
    Id int
    GithubUsername string
    GithubAccessToken string
    GithubRefreshToken string
    Email string
}

type DBCreds struct {
    DBUser string
    DBSecret string
    DBAddress string
    DBName string
}

func GetDbCredentials() (DBCreds) {
    return DBCreds { 
        DBUser: os.Getenv("DATABASE_USER"),
        DBSecret: os.Getenv("DATABASE_SECRET"),
        DBAddress: os.Getenv("DATABASE_ADDRESS"),
        DBName: os.Getenv("DATABASE_NAME"),
    }
}

func TestDB() {
    creds := GetDbCredentials()
    // TODO: Please use something else than " + " 
    dsn := "host=" + creds.DBAddress + " user=" + creds.DBUser + " password=" + creds.DBSecret + " dbname=" + creds.DBName + " port=5432 sslmode=disable TimeZone=Asia/Shanghai"
    db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        panic("Failed to connect to db")
    }

    db.AutoMigrate(&User{})
    db.Create(&User{Id: 2, Email: "matias@shyboys.club"})
}
