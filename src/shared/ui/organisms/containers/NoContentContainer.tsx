'use client'
import styled from 'styled-components';
import React from 'react';
import { TbFaceIdError } from "react-icons/tb";

const NoContent = styled.div`
  padding: 1rem;
  gap: 0.75rem;
  font-size: 14px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  border-radius: 10px;
  background: #f0f0f0;

  p {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.bgGray};
    text-align: center !important;
  }

  svg {
    color: ${({ theme }) => theme.colors.bgGray};
    font-size: 50px;
  }
`

const NoContentContainer: React.FC<{ children?: React.ReactNode, error?: string }> = ({ children, error }) => {
  return (
    <NoContent>
      <TbFaceIdError />
      <p>¡Ups! No se pudo cargar el recurso.</p>
      {error &&
        <p><strong>ERROR:</strong> {error}</p>
      }
      {children}
    </NoContent>
  );
};

export default NoContentContainer;
