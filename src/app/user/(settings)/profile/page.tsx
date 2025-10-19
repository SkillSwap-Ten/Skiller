"use client";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import SkillTag from "@/src/shared/ui/atoms/tags/SkillTag";
import NavLink from "@/src/shared/ui/atoms/links/NavLinks";
import CarouselMatched from "@/src/shared/ui/organisms/carousels/CarouselMatched";
import NoContentContainer from "@/src/shared/ui/organisms/containers/NoContentContainer";
import ButtonFeature from "@/src/shared/ui/atoms/buttons/ButtonFeature";
import ModalUser from "@/src/shared/ui/organisms/modals/ModalUser";
import { getGitHubUser } from "@/src/lib/utils/getGitHubUser";
import { getCurrentUserId } from "@/src/lib/utils/getCurrentUserId";
import { IUser } from "../../../../core/models/users/users.model";
import { getUserById, putUserByUser } from "../../../api/users/users";
import { FooterMain } from '@/src/shared/ui/organisms/footer/FooterMain';
import { FaLinkedin, FaGithubSquare, FaBehanceSquare, FaEdit } from "react-icons/fa";
import { getMyCommunityInfo } from "@/src/lib/utils/getCommunityInfo";
import { getGitHubRepos } from "@/src/app/api/github/github";
import { GrStatusGoodSmall } from "react-icons/gr";
import { validateImageUrl } from "@/src/lib/utils/imageValidator";
import { toast } from "react-toastify";

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Container = styled.div`
  width: 100%;
  margin: 54px 0;
`;

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  display: flex;
`;

const ProfileContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1000px !important;
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  & span{
    & p{
      color: ${({ theme }) => theme.colors.textSecondary};
    }
  }

  @media (max-width: 768px) {
    padding-bottom: 0;
  }
`;

const Header = styled.div`
  background-color: ${({ theme }) => theme.colors.bgTertiary};
  display: flex;
  padding: 1rem 1rem 0 1rem;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  position: relative;
  border-radius: 10px;
  width: 100%;
  min-height: 120px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MainInfo = styled.div`
  display: flex;
  align-items: start;
  gap: 1rem;

  @media (max-width: 900px) {
      flex-wrap: wrap;
    }
`;

const UserName = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  text-transform: capitalize;
  color: ${({ theme }) => theme.colors.textBlack};
  margin: 0;
`;

const UserTitle = styled.h2`
  display: flex;
  align-items: center;
  text-transform: capitalize;
  gap: 10px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textBlack};
  font-weight: 400;
  margin-top: 0;
  
  @media (max-width: 400px) {
      flex-direction: column;
      align-items: start;
    }
`;

const ProfileImage = styled.div<{ urlImage: string }>`
  background-image: url(${(props) => props.urlImage}); 
  background-size: cover;
  background-position: center;
  width: 4rem;
  height: 4rem;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.textDark};

  @media (max-width: 769px) {
      display: none;
    }
`;

const ProfileImageMobile = styled.div<{ urlImage: string }>`
  display: none;
  background-image: url(${(props) => props.urlImage}); 
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 18rem;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.textDark};
  margin-bottom: 1rem;

  @media (max-width: 768px) {
      display: block;
    }
`;

const Skills = styled.div`
  align-items: start;
  align-self: end;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 100%;
  margin-top: 1rem;
  width: 285px;

  & div{
    padding: 0;
  }

  & p{
    color: ${({ theme }) => theme.colors.textBlack};
    border: 1px solid ${({ theme }) => theme.colors.textDark};
  }

  @media (max-width: 768px) {
      width: 100%;
    }
`;

const UserDescription = styled.div`
  min-width: 285px;
  max-width: 285px;
  padding-bottom: 0.5rem;
  min-height: 29rem;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.textDark};
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
      min-height: 15.5rem;
      max-width: 100%;
      width: 100%;
    }
`;

const H3 = styled.h3`
    text-align: start;
    padding: 1rem;
    padding-bottom: 0;
    margin: 0;
    font-size: 18px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textBlack};
`;

const P = styled.p`
  text-align: start;
  padding: 0.6rem 1rem;
  margin: 0;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 400;
`;

