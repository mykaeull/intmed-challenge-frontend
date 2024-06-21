interface FieldOptionsProps {
    key: string | number;
    label: string;
}

interface MedFormFieldProps {
    key: string;
    type: string;
    inputType?: string;
    placeholder?: string;
    options?: FieldOptionsProps[];
}

interface MedFormProps {
    title: React.ReactNode;
    fnConfirm: () => void;
    fnCancel: () => void;
    rows: MedFormFieldProps[];
}

export const MedForm = () => {
    return (
        <div>
            <h1>test</h1>
        </div>
    );
};
