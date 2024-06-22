import AuthGuard from "../components/auth-guard";
import { MedConsultationsTable } from "../components/med-consultations-table";

export const metadata = {
    title: "Consultations",
};

const Consultations = () => {
    return (
        <AuthGuard>
            <main style={{ height: "35vh" }}>
                <MedConsultationsTable />
            </main>
        </AuthGuard>
    );
};

export default Consultations;
