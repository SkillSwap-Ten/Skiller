'use client';
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import InfoTag from "../../atoms/tags/InfoTag";
import LogoutButton from "../../atoms/buttons/ButtonLogout";
import NoContentContainer from "@/src/shared/ui/organisms/containers/NoContentContainer";
import { getUsersForImages } from "../../../../app/api/users/users"
import { FiFileText, FiLogOut, FiMessageSquare, FiUsers } from "react-icons/fi";
import { ISidebarProps } from "@/src/shared/types/organisms/sidebar.type";
import { getAuthData } from "@/src/lib/utils/getAuthData";
import { isValidImageUrl } from "@/src/lib/utils/imageValidator";
import { IUserForImages } from "@/src/core/models/users/users.model";

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const AdminSidebarContainer = styled.div`
    top: 0;
    left: 0;
    position: fixed;
    display: flex;
    align-items: center;
    background: ${({ theme }) => theme.colors.bgMainOpacity};
    width: 100%;
    height: 100%;
    animation: appear 1s ease-in-out;
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

const AdminSidebarContent = styled.div`
    z-index: 9;
    background: ${({ theme }) => theme.colors.bgSidebar};
    color: ${({ theme }) => theme.colors.textSecondary};
    width: 300px !important;
    height: 70%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    padding: 1rem;
    margin-left: 20px;
    overflow: hidden;
    border: none;
    border-radius: 10px;
    animation: move-right 1s ease-in-out;

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
    align-items: center;
    justify-content: start;
    overflow-y: auto;
    padding: 1rem;
    padding-right: 0.75rem;
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  flex: 1;
`

const ProfileHeader = styled.div`
  display: flex;
  width: 236px;
  gap: 1rem;
  justify-content: start;
  align-items: center;
  padding-bottom: 20px;
  padding-left: 0.5rem;
  padding-top: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.textTertiary};
`;

const Avatar = styled.div<{ urlImage: string }>`
  border: 1px solid ${({ theme }) => theme.colors.borderDark};
  background-image: url(${(props) => props.urlImage}); 
  background-size: cover;
  background-position: center;
  align-self: start;
  width: 3rem;
  height: 3rem;
  border-radius: 10px;
`;

const SidebarTitle = styled.div`
    align-items: start;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
`;

const Name = styled.div`
  text-transform: capitalize;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.colors.textSidebar};
`;

const Role = styled.p`
  text-transform: capitalize;
  opacity: 0.75;
  font-size: 0.65rem;
  color: ${({ theme }) => theme.colors.textSidebar};
  margin: 0;
  padding: 0;
`;

const HelpCard = styled.div`
  background:rgba(0, 0, 0, 0.05);
  border: 1px solid ${({ theme }) => theme.colors.textTertiary};
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background:rgba(150, 87, 5, 0.05);
    border: 1px solid #e3ba84;
    transform: translateY(-2px);

    & div {
    background:#c79759;
  }

  & p, h4 {
    color:#c07c23;
  }
  }

  &:active {
    transform: translateY(0);
  }
`

const IconWrapper = styled.div`
  background: #999;
  color: white;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 1.25rem;
`

const CardContent = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
`

const CardTitle = styled.h4`
  color: ${({ theme }) => theme.colors.textSidebar};
  font-weight: 700;
  font-size: 0.9rem;
  margin: 0;
  letter-spacing: 0.3px;
`

const CardDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.75rem;
  margin: 0;
  opacity: 0.85;
`

const BoxLogout = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    width: 100%;
    padding-top: 1rem;

    @media (max-width: 790px) {
        display: flex;
        align-self: end !important;
        justify-self: end !important;
    }
`;

