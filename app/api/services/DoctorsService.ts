import api from "../api";

export function getDoctors() {
    const doctorsUrl = "/doctors";
    return api.get(doctorsUrl);
}
