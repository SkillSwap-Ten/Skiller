'use client';
import React from "react";
import styled from "styled-components";

const Th = styled.th`
  font-weight: bold;
  padding: 10px;
  border: none;
  text-align: start;
  font-size: 15px;
`;

const Tr = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderDark};
`;

const TableHeaderUser: React.FC = () => {
  return (
    <thead>
      <Tr>
        <Th>ID</Th>
        <Th>Usuario</Th>
        <Th>Profesión</Th>
        <Th>Skills</Th>
        <Th>Comunidad</Th>
        <Th>Estado</Th>
        <Th>Fecha de Suspensión</Th>
        <Th>Fecha de Reactivación</Th>
        <Th>Redes Sociales</Th>
        <Th>Opciones</Th>
      </Tr>
    </thead>
  );
};

export default TableHeaderUser;

