"use client";
import React, { useState, useEffect } from "react";
import SliderMatch from "../../../shared/ui/organisms/sliders/SliderMatch";
import MatchCard from "../../../shared/ui/molecules/cards/CardMatch";
import ModalReport from "@/src/shared/ui/organisms/modals/ModalReport";
import ModalTips from "@/src/shared/ui/organisms/modals/ModalTips";
import FeaturesCard from "@/src/shared/ui/molecules/cards/CardFeatures";
import styled from "styled-components";
import { getUsersForImages } from "../../api/users/users"
import { FooterMain } from '@/src/shared/ui/organisms/footer/FooterMain';
import { getCurrentUserId } from "@/src/lib/utils/getCurrentUserId";
import { IUserForImages } from "@/src/core/models/users/users.model";

const Container = styled.div`
  margin: 54px 0;
  flex-direction: column;
  display: flex;
  min-height: 100vh;
`;

const DivMatch = styled.div`
  display: flex;
  justify-content: center;
  min-height: 70vh !important;
  width: 100%;
  flex-wrap: wrap;
  overflow: hidden;
  padding: 0;
  padding: 1rem;
  gap: 1rem !important;

  // Estilos para el primer hijo
  > :first-child {
    flex: 1; 
    max-width: 33%; 
    min-width: 200px;
  }

  // Estilos para el primer hijo
  > :nth-child(2) {
    flex: 1; 
    max-width: 33%; 
    min-width: 250px;

    @media (max-width: 950px) {
      max-width: 50%;
    }

  @media (max-width: 547px) {
      min-width: 300px !important; 
    }
  }

  // Estilos para el último hijo
  > :last-child {
    flex: 1; 
    max-width: 33%;
    min-width: 250px;

    @media (max-width: 950px) {
      max-width: 50%;
    }

    @media (max-width: 547px) {
      min-width: 300px !important; 
    }
  }
`;

const Match = () => {
  const [allUsersData, setAllUsersData] = useState<IUserForImages[]>([]);
  const [currentUserData, setCurrentUserData] = useState<IUserForImages | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalReportOpen, setIsModalReportOpen] = useState<boolean>(false);
  const [isModalTipsOpen, setIsModalTipsOpen] = useState<boolean>(false);

  const openModalReport = () => setIsModalReportOpen(true);
  const closeModalReport = () => setIsModalReportOpen(false);

  const openModalTips = () => setIsModalTipsOpen(true);
  const closeModalTips = () => setIsModalTipsOpen(false);



  useEffect(() => {
    if (globalThis.window !== undefined) {
      const fetchPeople = async () => {
        const currentUserId = getCurrentUserId();

        if (!currentUserId || currentUserId == null) {
          setError("No se pudo obtener el ID de los usuarios.");
          setLoading(false);
          return;
        }

        try {
          const userDataResponse = await getUsersForImages();

          if (userDataResponse) {
            setAllUsersData(userDataResponse);

            const matchedCurrentUser = userDataResponse.find((user) => user.id === currentUserId);
            setCurrentUserData(matchedCurrentUser!);
          } else {
            setError('No se pudo obtener los datos correctamente.');
          }
          setLoading(false);
        } catch (error) {
          console.log(error)
          setError("Error al cargar los datos");
          setLoading(false);
        }
      };

      fetchPeople();
    }
  }, []);

  const handlePass = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredUsers.length);
  };

  const currentUserId = getCurrentUserId(); 
  const filteredUsers = allUsersData.filter(user => user.id !== currentUserId);

  return (
    <Container>
      <DivMatch>
        <FeaturesCard loading={loading} error={error} userData={currentUserData} openModalReport={openModalReport} openModalTips={openModalTips} />
        <SliderMatch loading={loading} error={error} user={filteredUsers[currentIndex]} onPass={handlePass} />
        <MatchCard
          loading={loading}
          error={error}
          user={filteredUsers[currentIndex]}
        />
      </DivMatch>
      <FooterMain />
      <ModalTips isOpen={isModalTipsOpen} onClose={closeModalTips} />
      <ModalReport userToInteractWith={filteredUsers[currentIndex]} isOpen={isModalReportOpen} onClose={closeModalReport} />
    </Container>
  );
};

export default Match;
