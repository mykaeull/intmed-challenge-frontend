import AuthGuard from "../components/auth-guard";

const Consultations = () => {
    return (
        <AuthGuard>
            <h1>Consultations</h1>
        </AuthGuard>
    );
};

export default Consultations;
