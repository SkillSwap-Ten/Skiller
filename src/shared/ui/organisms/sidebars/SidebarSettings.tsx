'use client';
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import LogoutButton from "../../atoms/buttons/ButtonLogout";
import NavLink from "../../atoms/links/NavLinks";
import { IoSettingsSharp } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi"
import { ISidebarProps } from "@/src/shared/types/organisms/sidebar.type";

const SidebarContainer = styled.div`
    top: 0;
    right: 0;
    position: fixed;
    display: flex;
    justify-content: end;
    align-items: center;
    background: ${({ theme }) => theme.colors.bgMainOpacity};
    width: 100%;
    height: 100%;
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

const SidebarContent = styled.div`
    z-index: 9;
    background: ${({ theme }) => theme.colors.bgSidebar};
    color: ${({ theme }) => theme.colors.textSecondary};
    width: 300px !important;
    height: 70%;
    display: flex;
    align-items: start;
    justify-content: space-between;
    flex-direction: column;
    padding: 1rem;
    margin-right: 20px;
    border: none;
    border-radius: 10px;
    overflow: hidden;
    animation: move-left 1s ease-in-out;

    & div{
        width: 100%;
    }

    @keyframes move-left {
        from {
            translate: 510px;
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

const Navigation = styled.div`
    justify-content: start;
    align-items: start;
    flex-direction: column;
    width: 100%;
    display: flex;
    margin-right: 0.2rem;
    overflow-y: auto;
    overflow-x: hidden;

    @media (max-width: 790px) {
        display: none;
    }
`;

const NavList = styled.ul`
    list-style: none;
    text-align: start;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding-left: 2.5rem;
    width: 100%;
`;

const NavItem = styled.li`
    display: flex;
    flex-direction: column;
    align-items: start;
    font-size: 18px;
    cursor: pointer;
    border-left: 2px solid ${({ theme }) => theme.colors.borderDark};
    padding: 0 0.5rem;
    width: 100%;

    &:hover {
        border-left: 2px solid ${({ theme }) => theme.colors.textTertiary};
    }

    & a {
        justify-content: start;
        text-align: start;
        width: 100%;
        padding: 10px;
        color: ${({ theme }) => theme.colors.textSidebar};
    }
`;

const NavListTitleContainer = styled.div`
    align-items: start;
    display: flex;
    margin: 0;
    padding: 1rem;
    gap: 10px;
    font-weight: 500;
    font-size: 18px;

    & svg {
        margin-top: 2px;
        color: ${({ theme }) => theme.colors.textSidebar};
    }
`;

const NavListTitle = styled.div`
    align-items: start;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textSidebar};
`;

const Subtitle = styled.p`
  opacity: 0.75;
  font-size: 0.65rem;
  color: ${({ theme }) => theme.colors.textSidebar};
  margin-top: 4px;
  padding: 0;
`;

const BoxLogout = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    width: 100%;

    @media (max-width: 790px) {
        display: flex;
        align-self: end !important;
        justify-self: end !important;
    }

    @media (max-height: 360px) {
        & button {
            justify-content: end;
    }
    }
`;

const SidebarSettings: React.FC<ISidebarProps> = ({
    isOpen,
    onClose,
}) => {
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

    if (!isOpen) return null;

    return (
        <SidebarContainer>
            <SidebarContent ref={sidebarRef}>
                <Navigation>
                    <NavListTitleContainer>
                        <IoSettingsSharp />
                        <NavListTitle>
                            <Title>AJUSTES</Title>
                            <Subtitle>¡Hey! Gestiona aquí tu cuenta, actividad y conexiones de SkillSwap App.</Subtitle>
                        </NavListTitle>
                    </NavListTitleContainer>
                    <NavList>
                        <NavItem>
                            <NavLink hover={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', fontWeight: '700', transition: '0.4s'}} href="/user/profile" label="PERFIL" />
                        </NavItem>
                        <NavItem>
                            <NavLink hover={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', fontWeight: '700', transition: '0.4s'}} href="/user/social" label="SOCIAL" />
                        </NavItem>
                        <NavItem>
                            <NavLink hover={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', fontWeight: '700', transition: '0.4s'}} href="/user/info" label="INFO" />
                        </NavItem>
                    </NavList>
                </Navigation>
                    <BoxLogout>
                        <LogoutButton type={'button'}>
                            <FiLogOut />
                        </LogoutButton>
                    </BoxLogout>
            </SidebarContent>
        </SidebarContainer>
    );
};

export default SidebarSettings;