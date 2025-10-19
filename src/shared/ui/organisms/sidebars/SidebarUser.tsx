'use client';
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FaCheck, FaTimes, FaClock, FaArrowUp } from "react-icons/fa";
import { IRequestMetrics } from "@/src/core/models/requests/requests.model";
import { getRequestMetricsByUserId } from "../../../../app/api/requests/requests";
import { getUsersForImages } from "../../../../app/api/users/users"
import { ISidebarProps } from "@/src/shared/types/organisms/sidebar.type";
import { getCurrentUserId } from "@/src/lib/utils/getCurrentUserId";
import { IUserForImages } from "@/src/core/models/users/users.model";
import CardSidebarLink from "../../molecules/cards/CardSidebarLink";
import NoContentContainer from "@/src/shared/ui/organisms/containers/NoContentContainer";

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const UserSidebarContainer = styled.div`
    top: 0;
    left: 0;
    position: fixed;
    display: flex;
    align-items: center;
    background: ${({ theme }) => theme.colors.bgMainOpacity};
    width: 100%;
    height: 100%;
    animation: appear 1s ease-in-out;
    z-index: 9;
    overflow: hidden;
    
    @keyframes appear {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

const UserSidebarContent = styled.div`
    z-index: 9;
    background: ${({ theme }) => theme.colors.bgSidebar};
    width: 300px !important;
    height: 70%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: none;
    border-radius: 10px;
    margin: 0;
    padding: 0;
    margin-left: 20px;
    animation: move-right 1s ease-in-out;
    padding-right: 0.2rem;

    @keyframes move-right {
        from {
            translate: -510px;
        }
        to {
            translate: 0;
        }
    }

    @media (max-width: 370px) {
        width: 250px !important;
    }

    @media (max-height: 500px) {
        height: 60% !important;
    }

    @media (min-width: 1920px) {
        height: 80%;
    }

    @media (min-width: 2560px) {
        height: 85%;
    }

    @media (min-width: 3840px) {
        height: 90%;
    }
`;

const Navigation = styled.div`
    flex-direction: column;
    width: 100%;
    height: 100%;
    display: flex;
    padding: 0.5rem 1rem;
    overflow-y: auto;
    overflow-x: hidden;
    align-items: center;
    justify-content: start;

    & a {
      &:hover {
          font-weight: initial !important;
          transform: scale(1.01);
      }
    }
`;

const StatusSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  font-size: 0.7rem;
  gap: 0.9rem;
  padding: 0.5rem 1rem;  
  padding-left: 1.5rem;
  width: 100%;
  height: 100%;

  .status-item {
    display: flex;
    flex-direction: column;
  }

  .status-content {
    display: flex;
    align-items: center;
  }

  .icon {
    margin-right: 8px;
  }

  .rejected {
    opacity: 0.5;
    color: ${({ theme }) => theme.colors.textRed};

    & p {
      font-weight: 500;
      color: ${({ theme }) => theme.colors.textRed};
    }
  }

  .sent {
    opacity: 0.5;
    color: ${({ theme }) => theme.colors.textSecondary};

    & p {
      font-weight: 500;
      color: ${({ theme }) => theme.colors.textSecondary};
    }
  }

  .accepted {
    opacity: 0.5;
    color: ${({ theme }) => theme.colors.textBlue};

    & p {
      font-weight: 500;
      color: ${({ theme }) => theme.colors.textBlue};
    }
  }

  .inbox {
    opacity: 0.5;
    color: ${({ theme }) => theme.colors.textOrange};

    & p {
      font-weight: 500;
      color: ${({ theme }) => theme.colors.textOrange};
    }
  }
`;

const H2StatusSection = styled.h2`
  color: ${({ theme }) => theme.colors.textSidebar};
  font-weight: 500;
  margin: 0;
  margin-bottom: 0.1rem;
  font-size: 0.8rem;
`;

