export let API_URL = "http://127.0.0.1:3000";

if (!window.location.href.includes("localhost") && !window.location.href.includes("127.0.0.1")) {
    API_URL = "https://dotties.io/api";
}
