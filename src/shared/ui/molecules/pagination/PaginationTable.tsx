"use client";
import React from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { IPaginationProps } from "@/src/shared/types/molecules/pagination.type";
import styled from 'styled-components';
import Button from "../../atoms/buttons/Button";

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    padding-bottom: 0;
    font-size: 15px;
`;

const PaginationButton = styled(Button)`
    background: ${({ theme }) => theme.colors.bgTertiary};
    color: ${({ theme }) => theme.colors.textSecondary};
    border: 1px solid ${({ theme }) => theme.colors.textGrey};
    padding: 6px 14px;
    cursor: pointer;
    border-radius: 8px;
    font-weight: 500;
    transition: 0.3s;

    &:hover {
        font-weight: bold;
        background-color: ${({ theme }) => theme.colors.bgBanner};
    }

    &:disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }

    &:active {
        font-weight: bold;
        color: ${({ theme }) => theme.colors.textSecondary};
        background-color: ${({ theme }) => theme.colors.bgBanner};
    }

    & svg{
        width: 15px;
        height: 15px;
    }
`;

const PageText = styled.div`
    color: ${({ theme }) => theme.colors.textTertiary};
`;

const PaginationTable: React.FC<IPaginationProps> = ({ pagination, onNext, onPrevious }) => {
    const currentPage = pagination.currentPage;
    const totalPages = pagination.totalPages;

    // Deshabilitar botones si estamos en la primera o última página
    const isPreviousDisabled = currentPage === 1;
    const isNextDisabled = currentPage === totalPages;

    return (
        <PaginationContainer>
            <PaginationButton
                type={"button"}
                className={isPreviousDisabled ? "disabled" : ""}
                onClick={onPrevious}
                disabled={isPreviousDisabled}
            >
                <BsChevronLeft />
            </PaginationButton>

            <PageText>
                Página {currentPage} de {totalPages}
            </PageText>

            <PaginationButton
                type={"button"}
                className={isNextDisabled ? "disabled" : ""}
                onClick={onNext}
                disabled={isNextDisabled}
            >
                <BsChevronRight />
            </PaginationButton>
        </PaginationContainer>
    );
};

export default PaginationTable;