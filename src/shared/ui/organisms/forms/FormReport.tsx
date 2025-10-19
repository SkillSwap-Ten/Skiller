'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { toast } from "react-toastify";
import { postReport } from '../../../../app/api/reports/reports';
import { IReportFormProps } from '@/src/shared/types/organisms/form.type';
import { getAuthData } from '@/src/lib/utils/getAuthData';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
  width: 100%;
  margin: 0;
  padding: 0;

  > * {
    font-size: 14px !important ;
  }

  & select{
      padding: 10px !important;
      border-radius: 10px !important;
      border: 1px solid ${({ theme }) => theme.colors.textTertiary} !important;
      background: ${({ theme }) => theme.colors.bgOrange} !important;
      color: ${({ theme }) => theme.colors.textSecondary} !important;
      font-size: 14px !important;
      width: 100% !important;
      height: 40px !important;
      text-transform: capitalize;
  }
`;

const Input = styled.input`
  border-radius: 10px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.textTertiary};
  font-size: 14px !important;
  width: 100%;
  height: 40px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.textTertiary};
  font-size: 14px !important;
  width: 100%;
  height: 70px;
  resize: none;
`;

const SubmitButton = styled.button`
  border-radius: 10px;
  padding: 10px;
  background-color: #fff;
  color: #000;
  font-size: 1rem;
  font-weight: bold;
  border: 1px solid ${({ theme }) => theme.colors.textTertiary};
  width: 40%;
  min-width: 70px !important;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.bgOrange};
  }
`;

const ReportForm: React.FC<IReportFormProps> = ({ closeModal, reportedUser }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const token = getAuthData('token');
  const currentUserId = getAuthData('id');

  if (token === null) {
    throw new Error("Token no disponible");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reportedUser?.id) {
      toast.error('No se ha seleccionado un usuario para reportar.');
      return;
    }

    const reportData = {
      id: 0,
      titleReport: title,
      description: description,
      dateReport: new Date(),
      actionTaken: '',
      idState: 0,
      idUser: currentUserId || 0,
      idReportedUser: reportedUser.id,
    };

    try {
      const response = await postReport(reportData, token);
      console.log(response)
      toast.success('Reporte enviado con éxito', { autoClose: 3000 });
      closeModal();
    } catch (error) {
      toast.error('Error al enviar el reporte', { autoClose: 3000 });
      console.error('Error al enviar el reporte:', error);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <label id="select-label" htmlFor="select" hidden>.</label>
      <select aria-labelledby="select" id="select" title="select" value={reportedUser.id} disabled >
        <option key={reportedUser.id} value={reportedUser.id}>
          -- {reportedUser.fullName} --
        </option>
      </select>
      <Input
        type="text"
        placeholder="Título del reporte..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        title="report"
        id="report"
        name="report"
        autoComplete="off"
      />
      <TextArea
        placeholder="Descripción del comportamiento..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        title="description"
        id="description"
        name="description"
        autoComplete="off"
      />
      <SubmitButton type="submit">ENVIAR</SubmitButton>
    </FormContainer>
  );
};

export default ReportForm;

