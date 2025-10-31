"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser, updateUser } from "../../../features/users/usersSlice";
import { deleteUserById, putUserByAdmin } from "../../api/users/users";
import { AppDispatch, RootState } from "../../../lib/store";
import { IUser, IUserForImages } from "../../../core/models/users/users.model";
import { toast } from "react-toastify";
import { FooterMain } from '@/src/shared/ui/organisms/footer/FooterMain';
import Table from "../../../shared/ui/organisms/tables/TableUsers";
import styled from "styled-components";

//Container for page.tsx content
const Container = styled.div`
  width: 100%;
  margin: 54px 0;
  flex-direction: column;
  display: flex;
`;

//Container for the whole page.tsx
const PageContainer = styled.section`
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  display: flex;

  & h1 {
    margin: 0;
    height: min-content;
    translate: 0 1rem;
    font-size: 70px;
    opacity: 0.15;
    padding-left: 1rem;
  }

  & h3 {
    margin: 0;
    margin-bottom: 10px;
    width: 100%;
    font-weight: 500;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.textGrey};
  }

  & p {
    margin: 0;
    width: 100%;
    font-size: 0.9rem;
    font-weight: 400;
    text-align: justify;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  & strong{
    font-weight: bold;
  }
`;

//Container for INFO content
const PageContent = styled.div`
  padding: 1rem;
  padding-bottom: 0;
  width: 100%;
  max-width: 1000px;
  display: flex;
  align-items: start;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 769px) {
    padding-bottom: 0;
  }
`;

//Containers for banner
const Banner = styled.article`
  background-color: ${({ theme }) => theme.colors.bgTertiary};
  display: flex;
  padding: 1rem;
  justify-content: space-between;
  align-items: center;
  position: relative;
  border-radius: 10px;
  width: 100%;
  min-height: 120px;
`;

const BannerBody = styled.div`
  width: 1000px !important;
  display: flex;
  justify-content: space-between;
`;

const WidgetContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.borderDark};
  border-radius: 10px;
`

const DivInfo = styled.div`
  text-align: justify;
`;

//Containers for Widgets and Aside
const WidgetBody = styled.div`
  padding: 1.5rem 2rem;
  width: 100%;
  min-width: 220px;
  display: flex;
  flex-direction: column;
`;

const Users: React.FC = () => {
  const { users, loading, error } = useSelector((state: RootState) => state.users);
  const [editedUser, setEditedUser] = useState<IUser | null>(null);
  const [createdReport, setCreatedReport] = useState<IUserForImages | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  // Llamar a la acción asíncrona para obtener usuarios
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Crear reporte
  const handleCreateReport = (user: IUserForImages | null) => {
    if (user && typeof user.id === "number") {
      setCreatedReport(user);
    } else {
      toast.error("El usuario no tiene un ID válido.");
    }
  };

  // Actualizar usuario
  const handleUpdateUser = async (userToUpdate: IUser) => {
    try {
      console.log("Datos que se están enviando:", userToUpdate);
      const response = await putUserByAdmin(userToUpdate, userToUpdate.id!);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating user:", errorData.details?.text || 'No se proporcionaron detalles del error');
        toast.error("Error al actualizar el usuario.");
        return;
      }

      dispatch(updateUser(userToUpdate));
      setEditedUser(null);
      toast.success("¡Usuario actualizado exitosamente!");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error al actualizar el usuario.");
    }
  };

  // Eliminar usuario
  const handleDeleteUser = async (userId: number) => {
    try {
      const response = await deleteUserById(userId);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error deleting user:", errorData.details?.text || 'No se proporcionaron detalles del error.');
        toast.error("Error al eliminar el usuario.");
        return;
      }

      dispatch(deleteUser(userId));
      toast.success("¡Usuario eliminado exitosamente!");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error al eliminar el usuario.");
    }
  };

  return (
    <Container>
      <PageContainer>
        <PageContent>
          <Banner>
            <BannerBody>
              <h1>Admin</h1>
            </BannerBody>
          </Banner>

          <WidgetContainer>
            <WidgetBody>
              <h3>Gestor de usuarios</h3>
              <article>
                <DivInfo>Aquí podrás revisar la información de los usuarios de la plataforma. Realiza modificaciones en sus estados de cuenta según los T&C de <strong>SkillSwap</strong>. Los códigos de los estados de los usuarios son: <strong>1. Activo, 2. Inactivo, 3. Suspendido</strong></DivInfo>
              </article>
            </WidgetBody>
          </WidgetContainer>

          <Table
            data={users}
            dataToEdit={editedUser}
            setDataToEdit={setEditedUser}
            dataToReport={createdReport}
            setDataToReport={handleCreateReport}
            onDeleteData={handleDeleteUser}
            onUpdateData={handleUpdateUser}
            loading={loading}
            error={error}
          />
        </PageContent>
      </PageContainer>
      <FooterMain />
    </Container>
  );
};

export default Users;


