"use client";
import styled from "styled-components";
import ModalConfirm from "@/src/shared/ui/organisms/modals/ModalConfirm";
import CarouselMatched from "@/src/shared/ui/organisms/carousels/CarouselMatched";
import NoContentContainer from "@/src/shared/ui/organisms/containers/NoContentContainer";
import { useEffect, useState } from "react";
import { getUserById, putUserAccountState } from "../../../api/users/users";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { getCurrentUserId } from "@/src/lib/utils/getCurrentUserId";
import { getRequestMetricsByUserId } from "@/src/app/api/requests/requests";
import { IRequestMetrics } from "@/src/core/models/requests/requests.model";
import { FooterMain } from '@/src/shared/ui/organisms/footer/FooterMain';
import { toast } from "react-toastify";
import { GrStatusGoodSmall } from "react-icons/gr";

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// We register the elements from ChartJS for the Bar Chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
    color: ${({ theme }) => theme.colors.textBlack};
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

//Container for INFO content
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

const PageBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const WidgetContainer = styled.article`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.textDark};
  border-radius: 10px;
  gap: 4px;
`

//Containers for Widgets and Aside
const WidgetBody = styled.div`
  padding: 1.5rem 2rem;
  width: 100%;
  min-width: 220px;
  display: flex;
  flex-direction: column;

  & canvas{
    width: 100% !important;
    height: 100% !important;
  }
`;

const P = styled.p`
  font-size: 0.9rem !important;
  max-width: 300px !important;
  hyphens: unset;
`;

const DoubleDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
  width: 100%;

  & article {
    width: 50%;
  }

  @media (max-width: 769px) {
    flex-direction: column;

    & article {
      width: 100% !important;
    }
  }
`;

const DivDeactivateAccount = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  justify-content: end;
  align-items: end;
  padding: 2rem;
  gap: 2rem;

  & div {
    max-width: 400px;

    & p {
      font-size: 15px;
      hyphens: unset;
    }
  }
`;

const ButtonDeactivate = styled.button<({ color: string }) >`
  min-width: 100px;
  width: 30vw;
  max-width: 250px;
  text-align: center;
  border-radius: 10px;
  background-color: transparent;
  padding: 10px;
  font-weight: 500;
  color: ${(props) => props.color};
  border: ${(props) => props.color} 1px solid;
  cursor: pointer;
  transition: 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) => props.color};
    color: ${({ theme }) => theme.colors.textPrimary};
    border: none;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.bgDisabled};
    color: ${({ theme }) => theme.colors.textDisabled};
    cursor: not-allowed;
  }
`;

const AccountStateTag = styled.div<({ color: string }) >`
  width: 80px;
  text-align: center;
  border-radius: 50px;
  padding: 4px;
  font-size: 12px;
  font-weight: bold;
  color: ${(props) => props.color};
  border: ${(props) => props.color} 1px solid;
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
  font-style: normal;
`;

