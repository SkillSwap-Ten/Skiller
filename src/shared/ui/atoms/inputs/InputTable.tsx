'use client';
import React from 'react';
import styled from "styled-components";
import { IInputProps } from '@/src/shared/types/atoms/input.type';

const StyledInputContainer = styled.div`
    width: 100%;  
    height: 100%;        
    padding: 0;        
    margin: 0;
    border-radius: 10px;
`;

const StyledInputTable = styled.input`
    background: ${({ theme }) => theme.colors.bgPrimary}; 
    border: 1px solid ${({ theme }) => theme.colors.borderDark};
    color: ${({ theme }) => theme.colors.textSecondary};
    width: 100%;  
    height: 100%;        
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 10px;
    transition: 0.3s ease; 

    &::placeholder {
        opacity: 0.7;
        color: ${({ theme }) => theme.colors.textSecondary};
    }

    &:focus {
        outline: none;    
        transition: 0.3s ease; 
        background: ${({ theme }) => theme.colors.bgNeutral};     
    }
    
    &:disabled {
        background: ${({ theme }) => theme.colors.bgDisabled};
        color: ${({ theme }) => theme.colors.textDisabled};
        transition: 0.3s ease; 
        cursor: not-allowed;  
    }

    & p {
        color: ${({ theme }) => theme.colors.textRed};
        font-size: 0.8rem;
        margin-top: 0.5rem;
    }
`;

const InputTable: React.FC<IInputProps> = ({
    type,
    placeholder,
    value,
    name,
    onChange,
    id,
    key,
    className,
    disabled = false,
    ...props
}) => {
    return (
        <StyledInputContainer>
            <StyledInputTable
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
            />
        </StyledInputContainer>
    );
};

export default InputTable;