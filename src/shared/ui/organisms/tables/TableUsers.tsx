'use client';
import React, { useCallback, useEffect, useMemo, useState } from "react";
import TableRowUser from "./rows/TableRowUsers";
import styled from "styled-components";
import TableHeaderUser from "./head/TableHeadUsers";
import PaginationTable from "../../molecules/pagination/PaginationTable";
import NoContentContainer from "../containers/NoContentContainer";
import ModalAdminUser from "../modals/ModalAdminUser";
import ModalReport from "../modals/ModalReport";
import Search from "../../molecules/searchs/SearchTable";
import { ITableUsersProps } from "@/src/shared/types/organisms/table.type";
import { IUser } from "@/src/core/models/users/users.model";
import { toast } from "react-toastify";

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.bgPrimary}; 
  height: 100%; 
  width: 100%; 
  display: flex; 
  flex-direction: column; 
  align-items: center;
  overflow: hidden;
  gap: 1rem;
`;

const TableContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.bgPrimary}; 
  height: auto; 
  width: 100%; 
  display: flex; 
  flex-direction: column; 
  overflow-x: auto;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.borderDark};
  border-radius: 10px;
`;

const TableStyle = styled.table`
  width: 100%;
  height: auto; 
  overflow: auto;
  border: none;
  border-collapse: collapse; 
  min-width: 1000px; 
`;

const Td = styled.td`
  padding: 10px;
  border: none;
  text-align: left;
  text-transform: capitalize;
`;

const Tr = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderDark};

  &:hover {
    background-color: #eee;
  }
`;

const RowContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
`;

const TableUser: React.FC<ITableUsersProps> = ({ data, setDataToReport, dataToReport, setDataToEdit, onUpdateData, dataToEdit, onDeleteData, loading, error }) => {
  const [filteredData, setFilteredData] = useState<IUser[]>(data);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isPartialSearch, setIsPartialSearch] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

  const handleTogglePartialSearch = () => {
    setIsPartialSearch((prev) => !prev);
  };

  const handleOpenModalCreate = () => setIsModalCreateOpen(true);
  const handleCloseModalCreate = () => {
    setIsModalCreateOpen(false);
    setDataToEdit(null);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setDataToEdit(null);
  };

  // Búsqueda local con coincidencia parcial o exacta
  const handleSearch = useCallback(
    (query: string) => {
      setIsSearching(true);

      try {
        const raw = query || "";
        // normalizamos la query: lowercase + trim + quitar diacríticos
        const normalize = (s: string) =>
          s
            .toLowerCase()
            .normalize("NFD")
            .replaceAll(/[\u0300-\u036f]/g, "");

        const term = normalize(raw).trim();

        if (!term) {
          setFilteredData(data);
          return;
        }

        if (isPartialSearch) {
          // Parcial: split en palabras; match OR entre palabras.
          // Para términos cortos (<= 2) usamos "word boundary" para evitar 'de' -> 'defensa'
          const rawTerms = term.split(/\s+/).map(t => t.trim()).filter(Boolean);
          if (rawTerms.length === 0) {
            setFilteredData(data);
            return;
          }

          // Preparamos expresiones/funciones por término:
          const termMatchers = rawTerms.map(t => {
            // escapar para regex si usamos regex
            const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

            if (t.length <= 4) {
              // palabra corta: coincidencia de palabra completa con boundary
              const re = new RegExp(`\\b${escapeRegExp(t)}\\b`, 'u'); // case-normalized already
              return (fieldValueNormalized: string) => re.test(fieldValueNormalized);
            } else {
              // palabra larga: substring match
              return (fieldValueNormalized: string) => fieldValueNormalized.includes(t);
            }
          });

          const filtered = data.filter((user) => {
            // Convertir todos los valores del user a strings normalizados una vez
            const normalizedValues = Object.values(user)
              .map(v => (v === null || v === undefined ? "" : normalize(String(v))));

            // Si **alguno** de los términos coincide en **algún** campo => incluir registro (OR entre términos)
            return termMatchers.some(matcher =>
              normalizedValues.some(v => matcher(v))
            );
          });

          setFilteredData(filtered);
        }
        else {
          // Exacta: la frase completa dentro de algún campo
          const filtered = data.filter((user) =>
            Object.values(user).some((value) => {
              if (value === null || value === undefined) return false;
              const v = normalize(String(value));
              return v.includes(term);
            })
          );
          setFilteredData(filtered);
        }
      } catch (error) {
        console.error("Error en la búsqueda:", error);
        toast.error("Hubo un error al realizar la búsqueda. Por favor, intente nuevamente.");
      } finally {
        setIsSearching(false);
      }
    },
    [data, isPartialSearch]
  );

  // Búsqueda con debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(searchQuery);
    }, 400);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, handleSearch]);

  // Lógica de paginación sobre los datos filtrados
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage]);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const paginationInfo = {
    totalItems,
    itemCount: currentData.length,
    itemsPerPage,
    totalPages,
    currentPage,
  };

  // Resetear la paginación al buscar
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredData]);

  // Muestra loading, error o los datos del usuario
  if (loading) return (
    <SkeletonTheme baseColor="#c2c2c2" highlightColor="#e0e0e0">
      <Container>
        <RowContainer >
          <Skeleton style={{ width: '45vw', minWidth: '240px', margin: '4px 0' }} height={40} />
        </RowContainer>
        <TableContainer  >
          <Skeleton count={5} style={{ width: '100%', margin: '4px 0' }} height={64} />
        </TableContainer >
        <RowContainer style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '4px' }}>
          <Skeleton style={{ margin: '0 4px' }} width={40} height={32} />
          <Skeleton style={{ margin: '0 4px' }} width={120} height={40} />
          <Skeleton style={{ margin: '0 4px' }} width={40} height={32} />
        </RowContainer>
      </Container >
    </SkeletonTheme>
  );

  if (error) return (
    <Container>
      <NoContentContainer error={error} />
    </Container >
  );

  return (
    <Container>
      <Search
        placeholder="Buscar usuario por nombre, correo, comunidad, rol..."
        label="Buscar usuario"
        onSearch={setSearchQuery}
        onTogglePartialSearch={handleTogglePartialSearch}
        isPartialSearch={isPartialSearch}
      />

      <TableContainer>
        <TableStyle>
          <TableHeaderUser />
          <tbody>
            {currentData.length ? (
              currentData.map((user) => (
                <TableRowUser
                  key={user.id}
                  user={user}
                  setDataToEdit={(user) => { setDataToEdit(user); handleOpenModal(); }}
                  setDataToReport={() => {
                    setDataToReport({
                      fullName: `${user.name} ${user.lastName}`,
                      id: user.id ?? 0
                    });
                    handleOpenModalCreate();
                  }}
                  onDeleteData={onDeleteData}
                />
              ))
            ) : isSearching ? (
              <Tr>
                <Td colSpan={10}>Buscando...</Td>
              </Tr>
            ) : (
              <Tr>
                <Td colSpan={10}>
                  {searchQuery
                    ? "Ningún usuario coincide con la búsqueda."
                    : "No hay datos que mostrar."}
                </Td>
              </Tr>
            )}
          </tbody>
        </TableStyle>
      </TableContainer>

      {totalPages > 1 && (
        <PaginationTable
          pagination={paginationInfo}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}

      <ModalReport
        userToInteractWith={dataToReport ?? undefined}
        isOpen={isModalCreateOpen}
        onClose={handleCloseModalCreate} />

      <ModalAdminUser
        onUpdateData={onUpdateData}
        dataToEdit={dataToEdit}
        setDataToEdit={setDataToEdit}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </Container>
  );
};

export default TableUser;