package auth

import (
	"os"
	"reflect"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/fatih/structs"
)

type JwtHandler struct {
	SecretKey  string
	Issuer     string
	Expiration int64
}

type Claims struct {
	Email     string
	UserName  string
	AvatarURL string
	Admin     bool
	Mod       bool
	jwt.StandardClaims
}

func (j *JwtHandler) GenerateToken(c Claims) (string, error) {
	c.StandardClaims = jwt.StandardClaims{
		ExpiresAt: time.Now().Local().Add(time.Minute * time.Duration(j.Expiration)).Unix(),
		Issuer:    j.Issuer,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, c)

	signedToken, err := token.SignedString([]byte(j.SecretKey))
	if err != nil {
		return "", err
	}
	return signedToken, nil
}

//InvalidateToken is used to sign a user out by setting the exp time to 0
func (j *JwtHandler) InvalidateToken(token string) string {

	return ""
}

func (j *JwtHandler) TokenHasClaims(t *string, c *Claims) bool {
	token, err := jwt.Parse(*t, func(t *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_SECRET_KEY")), nil
	})
	if err != nil {
		return false
	}

	v := reflect.ValueOf(*c)
	values := make([]string, v.NumField())

	for i := 0; i < v.NumField(); i++ {
		values[i] = v.Type().Field(i).Name
	}

	want := structs.Map(*c)
	has := structs.Map(token.Claims)

	for _, neededClaim := range values {
		if want[neededClaim] != has[neededClaim] {
			return false
		}
	}
	return true
}
