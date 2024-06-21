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
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { doRegister } from "@/app/api/services/RegisterService";

const registerSchema = yup.object().shape({
    name: yup.string().required("campo obrigatório"),
    email: yup.string().email("email inválido").required("campo obrigatório"),
    password: yup
        .string()
        .required("campo obrigatória")
        .min(6, "senha deve ter pelo menos 6 caracteres"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), undefined], "senhas devem coincidir")
        .required("campo obrigatório"),
});

interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const MedRegisterForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: yupResolver(registerSchema),
    });

    const router = useRouter();

    const onSubmit = async (data: RegisterFormData) => {
        try {
            const response = await doRegister(
                data.name,
                data.email,
                data.password
            );
            console.log(response);
            toast.success("Conta criada com sucesso!");
            reset();
            router.push("/");
        } catch {
            console.log("error");
            toast.error("Houve um erro ao criar a conta.");
        }
    };

    const nameValue = watch("name", "");
    const emailValue = watch("email", "");
    const passwordValue = watch("password", "");
    const confirmPasswordValue = watch("confirmPassword", "");

    return (
        <div className={styles.container}>
            <div style={{ marginBottom: "24px" }}>
                <MedTitle />
            </div>

            <h3 className={styles.subtitle}>Crie sua conta</h3>

            <form
                className={styles.registerFormContent}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div>
                    <MedInput
                        placeholder="Nome"
                        value={nameValue}
                        {...register("name")}
                    />
                    {errors.name && (
                        <MedMessageError message={errors.name.message} />
                    )}
                </div>

                <div>
                    <MedInput
                        placeholder="Email"
                        value={emailValue}
                        {...register("email")}
                    />
                    {errors.email && (
                        <MedMessageError message={errors.email.message} />
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

                <div>
                    <MedInput
                        placeholder="Confirmar Senha"
                        type="password"
                        value={confirmPasswordValue}
                        {...register("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                        <MedMessageError
                            message={errors.confirmPassword.message}
                        />
                    )}
                </div>

                <footer className={styles.footerButtons}>
                    <MedButton type="button" color="secondary" size="lg">
                        <Link href="/">Cancelar</Link>
                    </MedButton>
                    <MedButton type="submit" size="lg">
                        Confirmar
                    </MedButton>
                </footer>
            </form>
        </div>
    );
};
