import api from "../api";

export function doLogin(username: string, password: string) {
    const loginUrl = "/users/login";
    return api.post(loginUrl, { username, password });
}
