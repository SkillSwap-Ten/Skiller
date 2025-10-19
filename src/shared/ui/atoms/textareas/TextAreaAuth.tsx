'use client';
import { ITextAreaProps } from "@/src/shared/types/atoms/textarea.type";
import React from "react";
import styled from "styled-components";

// Estilos para el textarea usando styled-components
const TextAreaStyled = styled.textarea`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.bgSecondary};
  color: ${({ theme }) => theme.colors.textWhite};
  background: ${({ theme }) => theme.colors.gradientPrimary};
  border-radius: 10px;
  font-size: 16px;
  width: 100%;
  height: 72px; 
  box-sizing: border-box;
  resize: none;
  &::placeholder {
    opacity: 0.7;
    color: ${({ theme }) => theme.colors.textWhite}!important;
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
  autoComplete
}) => {
  return (
    <TextAreaStyled
      id={id}
      value={value}
      title={title}
      onChange={onChange}
      className={className}
      disabled={disabled}
      aria-label={ariaLabel}
      name={name}
      placeholder={placeholder}
      required={required}
      maxLength={maxLength} 
      autoComplete={autoComplete}
    />
  );
};

export default TextArea;
