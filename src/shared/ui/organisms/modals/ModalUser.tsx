"use client";
import { IModalUserFormProps } from "@/src/shared/types/organisms/modal.type";
import styled from "styled-components";
import FormUser from "../forms/FormUser";

// Modal Form Component
const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.bgMainOpacity};
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 1000;
  margin: 0;
  padding: 0;

  & strong {
    font-weight: bold;
  }

  > * {
    font-size: 14px !important ;
  }
`;

const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.bgPrimary};
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
    flex-direction: column-reverse;
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
    border-top-left-radius: 0;
    border-bottom-right-radius: 10px;
    width: 100%;
    height: auto;
  }
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 2rem;
  height: 100%;
  width: 40%;
  flex: 1;
  border-left: 1px solid ${({ theme }) => theme.colors.borderDark};
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;

  @media (max-width: 1200px) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderDark};
    border-top-left-radius: 10px;
    border-bottom-right-radius: 0;
    width: 100%;
    border-left: none;
    height: auto;

    & article {
      justify-content: start;
    }
  }

  @media (max-width: 550px) {
    padding: 1rem;
  }
`;

const UserMainInfoContainer = styled.div`
  top: clamp(2rem, 10vw, 3.5rem);
  position: sticky;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  z-index: 5;

  @media (max-width: 1200px) {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: static;
  }
`;

const UserMainInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  & h3, p {
    margin: 4px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  @media (max-width: 1200px) {
    text-align: start;
  }
`;

const Avatar = styled.div<{ urlImage: string }>`
  border: 1px solid ${({ theme }) => theme.colors.borderDark};
  background-image: url(${(props) => props.urlImage}); 
  background-size: cover;
  background-position: center;
  width: clamp(6rem, 10vw, 11rem);
  height: clamp(6rem, 10vw, 11rem);
  border-radius: 10px;
`;

const ModalUser: React.FC<IModalUserFormProps> = ({ isOpen, onUpdateData, dataToEdit, setDataToEdit, onClose }) => {
  return (
    <ModalOverlay isOpen={isOpen}>
      <ModalContainer>
        <ModalHeader>
          <div>Gestionar<article>Perfil</article></div>
          <ModalCloseButton onClick={onClose}>×</ModalCloseButton>
        </ModalHeader>
        <ScrollContainer>
          <DivRoute><p>C:\ User\ Documents\ SkillSwap</p></DivRoute>
          <ModalContent>
            <LeftSection>
              <FormUser
                onUpdateData={onUpdateData}
                dataToEdit={dataToEdit}
                setDataToEdit={setDataToEdit}
                onClose={onClose}
              />
            </LeftSection>
            <RightSection>
              <UserMainInfoContainer>
                <Avatar urlImage={dataToEdit!.urlImage} />
                <UserMainInfo>
                  <h3>{dataToEdit?.name} {dataToEdit?.lastName}</h3>
                  <p>{dataToEdit?.jobTitle}</p>
                </UserMainInfo>
              </UserMainInfoContainer>
            </RightSection>
          </ModalContent>
        </ScrollContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ModalUser;
