'use client';
import React, { useState } from 'react';
import styled from "styled-components";
import { IInputProps } from '@/src/shared/types/atoms/input.type';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const InputWrapper = styled.div`
    position: relative;
    width: 100%;
    margin-bottom: 10px;
`;

const StyledInput = styled.input`
    border: 1px solid ${({ theme }) => theme.colors.borderDark};
    color: ${({ theme }) => theme.colors.textSecondary};
    width: 100%;  
    border-radius: 10px;
    padding: 10px;
    background: transparent;

    &::placeholder {
        opacity: 0.7;
        color: ${({ theme }) => theme.colors.textSecondary};
    }

    &:focus {
        outline: none;          
    }
    
    &:disabled {
        background-color: ${({ theme }) => theme.colors.bgDisabled};
        color: ${({ theme }) => theme.colors.textDisabled};
        cursor: not-allowed;  
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
    height: inherit;
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.textNeutral};
    border-left: 1px solid ${({ theme }) => theme.colors.borderDark};

    &:focus {
        outline: none;
    }
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
    const shouldToggle =
        type === 'password';

    const [showPassword, setShowPassword] = useState(false);

    const inputType = shouldToggle
        ? showPassword ? 'text' : 'password'
        : type;

    return (
        <InputWrapper>
            <StyledInput
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

            {shouldToggle && (
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
