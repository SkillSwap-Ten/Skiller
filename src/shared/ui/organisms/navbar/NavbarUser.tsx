'use client';
import styled from "styled-components";
import React, { useState } from "react";
import NavLink from "@/src/shared/ui/atoms/links/NavLinks";
import UserProfileSidebar from "../sidebars/SidebarUser";
import SettingsFloatingSidebar from "../sidebars/SidebarSettings";
import LogoutButton from "../../atoms/buttons/ButtonLogout";
import { FiLogOut } from "react-icons/fi";
import { BsInfoCircle } from "react-icons/bs";
import { PiList } from "react-icons/pi";
import { AiOutlineClose } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";

// Styled components
const NavbarContainer = styled.nav`
    position: fixed;
    z-index: 10;
    width: 100%;
    height: 54px;
    border-bottom: 1px solid  ${({ theme }) => theme.colors.borderNavs};
    top: 0;
    background-color: ${({ theme }) => theme.colors.bgNavbar};
    color: ${({ theme }) => theme.colors.textWhite};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    gap: 50px;

    @media (max-width: 790px) {
        padding: 0 5px;
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
    cursor: pointer;
    display: inline-block;
    font-size: 15px;
`;

const SettingsNavList = styled.div`
    display: none;
    justify-content: start;
    align-items: start;
    width: 100%;
    padding-left: 20px;

    @media (max-width: 790px) {
        display: block;
    }
`;

const SettingsNavTitle = styled.li`
    cursor: pointer;
    display: inline-block;
    font-size: 15px;
    display: none;

    @media (max-width: 790px) {
        display: block;
    }
`;

const SettingsNavItem = styled.li`
    display: flex;
    flex-direction: column;
    align-items: start;
    font-size: 18px;
    cursor: pointer;
    border-left: 2px solid ${({ theme }) => theme.colors.textDark};
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

const IconsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;

    @media (max-width: 790px) {
        gap: 5px;
    }
`;

const MenuToggleContainer = styled.div`
    cursor: pointer;
    list-style: none;
    display: none;

    @media (max-width: 790px) {
        display: block;
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

const SettingsToggleContainer = styled.div`
    cursor: pointer;
    list-style: none;

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
export const NavbarUser: React.FC = () => {
    const [isOpenToggleMenu, setIsOpenToggleMenu] = useState(false);
    const [isSidebarProfileOpen, setIsSidebarProfileOpen] = useState<boolean>(false);
    const [isSidebarSettingsOpen, setIsSidebarSettingsOpen] = useState<boolean>(false);

    const openSidebarProfile = () => setIsSidebarProfileOpen(true);
    const closeSidebarProfile = () => setIsSidebarProfileOpen(false);
    const openSidebarSettings = () => setIsSidebarSettingsOpen(true);
    const closeSidebarSettings = () => setIsSidebarSettingsOpen(false);

    const toggleMenu = () => {
        setIsOpenToggleMenu(!isOpenToggleMenu);
    };

    return (
        <NavbarContainer>
            <UserProfileSidebar isOpen={isSidebarProfileOpen} onClose={closeSidebarProfile} />
            <SettingsFloatingSidebar isOpen={isSidebarSettingsOpen} onClose={closeSidebarSettings} />

            <SidebarToggleContainer>
                <NavToggle onClick={openSidebarProfile}><small><span>+</span>Notificaciones</small></NavToggle>
            </SidebarToggleContainer>

            <MenuToggleContainer>
                <NavToggle onClick={toggleMenu}>
                    {isOpenToggleMenu ? <AiOutlineClose /> : <PiList />}
                </NavToggle>
            </MenuToggleContainer>

            <NavListContainer isOpen={isOpenToggleMenu}>
                <NavList>
                    <NavListContent>
                        <NavItem>
                            <NavLink hover={{ fontWeight: '700', transition: '0.4s' }} href="/user/" label="INICIO" />
                        </NavItem>
                        <NavItem>
                            <NavLink hover={{ fontWeight: '700', transition: '0.4s' }} href="/user/discover" label="DESCUBRE" />
                        </NavItem>
                        <NavItem>
                            <NavLink hover={{ fontWeight: '700', transition: '0.4s' }} href="/user/match" label="MATCH" />
                        </NavItem>
                        <SettingsNavTitle>
                            <NavLink hover={{ fontWeight: '700', transition: '0.4s' }} href="#" label="AJUSTES"></NavLink>
                        </SettingsNavTitle>
                        <SettingsNavList>
                            <SettingsNavItem>
                                <NavLink hover={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', fontWeight: '700', transition: '0.4s' }} href="/user/profile" label="PERFIL" />
                            </SettingsNavItem>
                            <SettingsNavItem>
                                <NavLink hover={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', fontWeight: '700', transition: '0.4s' }} href="/user/social" label="SOCIAL" />
                            </SettingsNavItem>
                            <SettingsNavItem>
                                <NavLink hover={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', fontWeight: '700', transition: '0.4s' }} href="/user/info" label="INFO" />
                            </SettingsNavItem>
                        </SettingsNavList>
                    </NavListContent>
                    <BoxLogout>
                        <LogoutButton type={'button'}>
                            <FiLogOut />
                        </LogoutButton>
                    </BoxLogout>
                </NavList>
            </NavListContainer>
            <IconsContainer>
                <SettingsToggleContainer>
                    <NavToggle onClick={openSidebarSettings}>
                        <IoSettingsOutline />
                    </NavToggle>
                </SettingsToggleContainer>
                <NavLink hover={{ transform: 'scale(0.95)', transition: '0.4s' }} href="/user/legal" label="LEGAL" >
                    <BsInfoCircle />
                </NavLink>
            </IconsContainer>
        </NavbarContainer>
    );
};