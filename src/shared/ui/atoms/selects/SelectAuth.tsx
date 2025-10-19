'use client';
import { ISelectProps } from "@/src/shared/types/atoms/select.type";
import React from "react";
import styled from "styled-components";

// Estilos para el elemento select usando styled-components
const SelectStyled = styled.select`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.textWhite};
  color: ${({ theme }) => theme.colors.textWhite};
  background: ${({ theme }) => theme.colors.gradientPrimary};
  border-radius: 10px;
  font-size: 16px;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
`;

const Option = styled.option`
  padding: 1000px;
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.gradientPrimary};
  border-radius: 10px;
  font-size: 15px;
  width: 450px;
  height: 60px;
  box-sizing: border-box;
`;

// Componente Select
const Select: React.FC<ISelectProps> = ({
  id,
  value,
  title,
  onChange,
  className,
  disabled,
  ariaLabel,
  name,
  required = false,
  autoComplete
}) => {
  return (
    <SelectStyled
      id={id}
      title={title}
      value={value}
      onChange={onChange}
      className={className}
      disabled={disabled}
      aria-label={ariaLabel}
      name={name}
      required={required}
      autoComplete={autoComplete}
    >
      <Option value="" disabled>
        Selecciona una opción...
      </Option>
      <Option value="Desarrollo">Desarrollo</Option>
      <Option value="Marketing">Marketing</Option>
      <Option value="Comunicación">Comunicación</Option>
      <Option value="Diseño">Diseño</Option>
      <Option value="Entretenimiento">Entretenimiento</Option>
    </SelectStyled>
  );
};

export default Select;