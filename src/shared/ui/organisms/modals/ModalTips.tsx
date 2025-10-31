'use client';
import React from "react";
import styled from "styled-components";
import { IModalProps } from "@/src/shared/types/organisms/modal.type";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.bgMainOpacity};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  margin: 0;
  padding: 0;

  & strong {
    font-weight: bold;
  }
`;

const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.bgOrange};
  border: 1px solid ${({ theme }) => theme.colors.borderDark};
  width: 70%;
  border-radius: 10px;
  height: 75%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-height: 416px;
  border: none;
  margin: 0;
  padding: 0;

  @media (max-width: 600px) {
    max-height: 308px;
  }
`;

const ScrollContainer = styled.div`
  width: 100% !important;
  height: 100% !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 1rem;
  gap: 1rem;
`;

const ModalHeader = styled.div`
  font-size: 20px !important;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: ${({ theme }) => theme.colors.gradientPrimary};
  color: ${({ theme }) => theme.colors.textWhite};
  padding: 0.5rem;
  padding-left: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & div{
    font-weight: bold;
    display: flex;
  }

  & article{
    font-weight: bold;
    font-style: normal;
    font-size: 20px !important;
    opacity: 0.6;
    padding-left: 6px;
  }
`;

const ModalCloseButton = styled.button`
  background: none;
  font-weight: bold;
  color: #000;
  opacity: 0.5;
  border: none;
  font-size: 1.5rem !important;
  cursor: pointer;
`;

const DivRoute = styled.div`
  width: 100%;
  min-height: 34px !important;
  display: flex;
  border-radius: 10px;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  padding: 0.5rem;
  padding-left: 1rem;
  font-weight: bold;
  border: 1px solid ${({ theme }) => theme.colors.textTertiary};

  & p {
    color: #222;
    white-space: nowrap;
    text-overflow: ellipsis !important;
    overflow: hidden;
    font-weight: bold;
    line-height: normal;
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
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <div>Cultura<article>SkillSwap</article></div>
          <ModalCloseButton onClick={onClose}>×</ModalCloseButton>
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
                <span>🔵</span><AlertText>En tu sección <strong>Social</strong> podrás realizar <strong>Reportes</strong>.</AlertText>
              </article>
              <article>
                <span>⚠️</span><AlertText>Si lo solicitas, acude a las <strong>autoridades policiales</strong>.</AlertText>
              </article>
              <article>
                <span>⛔</span><AlertText>Las sanciones van de <strong>suspensiones a bloqueos</strong>.</AlertText></article>
            </RightSection>
          </ModalContent>
        </ScrollContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};


export default ModalTips;
