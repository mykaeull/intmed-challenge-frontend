"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MedLoading } from "../med-loading";

interface AuthGuardProps {
    children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/");
        } else {
            setLoading(false);
        }
    }, []);

    return <>{loading ? <MedLoading /> : <>{children}</>}</>;
};

export default AuthGuard;
