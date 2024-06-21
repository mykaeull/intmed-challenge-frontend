import { MedInput } from "../med-input";
import { MedMessageError } from "../med-message-error";
import styles from "./index.module.scss";

interface FieldOptionsProps {
    key: string | number;
    label: string;
}

type TypeField = "input" | "select" | "dropdown";

interface MedFormFieldProps {
    key: string;
    type: TypeField;
    inputType?: string;
    placeholder?: string;
    options?: FieldOptionsProps[];
}

interface MedFormProps {
    TitleFormComponent: React.ReactNode;
    fnConfirm: () => void;
    fnCancel: () => void;
    rows: MedFormFieldProps[];
}

const MountComponent = (
    type: TypeField,
    inputType: string | undefined,
    key: string,
    placeholder: string | undefined,
    value?: string,
    register?: any,
    props?: any
) => {
    switch (type) {
        case "input": {
            return (
                <MedInput
                    placeholder={placeholder}
                    type={inputType}
                    value={value}
                    {...register(key)}
                />
            );
        }
        default: {
            return null;
        }
    }
};

export const MedDinamicForm = ({
    TitleFormComponent,
    fnConfirm,
    fnCancel,
    rows,
}: MedFormProps) => {
    return (
        <div className={styles.container}>
            {TitleFormComponent}

            <form>
                {rows.map((row) => (
                    <div key={row.key}>
                        {MountComponent(
                            row.type,
                            row.inputType,
                            row.key,
                            row.placeholder
                        )}
                    </div>
                ))}
            </form>
        </div>
    );
};
