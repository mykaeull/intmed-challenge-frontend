import React from "react";
import styles from "./index.module.scss";

interface TableColumn {
    header: string;
    accessor: string;
}

interface TableData {
    [key: string]: string | number;
}

interface MedTableProps {
    columns: TableColumn[];
    data: TableData[];
    extraColumn?: (id: number | string) => React.ReactNode;
    emptyTableText: string;
}

export const MedTable: React.FC<MedTableProps> = ({
    columns,
    data,
    extraColumn,
    emptyTableText,
}) => {
    return (
        <div className={styles.tableContainer}>
            {data.length === 0 ? (
                <h4 className={styles.emptyText}>{emptyTableText}</h4>
            ) : (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            {columns.map((column) => (
                                <th key={column.accessor}>{column.header}</th>
                            ))}
                            {extraColumn && <th key="extra-column"></th>}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index}>
                                {columns.map((column) => (
                                    <td key={column.accessor}>
                                        {row[column.accessor]}
                                    </td>
                                ))}
                                {extraColumn && (
                                    <td
                                        key="extra-column"
                                        style={{ width: "6.25rem" }}
                                    >
                                        {extraColumn(row.id)}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};
