'use client';
import React from 'react';
import { IButtonProps } from '@/src/shared/types/atoms/button.type';
import styled from 'styled-components';

const StyledButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  border: none;
  gap: 5px;
  width: 100%;
  height: 58px;
  cursor: pointer;
  transition: 0.4s;
  border-radius: 5px;

  &:hover {
    transition: 0.4s;
    background-color: ${({ theme }) => theme.colors.bgBanner};
  }

  & svg{
    width: 18px;
    height: 18px;
    fill: #222;
  }

  & small{
    font-size: 10px;
  }
`;

const ButtonAside: React.FC<IButtonProps> = ({ children, onClick, className, type, label, disabled }) => {
  return (
    <StyledButton type={type} onClick={onClick} className={className} disabled={disabled}>
      {children}
      <small>{label}</small>
    </StyledButton>
  );
};

export default ButtonAside;