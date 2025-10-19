'use client';
import { ISelectProps } from "@/src/shared/types/atoms/select.type";
import React from "react";
import styled from "styled-components";

// Estilos para el elemento select usando styled-components
const SelectStyled = styled.select`
  width: 100%;
  border-radius: 10px;
  border: 1px #ccc solid;
  padding: 7px;
  color: #222;
`;

// Componente Select
const Select: React.FC<ISelectProps> = ({
  id,
  title,
  value,
  onChange,
  className,
  disabled,
  ariaLabel,
  name,
  required = false,
  autoComplete,
  children
}) => {
  return (
    <SelectStyled
      id={id}
      value={value}
      title={title}
      onChange={onChange}
      className={className}
      disabled={disabled}
      aria-label={ariaLabel}
      name={name}
      required={required}
      autoComplete={autoComplete}
    >
      {children}
    </SelectStyled>
  );
};

export default Select;