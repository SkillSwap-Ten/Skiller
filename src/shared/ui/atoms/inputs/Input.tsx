'use client';
import React from 'react';
import styled from "styled-components";
import { IInputProps } from '@/src/shared/types/atoms/input.type';

const StyledInput = styled.input`
    border: 1px solid ${({ theme }) => theme.colors.textDark};
    color: ${({ theme }) => theme.colors.textSecondary};
    width: 100%;  
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 10px;
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
    return (
        <StyledInput
            className={className}
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            id={id}
            key={key}
            disabled={disabled}
            {...props}
            readOnly={readOnly}
        />
    );
};

export default Input;