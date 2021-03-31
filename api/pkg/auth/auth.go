package auth

import (
	"encoding/json"
	"fmt"
	"net/http"
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
	UserName  string
	AvatarURL string
	Admin     bool
	Mod       bool
	jwt.StandardClaims
}

type UserData struct {
	UserName  string `json:"userName"`
	AvatarURL string `json:"avatarUrl"`
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

func Verify(writer http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("dottie-token")
	if err != nil {
		// Cookie not found
        fmt.Fprintf(writer, "{}");
		return
	}
	// TODO: Refresh token
	cookieData := ReadJWT(&cookie.Value)
	claims := cookieData.Claims.(jwt.MapClaims)

	userData := &UserData{
		UserName:  claims["UserName"].(string),
		AvatarURL: claims["AvatarURL"].(string),
	}

	jsonData, err := json.Marshal(userData)
	if err != nil {
		fmt.Println(err)
        fmt.Fprintf(writer, "{}");
        return;
	}
	fmt.Fprintf(writer, string(jsonData))
}

func ReadJWT(tokenString *string) *jwt.Token {
	token, err := jwt.Parse(*tokenString, func(t *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_SECRET_KEY")), nil
	})
	if err != nil {
		return nil
	}
	return token
}

func (j *JwtHandler) TokenHasClaims(t *string, c *Claims) bool {
	token := ReadJWT(t)
	if token == nil {
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
