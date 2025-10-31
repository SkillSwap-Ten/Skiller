'use client';
import styled from "styled-components";
import React from "react";
import NavLink from "@/src/shared/ui/atoms/links/NavLinks";
import { BsInfoCircle } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../../features/auth/authSlice";
import { clearStorage } from "@/src/lib/utils/storageCleaner";

// Styled components
const NavbarContainer = styled.nav`
    z-index: 11;
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
    border-bottom: 1px solid  ${({ theme }) => theme.colors.borderNavs};

    @media (max-width: 768px) {
        padding: 0 5px;
    }
`;

const AuthLink = styled.span`
    cursor: pointer;
    list-style: none;

    & a{
        width: max-content;
        padding: 15px;
    }
`;

const BackLink = styled.span`
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


    > * {
        cursor: pointer;
    }

    @media (max-width: 768px) {
        gap: 5px;
    }
`;

// Navbar component
export const NavbarNotFound: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    return (
        <NavbarContainer>
            <BackLink>
                <NavLink hover={{ transform: 'scale(0.95)', transition: '0.4s' }} href="#" onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    router.back();
                }}>
                    <small>Ir atrás</small>
                </NavLink>
            </BackLink>
            <IconsContainer>
                <AuthLink>
                    <NavLink hover={{ transform: 'scale(0.95)', transition: '0.4s' }} onClick={() => {
                        dispatch(logoutUser());
                        clearStorage();

                        localStorage.setItem("currentPage", "AUTH");
                        localStorage.setItem('theme', 'light');

                        globalThis.dispatchEvent(new Event('storage'));
                    }} href="/auth" label="AUTH" >
                        <small>Reiniciar</small>
                    </NavLink>
                </AuthLink>
                <NavLink hover={{ transform: 'scale(0.95)', transition: '0.4s' }} href="/legal" label="LEGAL" onClick={() => {
                    dispatch(logoutUser());
                    clearStorage();

                    localStorage.setItem("currentPage", "LEGAL");
                    localStorage.setItem('theme', 'light');

                    globalThis.dispatchEvent(new Event('storage'));
                }}>
                    <BsInfoCircle />
                </NavLink>
            </IconsContainer>
        </NavbarContainer>
    );
};

