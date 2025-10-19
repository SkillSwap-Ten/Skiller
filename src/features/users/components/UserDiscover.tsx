"use client";
import React, { useState } from "react";
import styled from "styled-components";
import CardUserLink from "@/src/shared/ui/molecules/cards/CardUserLink";
import NoContentContainer from "../../../shared/ui/organisms/containers/NoContentContainer";
import { IDiscoverUsersProps } from "@/src/features/users/types/discover.type";
import { handlePageTheme } from "@/src/lib/utils/themeHandler";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CardListContainer = styled.div`
  display: flex;
  justify-items: center;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  padding-top: 0;

  & a{
    width: 100%;
    height: 100%;
    text-decoration: none;
    transition: 0.4s ease-in-out;
    color: ${({ theme }) => theme.colors.textSecondary};
    cursor: pointer;

    &:hover {
        transform: scale(1.02);
        transition: 0.4s ease-in-out;
        font-weight: initial !important;
    }
  }
`;

// Estilos para los botones de paginación
const PaginationContainer = styled.div`
  display: flex;
  justify-content: start;
  margin-top: 25px;
  padding-bottom: 0 !important;
  gap: 10px;

  @media (max-width: 1000px) {
    justify-content: center;
    width: 100%;
  }

  .first-button, .last-button {
    border-radius: 50%;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }
`;

const PaginationDots = styled.span`
  padding: 6px 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
`;

const PaginationButton = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  border: 1px solid ${({ theme }) => theme.colors.textBlack};
  padding: 6px 14px;
  cursor: pointer;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
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
`;

const DivContainer = styled.article`
  padding-top: 0;
  margin-top: 0;
  width: 100%;
  height: max-content;
`;

// Contenedor de la tarjeta
const CardContainer = styled.div`
  display: flex;
  width: 100%;
  height: 16rem;
`;

// Estilo para la columna de la imagen
const ImageColumn = styled.div`
  min-width: 40%;
  min-height: 14rem;
  max-height: 16rem;
`;

// Estilo para el contenedor de estrellas
const StarsContainer = styled.div`
  display: flex;
`;

const Skills = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 60%;
  padding-bottom: 0 !important;

  & p{
    color: ${({ theme }) => theme.colors.textOrange};
  }
`;

const DiscoverUsers: React.FC<IDiscoverUsersProps> = ({ users, loading, error }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Número de tarjetas por página
  const cardsPerPage = 8;

  // Calcular las tarjetas que se deben mostrar en la página actual
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = Array.isArray(users) ? users.slice(indexOfFirstCard, indexOfLastCard) : [];
  const totalPages = Math.ceil(users.length / cardsPerPage);

  // Función para cambiar de página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (error) return (
    <DivContainer>
      <CardListContainer>
        <CardContainer style={{ maxWidth: '100%', padding: '1rem' }}>
          <NoContentContainer />
        </CardContainer>
      </CardListContainer>
    </DivContainer>
  );

  if (loading) return (
    <SkeletonTheme baseColor="#c2c2c2" highlightColor="#e0e0e0">
      {Array.from({ length: 5 }).map((_, index) => (
        <CardContainer key={index}>
          <ImageColumn>
            <Skeleton width={200} height={224} borderRadius={12} />
          </ImageColumn>
          <div>
            <Skeleton width="60%" height={24} style={{ marginBottom: '4px' }} />
            <Skeleton width="40%" height={18} />
            <StarsContainer style={{ gap: '4px' }}>
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <Skeleton key={starIndex} circle width={16} height={16} />
              ))}
            </StarsContainer>
            <Skills style={{ width: '100%' }} >
              {Array.from({ length: 3 }).map((_, badgeIndex) => (
                <Skeleton key={badgeIndex} width={80} height={28} borderRadius={14} />
              ))}
            </Skills>
          </div>
        </CardContainer>
      ))}
    </SkeletonTheme>
  );

  return (
    <DivContainer>
      <CardListContainer onClick={() => handlePageTheme('DETALLE')} >
        {currentCards.map((user, index) => {
          return (
            <CardUserLink userData={user} key={index} />
          );
        })}
      </CardListContainer>

      <PaginationContainer>
        <PaginationButton
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="first-button"
          title="Página Anterior"
        >
          <FaAngleLeft />
        </PaginationButton>

        {Array.from({ length: totalPages }, (_, index) => index + 1)
          .filter((number) => {
            return (
              number === 1 ||
              number === totalPages ||
              Math.abs(number - currentPage) <= 1
            );
          })
          .reduce((acc: (number | string)[], number, index, array) => {
            if (index > 0 && number - (array[index - 1] as number) > 1) {
              acc.push("...");
            }
            acc.push(number);
            return acc;
          }, [])
          .map((item, index) =>
            typeof item === "number" ? (
              <PaginationButton
                key={index}
                onClick={() => paginate(item)}
                className={item === currentPage ? "active" : ""}
                title={`Ir a página ${item}`}
              >
                {item}
              </PaginationButton>
            ) : (
              <PaginationDots key={index}>...</PaginationDots>
            )
          )}

        <PaginationButton
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="last-button"
          title="Página Siguiente"
        >
          <FaAngleRight />
        </PaginationButton>
      </PaginationContainer>
    </DivContainer >
  );
};

export default DiscoverUsers;
