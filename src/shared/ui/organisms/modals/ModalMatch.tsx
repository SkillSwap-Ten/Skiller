'use client';
import React from "react";
import styled from "styled-components";
import RequestForm from "../forms/FormRequest";
import { IModalProps } from "@/src/shared/types/organisms/modal.type";

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

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  min-width: 45%;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-left: 1px solid ${({ theme }) => theme.colors.textTertiary};

  @media (max-width: 600px) {
    display: none;
  }
`;

const UserDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: end;
  border-top: 1px solid ${({ theme }) => theme.colors.textTertiary};
  border-bottom-right-radius: 10px;
  width: 100%;
  padding: 1rem;
`;

const UserName = styled.h3`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 1rem;
  margin: 0;
  gap: 5px;

  div {
    font-size: 1.2rem;
    font-weight: bold;
    text-transform: capitalize;
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.8rem;
    font-weight: 500;
    text-align: start;
    text-transform: capitalize;
  }
`;

const DivRequest = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  padding: 1rem;

  & textarea{
    border-radius: 10px;
    min-height: 100px;
  }

  & button{
    border-radius: 10px;
  }

  @media (max-width: 600px) {
    width: 100%;
    height: 100%;
  }
`;

const Div = styled.div`
  display: flex;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  border: 1px solid ${({ theme }) => theme.colors.textTertiary};
`;

const DivConnections = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0;
  margin: 0;
  padding: 1rem;
`;

const Connections = styled.div`
  padding: 1rem;
  padding-bottom: 0;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  div {
    font-size: 14px;
  }
`;

// Sección de rating
const RatingSection = styled.div`
  padding: 1rem;
  padding-bottom: 0;
  color: ${({ theme }) => theme.colors.textSecondary};

  div {
    font-size: 14px;
  }
`;

const DivRating = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const RatingStars = styled.div`
  color: ${({ theme }) => theme.colors.textGrey};
  font-size: 1.2rem;
`;

const Star = styled.span`
  color: ${({ theme }) => theme.colors.textGrey};
  font-size: 16px;
  margin: 0 2px;
  font-style: normal;
`;

const Unknown = styled.span`
  color: ${({ theme }) => theme.colors.textGrey};
  padding: 2px 10px;
  border-radius: 20px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.textGrey};
  font-size: 8px;
  font-weight: bold;
`;

const Modal: React.FC<IModalProps> = ({ userToInteractWith, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          Conectar
          <ModalCloseButton aria-label="Control Button" onClick={onClose}>×</ModalCloseButton>
        </ModalHeader>
        <ScrollContainer>
          <DivRoute><p>C:\ User\ Documents\ SkillSwap</p></DivRoute>
          <Div>
            <DivRequest>
              {/* Pasamos onClose al formulario */}
              <RequestForm receivingUser={userToInteractWith!} onClose={onClose} />
            </DivRequest>
            <UserInfo>
              <DivConnections>
                {/* Información del usuario */}
                <Connections>
                  <div>Conexiones</div>
                  <div># {userToInteractWith!.countMatches}</div>
                </Connections>
                <RatingSection>
                  <div>Calificación</div>
                  <DivRating>
                    <div>{userToInteractWith!.qualification}</div>
                    <RatingStars>
                      {[...Array(5)].map((_, index) => {
                        const rating = Math.floor(userToInteractWith!.qualification ?? 0);
                        return (
                          <Star key={index}>
                            {index < rating ? "★" : "☆"}
                          </Star>
                        );
                      })}
                    </RatingStars>
                  </DivRating>
                </RatingSection>
              </DivConnections>
              <UserDetail>
                <UserName>
                  <div>{userToInteractWith!.fullName}</div>
                  <p>{userToInteractWith!.jobTitle}</p>
                  <Unknown>？Unknown</Unknown>
                </UserName>
              </UserDetail>
            </UserInfo>
          </Div>
        </ScrollContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
