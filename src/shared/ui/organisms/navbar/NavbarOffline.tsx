'use client';
import styled from "styled-components";
import React, { useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import OfflineProfileSidebar from "../sidebars/SidebarOffline";
import NavLink from "../../atoms/links/NavLinks";

// Styled components
const NavbarContainer = styled.nav`
    z-index: 10;
    position: fixed;
    width: 100%;
    height: 54px;
    top: 0;
    background-color: ${({ theme }) => theme.colors.bgNavbar};
    color: ${({ theme }) => theme.colors.textWhite};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    gap: 50px;
    border-bottom: 1px solid  ${({ theme }) => theme.colors.borderNavs};

    @media (max-width: 768px) {
        padding: 0 5px;
        justify-content: end;
    }
`;

const AuthLink = styled.span`
    width: 100px;
    cursor: pointer;
    list-style: none;

    & a{
        width: max-content;
        padding: 15px;
    }
`;

const SidebarToggleContainer = styled.div`
    width: 100px;
    list-style: none;
    cursor: pointer;

    @media (max-width: 790px) {
        display: none;
    }
`;

const NavToggle = styled.span`
    text-decoration: none;
    padding: 16px;
    font-weight: 400;
    border-radius: 5px;
    color: ${({ theme }) => theme.colors.textWhite};
    display: flex;
    transition: 0.4s;
    align-items: center; 
    justify-content: center;
    cursor: pointer;

    & svg {
        display: flex;
        align-items: center; 
        justify-content: center;
        width: 16px;
        height: 16px;
        fill: ${({ theme }) => theme.colors.textWhite}; 
    }

    & small {
        margin: 0;
        padding: 0;
        font-weight: 300;
        font-size: 12px;
        gap: 10px;
        font-style: italic;
        display: flex;
        align-items: center; 
        justify-content: center;
        color: ${({ theme }) => theme.colors.textWhite};
    }

    &:hover {
        transform: scale(0.95);
        transition: 0.4s;
    }
`;

const IconsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;


    > * {
        cursor: pointer;
    }

    @media (max-width: 768px) {
        gap: 5px;
    }
`;

// Navbar component
export const Navbar: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    const openSidebar = () => setIsSidebarOpen(true);
    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <NavbarContainer>
            <OfflineProfileSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
            <SidebarToggleContainer>
                <NavToggle onClick={openSidebar}><small><span>+</span>SkillSwap</small></NavToggle>
            </SidebarToggleContainer>

            <IconsContainer>
                <AuthLink>
                    <NavLink hover={{ transform: 'scale(0.95)', transition: '0.4s' }} href="/auth" label="AUTH">
                        <small>Iniciar sesión</small>
                    </NavLink>
                </AuthLink>
                <NavLink hover={{ transform: 'scale(0.95)', transition: '0.4s' }} href="/legal" label="LEGAL">
                    <BsInfoCircle />
                </NavLink>
            </IconsContainer>
        </NavbarContainer>
    );
};
