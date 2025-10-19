"use client";
import styled from 'styled-components';
import React from "react";

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

    & h2 {
        margin: 0.67em;
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
    return (
        <LogobarStyled>
            <h2>SkillSwap</h2>
        </LogobarStyled>
    );
};
