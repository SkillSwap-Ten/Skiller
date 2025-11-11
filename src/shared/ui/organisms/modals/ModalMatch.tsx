'use client';
import React from "react";
import styled from "styled-components";
import RequestForm from "../forms/FormRequest";
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
`;

const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  border: 1px solid ${({ theme }) => theme.colors.borderDark};
  width: 70%;
  height: 75%;
  padding: 1rem;
  position: relative;
  margin: 0;
  border-radius: 10px;
  padding: 0;
  border: none;
  display: flex;
  flex-direction: column;
  max-height: 416px;

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
  background: ${({ theme }) => theme.colors.bgSecondary};
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
  color: ${({ theme }) => theme.colors.textWhite};
  border: none;
  font-size: 1.5rem;
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

const UserInfo = styled.div`
  min-width: 45%;
  display: flex;
  flex-direction: column;
  align-items: start;
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
  border-top: 1px solid ${({ theme }) => theme.colors.textTertiary};
  text-align: end;
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
    color: #000;
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

  @media (max-width: 600px) {
    width: 100%;
    height: 100%;

    & textarea{
      min-height: 100px;
  }
  }

  & textarea{
    max-height: 200px;
    border-radius: 10px;
  }

  & button{
    border-radius: 10px;
  }
`;

const Div = styled.div`
  display: flex;
  border-radius: 10px;
  width: 100%;
  max-height: 300px;
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
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSecondary};

  div {
    font-size: 16px;
  }
`;

// Sección de rating
const RatingSection = styled.div`
  padding: 1rem;
  padding-bottom: 0;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSecondary};

  div {
    font-size: 16px;
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
