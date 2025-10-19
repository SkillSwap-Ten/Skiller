'use client';
import styled from 'styled-components';
import React from 'react';
import { ITagProps } from '@/src/shared/types/atoms/tag.type';

// Estilos de la etiqueta
const StyledButtonTag = styled.button`
  background-color: transparent;
  padding: 10px 15px;
  border: 1px solid ${({ theme }) => theme.colors.textDark};
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.8rem;
  transition: 1s;

  @media (max-width: 768px) {
    font-size: 0.7rem;
    padding: 8px 12px;
  }

  &:hover {
    transform: scale(1.1);
    background-color: ${({ theme }) => theme.colors.bgBanner};
    transition: 1s;
  }
`;

// Componente para mostrar la lista de skills
const ButtonTag: React.FC<ITagProps> = ({ label }) => {
    return (
        <StyledButtonTag>{label}</StyledButtonTag>
    );
};

export default ButtonTag;
