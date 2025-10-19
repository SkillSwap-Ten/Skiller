'use client';
import { ITextAreaProps } from "@/src/shared/types/atoms/textarea.type";
import React from "react";
import styled from "styled-components";

// Estilos para el textarea usando styled-components
const TextAreaStyled = styled.textarea`
    width: 100%;
    border-radius: 10px;
    border: 1px #ccc solid;
    padding: 7px;
    color: #222;
    resize: none;
    min-height: 80px;

  &::placeholder {
    opacity: 0.7;
    color: #222;
  } 

  @media (max-width: 1070px) {
    height: 100px; 
  }
`;

// Componente TextArea
const TextArea: React.FC<ITextAreaProps> = ({
  id,
  value,
  title,
  onChange,
  className,
  disabled,
  ariaLabel,
  name,
  placeholder,
  required = false,
  maxLength = 200,
  autoComplete,
  readOnly
}) => {
  return (
    <TextAreaStyled
      id={id}
      title={title}
      value={value}
      onChange={onChange}
      className={className}
      disabled={disabled}
      aria-label={ariaLabel}
      name={name}
      placeholder={placeholder}
      required={required}
      maxLength={maxLength}
      autoComplete={autoComplete}
      readOnly={readOnly}
    />
  );
};

export default TextArea;
