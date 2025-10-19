"use client";
import styled from 'styled-components';
import React from "react";
import NavLink from '../../atoms/links/NavLinks';
import { smoothScrollToTop } from '@/src/lib/utils/scrollBehavior';

// Estilos para el Logobar Fixed a modo de pie de pagina...
const LogobarStyled = styled.div`
    z-index: 10;
    bottom: 0;
    position: fixed;
    width: 100vw;
    height: 54px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.bgPrimary};
    border-top: solid 1px ${({ theme }) => theme.colors.borderLogobar};

    & a {
        padding: 0;
        margin: 0;
    }

    & h2 {
        margin: 0;
        font-size: 1.8em;
        background: ${({ theme }) => theme.colors.gradientSecondary};
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;

        @media (max-width: 768px) {
            font-size: 1.5em;
        }

        @media (max-width: 500px) {
            font-size: 1.3em;
        }
    }
`;

export const Logobar: React.FC = () => {
    const handleScroll = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        smoothScrollToTop(2000);
    };

    return (
        <LogobarStyled>
            <NavLink onClick={handleScroll} hover={{ transform: 'scale(0.95)', transition: '0.4s' }} href="#">
                <h2>SkillSwap</h2>
            </NavLink>
        </LogobarStyled>
    );
};
