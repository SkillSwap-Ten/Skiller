'use client';
import React, { useEffect, useMemo, useState } from "react";
import TableRowUser from "./rows/TableRowUsers";
import styled from "styled-components";
import TableHeaderUser from "./head/TableHeadUsers";
import PaginationTable from "../../molecules/pagination/PaginationTable";
import NoContentContainer from "../containers/NoContentContainer";
import ModalAdminUser from "../modals/ModalAdminUser";
import ModalReport from "../modals/ModalReport";
import Search from "../../molecules/searchs/SearchTable";
import ModalConfirm from "../modals/ModalConfirm";
import { ITableUsersProps } from "@/src/shared/types/organisms/table.type";

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Container = styled.div`
  height: 100%; 
  width: 100%; 
  display: flex;
  flex-direction: column; 
  align-items: center;
  overflow: hidden;
  gap: 1rem;
`;

const TableContainer = styled.div`
  height: auto; 
  width: 100%; 
  display: flex; 
  flex-direction: column; 
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.colors.borderDark};
  background-color: ${({ theme }) => theme.colors.bgPrimary}; 
  border-radius: 10px;
`;

const TableStyle = styled.table`
  width: 100%;
  min-width: 1000px; 
  height: auto; 
  overflow: auto;
  border: none;
  border-collapse: collapse; 

  & tr:last-child {
    border: none;
  }
`;

const Td = styled.td`
  border: none;
  padding: 8px;
`;

const Tr = styled.tr`
  background: #f0f0f0;
`;

const RowContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
`;

const NoDataContainer = styled.div`
  position: sticky;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 840px;
  width: 82vw;
  left: 5vw;
`;
const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replaceAll(/[\u0300-\u036f]/g, "");

const TableUser: React.FC<ITableUsersProps> = ({ data, setDataToReport, dataToReport, setDataToEdit, onUpdateData, dataToEdit, onDeleteData, loading, error }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isPartialSearch, setIsPartialSearch] = useState(false);

  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  const handleOpenModalCreate = () => setIsModalCreateOpen(true);
  const handleCloseModalCreate = () => {
    setIsModalCreateOpen(false);
    setDataToEdit(null);
  };

  const handleOpenModalEdit = () => setIsModalEditOpen(true);
  const handleCloseModalEdit = () => {
    setIsModalEditOpen(false);
    setDataToEdit(null);
  };

  const handleRequestDelete = (userId: number) => {
    setUserToDelete(userId);
    setIsModalConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (!userToDelete || userToDelete === null) return;

    await onDeleteData(userToDelete);

    setUserToDelete(null);
    setIsModalConfirmOpen(false);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleTogglePartialSearch = () => {
    setIsPartialSearch(prev => !prev);
    setCurrentPage(1);
  };

  // Búsqueda local con coincidencia parcial o exacta
  const filteredData = useMemo(() => {
    const term = normalize(searchQuery).trim();

    // Sin búsqueda → mostrar data original
    if (!term) {
      return data;
    }

    // Búsqueda parcial: cada término debe coincidir completo, pero no es necesario que todos 
    // los términos estén presentes
    if (isPartialSearch) {
      const rawTerms = term
        .split(/\s+/)
        .map(t => t.trim())
        .filter(Boolean);

      if (!rawTerms.length) {
        return data;
      }

      const escapeRegExp = (value: string) =>
        value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      const termMatchers = rawTerms.map(term => {
        if (term.length <= 4) {
          const regex = new RegExp(`\\b${escapeRegExp(term)}\\b`, "u");

          return (fieldValue: string) => regex.test(fieldValue);
        }

        return (fieldValue: string) => fieldValue.includes(term);
      });

      return data.filter(user => {
        const normalizedValues = Object.values(user).map(value =>
          value === null || value === undefined
            ? ""
            : normalize(String(value))
        );

        return termMatchers.some(matcher =>
          normalizedValues.some(value => matcher(value))
        );
      });
    }

    // Búsqueda exacta: el término debe estar incluido en algún campo (match de substring)
    return data.filter(user =>
      Object.values(user).some(value => {
        if (value === null || value === undefined) return false;

        return normalize(String(value)).includes(term);
      })
    );
  }, [data, searchQuery, isPartialSearch]);

  // Lógica de paginación sobre los datos filtrados
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const totalItems = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;

    return filteredData.slice(
      startIndex,
      startIndex + itemsPerPage
    );
  }, [filteredData, currentPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

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

  // Muestra loading, error o los datos del usuario
  if (loading) return (
    <SkeletonTheme baseColor="#c2c2c2" highlightColor="#e0e0e0">
      <Container>
        <RowContainer>
          <Skeleton style={{ width: '45vw', minWidth: '240px', marginTop: '4px' }} height={50} />
        </RowContainer>
        <TableContainer style={{ border: 'none' }} >
          <Skeleton count={4} style={{ width: '100%', margin: '4px 0' }} height={136} />
        </TableContainer>
        <RowContainer style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '4px' }}>
          <Skeleton style={{ margin: '0 4px' }} width={40} height={32} />
          <Skeleton style={{ margin: '0 4px' }} width={120} height={40} />
          <Skeleton style={{ margin: '0 4px' }} width={40} height={32} />
        </RowContainer>
      </Container>
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
        onSearch={handleSearch}
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
                  setDataToEdit={(user) => { setDataToEdit(user); handleOpenModalEdit(); }}
                  setDataToReport={() => {
                    setDataToReport({
                      fullName: `${user.name} ${user.lastName}`,
                      id: user.id ?? 0
                    });
                    handleOpenModalCreate();
                  }}
                  onDeleteData={handleRequestDelete}
                />
              ))
            ) : (
              <Tr>
                <Td colSpan={10}>
                  <NoDataContainer>
                    <NoContentContainer >
                      <p>{searchQuery
                        ? "No encontramos resultados para tu búsqueda. Prueba con otros términos o vuelve más tarde."
                        : "No hay datos que mostrar actualmente. Intenta de nuevo en otro momento."}
                      </p>
                    </NoContentContainer>
                  </NoDataContainer>
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
        isOpen={isModalEditOpen}
        onClose={handleCloseModalEdit}
      />

      <ModalConfirm
        isOpen={isModalConfirmOpen}
        onClose={() => setIsModalConfirmOpen(false)}
        onConfirm={() => { handleDelete() }}
      />
    </Container>
  );
};

export default TableUser;