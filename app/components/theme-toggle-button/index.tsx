"use client";

import { ThemeContext } from "@/app/contexts/ThemeContext";
import React, { useContext, useEffect } from "react";
import styles from "./index.module.scss";
import { HiMoon, HiSun } from "react-icons/hi";

const ThemeToggleButton: React.FC = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    useEffect(() => {
        if (theme === "dark") {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [theme]);

    return (
        <div style={{ position: "absolute", top: "40px", right: "40px" }}>
            <input
                type="checkbox"
                id="checkbox"
                className={styles.checkbox}
                onChange={toggleTheme}
                checked={theme === "dark"}
            />
            <label htmlFor="checkbox" className={styles.checkboxLabel}>
                <HiMoon color="#f1c40f" />
                <HiSun color="#f39c12" />
                <span className={styles.ball}></span>
            </label>
        </div>
    );
};

export default ThemeToggleButton;