const DivUserDetails = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: start;
`;

const DivContent = styled.div`
    display: flex;
    align-items: start;
    height: 100%;
    min-height: 14.5rem;
    width: 100%;
    gap: 1rem;
    padding-top: 1rem;

    @media (max-width: 768px) {
      flex-wrap: wrap;
    }
`;

const State = styled.span`
  color: ${({ theme }) => theme.colors.textOrange};
  padding: 2px 10px;
  border-radius: 20px;
  text-align: center;
  color: ${(props) => props.color};
  border: ${(props) => props.color} 1px solid;
  font-size: 8px;
  font-weight: bold;
  display: flex;
  gap: 3px;
  align-items: center;
  justify-content: center;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding-left: 1rem;

  h3 {
    font-size: 0.9rem;
    font-weight: bold;
    padding: 0;
    margin: 0;
  }

  span {
    font-size: 0.8rem;
    padding: 0;
    margin: 0;
    padding-bottom: 0.5rem;
  }
`;

const MediaContainer = styled.div`
  overflow: hidden;
  width: 100%;
  gap: 1rem;
  min-height: 15rem;
  display: flex;
  flex-direction: column;
`;

const MediaContent = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 7.5rem;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.textDark};

  @media (max-width: 768px) {
    min-height: 10.5rem;
    }
`;

const SocialButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 1rem;

    .disabled-social-link {
    opacity: 0.5;
    background-color: ${({ theme }) => theme.colors.bgTertiary};
    pointer-events: none;
  }
`;

const SocialButton = styled.div`
  border-radius: 5px;
  padding: 0.3rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.textDark};
  font-weight: 500;
  word-wrap: break-word;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.textBlack};

  a {
    padding: 0;
    color: ${({ theme }) => theme.colors.textBlack};
    font-size: 0.9rem
  }
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: start; 
  flex-wrap: wrap;
  gap: 1rem;          
  margin: 4px;
  margin-top: 0;
`;

const StatsImage = styled.img`
  max-width: auto;
  height: 120px;
  border-radius: 10px;

    @media (max-width: 380px) {
    height: 108px;
    }

    @media (max-width: 350px) {
    height: 98px;
    }
`;

const EditButton = styled(ButtonFeature)`
  width: 2.5rem;
  height: 2.5rem;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  color: ${({ theme }) => theme.colors.textBlack};
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

