'use client';
import { ITableRowReportProps } from "@/src/shared/types/organisms/table.type";
import React from "react";
import styled from "styled-components";

const Td = styled.td`
  padding: 10px;
  border: none;
  text-align: start;
  text-transform: capitalize;
  font-size: 15px;

  .active{
    color: ${({ theme }) => theme.colors.textGreen};
    border: 1px solid ${({ theme }) => theme.colors.textGreen};
  }

  .inactive{
    color: ${({ theme }) => theme.colors.textRed};
    border: 1px solid ${({ theme }) => theme.colors.textRed};
  }

  .suspended{
    color: ${({ theme }) => theme.colors.textGray};
    border: 1px solid ${({ theme }) => theme.colors.textGray};
  }

  .pending{
    color: ${({ theme }) => theme.colors.textBlue};
    border: 1px solid ${({ theme }) => theme.colors.textBlue};
  }

  .review{
    color: ${({ theme }) => theme.colors.textCyan};
    border: 1px solid ${({ theme }) => theme.colors.textCyan};
  }

  .solved{
    color: ${({ theme }) => theme.colors.textBrown};
    border: 1px solid ${({ theme }) => theme.colors.textBrown};
  }
`;

const Tr = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.textDark};
  
  &:hover {
    background-color: #eee;
  }
`;

const TableTag = styled.div`
    width: max-content;
    padding: 5px 10px;
    border-radius: 10px;
    text-align: center;
    font-size: 10px;
    font-weight: bold;
`;

const ReportMainInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const EditButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: 1px solid orange;
  margin: 5px;
  color: orange;
  border-radius: 10px;
  padding: 5px 10px;
  transition: 0.4s ease;

  &:hover {
    transition: 0.4s ease;
    background-color: orange;
    color: ${({ theme }) => theme.colors.textWhite};
  }
`;

const DeleteButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: 1px solid red;
  margin: 5px;
  color: red;
  border-radius: 10px;
  padding: 5px 10px;
  transition: 0.4s ease;

  &:hover {
    transition: 0.4s ease;
    background-color: red;
    color: ${({ theme }) => theme.colors.textWhite};
  }
`;

const TableRowReport: React.FC<ITableRowReportProps> = ({ report, setDataToEdit, onDeleteData }) => {
  const formatDate = (date: Date | string) => {
    if (typeof date === 'string') {
      return date; // Suponiendo que ya está en formato correcto
    }
    return date.toISOString().split('T')[0]; // Extrae solo la parte de la fecha
  };

  const { id, titleReport, description, dateReport, idActionTaken, actionTaken, actionDetails, state, user, reportedUser, idReportedUser, idState, idUser } = report;

  let stateElement;
  if (state?.toLocaleLowerCase().trim() === 'pendiente') {
    stateElement = <TableTag className={'pending'}>{idState}: {state}</TableTag>;
  } else if (state?.toLocaleLowerCase().trim() === 'revisión' || 'revision') {
    stateElement = <TableTag className={'review'}>{idState}: {state}</TableTag>;
  } else {
    stateElement = <TableTag className={'solved'}>{idState}: {state}</TableTag>;
  }

  let actionTakenElement;
  if (state?.toLocaleLowerCase().trim() === 'activo') {
    actionTakenElement = <TableTag className={'active'}>{idActionTaken}: {actionTaken}</TableTag>;
  } else if (state?.toLocaleLowerCase().trim() === 'inactivo') {
    actionTakenElement = <TableTag className={'inactive'}>{idActionTaken}: {actionTaken}</TableTag>;
  } else {
    actionTakenElement = <TableTag className={'suspended'}>{idActionTaken}: {actionTaken}</TableTag>;
  }

  return (
    <Tr>
      <Td>{id}</Td>
      <Td>
        <ReportMainInfo>
          {titleReport}
          {stateElement}
        </ReportMainInfo>
      </Td>
      <Td>{description}</Td>
      <Td>{dateReport ? formatDate(dateReport) : ""}</Td>
      <Td>{idUser}: {user}</Td>
      <Td>{idReportedUser}: {reportedUser}</Td>
      <Td>{actionTakenElement}</Td>
      <Td>{actionDetails}</Td>
      <Td>
        <EditButton onClick={() => setDataToEdit(report)}>Editar</EditButton>
        <DeleteButton onClick={() => onDeleteData(id!)}>Eliminar</DeleteButton>
      </Td>
    </Tr>
  );
};

export default TableRowReport;
