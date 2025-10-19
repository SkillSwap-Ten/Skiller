"use client";
import React, { useEffect, useState } from "react";
import UserProfileNoDetail from "@/src/features/users/components/UserDetailNoMatch";
import UserProfileDetail from "@/src/features/users/components/UserDetailMatch";
import FeaturesCard from "@/src/shared/ui/molecules/cards/CardFeatures";
import ModalTips from "@/src/shared/ui/organisms/modals/ModalTips";
import ModalReport from "@/src/shared/ui/organisms/modals/ModalReport";
import styled from "styled-components";
import { getUserById, getUsersForImages } from "../../../../api/users/users";
import { getCheckRequestConnection } from "../../../../api/requests/requests";
import { FooterMain } from '@/src/shared/ui/organisms/footer/FooterMain';
import { useParams, useRouter } from "next/navigation";
import { IUser, IUserForImages } from "@/src/core/models/users/users.model";
import { getCurrentUserId } from "@/src/lib/utils/getCurrentUserId";

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 54px 0;
  flex-direction: column;
  display: flex;
`;

const Div = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  gap: 1rem;
  padding: 1rem;
`;

const DivFeatures = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  min-width: 360px;
  min-height: 100% !important;
  max-height: 75vh !important;

  @media (max-width: 950px) {
    display: none;
    padding: 0;
  }

  @media (min-height: 700px) {
  max-height: 65vh !important;
  }

  @media (min-height: 1000px) {
  max-height: 45vh !important;
  }

  @media (min-height: 1300px) {
  max-height: 35vh !important;
  }

  @media (min-height: 1600px) {
  max-height: 30vh !important;
  }

    @media (min-height: 1900px) {
  max-height: 25vh !important;
  }
`;

const DetailAboutUser = () => {
  // --------------------------------------------------------------------------

  // NOTA: ID referente al usuario seleccinado para el detalle
  // (Se toma de la ruta https://skillswapten.vercel.app//user/detail/u/[id])

  const { id } = useParams();

  // --------------------------------------------------------------------------

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserData, setCurrentUserData] = useState<IUserForImages | null>(null);
  const [clickedUserData, setClickedUserData] = useState<IUserForImages | null>(null);
  const [clickedUserDetail, setClickedUserDetail] = useState<IUser | null>(null);
  const [isConnection, setIsConnection] = useState<boolean | null>(null);
  const [isModalReportOpen, setIsModalReportOpen] = useState<boolean>(false);
  const [isModalTipsOpen, setIsModalTipsOpen] = useState<boolean>(false);

  const router = useRouter();

  const openModalReport = () => setIsModalReportOpen(true);
  const closeModalReport = () => setIsModalReportOpen(false);

  const openModalTips = () => setIsModalTipsOpen(true);
  const closeModalTips = () => setIsModalTipsOpen(false);

  useEffect(() => {
    if (!id) return;

    if (globalThis.window !== undefined) {
      const fetchPeople = async () => {
        const currentUserId = getCurrentUserId();
        const clickedUserId = Number.parseInt(id as string, 10);

        if (clickedUserId === currentUserId) {
          router.push("/user/profile");
          return;
        };

        if (!clickedUserId || currentUserId == null || Number.isNaN(clickedUserId)) {
          setError("No se pudo obtener el ID de los usuarios.");
          setLoading(false);
          return;
        }

        try {
          // Petición para verificar la conexión
          const isConnected = await getCheckRequestConnection(currentUserId, clickedUserId);

          // Petición para obtener métricas de otros usuarios
          const userDataResponse = await getUsersForImages();

          if (userDataResponse) {
            setIsConnection(isConnected);

            const matchedClickedUser = userDataResponse.find((user) => user.id === clickedUserId);
            setClickedUserData(matchedClickedUser!);

            const matchedCurrentUser = userDataResponse.find((user) => user.id === currentUserId);
            setCurrentUserData(matchedCurrentUser!);

            // Petición para obtener datos detallados del usuario clickeado
            const userDetailResponse = await getUserById(matchedClickedUser!.id);
            setClickedUserDetail(userDetailResponse);
          } else {
            setError('No se pudo obtener los datos correctamente.');
          }

          setLoading(false);
        } catch (error) {
          console.log(error);
          setError("No se pudo cargar los datos correctamente.");
          setLoading(false);
        }
      };

      fetchPeople();
    }
  }, [id, router]);

  // Renderizado basado en si hay conexión (checkConnection === true) o no (checkConnection === false)
  return (
    <Container>
      <Div>
        <DivFeatures>
          <FeaturesCard loading={loading} error={error} userData={currentUserData} openModalReport={openModalReport} openModalTips={openModalTips} />
        </DivFeatures>
        {isConnection ? (
          <UserProfileDetail loading={loading} error={error} userData={clickedUserData} userDetail={clickedUserDetail} />
        ) : (
          <UserProfileNoDetail loading={loading} error={error} userData={clickedUserData} userDetail={clickedUserDetail} />
        )}
      </Div>
      <FooterMain />
      <ModalTips isOpen={isModalTipsOpen} onClose={closeModalTips} />
      <ModalReport userToInteractWith={clickedUserData!} isOpen={isModalReportOpen} onClose={closeModalReport} />
    </Container>
  );
};

export default DetailAboutUser;