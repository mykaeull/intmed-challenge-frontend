import styles from "./page.module.scss";
import { MedTitle } from "./components/med-title";
import { MedInput } from "./components/med-input";
import { MedLoginForm } from "./components/med-login-form";

export default function Home() {
    return (
        <main className={styles.main}>
            <MedLoginForm />
        </main>
    );
}
