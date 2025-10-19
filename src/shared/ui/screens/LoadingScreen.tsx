'use client';
import styled, { keyframes } from 'styled-components';

// Animación de las letras que hacen una ola
const waveAnimation = keyframes`
    0%, 40%, 100% {
        transform: translateY(0);
    }
    20% {
        transform: translateY(-20px);
    }
`;

// Estilos para la pantalla de carga completa
const FullScreenLoader = styled.div`
    display: flex;
    justify-content: center;
    align-items: end;
    width: 100dvw;
    height: 100dvh !important;
    filter: invert(1) contrast(200%);
    background-image: url("/img/hands-swap-loading.gif");
    background-size: cover;
    background-position: center;
    opacity: 0.85;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9999;
    transition: 1s ease-in-out;
`;

// Estilos para el contenedor del texto
const LoadingText = styled.h1`
    display: flex;
    gap: 0.3rem;
`;

// Estilo para cada letra en un cuadro negro con animación
const Letter = styled.span<{ delay: number }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: clamp(2.1rem, 2.8vw, 5.2rem);
    height: clamp(2.1rem, 2.8vw, 5.2rem);
    background-color: #ffffff;
    color: #000000;
    font-weight: 600;
    animation: ${waveAnimation} 1.2s ease-in-out infinite;
    animation-delay: ${({ delay }) => delay}s;
    border-radius: 0.42rem;
    font-size: clamp(0.8rem, 2vw, 3rem);
    font-style: normal;
`;

const LoadingScreen = () => {
    return (
        <FullScreenLoader>
            <LoadingText>
                {Array.from('CARGANDO').map((letter, index) => (
                    <Letter key={index} delay={index * 0.1}>{letter}</Letter>
                ))}
            </LoadingText>
        </FullScreenLoader>
    );
};

export default LoadingScreen;
