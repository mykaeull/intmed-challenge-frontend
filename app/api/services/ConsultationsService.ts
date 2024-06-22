import api from "../api";

export function getConsultations() {
    const consultationsUrl = "/consultations";
    return api.get(consultationsUrl);
}

export function deleteConsultation(id: string | number) {
    const consultationDeleteUrl = `/consultations/${id}`;
    return api.delete(consultationDeleteUrl);
}
