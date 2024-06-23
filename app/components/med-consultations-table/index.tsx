"use client";

import {
    deleteConsultation,
    getConsultations,
} from "@/app/api/services/ConsultationsService";
import { formatDate } from "@/app/utils";
import { useEffect, useState } from "react";
import { HiOutlineX } from "react-icons/hi";
import { MedButton } from "../med-button";
import { MedLoading } from "../med-loading";
import { MedTable } from "../med-table";
import { HiOutlinePlusSm } from "react-icons/hi";
import { toast } from "react-hot-toast";
import styles from "./index.module.scss";
import { MedModal } from "../med-modal";
import { MedConsultationForm } from "../med-consultation-form";

interface DataProps {
    _id: number;
    dia: string;
    horario: string;
    data_agendamento: string;
    medico: {
        _id: number;
        crm: number;
        nome: string;
        especialidade: {
            _id: number;
            nome: string;
        };
    };
}

export const MedConsultationsTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const columns = [
        { header: "ESPECIALIDADE", accessor: "specialty" },
        { header: "PROFISSIONAL", accessor: "professional" },
        { header: "DATA", accessor: "date" },
        { header: "HORA", accessor: "hour" },
    ];

    useEffect(() => {
        setLoading(true);
        const fetchConsultationsData = async () => {
            try {
                const response = await getConsultations();
                const formatedData = response.data.map((d: DataProps) => {
                    return {
                        specialty: d.medico.especialidade.nome,
                        professional: d.medico.nome,
                        date: formatDate(d.dia),
                        hour: d.horario,
                        id: d["_id"],
                    };
                });
                // setTimeout(() => {
                //     setData(formatedData);
                //     setLoading(false);
                // }, 2000);
                setData(formatedData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching protected data:", error);
                setLoading(false);
            }
        };
        fetchConsultationsData();
    }, [refresh]);

    async function handleDeleteConsultation(id: number | string) {
        try {
            const response = await deleteConsultation(id);
            toast.success("Consulta desmarcada!");
            setRefresh((prev) => !prev);
        } catch {
            console.log("error");
            toast.error("Houve um erro ao desmarcar a consulta.");
        }
    }

    const ExtraColumnComponent = (id: number | string) => {
        return (
            <MedButton
                size="sm"
                color="secondary"
                icon={<HiOutlineX color="#49B4BB" size={16} />}
                onClick={() => handleDeleteConsultation(id)}
            >
                Desmarcar
            </MedButton>
        );
    };

    const NewConsultationButton = (openModal: () => void) => {
        return (
            <MedButton
                onClick={openModal}
                style={{
                    width: "11.25rem",
                    padding: "0.375rem 0.75rem",
                }}
                icon={
                    <HiOutlinePlusSm
                        style={{
                            width: "1.5rem",
                            height: "1.5rem",
                        }}
                    />
                }
            >
                Nova Consulta
            </MedButton>
        );
    };

    return (
        <>
            {loading ? (
                <MedLoading />
            ) : (
                <div className={styles.containerTable}>
                    <div className={styles.titleTable}>
                        <h2>Consulta Clínica</h2>
                        <MedModal modalButton={NewConsultationButton}>
                            <MedConsultationForm />
                        </MedModal>
                    </div>
                    <MedTable
                        columns={columns}
                        data={data}
                        extraColumn={ExtraColumnComponent}
                        emptyTableText="Sem consultas agendadas."
                    />
                </div>
            )}
        </>
    );
};
