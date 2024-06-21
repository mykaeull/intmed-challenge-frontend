import { ButtonHTMLAttributes } from "react";
import styles from "./index.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    color?: "primary" | "secondary";
}

export const MedButton = ({ children, color, ...props }: ButtonProps) => {
    return (
        <button
            className={color === "secondary" ? styles.secondaryButton : ""}
            {...props}
        >
            {children}
        </button>
    );
};
