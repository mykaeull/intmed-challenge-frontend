import styles from "./index.module.scss";

export const MedLoading = ({ ...props }: any) => {
    return (
        <div className={styles.containerLoader} {...props}>
            <div className={styles.customLoader} />
        </div>
    );
};
