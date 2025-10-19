'use client';
import React from 'react';
import styled from 'styled-components';
import { IButtonProps } from '@/src/shared/types/atoms/button.type';

const StyledButton = styled.button`
    cursor: pointer;
    display: flex;
    gap: 10px;
    font-size: 12px;
    align-items: center;
    justify-content: center;
    transition: 1s ease-in-out;
    padding: 8px 16px;

    &:hover {
        transition: background-color 0.3s ease-in-out;
    }

    & a{
        padding: 0;
    }

    & svg{
        width: 18px;
        height: 18px;
        fill: #222;
    }
`;

const Button: React.FC<IButtonProps> = ({ children, className, label, type, icon, onClick }) => {
  return (
    <StyledButton className={className} type={type} onClick={onClick}>
      {icon}{label}{children}
    </StyledButton>
  );
};

export default Button;