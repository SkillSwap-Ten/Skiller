'use client';
import styled from "styled-components";
import React, { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { PiList } from "react-icons/pi";
import { smoothScrollToTop } from "@/src/lib/utils/scrollBehavior";
import NavLink from "@/src/shared/ui/atoms/links/NavLinks";
import AdminProfileSidebar from "../sidebars/SidebarAdmin";
import LogoutButton from "../../atoms/buttons/ButtonLogout";

// Styled components
const NavbarContainer = styled.nav`
    z-index: 10;
    position: fixed;
    width: 100%;
    height: 54px;
    top: 0;
    background-color: ${({ theme }) => theme.colors.bgNavbar};
    color: ${({ theme }) => theme.colors.textWhite};
    border-bottom: 1px solid  ${({ theme }) => theme.colors.borderNavs};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    gap: 50px;

    @media (max-width: 790px) {
        padding: 0 5px;
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

    @media (max-width: 790px) {
        display: none;
    }
`;

const IconsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;

    @media (max-width: 790px) {
        gap: 5px;
    }
`;

const NavListContainer = styled.div<{ isOpen: boolean }>`
    display: flex;
    padding: 0;
    margin: 0;

    @media (max-width: 790px) {
        display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
        flex-direction: column;
        align-items: start;
        justify-content: center;
        position: fixed;
        top: 54px;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 100;
        transition: 1s ease-in-out;
        background-color: ${({ theme }) => theme.colors.bgMainOpacity};
        animation: appear-list 1s ease-in-out;

        @keyframes appear-list {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    }
`;

const NavList = styled.ul`
    list-style: none;
    text-align: center;
    display: flex;
    gap: 50px;
    padding: 0;

    @media (max-width: 790px) {
        background-color: ${({ theme }) => theme.colors.bgPrimary};
        border: 1px solid ${({ theme }) => theme.colors.borderLogobar};
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: space-between;
        height: 100%;
        width: 50%;
        padding: 10px 5px;
        margin: 0;
        transition: 1s ease-in-out;
        animation: move-list 1s ease-in-out;
    
        @keyframes move-list {
            from {
                translate: -510px;
            }
            to {
                translate: 0;
            };
        }
    }
`;

const NavListContent = styled.ul`
    list-style: none;
    text-align: center;
    display: flex;
    gap: 50px;
    padding: 0;
    margin: 0;

    @media (max-width: 790px) {
        display: flex;
        flex-direction: column;
        align-items: start;
        height: 100%;
        width: 100%;
        gap: 0;
        overflow-y: auto;

        & a{
            padding: 11px 16px;
            font-size: 16px;
            color: ${({ theme }) => theme.colors.textSecondary} !important;
        }
    }

    @media (max-height: 480px) {
        height: 60%;
    }

    @media (max-height: 400px) {
        height: 50%;
    }
`;

const NavItem = styled.li`
    display: inline-block;
    font-size: 15px;
    cursor: pointer;
`;

const HamburgerMenu = styled.div`
    display: none;
    cursor: pointer;
    justify-content: center;

    @media (max-width: 790px) {
        display: block;
    }
`;

const BoxLogout = styled.div`
    display: none;
    align-items: center;
    position: fixed;
    justify-content: end;
    align-self: end !important;
    justify-self: end !important;
    left: 0;
    width: 50%;
    padding: 16px;
    bottom: 54px;
    transition: 2s ease-in-out;
    animation: appear-logout 2s ease-in-out;
    z-index: 100;
    
        @keyframes appear-logout {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            };
        }

    @media (max-width: 790px) {
        display: flex;
        
    }
`;

// Navbar component
export const NavbarAdmin: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSidebarProfileOpen, setIsSidebarProfileOpen] = useState<boolean>(false);

    const openSidebarProfile = () => setIsSidebarProfileOpen(true);
    const closeSidebarProfile = () => setIsSidebarProfileOpen(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleOpenSidebarAndScroll = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        openSidebarProfile();
        smoothScrollToTop(2000);
    };

    return (
        <NavbarContainer>
            <AdminProfileSidebar isOpen={isSidebarProfileOpen} onClose={closeSidebarProfile} />
            <SidebarLink>
                <NavLink href="#" hover={{ transform: 'scale(0.95)', transition: '0.4s' }} onClick={handleOpenSidebarAndScroll}>
                    <small><span>+</span>Ayuda</small>
                </NavLink>
            </SidebarLink>
            <HamburgerMenu>
                <NavLink onClick={toggleMenu} hover={{ transform: 'scale(0.95)', transition: '0.4s' }} href="#">
                    {isOpen ? <AiOutlineClose /> : <PiList />}
                </NavLink>
            </HamburgerMenu>
            <NavListContainer isOpen={isOpen}>
                <NavList>
                    <NavListContent>
                        <NavItem>
                            <NavLink hover={{ fontWeight: '700', transition: '0.4s' }} href="/admin/" label="INICIO" />
                        </NavItem>
                        <NavItem>
                            <NavLink hover={{ fontWeight: '700', transition: '0.4s' }} href="/admin/users" label="USUARIOS" />
                        </NavItem>
                        <NavItem>
                            <NavLink hover={{ fontWeight: '700', transition: '0.4s' }} href="/admin/reports" label="REPORTES" />
                        </NavItem>
                    </NavListContent>
                    <BoxLogout>
                        <LogoutButton type={'button'}>
                            <FiLogOut />
                        </LogoutButton>
                    </BoxLogout>
                </NavList>
            </NavListContainer>
            <IconsContainer>
                <NavLink hover={{ transform: 'scale(0.95)', transition: '0.4s' }} href="/admin/legal" label="LEGAL">
                    <BsInfoCircle />
                </NavLink>
            </IconsContainer>
        </NavbarContainer>
    );
};