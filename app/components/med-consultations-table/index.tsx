"use client";

import { getConsultations } from "@/app/api/services/ConsultationsService";
import { formatDate } from "@/app/utils";
import { useEffect, useState } from "react";
import { HiOutlineX } from "react-icons/hi";
import { MedButton } from "../med-button";
import { MedLoading } from "../med-loading";
import { MedTable } from "../med-table";
import { HiOutlinePlusSm } from "react-icons/hi";
import styles from "./index.module.scss";

interface DataProps {
    id: number;
    dia: string;
    horario: string;
    data_agendamento: string;
    medico: {
        id: number;
        crm: number;
        nome: string;
        especialidade: {
            id: number;
            nome: string;
        };
    };
}

export const MedConsultationsTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

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
                        id: d.id,
                    };
                });
                // setTimeout(() => {
                //     setData(formatedData);
                //     setLoading(false);
                // }, 2000);
                setData(formatedData);
            } catch (error) {
                console.error("Error fetching protected data:", error);
                // setLoading(false);
            }
        };
        fetchConsultationsData();
        setLoading(false);
    }, []);

    const ExtraColumnComponent = (id: number | string) => {
        return (
            <MedButton
                size="sm"
                color="secondary"
                icon={<HiOutlineX color="#49B4BB" size={16} />}
            >
                Desmarcar
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
                        <MedButton
                            style={{ width: "180px", padding: "6px 12px" }}
                            icon={<HiOutlinePlusSm size={24} />}
                        >
                            Nova Consulta
                        </MedButton>
                    </div>
                    <MedTable
                        columns={columns}
                        data={data}
                        extraColumn={ExtraColumnComponent}
                    />
                </div>
            )}
        </>
    );
};
