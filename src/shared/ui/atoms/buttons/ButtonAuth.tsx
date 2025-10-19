'use client';
import { IButtonAuthProps } from '@/src/shared/types/atoms/button.type';
import React from 'react';
import styled from 'styled-components';

const StyledButtonAuth = styled.button`
  padding: 10px;
  color: ${({ theme }) => theme.colors.textOrange};
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  width: 120px;
  background-color: ${({ theme }) => theme.colors.textWhite};
  border: none;

  > * {
    color: ${({ theme }) => theme.colors.textOrange};
  }
`;

const ButtonAuth: React.FC<IButtonAuthProps> = ({ type, className, disabled = false, onClick, children }) => {
  return (
    <StyledButtonAuth className={className} type={type} disabled={disabled} onClick={onClick}>
      {children}
    </StyledButtonAuth>
  );
};

export default ButtonAuth;
