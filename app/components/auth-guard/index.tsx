"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { MedLoading } from "../med-loading";
import { MedTitle } from "../med-title";
import styles from "./index.module.scss";
import { MedButton } from "../med-button";
import { HiOutlineUser } from "react-icons/hi";
import { toast } from "react-hot-toast";
import { ThemeContext } from "@/app/contexts/ThemeContext";

interface AuthGuardProps {
    children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState("username");
    const router = useRouter();

    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        const savedLogin = sessionStorage.getItem("login");
        if (savedLogin) {
            setUsername(savedLogin);
        }
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/");
        } else {
            try {
                const decodedToken: any = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                console.log(decodedToken.exp);
                console.log(currentTime);
                if (decodedToken.exp < currentTime) {
                    localStorage.removeItem("token");
                    toast.error("Sessão expirada.");
                    router.push("/");
                } else {
                    setLoading(false);
                }
            } catch (error) {
                localStorage.removeItem("token");
                toast.error("Ocorreu um erro interno.");
                router.push("/");
            }
        }
    }, [router]);

    const handleDesconnect = () => {
        sessionStorage.removeItem("login");
        localStorage.removeItem("token");
        toast.success("Desconectado!");
        router.push("/");
    };

    return (
        <>
            {loading ? (
                <MedLoading style={{ height: "100vh" }} />
            ) : (
                <div className={styles.container}>
                    <div className={styles.header}>
                        <MedTitle />
                        <div className={styles.rightButtons}>
                            <div className={styles.userContent}>
                                <HiOutlineUser
                                    style={{
                                        fontSize: "1.25rem",
                                        color:
                                            theme === "light"
                                                ? "#9ca3af"
                                                : "#e5e7eb",
                                    }}
                                />
                                <h4 style={{ fontWeight: "400" }}>
                                    {username}
                                </h4>
                            </div>

                            <MedButton
                                size="sm"
                                color="secondary"
                                onClick={handleDesconnect}
                            >
                                Desconectar
                            </MedButton>
                        </div>
                    </div>
                    {children}
                </div>
            )}
        </>
    );
};

export default AuthGuard;
