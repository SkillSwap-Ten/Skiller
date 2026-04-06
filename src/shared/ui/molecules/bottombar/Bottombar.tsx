"use client";
import styled from 'styled-components';
import React from "react";
import { smoothScrollToTop } from '@/src/lib/utils/scrollBehavior';

// Estilos para el Bottombar Fixed a modo de pie de pagina...
const BottombarStyled = styled.div`
    z-index: 10;
    bottom: 0;
    width: 100vw;
    height: 54px;
    overflow: hidden;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: solid 1px ${({ theme }) => theme.colors.borderBottombar};
    background-color: ${({ theme }) => theme.colors.bgBottombar};

    & button {
        all: unset;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.6s ease-in-out;

        &:hover{
            transform: scale(0.95);
            transition: 0.6s ease-in-out;
        }
    }

    & span {
        margin: 0;
        font-size: 1.7em;
        background: ${({ theme }) => theme.colors.gradientSecondary};
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        display: inline-block;
        transform-origin: center;
        font-weight: bolder;
        will-change: transform;
        animation: wavePerspective 3.5s ease-in-out infinite;

        @keyframes wavePerspective {
            0% {
            transform: perspective(400px) rotateY(6deg) skewX(2deg) scale(1);
            }
            25% {
            transform: perspective(400px) rotateY(3deg) skewX(-1deg) scale(1.02);
            }
            50% {
            transform: perspective(400px) rotateY(-6deg) skewX(-2deg) scale(1);
            }
            75% {
            transform: perspective(400px) rotateY(-3deg) skewX(1deg) scale(1.02);
            }
            100% {
            transform: perspective(400px) rotateY(6deg) skewX(2deg) scale(1);
            }
        }

        @media (max-width: 768px) {
            font-size: 1.5em;
        }

        @media (max-width: 500px) {
            font-size: 1.3em;
        }
    }
`;

export const Bottombar: React.FC = () => {
    const handleScroll = () => {
        smoothScrollToTop(2000);
    };

    return (
        <BottombarStyled>
            <button onClick={handleScroll} aria-label="Scroll to top" title="Scroll to top" type='button'>
                <span>SkillSwap</span>
            </button>
        </BottombarStyled>
    );
};
