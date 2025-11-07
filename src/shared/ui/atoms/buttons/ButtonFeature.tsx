'use client';
import React from 'react';
import { IButtonProps } from '@/src/shared/types/atoms/button.type';
import styled from 'styled-components';

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #ffffff33;
  border: none;
  color: ${({ theme }) => theme.colors.textWhite};
  cursor: pointer;
  transition: background-color 0.2s ease;
  backdrop-filter: blur(4px);

  &:hover {
    background: #ffffff4c;
  }
`;


const ButtonFeature: React.FC<IButtonProps> = ({ children, onClick, className, type, label, disabled }) => {
  return (
    <StyledButton aria-label={label ? label : 'Features Button'} type={type} onClick={onClick} className={className} disabled={disabled}>
      {children}
      <small>{label}</small>
    </StyledButton>
  );
};

export default ButtonFeature;