const DOTTIE_COOKIE_NAME = "dottie-token";

export function getJWT() {
    // Reduce cookie string to object of key-value pairs
    // of cookies
    const cookies = document.cookie.split(";").reduce((cookieObj, cookieString) => {
        const split = cookieString.split("=");
        cookieObj[split[0].trim()] = split[1];
        return cookieObj;
    }, {});

    const keys = Object.keys(cookies);
    if (!keys.includes(DOTTIE_COOKIE_NAME)) return null;

    return parseJWT(cookies[DOTTIE_COOKIE_NAME]);
}

/**
 * @param {string} token
 */
function parseJWT(token) {
    try {
        const base64URL = token.split(".")[1];
        const base64 = base64URL.replace(/-/g, '+').replace(/_/g, '/');
        const decoded = atob(base64);
        return JSON.parse(decoded);
    } catch (err) {
        console.error(err);
        return null;
    }
}
