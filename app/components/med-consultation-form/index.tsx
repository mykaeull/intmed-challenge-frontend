"use client";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./index.module.scss";
import { MedButton } from "../med-button";
import { MedDropdown } from "../med-dropdown";
import { getSpecialities } from "@/app/api/services/SpecialitiesService";
import { getDoctors } from "@/app/api/services/DoctorsService";
import { getHours, getSchedules } from "@/app/api/services/SchedulesService";
import { useModal } from "../med-modal";
import { toast } from "react-hot-toast";
import { MedMessageError } from "../med-message-error";

const consultationSchema = yup.object().shape({
    speciality: yup.string().required("campo obrigatório"),
    doctor: yup.string().required("campo obrigatório"),
    date: yup.string().required("campo obrigatório"),
    hour: yup.string().required("campo obrigatório"),
});

interface ConsultationFormData {
    speciality: string;
    doctor: string;
    date: string;
    hour: string;
}

export const MedConsultationForm = () => {
    const { handleClose } = useModal();

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ConsultationFormData>({
        resolver: yupResolver(consultationSchema),
    });

    const onSubmit = async (data: ConsultationFormData) => {
        try {
            console.log(data);
            toast.success("Consulta marcada com sucesso!");
            // reset();
            // handleClose();
        } catch {
            console.log("error");
            toast.error("Houve um erro ao marcar a consulta.");
        }
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.subtitle}>Nova consulta</h3>

            <form
                className={styles.registerFormContent}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div style={{ width: "25rem" }}>
                    <Controller
                        name="speciality"
                        control={control}
                        render={({ field }) => (
                            <MedDropdown
                                {...field}
                                placeholder="Especialidade"
                                fnRequest={getSpecialities}
                                keyy="_id"
                                label="nome"
                            />
                        )}
                    />
                    {errors.speciality && (
                        <MedMessageError message={errors.speciality.message} />
                    )}
                </div>

                <div style={{ width: "25rem" }}>
                    <Controller
                        name="doctor"
                        control={control}
                        render={({ field }) => (
                            <MedDropdown
                                {...field}
                                placeholder="Médico"
                                fnRequest={getDoctors}
                                keyy="_id"
                                label="nome"
                            />
                        )}
                    />
                    {errors.doctor && (
                        <MedMessageError message={errors.doctor.message} />
                    )}
                </div>

                <div style={{ width: "25rem" }}>
                    <Controller
                        name="date"
                        control={control}
                        render={({ field }) => (
                            <MedDropdown
                                {...field}
                                placeholder="Data"
                                fnRequest={getSchedules}
                                keyy="dia"
                                label="dia"
                            />
                        )}
                    />
                    {errors.date && (
                        <MedMessageError message={errors.date.message} />
                    )}
                </div>

                <div style={{ width: "25rem" }}>
                    <Controller
                        name="hour"
                        control={control}
                        render={({ field }) => (
                            <MedDropdown
                                {...field}
                                placeholder="Hora"
                                fnRequest={getHours}
                                keyy="horario"
                                label="horario"
                            />
                        )}
                    />
                    {errors.hour && (
                        <MedMessageError message={errors.hour.message} />
                    )}
                </div>

                <footer className={styles.footerButtons}>
                    <MedButton
                        type="button"
                        color="secondary"
                        size="lg"
                        onClick={handleClose}
                    >
                        Cancelar
                    </MedButton>
                    <MedButton type="submit" size="lg">
                        Confirmar
                    </MedButton>
                </footer>
            </form>
        </div>
    );
};
