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

const TableHeaderReport: React.FC = () => {
  return (
    <thead>
      <Tr>
        <Th>ID</Th>
        <Th>Reporte</Th>
        <Th>Descripción</Th>
        <Th>Fecha de Creación</Th>
        <Th>Usuario Informante</Th>
        <Th>Usuario Reportado</Th>
        <Th>Acción tomada</Th>
        <Th>Detalles</Th>
        <Th>Opciones</Th>
      </Tr>
    </thead>
  );
};

export default TableHeaderReport;