const UserInfo = () => {
  const [accountState, setAccountState] = useState<string | null>(null);
  const [metricsData, setMetricsData] = useState<IRequestMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (globalThis.window !== undefined) {
      const fetchAccountState = async () => {
        const currentUserId = getCurrentUserId();

        if (!currentUserId) {
          setError("ID de usuario no encontrado.");
          setLoading(false);
          return;
        }

        try {
          const dataInfo = await getUserById(currentUserId);
          setAccountState(dataInfo.nameStateUser ?? "Estado desconocido");

          const dataMetrics = await getRequestMetricsByUserId(currentUserId);
          
          if (dataMetrics) {
            setMetricsData(dataMetrics);
          }
        } catch (err) {
          setError("Error al obtener información del usuario.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchAccountState();
    }
  }, []);

  const handleToggleAccountState = async () => {
    if (globalThis.window !== undefined) {
      const currentUserId = getCurrentUserId();

      if (!currentUserId) return;

      const newAction = accountState === "Activo" ? "deshabilitar" : "habilitar";

      try {
        const data = await putUserAccountState(currentUserId, newAction);
        setAccountState(data);
        toast.success(`Se logró ${newAction} tu cuenta con éxito.`);
      } catch (err) {
        setError(err as string);
        toast.error(`No se pudo ${newAction} tu cuenta. Intenta de nuevo.`);
      }
    }
  };

  const stateBtnColor = () => {
    if (accountState === "Activo") return "#2C8560";
    else if (accountState === "Inactivo") return "#D13B00";
    else return "#707070";
  }

  const changeStateBtnColor = () => {
    if (accountState === "Activo") return "#D13B00";
    else if (accountState === "Inactivo") return "#2C8560";
    else return "#707070";
  }

  // Datos para el gráfico de barras (Bar Chart)
  const barData = {
    labels: ["Aceptadas", "Pendientes", "Canceladas", "Enviadas"],
    datasets: [
      {
        label: "Conteo de Solicitudes",
        data: [
          metricsData?.solicitudes.conteoAceptadas,
          metricsData?.solicitudes.conteoPendientes,
          metricsData?.solicitudes.conteoCanceladas,
          metricsData?.solicitudes.conteoEnviadas,
        ],
        backgroundColor: [
          "#f6f1d6",
          "#eade8e",
          "#f0bca0",
          "#e48080",
        ],
        borderRadius: 10,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          pointStyle: 'line',
        },
      },
    },
  };

  // Muestra loading, error o los datos del usuario
  if (loading) return (
    <SkeletonTheme baseColor="#c2c2c2" highlightColor="#e0e0e0">
      <Container>
        <PageContainer >
          <PageContent>
            <Banner style={{ padding: '1rem', backgroundColor: '#f7f7f7' }}>
              <BannerBody>
                <h1>Info</h1>
              </BannerBody>
            </Banner>
            <PageBody>
              <DoubleDiv>
                <WidgetContainer style={{ display: 'block' }}>
                  <Skeleton height={200} style={{ width: "100%" }} />
                </WidgetContainer>
                <WidgetContainer style={{ display: 'block' }}>
                  <Skeleton height={200} style={{ width: "100%" }} />
                </WidgetContainer>
              </DoubleDiv>
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
              <h1>Info</h1>
            </BannerBody>
          </Banner>
          <PageBody>
            <DoubleDiv>
              <WidgetContainer>
                <NoContentContainer error={error} />
              </WidgetContainer>
              <WidgetContainer>
                <NoContentContainer error={error} />
              </WidgetContainer>
            </DoubleDiv>
            <NoContentContainer error={error} />
          </PageBody>
        </PageContent>
      </PageContainer >
      <FooterMain />
    </Container >
  );

  // Render del componente
  return (
    <Container>
      <ModalConfirm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          handleToggleAccountState();
          setIsModalOpen(false);
        }}
      />
      <PageContainer>
        <PageContent>
          <Banner>
            <BannerBody>
              <h1>Info</h1>
            </BannerBody>
          </Banner>
          <PageBody>
            <DoubleDiv>
              <WidgetContainer>
                <WidgetBody style={{ paddingBottom: 0, marginBottom: 0 }}>
                  <h3>Actividad</h3>
                  <p>
                    Observa aquí los detalles estadísticos de tus solicitudes y conexiones. Manténte al tanto de tu red y sigue construyendo experiencias.
                  </p>
                </WidgetBody>
                <CarouselMatched userId={metricsData!.idUsuario} />
              </WidgetContainer>
              <WidgetContainer>
                <WidgetBody>
                  <Bar data={barData} options={barOptions} />
                </WidgetBody>
              </WidgetContainer>
            </DoubleDiv>
            <WidgetContainer>
              <WidgetBody>
                <h3>Estado de cuenta</h3>
                <P>
                  Aquí podrás ver en que condición se encuentra tu cuenta actualmente.
                </P>
                <br />

                {loading ? (
                  <p>Cargando...</p>
                ) : error ? (
                  <p>{error}</p>
                ) : (
                  <AccountStateTag color={stateBtnColor()}><GrStatusGoodSmall />{accountState}</AccountStateTag>
                )}
              </WidgetBody>

              <DivDeactivateAccount>
                <ButtonDeactivate
                  color={changeStateBtnColor()}
                  onClick={() => setIsModalOpen(true)}
                  disabled={accountState === "Suspendido"}
                >
                  {accountState === "Activo"
                    ? "Deshabilitar cuenta"
                    : "Habilitar cuenta"}
                </ButtonDeactivate>

                {accountState === "Suspendido" && (
                  <p>
                    Tu cuenta ha sido suspendida por un administrador. No
                    puedes cambiar el estado hasta que el administrador lo
                    restaure.
                  </p>
                )}

                <div>
                  <h3>Deshabilitación de cuenta</h3>
                  <p>
                    <strong> Atención: </strong>Al desactivar tu cuenta de SkillSwap, toda tu
                    información permanecerá segura y no será eliminada.
                  </p>
                </div>
              </DivDeactivateAccount>
            </WidgetContainer>
          </PageBody>
        </PageContent>
      </PageContainer>
      <FooterMain />
    </Container>
  );
};

export default UserInfo;
