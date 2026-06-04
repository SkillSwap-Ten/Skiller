'use client';
import React, { useState } from 'react';
import styled from "styled-components";
import { IInputProps } from '@/src/shared/types/atoms/input.type';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
`;

const StyledInput = styled.input<{ $isPassword: boolean }>`
    border: 1px solid ${({ theme }) => theme.colors.borderDark};
    color: ${({ theme }) => theme.colors.textSecondary};
    border-radius: ${({ $isPassword }) =>
        $isPassword ? "10px 0 0 10px" : "10px"};
    background: transparent;
    height: 38px;
    width: 100%;  
    padding: 10px;
    transition: background 0.4s ease; 

    &::placeholder {
        opacity: 0.7;
        color: ${({ theme }) => theme.colors.textDark};
    }

    &:focus {
        outline: none;    
        transition: background 0.4s ease; 
        background: ${({ theme }) => theme.colors.bgNeutral}; 
        border-right: ${({ $isPassword }) =>
            $isPassword ? "none" : ""};
    }
    
    &:disabled {
        background-color: ${({ theme }) => theme.colors.bgDisabled};
        color: ${({ theme }) => theme.colors.textDisabled};
        cursor: not-allowed;  
    }
`;

const ToggleButton = styled.button`
    background: ${({ theme }) => theme.colors.bgNeutral};
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.textNeutral};
    border: 1px solid ${({ theme }) => theme.colors.borderDark};
    border-left: none;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 10px;
    height: 38px;
    width: 36px;
`;

const Input: React.FC<IInputProps> = ({
    type,
    placeholder,
    value,
    name,
    onChange,
    id,
    key,
    className,
    readOnly,
    disabled = false,
    ...props
}) => {
    const isPassword =
        type === 'password';

    const [showPassword, setShowPassword] = useState(false);

    const inputType = isPassword
        ? showPassword ? 'text' : 'password'
        : type;

    return (
        <InputWrapper>
            <StyledInput
                $isPassword={isPassword}
                className={className}
                type={inputType}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                id={id}
                key={key}
                disabled={disabled}
                readOnly={readOnly}
                {...props}
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

export default Input;
