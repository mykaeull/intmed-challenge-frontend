import { FiAlertTriangle } from "react-icons/fi";
import styles from "./index.module.scss";

interface MedMessageErrorProps {
    message: string | undefined;
}

export const MedMessageError = ({ message }: MedMessageErrorProps) => {
    return (
        <div className={styles.errorContent}>
            <FiAlertTriangle color="#d2122e" />
            <span className={styles.errorText}>{message}</span>
        </div>
    );
};
