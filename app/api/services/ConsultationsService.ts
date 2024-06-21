import api from "../api";

export function getConsultations() {
    const consultationsUrl = "/consultas";
    return api.get(consultationsUrl);
}