const UserProfile = () => {
  // Estado para almacenar los datos del usuario
  const [userData, setUserData] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [imageUrl, setImageUrl] = useState<string>("/img/default-picture-full.webp");
  const [languages, setLanguages] = useState<string[]>([]);
  const [isModalUserOpen, setIsModalUserOpen] = useState<boolean>(false);

  const handleCloseModal = () => {
    setIsModalUserOpen(false);
  };

  const handleEditClick = () => {
    setIsModalUserOpen(true);
  };

  // Fetch para obtener datos de usuario
  const fetchUserData = async () => {
    const currentUserId = getCurrentUserId();

    if (!currentUserId) {
      setError("ID de usuario no encontrado.");
      setLoading(false);
      return;
    }

    try {
      const data = await getUserById(currentUserId);
      setUserData(data);

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

      if (data.urlImage && validateImageUrl(data.urlImage)) {
        checkImageUrl(data.urlImage);
      } else {
        setImageUrl("/img/default-picture-full.webp");
      }

      setLoading(false);
    } catch (err) {
      setError("No se pudo obtener los datos del usuario.");
      console.log(err);
      setLoading(false);
    }
  };

  // useEffect para ejecutar el fecth de datos del usuario
  useEffect(() => {
    if (globalThis.window !== undefined) {
      fetchUserData();
    }
  }, []);

  // Función para actualizar usuario
  const handleUpdateUser = async (userToUpdate: IUser) => {
    try {
      console.log("Datos que se están enviando:", userToUpdate);
      const response = await putUserByUser(userToUpdate, userToUpdate.id!);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating user:", errorData.details?.text || 'No se proporcionaron detalles del error');
        toast.error("Error al actualizar el usuario.");
        return;
      }
      toast.success("¡Usuario actualizado exitosamente!");
      await fetchUserData();
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error al actualizar el usuario.");
    }
  };

  const stateBtnColor = (state: string) => {
    if (state === "Activo") return "#2F966B";
    else if (state === "Inactivo") return "#CF3B00";
    else return "#707070";
  }

  const isGitHub = getGitHubUser(userData?.urlGithub?.toString()).isSuccess
  const UsernameGitHub = getGitHubUser(userData?.urlGithub?.toString()).user

  const abilitiesArray =
    typeof userData?.abilities === 'string'
      ? userData.abilities.split(',').map((ability: string) => ability.trim())
      : [];

  // Fetch para verificar los lenguages en repositorios del usuario
  useEffect(() => {
    const getLanguages = async () => {
      if (!UsernameGitHub) return;

      try {
        const repos = await getGitHubRepos(userData!.urlGithub!);
        const langs = repos.reduce<string[]>((acc, repo) => {
          if (repo.language && !acc.includes(repo.language)) acc.push(repo.language);
          return acc;
        }, []);
        setLanguages(langs);
      } catch (error) {
        console.error("Error en repos:", error);
      }
    };

    getLanguages();
  }, [UsernameGitHub, userData]);

  // Muestra loading, error o los datos del usuario
  if (loading) return (
    <SkeletonTheme baseColor="#c2c2c2" highlightColor="#e0e0e0">
      <Container>
        <PageContainer >
          <ProfileContainer>
            <ProfileImageMobile urlImage={""}>
              <Skeleton height={"100%"} width={"100%"} borderRadius={10} />
            </ProfileImageMobile>

            <Header style={{ padding: '1rem', backgroundColor: '#f7f7f7' }}>
              <UserInfo>
                <MainInfo>
                  <ProfileImage urlImage="" style={{ border: "none" }}>
                    <Skeleton width={64} height={64} />
                  </ProfileImage>
                  <div>
                    <Skeleton width={200} height={25} />
                    <Skeleton width={120} height={18} />
                  </div>
                </MainInfo>
              </UserInfo>
            </Header>

            <DivContent>
              <MediaContainer style={{ minHeight: "100%" }}>
                <Skeleton height={"10vw"} borderRadius={10} />
                <Skeleton height={"10vw"} borderRadius={10} />
              </MediaContainer>

              <UserDescription style={{ border: "none", minHeight: "100%" }}>
                <Skeleton width={100} height={20} style={{ marginBottom: "1rem" }} />
                <Skeleton count={4} height={15} style={{ marginBottom: "0.5rem" }} />
                <Skeleton width={100} height={20} style={{ marginBottom: "0.25rem" }} />
                <Skeleton width={160} height={15} style={{ marginBottom: "0.25rem" }} />
                <Skeleton width={100} height={20} style={{ marginBottom: "0.25rem" }} />
                <Skeleton width={160} height={15} style={{ marginBottom: "0.25rem" }} />
                <Skeleton width={100} height={20} style={{ marginBottom: "0.25rem" }} />
                <Skeleton width={160} height={15} />
              </UserDescription>
            </DivContent>

            <Skills style={{ gap: "0.25rem", marginTop: "0" }}>
              <Skeleton width={80} height={25} borderRadius={20} />
              <Skeleton width={80} height={25} borderRadius={20} style={{ marginLeft: "1rem" }} />
              <Skeleton width={60} height={25} borderRadius={20} />
            </Skills>
          </ProfileContainer>
        </PageContainer >
        <FooterMain />
      </Container >
    </SkeletonTheme>
  );

  if (error) return (
    <Container>
      <PageContainer >
        <ProfileContainer style={{ width: '100%' }}>
          <NoContentContainer error={error} />
        </ProfileContainer>
      </PageContainer >
      <FooterMain />
    </Container >
  );

  console.log(userData)

  return (
    <>
      <Container>
        <PageContainer >
          <ProfileContainer>
            <ProfileImageMobile urlImage={imageUrl} />
            <Header>
              <UserInfo>
                <MainInfo>
                  <ProfileImage urlImage={imageUrl} />
                  <div>
                    <UserName>Tú, {userData!.name} {userData!.lastName}</UserName>
                    <UserTitle>
                      {userData!.jobTitle}
                      <State color={stateBtnColor(userData!.nameStateUser!)}>
                        <GrStatusGoodSmall /> {userData!.nameStateUser!}
                      </State>
                    </UserTitle>
                  </div>
                </MainInfo>
              </UserInfo>
              <EditButton type={"button"} onClick={handleEditClick}><FaEdit /></EditButton>
            </Header>
            <DivUserDetails>
              <DivContent>
                <MediaContainer>
                  <MediaContent>
                    <H3>Enlaces Externos</H3>
                    <SocialButtons>
                      <SocialButton
                        className={userData?.urlLinkedin ? "" : "disabled-social-link"}
                      >
                        <FaLinkedin />
                        <NavLink
                          target="_blank"
                          hover={{ fontWeight: '700', transition: '0.4s'}}
                          href={userData?.urlLinkedin ? userData.urlLinkedin : "#"}
                          label="LinkedIn"
                        />
                      </SocialButton>

                      <SocialButton
                        className={userData?.urlGithub ? "" : "disabled-social-link"}
                      >
                        <FaGithubSquare />
                        <NavLink
                          target="_blank"
                          hover={{ fontWeight: '700', transition: '0.4s'}}
                          href={userData?.urlGithub ? userData.urlGithub : "#"}
                          label="GitHub"
                        />
                      </SocialButton>

                      <SocialButton
                        className={userData?.urlBehance ? "" : "disabled-social-link"}
                      >
                        <FaBehanceSquare />
                        <NavLink
                          target="_blank"
                          hover={{ fontWeight: '700', transition: '0.4s'}}
                          href={userData?.urlBehance ? userData.urlBehance : "#"}
                          label="Adobe Behance"
                        />
                      </SocialButton>
                    </SocialButtons>

                    {isGitHub && (
                      <StatsContainer>
                        <StatsImage
                          src={`https://github-readme-stats.vercel.app/api?username=${UsernameGitHub}&show_icons=true&theme=default&locale=es&hide_title=true&hide_border=true`}
                          alt={`${UsernameGitHub}-stats`}
                        />
                        {(languages.length !== 0) && (
                          <StatsImage
                            src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${UsernameGitHub}&theme=default&hide_border=true&hide_title=true&langs_count=6&layout=compact`}
                            alt={`${UsernameGitHub}-top-langs`}
                          />
                        )}
                      </StatsContainer>
                    )}
                  </MediaContent>
                  <MediaContent>
                    <H3>Cultura</H3>
                    <P>{getMyCommunityInfo(userData!.category)}</P>
                  </MediaContent>
                  <MediaContent>
                    <H3>Conexiones</H3>
                    <CarouselMatched userId={userData!.id} />
                  </MediaContent>
                </MediaContainer>
                <UserDescription style={{ minHeight: isGitHub ? '35.5rem' : '29rem' }}>
                  <H3>Descripción</H3>
                  <P>{userData!.description}</P>
                  <ContactInfo>
                    <h3>Comunidad</h3>
                    <span>{userData!.category}</span>
                  </ContactInfo>
                  <ContactInfo>
                    <h3>Email</h3>
                    <span>{userData!.email}</span>
                  </ContactInfo>
                  <ContactInfo>
                    <h3>Teléfono</h3>
                    <span>{userData!.phoneNumber}</span>
                  </ContactInfo>
                  <ContactInfo>
                    <h3>Generación</h3>
                    <span>{userData!.birthdate!.slice(0, 4)}</span>
                  </ContactInfo>
                </UserDescription>
              </DivContent>
            </DivUserDetails>
            <Skills>
              <SkillTag page={'profile'} skillsArray={abilitiesArray} />
            </Skills>
          </ProfileContainer>
        </PageContainer >
        <FooterMain />
      </Container >

      {isModalUserOpen && (
        <ModalUser
          onUpdateData={handleUpdateUser}
          dataToEdit={userData}
          setDataToEdit={setUserData}
          isOpen={isModalUserOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default UserProfile;