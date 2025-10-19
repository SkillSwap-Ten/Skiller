export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'checkbox' | 'radio' | 'file';

export interface IInputProps {
    id?: string;
    placeholder?: string;
    value?: string | number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    name: string;
    required?: boolean;
    autoComplete?: string;
    type: InputType;
    className?: string;
    key?: string;
    error?: string;
    readOnly?: boolean;
}