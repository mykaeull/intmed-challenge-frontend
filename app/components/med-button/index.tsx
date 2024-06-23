import { ButtonHTMLAttributes } from "react";
import styles from "./index.module.scss";
import classNames from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    color?: "primary" | "secondary" | "destructive";
    size?: "sm" | "md" | "lg";
    icon?: React.ReactNode;
}

export const MedButton = ({
    children,
    color = "primary",
    size = "md",
    icon,
    ...props
}: ButtonProps) => {
    const buttonClass = classNames({
        [styles.primaryButton]: color === "primary",
        [styles.secondaryButton]: color === "secondary",
        [styles.destructiveButton]: color === "destructive",
        [styles.smButton]: size === "sm",
        [styles.mdButton]: size === "md",
        [styles.lgButton]: size === "lg",
    });

    return (
        <button className={buttonClass} {...props}>
            {icon && icon}
            {children}
        </button>
    );
};
