package auth

import (
	"time"

	jwt "github.com/dgrijalva/jwt-go"
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
