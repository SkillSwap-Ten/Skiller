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

const SidebarLink = styled.span`
    width: 100px;
    cursor: pointer;
    list-style: none;

    & a{
        width: max-content;
        padding: 15px;
    }
`;

const SidebarLinkContainer = styled.span`
    width: 100px;
    cursor: pointer;
    list-style: none;

    @media (max-width: 768px) {
        display: none;
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

    const handleOpenSidebarAndScroll = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        openSidebar();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <NavbarContainer>
            <OfflineProfileSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
            <SidebarLinkContainer>
                <SidebarLink>
                    <NavLink hover={{ transform: 'scale(0.95)', transition: '0.4s' }} href={'#'} onClick={handleOpenSidebarAndScroll}>
                        <small><span>+</span>SkillSwap</small>
                    </NavLink>
                </SidebarLink>
            </SidebarLinkContainer>
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
