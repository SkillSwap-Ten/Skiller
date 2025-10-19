'use client';
import styled from 'styled-components';
import React from 'react';
import { ISkillTagProps } from '@/src/shared/types/atoms/tag.type';

// Estilos de la etiqueta
const SkillTagTinyContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

const SkillTagTiny = styled.p`
    display: inline-block;
    min-width: 60px;
    max-width: 12rem;
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis; 
    text-align: center;
    padding: 2px 8px !important;
    border-radius: 20px;
    color: ${({ theme }) => theme.colors.textOrange} !important;
    border: 1px solid ${({ theme }) => theme.colors.textOrange};
    font-size: 12px !important;
`;

// Componente para mostrar la lista de skills
const SkillTagTinyList: React.FC<ISkillTagProps> = ({ skillsArray }) => {
    return (
        <SkillTagTinyContainer>
            {skillsArray.map((skill, index) => (
                <SkillTagTiny key={index}>{skill}</SkillTagTiny>
            ))}
        </SkillTagTinyContainer>
    );
};

// Exportar el componente para su uso
export default SkillTagTinyList;
