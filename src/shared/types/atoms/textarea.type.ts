export interface ITextAreaProps {
  id:string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  disabled?: boolean;
  ariaLabel: string;
  name: string;
  placeholder?: string;
  title: string;
  required?: boolean;
  maxLength?: number; 
  autoComplete?: string;
  readOnly?: boolean;
}