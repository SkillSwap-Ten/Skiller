'use client';
import React, { useEffect } from "react";
import styled from "styled-components";
import ReportForm from "../forms/FormReport";
import { IModalProps } from "@/src/shared/types/organisms/modal.type";
import { createPortal } from 'react-dom'

const ModalOverlay = styled.div`
  background-color: ${({ theme }) => theme.colors.bgMainOpacity};
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  padding: 0;
  z-index: 1000;

  & strong {
    font-weight: bold;
  }
`;

const ModalContainer = styled.div`
  background: ${({ theme }) => theme.colors.bgSecondary};
  border: 1px solid ${({ theme }) => theme.colors.borderDark};
  width: 70%;
  height: 75%;
  max-height: 416px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: none;
  margin: 0;
  padding: 4px;
  padding-top: 0;
  border-radius: 10px;

  @media (max-width: 600px) {
    max-height: 59dvh;
    width: 80%;
  }
`;

const ScrollContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.bgNeutral};
  width: 100% !important;
  height: 100% !important;
  padding: 1rem;
  gap: 12px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
`;

const ModalHeader = styled.div`
  color: ${({ theme }) => theme.colors.textWhite};
  font-size: 18px !important;
  font-weight: 600;
  padding: 0.5rem;
  padding-left: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & div{
    font-weight: 600;
    display: flex;
  }

  & article{
    font-size: 18px !important;
    font-weight: 600;
    opacity: 0.6;
    padding-left: 6px;
    font-style: normal;
  }
`;

const ModalCloseButton = styled.button`
  color: ${({ theme }) => theme.colors.textWhite};
  font-size: 1.5rem !important;
  opacity: 0.6;
  background: none;
  font-weight: bold;
  border: none;
  cursor: pointer;
`;

const DivRoute = styled.div`
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  border: 1px solid ${({ theme }) => theme.colors.textTertiary};
  width: 100%;
  min-height: 32px !important;
  border-radius: 10px;
  padding-left: 1rem;
  font-size: 14px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: bold;

  & p {
    color: ${({ theme }) => theme.colors.textGray};
    white-space: nowrap;
    text-overflow: ellipsis !important;
    overflow: hidden;
    font-weight: 600;
  }
`;

const ModalContent = styled.div`
  display: flex;
  margin: 0;
  border-radius: 10px;
  width: 100%;
  height: 312px;
  border: 1px solid ${({ theme }) => theme.colors.textTertiary};
`;

const LeftSection = styled.div`
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  flex: 2;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  gap: 15px;
  padding: 1rem;
  width: 60%;

  @media (max-width: 680px) {
    width: 100%;
    border-radius: 10px;
  }

  & textarea {
    max-height: 100px;
    border-radius: 10px;
  }
`;

const RightSection = styled.div`
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-left: 1px solid ${({ theme }) => theme.colors.textTertiary};

  @media (max-width: 680px) {
      display: none;
  }
`;

const AlertText = styled.p`
  font-size: 0.8rem  !important;
  font-weight: 300;
  color: #000;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 4px;
  width: auto !important;

  span {
    padding-right: 0.5rem;
    font-size: 1.2rem  !important;
  }
`;

const PoliceInfo = styled.div`
  font-weight: 300;
  font-size: 14px;
  color: #000;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  gap: 1rem;

  & span{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const DivAlertText = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.colors.textTertiary};
`;

const DivColor = styled.div`
  border-top-right-radius: 10px;
  background: ${({ theme }) => theme.colors.bgSecondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.textTertiary};
  margin: 0;
  padding: 0;
  width: 100%;
  height: 2rem;
`;

const DivTexts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.7rem;
  width: 100%;
`;

const Modal: React.FC<IModalProps> = ({ isOpen, onClose, userToInteractWith }) => {
  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null;

  return createPortal(
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <div>Cultura<article>SkillSwap</article></div>
          <ModalCloseButton aria-label="Control Button" onClick={onClose}>×</ModalCloseButton>
        </ModalHeader>
        <ScrollContainer>
          <DivRoute><p>C:\ User\ Documents\ SkillSwap</p></DivRoute>
          <ModalContent>
            <LeftSection>
              <ReportForm reportedUser={userToInteractWith!} closeModal={onClose} />
            </LeftSection>

            <RightSection>
              <DivAlertText>
                <DivColor />
                <DivTexts>
                  <AlertText>
                    <span>⚪</span> La seguridad es primero.
                  </AlertText>
                  <AlertText>
                    <span>⚠️</span> No dudes en reportar abusos.
                  </AlertText>
                  <AlertText>
                    <span>⛔</span> Reprobamos cualquier tipo de acoso o ilegalidad.
                  </AlertText>
                </DivTexts>
              </DivAlertText>

              <PoliceInfo>
                <span>
                  <strong>Línea Policía Nacional: </strong>0 8000 91 1190
                </span>
                <span>
                  <strong>Página CAI Virtual: </strong>https://cai.virtual.policia.gov.co
                </span>
              </PoliceInfo>
            </RightSection>
          </ModalContent>
        </ScrollContainer>
      </ModalContainer>
    </ModalOverlay>,
    document.body
  );
};

export default Modal;
