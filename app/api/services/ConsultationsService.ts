import api from "../api";

interface ConsultationProps {
    dia: string;
    horario: string;
    data_agendamento: string;
    medico: string;
}

export function getConsultations() {
    const consultationsUrl = "/consultations";
    return api.get(consultationsUrl);
}

export function setConsultatio(data: ConsultationProps) {
    const consultationUrl = "/consultations";
    return api.post(consultationUrl, data);
}

export function deleteConsultation(id: string | number) {
    const consultationDeleteUrl = `/consultations/${id}`;
    return api.delete(consultationDeleteUrl);
}
