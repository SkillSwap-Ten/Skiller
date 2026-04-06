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
  gap: 16px;
  width: 100%;
  margin: 0;
  padding: 0;

  & select{
    padding: 10px;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.colors.textTertiary};
    background: ${({ theme }) => theme.colors.bgNeutral};
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 14px;
    width: 100%;
    height: 36px;
    text-transform: capitalize;
  }
`;

const Input = styled.input`
  border-radius: 10px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.textTertiary};
  font-size: 14px;
  width: 100%;
  height: 36px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.textTertiary};
  width: 100%;
  height: 96px;
  resize: none;
  font-size: 14px;
`;

const SubmitButton = styled.button`
  background: none;
  width: 40%;
  min-width: 100px;
  max-width: 150px;
  border: none;
  padding: 0.3rem 0.6rem;
  border: 1px solid ${({ theme }) => theme.colors.textTertiary};
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 800;
  transition: 0.3s ease;
  border-radius: 10px;

  &:hover {
    transform: scale(0.98);
    transition: 0.3s ease;
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
      <SubmitButton aria-label="Control Button" type="submit">ENVIAR</SubmitButton>
    </FormContainer>
  );
};

export default ReportForm;

