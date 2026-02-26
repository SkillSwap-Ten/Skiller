"use client";
import styled from "styled-components";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { IModalRequestViewerProps } from "@/src/features/social/types/social.type";
import { timeAgo } from "@/src/lib/utils/timeAgoFormatter";
import ButtonBelow from "../../atoms/buttons/ButtonBelow";
import { useRouter } from "next/navigation";

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
    max-height: 312px;
    width: 80%;
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
  gap: 12px;
  width: 100%;
  z-index: 5;

  @media (max-width: 1200px) {
    flex-direction: row;
    align-items: center;
    justify-content: start;
    position: static;
  }
`;

const UserMainInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;

  & h3, p {
    margin: 0;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  @media (max-width: 1200px) {
    text-align: start;
    align-items: start;
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

const RequestContent = styled.div`
  display: flex;
  align-items: start;
  background: ${({ theme }) => theme.colors.bgTertiary};
  width: 100%;
  height: 100%;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  gap: 12px;
  text-align: justify;
`

const UserButton = styled(ButtonBelow)`
  border: none;
  color: ${({ theme }) => theme.colors.textGrey};
  background-color: ${({ theme }) => theme.colors.bgBanner};
  transition: 0.3s ease-in-out;
  font-size: 12px;
  width: fit-content;

  &:hover {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: 600;
    transition: 0.4s;
  }
`

const ModalRequestViewer: React.FC<IModalRequestViewerProps> = ({ isOpen, request, onClose }) => {
  const router = useRouter()

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
    <ModalOverlay isOpen={isOpen}>
      <ModalContainer>
        <ModalHeader>
          <div>Revisar<article>Solicitud</article></div>
          <ModalCloseButton aria-label="Control Button" onClick={onClose}>×</ModalCloseButton>
        </ModalHeader>
        <ScrollContainer>
          <DivRoute><p>C:\ User\ Documents\ SkillSwap</p></DivRoute>
          <ModalContent>
            <LeftSection>
              <RequestContent>
                {request.description}
              </RequestContent>
            </LeftSection>
            <RightSection>
              <UserMainInfoContainer>
                <Avatar urlImage={request.urlImageRequesting} />
                <UserMainInfo>
                  <h3>{request.userNameRequesting}</h3>
                  <p>Pendiente · {timeAgo(request.createdAt || new Date().toISOString())}</p>
                  <UserButton type="button" onClick={() => router.push(`/user/detail/u/${request.idRequestingUser}`)} aria-label={`Ver perfil de ${request.userNameRequesting}`}>
                    Ver Perfil
                  </UserButton>
                </UserMainInfo>
              </UserMainInfoContainer>
            </RightSection>
          </ModalContent>
        </ScrollContainer>
      </ModalContainer>
    </ModalOverlay>,
    document.body
  );
};

export default ModalRequestViewer;
