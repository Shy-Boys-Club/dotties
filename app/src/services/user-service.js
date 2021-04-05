import { API_URL } from "../util/api-util";

const apiEndpoint = "/user";

/**
 * @param {string} username
 */
export function getUser(username) {
    return fetch(API_URL + apiEndpoint + "/" + username).then(res => res.json());
}

export function getLoggedUser() {
    return fetch(API_URL + apiEndpoint, {
        credentials: "include"
    }).then(res => res.json());
}

/**
 * @param {any} updateData
 */
export function updateUser(updateData) {
    return fetch(API_URL + apiEndpoint, {
        method: "PATCH",
        body: JSON.stringify(updateData),
        credentials: "include"
    })
}

export function deleteUser() {
    return fetch(API_URL + apiEndpoint, {
        method: "DELETE",
        credentials: "include"
    })
}
