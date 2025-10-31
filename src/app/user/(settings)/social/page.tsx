"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ModalReport from "@/src/shared/ui/organisms/modals/ModalReport";
import ModalTips from "@/src/shared/ui/organisms/modals/ModalTips";
import CarouselNewUsers from "@/src/shared/ui/organisms/carousels/CarouselNewUsers";
import NoContentContainer from "@/src/shared/ui/organisms/containers/NoContentContainer";
import ButtonFeature from "@/src/shared/ui/atoms/buttons/ButtonFeature";
import { FaExclamationTriangle, FaShieldAlt } from "react-icons/fa";
import { patchRequestById, getRequestsByUserId, getRequestMetricsByUserId } from "../../../api/requests/requests";
import { FooterMain } from '@/src/shared/ui/organisms/footer/FooterMain';
import { IRequests, IRequestMetrics } from "@/src/core/models/requests/requests.model";
import { PiUserCirclePlus } from "react-icons/pi";
import { IoTrashBinOutline } from "react-icons/io5";
import { getAuthData } from "@/src/lib/utils/getAuthData";
import { toast } from "react-toastify";

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Container for the whole page.tsx
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

  & strong {
    font-weight: bold;
  }
`;

const PageContent = styled.div`
  padding: 1rem;
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

//Container for page.tsx content
const Container = styled.div`
  width: 100%;
  margin: 54px 0;
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

const PageBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 1rem;
  width: 100%;
`;

const P = styled.p`
  font-size: 0.9rem !important;
  hyphens: unset;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textOrange};
`;

// Estilos para los botones y el contenedor de las solicitudes
const WidgetContainer = styled.div`
  padding: 1.5rem 2rem;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.borderDark};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.bgPrimary};
`;

//Containers for Widgets and Aside
const WidgetBody = styled.div`
  width: 100%;
  min-width: 220px;
  display: flex;
  flex-direction: column;
`;

const NewUsersContainer = styled.div`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.borderDark};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  padding: 1.5rem 2rem;

  @media (max-width: 400px) {
    padding: 0.8rem;
    padding-bottom: 1.5rem;
  }
`;

//Containers for Widgets and Aside
const NewUsersBody = styled.div`
  padding: 1.5rem 1.2rem;
  width: 100%;
  min-width: 220px;
  display: flex;
  flex-direction: column;
`;

const RequestCard = styled.div`
  width: 48.5%;
  border: 1px solid ${({ theme }) => theme.colors.borderDark};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.bgPrimary};

  @media (max-width: 769px) {
    width: 100%;
  }
`;

const RequestBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  & p {
    font-size: 14px !important;
    padding: 15px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  & h3 {
    font-size: 16px !important;
    background: ${({ theme }) => theme.colors.gradientSecondary};
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0;
    padding: 15px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderDark};
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  gap: 10px;
  padding: 15px;
`;

const RequestButton = styled.button`
  display: flex;
  gap: 0.5rem;
  padding: 8px 14px;
  font-size: 12px;
  cursor: pointer;
  border-radius: 5px;
  background-color: #f0bca0;
  border: none;
  color: ${({ theme }) => theme.colors.textWhite};
  transition: 0.6s ease;

  & * {
    color: ${({ theme }) => theme.colors.textWhite};
  }

  &:hover {
    transform: scale(0.95);
    transition: 0.6s ease;
    background-color: #e48d5e;
  }
`;

const NoRequestButton = styled.button`
  display: flex;
  gap: 0.5rem;
  padding: 8px 14px;
  font-size: 12px;
  cursor: pointer;
  border-radius: 5px;
  background-color: #e48080;
  border: none;
  color: ${({ theme }) => theme.colors.textWhite};
  transition: 0.6s ease;

  & * {
    color: ${({ theme }) => theme.colors.textWhite};
  }

  &:hover {
    transform: scale(0.95);
    transition: 0.6s ease;
    background-color: #df5151;
  }
`;

const TipsButton = styled(ButtonFeature)`
  width: 2.5rem;
  height: 2.5rem;
  position: absolute;
  bottom: 1rem;
  right: 4rem;
  color: ${({ theme }) => theme.colors.textGrey};
  font-size: 2rem;
  cursor: pointer;
  background: transparent;
  transition: 0.6s ease-in-out;

  & svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  :hover{
    transition: 0.6s ease-in-out;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const ReportButton = styled(ButtonFeature)`
  width: 2.5rem;
  height: 2.5rem;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  color: ${({ theme }) => theme.colors.textGrey};
  font-size: 2rem;
  cursor: pointer;
  background: transparent;
  transition: 0.6s ease-in-out;

  & svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  :hover{
    transition: 0.6s ease-in-out;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;


// Función para enviar la actualización del estado de la solicitud
const updateRequestState = async (
  idRequest: number,
  idStateRequest: number
) => {
  try {
    const data = await patchRequestById(idRequest, idStateRequest);
    return data;
  } catch (error) {
    console.error("Error al hacer el PATCH:", error);
    throw error;
  }
};

const UserRequests = () => {
  const [requestsData, setRequestsData] = useState<IRequests[]>([]);
  const [metricsData, setMetricsData] = useState<IRequestMetrics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalReportOpen, setIsModalReportOpen] = useState<boolean>(false);
  const [isModalTipsOpen, setIsModalTipsOpen] = useState<boolean>(false);

  const openModalReport = () => setIsModalReportOpen(true);
  const closeModalReport = () => setIsModalReportOpen(false);

  const openModalTips = () => setIsModalTipsOpen(true);
  const closeModalTips = () => setIsModalTipsOpen(false);

  useEffect(
    () => {
      if (globalThis.window !== undefined) {
        const currentUserId = getAuthData('id');

        if (!currentUserId) {
          setError("ID de usuario no encontrado");
          setLoading(false);
          return;
        }

        const fetchRequests = async () => {
          if (!currentUserId) return;

          try {
            const requestsData = await getRequestsByUserId(currentUserId);
            setRequestsData(requestsData);

            const metricsData = await getRequestMetricsByUserId(currentUserId);

            if (metricsData) {
              setMetricsData(metricsData);
            }
            setLoading(false);
          } catch (error) {
            console.error("Error al obtener solicitudes:", error);
            setError("No se pudo obtener los datos de solicitudes del usuario.");
            setLoading(false);
          }
        };

        fetchRequests();
      }
    }, []
  );

  const handleAccept = async (id: number) => {
    try {
      await updateRequestState(id, 2); // Actualizar con idStateRequest = 2 (Aceptar)
      setRequestsData((prevRequests) =>
        prevRequests.filter((request) => request.id !== id)
      ); // Eliminar la solicitud aceptada
      toast.success("¡Solicitud aceptada con éxito!");
    } catch (error) {
      console.error("Error al aceptar la solicitud:", error);
      toast.error("Error al aceptar la solicitud.");
    }
  };

  const handleReject = async (id: number) => {
    try {
      await updateRequestState(id, 3); // Actualizar con idStateRequest = 3 (Rechazar)
      setRequestsData((prevRequests) =>
        prevRequests.filter((request) => request.id !== id)
      ); // Eliminar la solicitud rechazada
      toast.success("¡Solicitud rechazada con éxito!");
    } catch (error) {
      console.error("Error al rechazar la solicitud:", error);
      toast.error("Error al rechazar la solicitud.");
    }
  };

  // Muestra loading, error o los datos del usuario
  if (loading) return (
    <SkeletonTheme baseColor="#c2c2c2" highlightColor="#e0e0e0">
      <Container>
        <PageContainer >
          <PageContent>
            <Banner style={{ padding: '1rem', backgroundColor: '#f7f7f7' }}>
              <BannerBody>
                <h1>Social</h1>
              </BannerBody>
            </Banner>
            <PageBody>
              <WidgetContainer style={{ display: 'block' }}>
                <Skeleton height={200} style={{ width: "100%" }} />
              </WidgetContainer>
              <Skeleton height={320} style={{ width: "100%" }} />
            </PageBody>
          </PageContent>
        </PageContainer >
        <FooterMain />
      </Container >
    </SkeletonTheme>
  );

  if (error) return (
    <Container>
      <PageContainer >
        <PageContent style={{ width: '100%' }}>
          <Banner style={{ padding: '1rem', backgroundColor: '#f7f7f7' }}>
            <BannerBody>
              <h1>Social</h1>
            </BannerBody>
          </Banner>
          <PageBody>
              <WidgetContainer>
                <NoContentContainer error={error} />
              </WidgetContainer>
            <NoContentContainer error={error} />
          </PageBody>
        </PageContent>
      </PageContainer >
      <FooterMain />
    </Container >
  );

  return (
    <>
      <Container>
        <PageContainer>
          <PageContent>
            <Banner>
              <BannerBody>
                <h1>Social</h1>
              </BannerBody>
              <TipsButton type={"button"} onClick={openModalTips}><FaShieldAlt /></TipsButton>
              <ReportButton type={"button"} onClick={openModalReport}><FaExclamationTriangle /></ReportButton>
            </Banner>
            <PageBody>
              <WidgetContainer>
                <WidgetBody>
                  <h3>Conectar</h3>
                  <p>
                    Actualmente has conectado con <strong>{metricsData?.solicitudes.conteoConexiones} usuarios</strong>. Revisa tus solicitudes de conexión y decide con quién intercambiar conocimientos, destrezas y experiencia.
                  </p>
                </WidgetBody>
              </WidgetContainer>
              <WidgetContainer>
                <WidgetBody>
                  <PageBody>
                    {requestsData.length > 0 ? (
                      requestsData.map((request) => (
                        <RequestCard key={request.id}>
                          <RequestBody>
                            <h3>{request.userNameRequesting}</h3>
                            <p>{request.description}</p>
                          </RequestBody>
                          <ButtonsContainer>
                            <NoRequestButton
                              onClick={() => handleReject(request.id)}
                            >
                              <IoTrashBinOutline />Rechazar
                            </NoRequestButton>
                            <RequestButton
                              onClick={() => handleAccept(request.id)}
                            >
                              <PiUserCirclePlus />Aceptar
                            </RequestButton>
                          </ButtonsContainer>
                        </RequestCard>
                      ))
                    ) : (
                      <P>◕ No hay solicitudes por responder.</P>
                    )}
                  </PageBody>
                </WidgetBody>
              </WidgetContainer>
              <NewUsersContainer>
                <NewUsersBody>
                  <h3>Novedades</h3>
                  <p>
                    SkillSwap sigue creciendo con nuevos profesionales digitales cada día. Descubre los perfiles <strong>más recientes</strong>, conecta con personas afines y aprovecha nuevas oportunidades de colaboración dentro de la comunidad.
                  </p>
                </NewUsersBody>
                <br />
                <CarouselNewUsers />
              </NewUsersContainer>
            </PageBody>
          </PageContent>
        </PageContainer>
        <ModalTips isOpen={isModalTipsOpen} onClose={closeModalTips} />
        <ModalReport isOpen={isModalReportOpen} onClose={closeModalReport} />
        <FooterMain />
      </Container>

      {/* {isModalTipsOpen && (
        <ModalTips
          userToInteractWith={user}
          isOpen={isModalTipsOpen}
          onClose={() => setIsModalTipsOpen(false)} />
      )}

      {isModalReportOpen && (
        <ModalReport
          userToInteractWith={user}
          isOpen={isModalReportOpen}
          onClose={() => setIsModalReportOpen(false)} />
      )} */}
    </>
  );
};

export default UserRequests;
