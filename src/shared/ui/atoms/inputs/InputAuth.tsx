'use client'
import React, { useState } from "react";
import styled from "styled-components";
import { IInputProps } from "@/src/shared/types/atoms/input.type";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;

const StyledInputAuth = styled.input<{ $isPassword: boolean }>`
  border: 1px solid ${({ theme }) => theme.colors.textWhite};
  color: ${({ theme }) => theme.colors.textWhite};
  border-radius: ${({ $isPassword }) =>
    $isPassword ? "10px 0 0 10px" : "10px"};
  background: transparent;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding: 10px;
  font-size: 16px;
  transition: background 0.4s ease; 

  &::placeholder {
    opacity: 0.7;
    color: ${({ theme }) => theme.colors.textWhite} !important;
  }

  &:focus {
    outline: none;    
    transition: background 0.4s ease; 
    background: ${({ theme }) => theme.colors.bgLight}; 
    border-right: ${({ $isPassword }) =>
      $isPassword ? "none" : ""};
  }

  & * {
    color: ${({ theme }) => theme.colors.textWhite} !important;
  }
`;

const ToggleButton = styled.button`
  background: ${({ theme }) => theme.colors.bgLight};
  color: ${({ theme }) => theme.colors.textWhite};
  border: 1px solid ${({ theme }) => theme.colors.textWhite};
  border-left: none;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  height: 40px;
  width: 38px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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
  const isPassword = type === "password";
  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPassword
    ? showPassword ? "text" : "password"
    : type;

  return (
    <InputWrapper>
      <StyledInputAuth
        $isPassword={isPassword}
        type={inputType}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        name={name}
        required={required}
        autoComplete={autoComplete}
      />

      {isPassword && (
        <ToggleButton
          type="button"
          onClick={() => setShowPassword(prev => !prev)}
          aria-label="Toggle password visibility"
        >
          {showPassword ? (
            // Ojo cerrado
            <FaRegEyeSlash />
          ) : (
            // Ojo abierto
            <FaRegEye />
          )}
        </ToggleButton>
      )}
    </InputWrapper>
  );
};

export default InputAuth;
