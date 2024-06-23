"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MedInput } from "../med-input";
import { MedTitle } from "../med-title";
import * as yup from "yup";
import styles from "./index.module.scss";
import { MedButton } from "../med-button";
import { MedMessageError } from "../med-message-error";
import Link from "next/link";
import { doLogin } from "@/app/api/services/LoginService";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const loginSchema = yup.object().shape({
    login: yup.string().required("campo obrigatório"),
    password: yup
        .string()
        .required("campo obrigatória")
        .min(6, "senha deve ter pelo menos 6 caracteres"),
    rememberMe: yup.boolean(),
});

interface LoginFormData {
    login: string;
    password: string;
    rememberMe: boolean;
}

export const MedLoginForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: yupResolver(loginSchema),
    });

    const router = useRouter();

    const onSubmit = async (data: LoginFormData) => {
        try {
            const response = await doLogin(data.login, data.password);
            setTimeout(() => {
                console.log(response);
            }, 10000);
            const token = response.data.token;

            localStorage.setItem("token", token);
            sessionStorage.setItem("login", data.login);
            toast.success("Logado com sucesso!");
            reset();
            router.push("/consultations");
        } catch {
            console.log("error");
            toast.error("Login ou senha inválida.");
        }
    };

    const loginValue = watch("login", "");
    const passwordValue = watch("password", "");

    return (
        <div className={styles.container}>
            <MedTitle />

            <form
                className={styles.loginFormContent}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div>
                    <MedInput
                        placeholder="E-mail ou Login"
                        value={loginValue}
                        {...register("login")}
                    />
                    {errors.login && (
                        <MedMessageError message={errors.login.message} />
                    )}
                </div>

                <div>
                    <MedInput
                        placeholder="Senha"
                        type="password"
                        value={passwordValue}
                        {...register("password")}
                    />
                    {errors.password && (
                        <MedMessageError message={errors.password.message} />
                    )}
                </div>

                <div className={styles.checkboxContainer}>
                    <input
                        type="checkbox"
                        id="rememberMe"
                        {...register("rememberMe")}
                        className={styles.checkbox}
                    />
                    <label
                        htmlFor="rememberMe"
                        className={styles.checkboxLabel}
                    >
                        Lembrar minha senha
                    </label>
                </div>

                <footer className={styles.footerButtons}>
                    <MedButton type="button" color="secondary" size="lg">
                        <Link href="/register">Criar Conta</Link>
                    </MedButton>
                    <MedButton type="submit" size="lg">
                        Acessar
                    </MedButton>
                </footer>
            </form>
        </div>
    );
};
