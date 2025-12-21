'use client';
import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import NavLink from "../../atoms/links/NavLinks";
import { handlePageTheme } from "../../../../lib/utils/themeHandler";
import { ISidebarProps } from "@/src/shared/types/organisms/sidebar.type";

const OfflineSidebarContainer = styled.div<{ isOpen: boolean }>`
    top: 0;
    left: 0;
    position: fixed;
    align-items: center;
    background: ${({ theme }) => theme.colors.bgMainOpacity};
    width: 100%;
    height: 100%;
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")}; 
    animation: ${({ isOpen }) => (isOpen ? "appear 1s ease-in-out" : "none")};
    z-index: 9;
    overflow: hidden;
    
    @keyframes appear {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

const OfflineSidebarContent = styled.div`
    z-index: 9;
    background: ${({ theme }) => theme.colors.bgSidebar};
    width: 300px !important;
    height: 70%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: none;
    border-radius: 10px;
    margin: 0;
    padding: 1rem;
    margin-left: 20px;
    animation: move-right 1s ease-in-out;

    @keyframes move-right {
        from {
            translate: -510px;
        }
        to {
            translate: 0;
        }
    }

    @media (max-width: 370px) {
        width: 250px !important;
    }

    @media (max-height: 500px) {
        height: 60% !important;
    }

    @media (min-width: 1920px) {
        height: 80%;
    }

    @media (min-width: 2560px) {
        height: 85%;
    }

    @media (min-width: 3840px) {
        height: 90%;
    }
`;

const Disclaimer = styled.div`
    flex-direction: column;
    align-items: center;
    justify-content: start;
    width: 100%;
    height: 100%;
    display: flex;
    padding: 0.5rem 1rem;
    overflow-y: auto;
    overflow-x: hidden;
    font-size: 0.7rem;
`;

const H2 = styled.h2`
  color: ${({ theme }) => theme.colors.textSidebar};
  font-weight: 500;
  margin: 0;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  text-align: center;
`;

const OfflineProfile = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0.5rem;

  @media (max-height: 400px) {
    display: none;
  }
`;

const ProfileHeader = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  justify-content: start;
  padding-left: 0.5rem;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.textTertiary};
`;

const Avatar = styled.div<{ urlImage: string }>`
  filter: brightness(95%);
  background-image: url(${(props) => props.urlImage}); 
  background-size: cover;
  background-position: center;
  width: 4rem;
  height: 4rem;
  border-radius: 10px;
`;

const ProfileName = styled.div`
  text-transform: capitalize;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  background: ${({ theme }) => theme.colors.gradientText};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent; 
`;

const Skills = styled.ul`
  list-style: none;
  opacity: 0.5;
  font-size: 0.6rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  width: 100px;
  background: transparent;
  border: ${({ theme }) => theme.colors.textOrange} 1px solid;
  padding: 15px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.4s ease-in-out;
  margin: 30px 0;
  border-radius: 10px;
  opacity: 0.7;

  & a{
    padding: 0;
    color: ${({ theme }) => theme.colors.textOrange};
  }

  &:hover {
    transform: scale(0.95);
    transition: 0.4s ease-in-out;
  }
`;

const SidebarOffline: React.FC<ISidebarProps> = ({ isOpen, onClose }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <OfflineSidebarContainer isOpen={isOpen}>
      <OfflineSidebarContent ref={sidebarRef}>
        <Disclaimer>
          <OfflineProfile>
            <ProfileHeader>
              <Avatar urlImage={"/img/default-picture-circled.webp"} />
              <div>
                <ProfileName>Offline</ProfileName>
                <Skills>
                  <li>¡Ups!</li>
                </Skills>
              </div>
            </ProfileHeader>
          </OfflineProfile>
          <H2>Atrévete a hacer parte de nuestras <strong>Comunidades</strong>.</H2>
          <Button aria-label="Control Button" onClick={() => handlePageTheme('INICIAR SESIÓN')}>
            <NavLink hover={{ fontWeight: '700', transition: '0.4s'}} href="/auth" label="COMENZAR" />
          </Button>
        </Disclaimer>
      </OfflineSidebarContent>
    </OfflineSidebarContainer>
  );
};

export default SidebarOffline;