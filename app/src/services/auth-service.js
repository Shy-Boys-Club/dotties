import { write } from "@stoxy/core";
import { API_URL } from "../util/api-util";

export function logOut() {
    fetch(API_URL + "/auth/logout", { credentials: "include" });
    window.location.reload();
}

export async function verifyAndSetUserdata() {
    const userData = await fetch(API_URL + "/auth/verify", {
        credentials: "include"
    }).then(res => res.json());

    if (Object.keys(userData).length > 0) {
        write("userData", userData);
    }
}
