"use client";
import { IModalReportFormProps } from "@/src/shared/types/organisms/modal.type";
import styled from "styled-components";
import FormAdminReports from "../forms/FormAdminReports";

// Modal Form Component
const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  background-color: ${({ theme }) => theme.colors.bgMainOpacity};
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
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

  > * {
    font-size: 14px !important ;
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

const ReportMainInfoContainer = styled.div`
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
    justify-content: start;
    position: static;
  }
`;

const ReportMainInfo = styled.div`
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

const Avatar = styled.div<{ $urlImage: string }>`
  border: 1px solid ${({ theme }) => theme.colors.borderDark};
  background-image: url(${(props) => props.$urlImage}); 
  background-size: cover;
  background-position: center;
  min-width: clamp(5rem, 9vw, 11rem);
  width: clamp(5rem, 9vw, 11rem);
  aspect-ratio: 1 / 1;
  border-radius: 10px;
`;

const ModalAdminReport: React.FC<IModalReportFormProps> = ({ onUpdateData, dataToEdit, setDataToEdit, onClose, isOpen }) => {
  return (
    <ModalOverlay $isOpen={isOpen}>
      <ModalContainer>
        <ModalHeader>
          <div>Gestionar<article>Reporte</article></div>
          <ModalCloseButton aria-label="Control Button" onClick={onClose}>×</ModalCloseButton>
        </ModalHeader>
        <ScrollContainer>
          <DivRoute><p>C:\ User\ Documents\ SkillSwap</p></DivRoute>
          <ModalContent>
            <LeftSection>
              <FormAdminReports
                key={dataToEdit?.id}
                onUpdateData={onUpdateData}
                dataToEdit={dataToEdit}
                setDataToEdit={setDataToEdit}
                onClose={onClose}
              />
            </LeftSection>
            <RightSection>
              <ReportMainInfoContainer>
                <Avatar $urlImage={'/img/many-users.webp'} />
                <ReportMainInfo>
                  <h3>{dataToEdit?.titleReport}</h3>
                  <p>{dataToEdit?.user} vs. {dataToEdit?.reportedUser}</p>
                </ReportMainInfo>
              </ReportMainInfoContainer>
            </RightSection>
          </ModalContent>
        </ScrollContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ModalAdminReport;
