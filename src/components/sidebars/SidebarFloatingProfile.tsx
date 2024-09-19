import React from "react";
import styled from "styled-components";
import { FaCheck, FaTimes, FaClock } from "react-icons/fa";
import CardProfileLink from "../cards/CardProfileLink";
import LogoutButton from "../Logout"
import { FaSignOutAlt } from 'react-icons/fa';

const ProfileSidebarContainer = styled.div`
    z-index: -1;
    top: 0;
    left: 0;
    position: fixed;
    display: flex;
    align-items: center;
    background: ${({ theme }) => theme.colors.bgMainOpacity};
    width: 100%;
    height: 100%;
    transition: 1s ease-in-out;
    animation: appear 1s ease-in-out;

    @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ProfileSidebarContent = styled.div`
  z-index: 1;
  background: ${({ theme }) => theme.colors.bgSidebar};
  width: 300px !important;
  height: 75%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  margin-left: 20px;
  overflow: hidden;
  border-right: 0.5px solid ${({ theme }) => theme.colors.textWhite};
  animation: move-right 1s ease-in-out;

    @keyframes move-right {
    from {
      translate: -509px;
    }
    to {
      translate: 0;
    }
  }
`;

const StatusSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 0.7rem;
  margin-bottom: 10px;
  gap: 1rem;
  padding-left: 2rem;

  @media (max-height: 720px) {
    display:none; /* Reduce el tamaño del texto en móviles */
  }

  .status-item {
    display: flex;
    flex-direction: column;
  }

  .status-content {
    display: flex;
    align-items: center;
  }

  .icon {
    margin-right: 8px;
  }

  .rejected {
    opacity: 0.7;
    color: ${({ theme }) => theme.colors.textRed};

    & p {
      font-weight: 500;
      color: ${({ theme }) => theme.colors.textRed};
    }
  }

  .accepted {
    opacity: 0.7;
    color: ${({ theme }) => theme.colors.textBlueDark};

    & p {
      font-weight: 500;
      color: ${({ theme }) => theme.colors.textBlueDark};
    }
  }

  .pending {
    opacity: 0.7;
    color: ${({ theme }) => theme.colors.textSecondary};

    & p {
      font-weight: 500;
      color: ${({ theme }) => theme.colors.textSecondary};
    }
  }

  .inbox {
    opacity: 0.7;
    color: ${({ theme }) => theme.colors.textYellow};

    & p {
      font-weight: 500;
      color: ${({ theme }) => theme.colors.textYellow};
    }
  }
`;

const H2StatusSection = styled.h2`
  color: ${({ theme }) => theme.colors.textDark};
  font-weight: 500;
  margin: 0;
  margin-bottom: 0.1rem;
  font-size: 0.9rem;
`;

const ModalCloseButton = styled.button`
  z-index: 1;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.bgSidebar};
  color: ${({ theme }) => theme.colors.textDark};
  border: none;
  margin: 0;
  text-align: center;
  cursor: pointer;
  position: fixed;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 330px;

  & p{
    font-size: 20px;
    font-weight: 400;
  }

  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const BoxLogout = styled.h2`
  padding-left: 1.6rem;
  padding-top: 3rem;

  @media (max-height: 500px) {
    padding-top: 0; /* Reduce el tamaño del texto en móviles */
  }

`;



interface ProfileSidebarProps {
  name: string;
  skills: string[];
  rating: number;
  rejected: string[];
  accepted: string[];
  pending: string[];
  inbox: string[];
  isOpen: boolean;
  onClose: () => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  name,
  skills,
  rating,
  rejected,
  accepted,
  pending,
  inbox,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;
  return (
    <ProfileSidebarContainer>
      <ProfileSidebarContent>
        <ModalCloseButton onClick={onClose}>x</ModalCloseButton>
        <CardProfileLink name={name} skills={skills} rating={rating} />
        <StatusSection>
          <div className="status-item rejected">
            <H2StatusSection>Rejected</H2StatusSection>
            <div className="status-content">
              <FaTimes className="icon" />
              <p>
                {rejected.length}: {rejected.join(", ")}
              </p>
            </div>
          </div>
          <div className="status-item accepted">
            <H2StatusSection>Accepted</H2StatusSection>
            <div className="status-content">
              <FaCheck className="icon" />
              <p>
                {accepted.length}: {accepted.join(", ")}
              </p>
            </div>
          </div>
          <div className="status-item pending">
            <H2StatusSection>Pending</H2StatusSection>
            <div className="status-content">
              <FaClock className="icon" />
              <p>
                {pending.length}: {pending.join(", ")}
              </p>
            </div>
          </div>
          <div className="status-item inbox">
            <H2StatusSection>Inbox</H2StatusSection>
            <div className="status-content">
              <FaClock className="icon" />
              <p>
                {inbox.length}: {inbox.join(", ")}
              </p>
            </div>
          </div>
        </StatusSection>
        <BoxLogout>
          <LogoutButton icon={<FaSignOutAlt />} />
        </BoxLogout>
      </ProfileSidebarContent>
    </ProfileSidebarContainer>
  );
};

export default ProfileSidebar;