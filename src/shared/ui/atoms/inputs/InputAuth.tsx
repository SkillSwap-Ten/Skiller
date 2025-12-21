'use client'
import React, { useState } from "react";
import styled from "styled-components";
import { IInputProps } from "@/src/shared/types/atoms/input.type";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 10px;
`;

const StyledInputAuth = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.textWhite};
  color: ${({ theme }) => theme.colors.textWhite};
  border-radius: 10px;
  font-size: 16px;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding: 10px;
  background: transparent;

  &::placeholder {
    opacity: 0.7;
    color: ${({ theme }) => theme.colors.textWhite}!important;
  }

  & * {
    color: ${({ theme }) => theme.colors.textWhite}!important;
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  height: 40px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.textWhite};
  border-left: 1px solid ${({ theme }) => theme.colors.textWhite};

  &:focus {
    outline: none;
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
  const isPassword = type === "password";
  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPassword
    ? showPassword ? "text" : "password"
    : type;

  return (
    <InputWrapper>
      <StyledInputAuth
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
