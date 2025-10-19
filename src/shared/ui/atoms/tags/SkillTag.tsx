'use client';
import styled from 'styled-components';
import React from 'react';
import { ISkillTagProps } from '@/src/shared/types/atoms/tag.type';

// Estilos de la etiqueta SkillTag
const SkillTagContainer = styled.div<{ page?: string }>`
    display: flex;
    flex-direction: column;
    align-items: ${(props) => ((props.page === 'detail') ? 'start' : 'end')} !important;
    gap: 10px;
    padding: 1rem;
    width: 100%;

    > &:nth-child(even) {
        margin-left: ${(props) => ((props.page === 'detail') ? '2rem' : 0)} !important;
        margin-right: ${(props) => ((props.page === 'detail') ? 0 : '2rem')} !important;
    }
`;

const SkillTag = styled.p`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    min-width: 105px;
    max-width: 155px;
    text-align: center;
    padding: 5px 10px;
    border-radius: 20px;
    color: ${({ theme }) => theme.colors.textOrange};
    border: 1px solid ${({ theme }) => theme.colors.textOrange};
    font-size: 0.9rem;
`;

// Componente para mostrar la lista de skills
const SkillTagList: React.FC<ISkillTagProps> = ({ skillsArray, page }) => {
    return (
        <SkillTagContainer page={page}>
            {skillsArray.map((skill, index) => (
                <SkillTag key={index}>{skill}</SkillTag>
            ))}
        </SkillTagContainer>
    );
};

export default SkillTagList;
