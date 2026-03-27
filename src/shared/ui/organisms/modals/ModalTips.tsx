'use client';
import React, { useEffect } from "react";
import styled from "styled-components";
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
  margin: 0;
  border-radius: 10px;
  display: flex;
  align-items: start;
  flex: 1;
  width: 100%;
  height: fit-content;
  border: 1px solid ${({ theme }) => theme.colors.borderDark};
  background-color: #fff;

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
  }
`;

const LeftSection = styled.div`
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 1rem;
  width: 60%;
  height: 100%;

  @media (max-width: 1200px) {
    border-bottom-left-radius: 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderDark};
    width: 100%;
    height: auto;
  }
`;

const RightSection = styled.div`
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem 0;
  height: 100%;
  width: 40%;
  flex: 1;
  border-left: 1px solid ${({ theme }) => theme.colors.borderDark};

  & article {
    height: 100%;
    padding: 0.75rem 1rem;
    display: flex;
    gap: 10px;
    justify-content: center;

    :last-child{
      align-self: center;
    }

    span{
      font-size: 40px;
    }
  }

  @media (max-width: 1200px) {
    border-top-right-radius: 0;
    width: 100%;
    border-left: none;
    height: auto;

    & article {
      justify-content: start;
    }
  }
`;

const TipItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Icon = styled.div`
  filter: grayscale();
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
`;

const TipText = styled.p`
  font-size: 0.9rem !important;
  color: #000;
  margin-top: 12px;
`;

const AlertText = styled.p`
  font-size: 0.9rem !important;
  font-weight: 300;
  color: #000;
  gap: 10px;
  font-style: normal;
`;

const ModalTips: React.FC<IModalProps> = ({ isOpen, onClose }) => {
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
              <TipItem>
                <Icon>📂</Icon>
                <TipText><strong>Completar tu perfil</strong> mantiene la confianza entre usuarios y un <strong>ambiente seguro.</strong></TipText>
              </TipItem>
              <TipItem>
                <Icon>📂</Icon>
                <TipText>No compartas <strong>datos sensibles</strong>. La seguridad mutua primero.</TipText>
              </TipItem>
              <TipItem>
                <Icon>📂</Icon>
                <TipText>Reporta cualquier conducta <strong>sospechosa o inadecuada</strong>.</TipText>
              </TipItem>
            </LeftSection>
            <RightSection>
              <article>
                <span>⚪</span><AlertText>En tu sección <strong>Social</strong> podrás realizar <strong>Reportes</strong>.</AlertText>
              </article>
              <article>
                <span>⚠️</span><AlertText>Si lo solicitas, acude a las <strong>autoridades policiales</strong>.</AlertText>
              </article>
              <article>
                <span>⛔</span><AlertText>Las sanciones van desde <strong>suspensiones a bloqueos</strong>.</AlertText></article>
            </RightSection>
          </ModalContent>
        </ScrollContainer>
      </ModalContainer>
    </ModalOverlay>,
    document.body
  );
};


export default ModalTips;