const SidebarUser: React.FC<ISidebarProps> = ({
  isOpen,
  onClose,
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [userMetrics, setUserMetrics] = useState<IRequestMetrics | null>(null);
  const [userData, setUserData] = useState<IUserForImages | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (globalThis.window !== undefined) {
      const fetchUserData = async () => {
        const currentUserId = getCurrentUserId();

        if (!currentUserId) {
          setError('ID de usuario no encontrado.');
          setLoading(false);
          return;
        }

        try {
          const dataMetrics = await getRequestMetricsByUserId(currentUserId);
          const dataUser = await getUsersForImages();

          if (dataUser && dataMetrics) {
            setUserMetrics(dataMetrics);
            const matchedUser = dataUser.find((user) => user.id === currentUserId);
            setUserData(!matchedUser ? null : matchedUser);
          } else {
            setError('Error al cargar los datos.');
          }
        } catch (err) {
          setError('Hubo un problema con la solicitud.');
          console.log(err);
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  if (error) return (
    <UserSidebarContainer>
      <UserSidebarContent style={{ padding: '0' }}>
        <NoContentContainer error={error} />
      </UserSidebarContent>
    </UserSidebarContainer>
  );

  if (loading) return (
    <SkeletonTheme baseColor="#c2c2c2" highlightColor="#e0e0e0">
      <UserSidebarContainer>
        <UserSidebarContent>
          <Navigation>
            <Skeleton
              width={252}
              height={130}
              style={{ marginTop: "1rem" }}
            />
            {
              [1, 2, 3, 4].map((i) => (
                <div key={i} style={{ width: "250px", margin: "0.3rem 0" }}>
                  <Skeleton
                    width={100}
                    height={10}
                  />
                  <Skeleton
                    height={20}
                    style={{ width: "60%" }}
                  />
                </div>
              ))
            }
          </Navigation>
        </UserSidebarContent>
      </UserSidebarContainer>
    </SkeletonTheme>
  );

  return (
    <UserSidebarContainer>
      <UserSidebarContent ref={sidebarRef}>
        {userData && userMetrics && (
          <Navigation>
            <CardSidebarLink
              userData={userData}
            />
            <StatusSection>
              <div className="status-item inbox">
                <H2StatusSection>Recibidas</H2StatusSection>
                <div className="status-content">
                  <FaClock className="icon" />
                  <p>
                    {userMetrics.solicitudes.conteoPendientes}:{" "}
                    {(userMetrics.solicitudes.ultimaPendiente === "" || userMetrics.solicitudes.ultimaPendiente === " " || userMetrics.solicitudes.ultimaPendiente == null) ? "N/A" : userMetrics.solicitudes.ultimaPendiente}
                  </p>
                </div>
              </div>
              <div className="status-item accepted">
                <H2StatusSection>Aceptadas</H2StatusSection>
                <div className="status-content">
                  <FaCheck className="icon" />
                  <p>
                    {userMetrics.solicitudes.conteoAceptadas}:{" "}
                    {(userMetrics.solicitudes.ultimaAceptada === "" || userMetrics.solicitudes.ultimaAceptada === " " || userMetrics.solicitudes.ultimaAceptada == null) ? "N/A" : userMetrics.solicitudes.ultimaAceptada}
                  </p>
                </div>
              </div>
              <div className="status-item rejected">
                <H2StatusSection>Rechazadas</H2StatusSection>
                <div className="status-content">
                  <FaTimes className="icon" />
                  <p>
                    {userMetrics.solicitudes.conteoCanceladas}:{" "}
                    {(userMetrics.solicitudes.ultimaCancelada === "" || userMetrics.solicitudes.ultimaCancelada === " " || userMetrics.solicitudes.ultimaCancelada == null) ? "N/A" : userMetrics.solicitudes.ultimaCancelada}
                  </p>
                </div>
              </div>
              <div className="status-item sent">
                <H2StatusSection>Enviadas</H2StatusSection>
                <div className="status-content">
                  <FaArrowUp className="icon" />
                  <p>
                    {userMetrics.solicitudes.conteoEnviadas}:{" "}
                    {(userMetrics.solicitudes.ultimoEnviado === "" || userMetrics.solicitudes.ultimoEnviado === " " || userMetrics.solicitudes.ultimoEnviado == null) ? "N/A" : userMetrics.solicitudes.ultimoEnviado}
                  </p>
                </div>
              </div>
            </StatusSection>
          </Navigation>
        )}
      </UserSidebarContent>
    </UserSidebarContainer>
  );
};

export default SidebarUser;