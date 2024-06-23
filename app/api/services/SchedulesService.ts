import api from "../api";

export function getSchedules() {
    const schedulesUrl = "/schedules";
    return api.get(schedulesUrl);
}

export function getHours() {
    // const schedulesUrl = "/schedules";
    // return api.get(schedulesUrl);
    return {
        data: [
            { horario: "14:30" },
            { horario: "16:30" },
            { horario: "17:30" },
            { horario: "19:30" },
        ],
    };
}
