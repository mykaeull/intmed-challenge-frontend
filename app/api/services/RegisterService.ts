import api from "../api";

export function doRegister(username: string, email: string, password: string) {
    const registerUrl = "/users/register";
    return api.post(registerUrl, { username, email, password });
}
