"use client";
import React, { useState } from 'react';
import styled from 'styled-components';
import { toast } from "react-toastify";
import { postConnectionRequest } from '../../../../app/api/requests/requests';
import { IRequestFormProps } from '@/src/shared/types/organisms/form.type';

const FormContainer = styled.form`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
  margin: 0 auto;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 80%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid ${({ theme }) => theme.colors.textTertiary};
  resize: none;

  @media (max-width: 600px) {
    margin-bottom: 0;
  }
`;

const SendButton = styled.button`
  background: none;
  width: 50%;
  border: none;
  padding: 0.3rem 0.7rem;
  border: 1px solid ${({ theme }) => theme.colors.textTertiary};
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  font-size: 0.7rem;
  font-weight: 800;
`;

const RequestForm: React.FC<IRequestFormProps> = ({ receivingUser, onClose }) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await postConnectionRequest(receivingUser.id, message); 
      setMessage('');
      toast.success("Solicitud enviada con éxito");

      // Cierra el modal después de enviar con éxito
      onClose();

    } catch (err) {
      console.log(err)
      toast.error("Error al enviar la solicitud");
      setError("Error al enviar la solicitud");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      <TextArea 
        placeholder="Escribe aquí el contenido de tu solicitud de conexión..." 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
        disabled={loading}
      />
      <SendButton type="submit" disabled={loading}>
        {loading ? "Enviando..." : "ENVIAR"}
      </SendButton>
    </FormContainer>
  );
};

export default RequestForm;

