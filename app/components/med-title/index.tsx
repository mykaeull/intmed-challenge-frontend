import Image from "next/image";
import styles from "./index.module.scss";

export const MedTitle = () => {
    return (
        <div className={styles.medTitle}>
            <Image src="/logo.png" alt="logo" width={50} height={50} />
            <h1>Medicar</h1>
        </div>
    );
};
