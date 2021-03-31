package db

import (
	"fmt"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

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

/**
*   Handle Migration of Dotties database.
*
*  As new entities get added, their AutoMigrate should be called here
*/
func Migrate() {
    fmt.Println("=== Migrating ===")
    db := GetDB();
    db.AutoMigrate(&AuthUser{});
    db.AutoMigrate(&Repository{});
    db.AutoMigrate(&Image{});

    // If you want to test and add rows to table, uncomment below line
    // TestInsert()
}

func TestInsert() {
    db := GetDB();
    user := AuthUser{Email: "matias@shyboys.club"}
    repository := Repository{ User: user, Name: "shy-boys-club/dotties" }
    image := Image{ Repository: repository, URL: "https://i.redd.it/7e4iqnzjexy41.png" }
    db.Create(&user)
    db.Create(&repository)
    db.Create(&image)
    fmt.Println("Test insert run")
}

func GetDB() *gorm.DB {
    creds := GetDbCredentials()

    dbConnString := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=5432 sslmode=disable TimeZone=Europe/Helsinki", creds.DBAddress, creds.DBUser, creds.DBSecret, creds.DBName)
    db, err := gorm.Open(postgres.Open(dbConnString), &gorm.Config{})
    if err != nil {
        panic("Failed to connect to db")
    }
    return db
}
