'use client';
import styled from 'styled-components';
import React from 'react';
import { ITagProps } from '@/src/shared/types/atoms/tag.type';

// Estilos de la etiqueta
const StyledInfoTag = styled.div`
    align-self: start !important;
    padding: 0.2rem 0.5rem;
    background-color: #f0f0f0;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    font-size: 10px;
    color: #222;
`;

// Componente para mostrar la lista de skills
const InfoTag: React.FC<ITagProps> = ({ label }) => {
    return (
        <StyledInfoTag>{label}</StyledInfoTag>
    );
};

export default InfoTag;
