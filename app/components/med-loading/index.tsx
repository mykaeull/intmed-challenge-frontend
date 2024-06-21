import styles from "./index.module.scss";

export const MedLoading = () => {
    return (
        <div className={styles.containerLoader}>
            <div className={styles.customLoader} />
        </div>
    );
};
