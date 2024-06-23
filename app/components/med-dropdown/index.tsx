"use client";

import { ThemeContext } from "@/app/contexts/ThemeContext";
import { formatDate } from "@/app/utils";
import React, { useEffect, useState, forwardRef, useContext } from "react";
import Select, { Props as SelectProps } from "react-select";

interface OptionsProps {
    value: string;
    label: string;
}

interface MedDropdownProps extends SelectProps<OptionsProps> {
    placeholder?: string;
    value: any;
    onChange: (value: any) => void;
    keyy: string;
    label: string;
    fnRequest: any;
}

export const MedDropdown = forwardRef<any, MedDropdownProps>(
    ({ placeholder = "", value, onChange, keyy, label, fnRequest }, ref) => {
        const [options, setOptions] = useState<OptionsProps[]>([]);

        const { theme } = useContext(ThemeContext);

        const customStyles = {
            control: (provided: any, state: any) => ({
                ...provided,
                height: "2.5rem",
                border: state.isFocused ? "1px solid #49B4BB" : provided.border,
                boxShadow: state.isFocused
                    ? "0 0 0 1px #49B4BB"
                    : provided.boxShadow,
                backgroundColor:
                    theme === "dark" ? "#1f2937" : provided.backgroundColor,
                color: theme === "dark" ? "#e5e7eb" : provided.color,
                "&:hover": {
                    border: state.isFocused
                        ? "1px solid #49B4BB"
                        : provided.border,
                },
            }),
            input: (provided: any) => ({
                ...provided,
                color: theme === "dark" ? "#e5e7eb" : provided.color,
            }),
            singleValue: (provided: any) => ({
                ...provided,
                color: theme === "dark" ? "#e5e7eb" : provided.color,
            }),
            option: (provided: any, state: any) => ({
                ...provided,
                backgroundColor: state.isFocused ? "#D9F1F3" : null,
                color: state.isSelected ? "black" : "black",
                "&:hover": {
                    backgroundColor: "#D9F1F3",
                },
            }),
        };

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fnRequest();
                    const formattedOptions = response.data.map((d: any) => {
                        return {
                            value: d[keyy],
                            label:
                                label === "dia"
                                    ? formatDate(d[label])
                                    : d[label],
                        };
                    });
                    setOptions(formattedOptions);
                } catch (error) {
                    console.error("Error fetching protected data:", error);
                }
            };
            fetchData();
        }, []);

        return (
            <Select
                isClearable
                ref={ref}
                value={options.find((option) => option.value === value)}
                onChange={(option) => onChange(option ? option.value : "")}
                options={options}
                styles={customStyles}
                placeholder={placeholder}
            />
        );
    }
);

MedDropdown.displayName = "MedDropdown";
