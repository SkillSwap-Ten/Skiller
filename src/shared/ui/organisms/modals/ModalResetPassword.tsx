"use client";
import styled from "styled-components";
import { useState } from "react";
import { toast } from "react-toastify";
import { IModalResetPasswordProps } from "@/src/shared/types/organisms/modal.type";
import { postRecoverPasswordRequest } from "@/src/app/api/auth/auth";

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.bgMainOpacity};
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.colors.bgPrimary};
  padding: 2rem;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  z-index: 1001;

  @media (max-width: 600px) {
    padding: 1.5rem;
    width: 95%;
  }
`;

const ModalHeader = styled.div`
  font-size: 20px !important;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & h2{
    margin: 0 !important;
    font-size: 20px !important;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #222;
`;

const FormLabel = styled.label`
  display: block;
  margin-top: 1rem;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.6rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 0.9rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  background-color: #222;
  color: ${({ theme }) => theme.colors.textWhite};
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
`;

const ModalResetPassword: React.FC<IModalResetPasswordProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await postRecoverPasswordRequest(email);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error del servidor: ${errorText}`);
      }

      const jsonResponse = await response.json();
      console.log('Correo enviado:', jsonResponse);
      toast.success('Correo enviado correctamente. Revisa tu bandeja de entrada.');
    } catch (error: unknown) {
      let errorMessage = 'Ocurrió un error desconocido.';

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(`Error al enviar correo: ${errorMessage}`);
    }
  };

  return (
    <ModalOverlay isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>
        <h2>Restablecer contraseña</h2>
        <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        <form onSubmit={handleSubmit}>
          <FormLabel htmlFor="email-recovery">Ingresa tu correo electrónico:</FormLabel>
          <Input
            type="email"
            id="email-recovery"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <SubmitButton type="submit">
            ENVIAR
          </SubmitButton>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ModalResetPassword;
