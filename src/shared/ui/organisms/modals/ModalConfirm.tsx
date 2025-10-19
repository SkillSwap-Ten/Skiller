"use client";
import { IModalConfirmProps } from "@/src/shared/types/organisms/modal.type";
import styled from "styled-components";

// Modal Confirm Component
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

  & p{
    color: ${({ theme }) => theme.colors.textSecondary} !important;
    font-size: 0.9rem !important;
  }

  @media (max-width: 600px) {
    padding: 1.5rem;
    width: 95%;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ConfirmButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  background-color: ${({ theme }) => theme.colors.bgSecondary};
  color: ${({ theme }) => theme.colors.textWhite};
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
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

const ModalConfirm: React.FC<IModalConfirmProps> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <ModalOverlay isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>
          <h2>Confirmación</h2>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        <p>¿Estas completamente seguro de que quieres ejecutar esta acción? En caso de que te arrepientas podrás deshacerlo, pero solo después de un día.</p>
        <div>
          <ConfirmButton type="button" onClick={onConfirm}>CONFIRMAR</ConfirmButton>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ModalConfirm;
