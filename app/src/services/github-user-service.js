const GITHUB_API_USER_URL = "https://api.github.com/users/"

export function getGithubUser(username) {
    return fetch(GITHUB_API_USER_URL + username).then(res => res.json())
}
