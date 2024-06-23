import api from "../api";

export function getSpecialities() {
    const specialitiesUrl = "/specialities";
    return api.get(specialitiesUrl);
}
