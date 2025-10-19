'use client'
import React from "react";
import styled from "styled-components";
import { IInputProps } from "@/src/shared/types/atoms/input.type";

const StyledInputAuth = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.textWhite};
  color: ${({ theme }) => theme.colors.textWhite};
  border-radius: 10px;
  font-size: 16px;
  box-sizing: border-box;
  width: 100%;
  height:40px;
  padding: 10px;
  margin-bottom: 10px;
  background: transparent;
  
  &::placeholder {
    opacity: 0.7;
    color: ${({ theme }) => theme.colors.textWhite}!important;
  }
`;

const InputAuth: React.FC<IInputProps> = ({
  type,
  id,
  placeholder,
  value,
  onChange,
  disabled,
  name,
  required = false,
  autoComplete
}) => {
  return (
    <StyledInputAuth type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      name={name}
      required={required}
      autoComplete={autoComplete}>
    </StyledInputAuth>

  );
};

export default InputAuth;






