package github

import (
	"context"
	"fmt"
	gh "github.com/google/go-github/v34/github"
	"golang.org/x/oauth2"
)

type GitHubUser struct {
	Api  *gh.Client
	User *gh.User
}

func NewClient(token string) (*GitHubUser, error) {
	ctx := context.Background()
	ts := oauth2.StaticTokenSource(
		&oauth2.Token{AccessToken: token},
	)
	tc := oauth2.NewClient(ctx, ts)
	c := gh.NewClient(tc)
	user, _, err := c.Users.Get(ctx, "")
	if err != nil {
		return &GitHubUser{}, fmt.Errorf("failed to use token")
	}
	return &GitHubUser{
		Api:  c,
		User: user,
	}, nil
}