const SidebarAdmin: React.FC<ISidebarProps> = ({
  isOpen,
  onClose,
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [userData, setUserData] = useState<IUserForImages | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("/img/default-picture-full.webp");

  useEffect(() => {
    const checkImageUrl = (url: string) => {
      const img = new Image();
      img.src = url;
      img.onerror = () => {
        // Si la imagen da error, se usa la imagen por defecto
        setImageUrl("/img/default-picture-full.webp");
      };
      img.onload = () => {
        // Si la imagen carga correctamente, se usa la URL
        setImageUrl(url);
      };
    };

    if (userData && userData.urlImage && isValidImageUrl(userData.urlImage)) {
      checkImageUrl(userData.urlImage);
    } else {
      setImageUrl("/img/default-picture-full.webp");
    }
  }, [userData]);

  useEffect(() => {
    if (globalThis.window !== undefined) {
      const fetchUserData = async () => {
        const currentUserId = getAuthData('id');

        if (!currentUserId) {
          setError('ID de usuario no encontrado.');
          setLoading(false);
          return;
        }

        try {
          const dataUser = await getUsersForImages();

          if (dataUser) {
            const matchedUser = dataUser.find((user) => user.id === currentUserId);
            setUserData(!matchedUser ? null : matchedUser);
          } else {
            setError('Error al cargar los datos.');
          }
        } catch (err) {
          setError('Hubo un problema con la solicitud.');
          console.log(err)
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, []);

  console.log(error)

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
    <AdminSidebarContainer>
      <AdminSidebarContent style={{ padding: '0' }}>
        <NoContentContainer error={error} />
      </AdminSidebarContent>
    </AdminSidebarContainer>
  );

  if (loading) return (
    <SkeletonTheme baseColor="#c2c2c2" highlightColor="#e0e0e0">
      <AdminSidebarContainer>
        <AdminSidebarContent>
          <Navigation style={{ padding: '0' }}>
            <Skeleton
              width={252}
              height={70}
              style={{ margin: "1rem 0" }}
            />
            <div>
              <Skeleton height={18} width={46} />
              <Skeleton
                height={85}
                width={252}
                style={{ margin: "0.5rem 0" }}
              />

              <Skeleton
                height={85}
                width={252}
                style={{ margin: "0.5rem 0" }}
              />
            </div>
          </Navigation>
        </AdminSidebarContent>
      </AdminSidebarContainer>
    </SkeletonTheme>
  );

  return (
    <AdminSidebarContainer>
      <AdminSidebarContent ref={sidebarRef}>
        {userData && (
          <ProfileHeader>
            <Avatar urlImage={imageUrl} />
            <SidebarTitle>
              <Name>{userData?.fullName}</Name>
              <Role>Administrador</Role>
            </SidebarTitle>
          </ProfileHeader>
        )}
        <Navigation>
          <ContentSection>
            <InfoTag label={"#HELP"} />
            <HelpCard>
              <IconWrapper>
                <FiUsers />
              </IconWrapper>
              <CardContent>
                <CardTitle>USUARIOS</CardTitle>
                <CardDescription>Moderar y gestionar todos los usuarios de la plataforma</CardDescription>
              </CardContent>
            </HelpCard>

            <HelpCard>
              <IconWrapper>
                <FiFileText />
              </IconWrapper>
              <CardContent>
                <CardTitle>REPORTES</CardTitle>
                <CardDescription>Revisar y tomar decisiones sobre reportes de usuarios</CardDescription>
              </CardContent>
            </HelpCard>

            <HelpCard>
              <IconWrapper>
                <FiMessageSquare />
              </IconWrapper>
              <CardContent>
                <CardTitle>POSTS</CardTitle>
                <CardDescription>Interactuar con las redes sociales compartidas</CardDescription>
              </CardContent>
            </HelpCard>
          </ContentSection>
        </Navigation>
        <BoxLogout>
          <LogoutButton type={'button'}>
            <FiLogOut />
          </LogoutButton>
        </BoxLogout>
      </AdminSidebarContent>
    </AdminSidebarContainer>
  );
};

export default SidebarAdmin;