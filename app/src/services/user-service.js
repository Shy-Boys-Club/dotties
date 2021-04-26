import { API_URL } from "../util/api-util";
import { logOut } from "./auth-service";

const apiEndpoint = "/user";

/**
 * @param {string} username
 */
export function getUser(username) {
    return fetch(API_URL + apiEndpoint + `?username=${username}`)
        .then(res => {
            if (res.status === 404) {
                throw Error("User not found");
            }
            return res;
        })
        .then(res => res.json())
        .catch(err => {
            console.error(err);
            return {};
        });
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

export async function deleteUser() {
    const res = await fetch(API_URL + apiEndpoint, {
        method: "DELETE",
        credentials: "include"
    })

    if (res.status === 200) {
        logOut();
    }
}
