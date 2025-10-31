"use client"
import { useState, useEffect } from "react";
import { IDetailUserProps } from "@/src/features/users/types/detail.type";
import { getCommunityInfo } from "@/src/lib/utils/getStaticData";
import { FaLinkedin, FaGithubSquare, FaBehanceSquare, FaShieldAlt, FaExclamationTriangle } from "react-icons/fa";
import { IoFlowerOutline } from "react-icons/io5";
import { getGitHubUser } from "@/src/lib/utils/getGitHubUser";
import { getGitHubRepos } from "@/src/app/api/github/github";
import { isValidImageUrl } from "@/src/lib/utils/imageValidator";
import styled from "styled-components";
import NavLink from "../../../shared/ui/atoms/links/NavLinks";
import SkillTag from "../../../shared/ui/atoms/tags/SkillTag";
import ButtonFeature from "../../../shared/ui/atoms/buttons/ButtonFeature";
import NoContentContainer from "@/src/shared/ui/organisms/containers/NoContentContainer";
import ModalTips from "../../../shared/ui/organisms/modals/ModalTips";
import ModalReport from "../../../shared/ui/organisms/modals/ModalReport";

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


const ProfileContainer = styled.div`
  width: 70%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  display: flex;
  flex-direction: column;
  align-items: start;

  & span{
    & p{
      color: ${({ theme }) => theme.colors.textSecondary};
    }
  }

  @media (max-width: 950px) {
      width: 100%;
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
  text-transform: capitalize;
  font-size: 2.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textGrey};
  margin: 0;
`;

const UserTitle = styled.h2`
  text-transform: capitalize;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textGrey};
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
  border: 1px solid ${({ theme }) => theme.colors.borderDark};

  @media (max-width: 769px) {
      display: none;
    }
`;

const ProfileImageMobile = styled.div<{ urlImage: string }>`
  display: none;
  background-image: url(${(props) => props.urlImage}); 
  background-size: cover;
  background-position: center;
  position: relative;
  width: 100%;
  height: 18rem;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.borderDark};
  margin-bottom: 1rem;

  @media (max-width: 769px) {
      display: block;
    }
`;

const ConnectionsRating = styled.div`
  display: flex;
  gap: 6rem;
  margin: 0;
  padding-bottom: 0;

  @media (max-width: 400px) {
      flex-wrap: wrap;
      gap: 1rem;
    }
`;

const Connections = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding-bottom: 0;
  padding-left: 0;

  span {
    font-size: 1rem;
    display: flex;
    gap: 1rem;
    justify-content: start;

    & p{ 
      color: ${({ theme }) => theme.colors.textSecondary};
    }
  }
`;

const Skills = styled.div`
  align-items: start;
  align-self: end;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 100%;
  width: 14rem;
  margin-top: 1rem;

  & div{
    padding: 0;
  }

  & p{
    color: ${({ theme }) => theme.colors.textGrey};
    border: 1px solid ${({ theme }) => theme.colors.borderDark};
  }

    @media (max-width: 600px) {
      width: 100%;
    }
`;

const UserDescription = styled.div`
  min-width: 14rem;
  max-width: 14rem;
  padding-bottom: 0.5rem;
  min-height: 16rem;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.borderDark};
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
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
    color: ${({ theme }) => theme.colors.textGrey};
`;

const P = styled.p`
  text-align: start;
  padding: 0.6rem 1rem;
  margin: 0;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 400;
`;

const RatingSection = styled.div`
  padding-right: 1rem;
  padding-top: 1rem;
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  div {
    font-size: 1rem;
  }
`;

const RatingStars = styled.div`
  font-size: 1.2rem;
`;

const DivRating = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 900px) {
      gap: 1.2rem
    }
`;

const Star = styled.span`
  color: ${({ theme }) => theme.colors.textGrey};
  font-size: 20px;
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
    min-height: 16rem;
    width: 100%;
    gap: 1rem;
    padding-top: 1rem;

    @media (max-width: 600px) {
      flex-wrap: wrap;
    }
`;

const Match = styled.span`
  display: flex;
  gap: 3px;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textOrange};
  padding: 2px 10px;
  border-radius: 20px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.textOrange};
  font-size: 8px;
  font-weight: bold;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding-left: 1rem;

  h3 {
    font-size: 0.8rem;
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
  width: 100%;
  min-height: 16rem;
  height: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MediaContent = styled.div`
  width: 100%;
  min-height: 7.5rem !important;
  height: 50%;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.borderDark};
  gap: 1rem;

    @media (max-width: 950px) {
    min-height: 8.5rem !important;
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
  border: 1px solid ${({ theme }) => theme.colors.borderDark};
  font-weight: 500;
  word-wrap: break-word;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.textGrey};

  a {
    padding: 0;
    color: ${({ theme }) => theme.colors.textGrey};
    font-size: 0.9rem
  }
`;

const ReportButton = styled(ButtonFeature)`
  width: 2.5rem;
  height: 2.5rem;
  position: absolute;
  top: 1rem;
  left: 4rem;
  color: ${({ theme }) => theme.colors.textWhite};
  font-size: 2rem;
  cursor: pointer;

  & svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  :hover{
    color: ${({ theme }) => theme.colors.textWhite};
  }
`;

const TipsButton = styled(ButtonFeature)`
  width: 2.5rem;
  height: 2.5rem;
  position: absolute;
  top: 1rem;
  left: 1rem;
  color: ${({ theme }) => theme.colors.textWhite};
  font-size: 2rem;
  cursor: pointer;

  & svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  :hover{
    color: ${({ theme }) => theme.colors.textWhite};
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

const UserProfileDetail: React.FC<IDetailUserProps> = ({ loading, error, userDetail, userData }) => {
  const [isModalReportOpen, setIsModalReportOpen] = useState<boolean>(false);
  const [isModalTipsOpen, setIsModalTipsOpen] = useState<boolean>(false);

  const [imageUrl, setImageUrl] = useState<string>("/img/default-picture-full.webp");
  const [languages, setLanguages] = useState<string[]>([]);
  const [isGitHub, setIsGitHub] = useState(false);
  const [usernameGitHub, setUsernameGitHub] = useState<string | null>(null);

  useEffect(() => {
    if (!userData) return;

    const checkImageUrl = (url: string) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          setImageUrl(url);
          resolve();
        };
        img.onerror = () => {
          setImageUrl("/img/default-picture-full.webp");
          resolve();
        };
      });
    };

    const runUserDetail = async () => {
      try {
        const tasks: Promise<void>[] = [];

        // Imagen
        if (userData.urlImage && isValidImageUrl(userData.urlImage)) {
          tasks.push(checkImageUrl(userData.urlImage));
        } else {
          setImageUrl("/img/default-picture-full.webp");
        }

        // GitHub repos
        const { isSuccess, user } = getGitHubUser(userDetail?.urlGithub?.toString());
        setIsGitHub(isSuccess);
        setUsernameGitHub(user ?? null);

        if (isSuccess && user) {
          tasks.push(
            (async () => {
              const repos = await getGitHubRepos(userDetail!.urlGithub!);
              const langs = repos.reduce<string[]>((acc, repo) => {
                if (repo.language && !acc.includes(repo.language)) acc.push(repo.language);
                return acc;
              }, []);
              setLanguages(langs);
            })()
          );
        } else {
          setLanguages([]);
        }

        await Promise.all(tasks);
      } catch (error) {
        console.error(error);
      }
    };

    runUserDetail();
  }, [userData, userDetail]);

  const handleReportClick = () => {
    setIsModalReportOpen(true);
  };

  const handleTipsClick = () => {
    setIsModalTipsOpen(true);
  };

  if (loading) return (
    <SkeletonTheme baseColor="#c2c2c2" highlightColor="#e0e0e0">
      <ProfileContainer>
        <ProfileImageMobile urlImage={""}>
          <Skeleton height={"100%"} width={"100%"} borderRadius={10} />
        </ProfileImageMobile>

        <Header style={{ paddingBottom: '0.5rem', backgroundColor: '#f7f7f7' }}>
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

            <ConnectionsRating>
              <Connections>
                <Skeleton width={90} height={15} />
                <Skeleton width={70} height={20} />
              </Connections>
              <Connections>
                <Skeleton width={90} height={15} />
                <Skeleton width={70} height={20} />
              </Connections>
            </ConnectionsRating>
          </UserInfo>

        </Header>

        <DivContent>
          <MediaContainer style={{ minHeight: "100%" }}>
            <Skeleton height={"10vw"} borderRadius={10} />
            <Skeleton height={"10vw"} borderRadius={10} />
          </MediaContainer>

          <UserDescription style={{ border: "none" }}>
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
    </SkeletonTheme>);

  if (error) return (
    <ProfileContainer style={{ width: '100%' }}>
      <NoContentContainer error={error} />
    </ProfileContainer>
  );

  const abilitiesArray =
    typeof userData?.abilities === 'string'
      ? userData.abilities.split(',').map((ability: string) => ability.trim())
      : [];

  return (
    <>
      <ProfileContainer>
        <ProfileImageMobile urlImage={imageUrl}>
          <TipsButton type={"button"} onClick={handleTipsClick}><FaShieldAlt /></TipsButton>
          <ReportButton type={"button"} onClick={handleReportClick}><FaExclamationTriangle /></ReportButton>
        </ProfileImageMobile>
        <Header>
          <UserInfo>
            <MainInfo>
              <ProfileImage urlImage={imageUrl} />
              <div>
                <UserName>{userData!.fullName}</UserName>
                <UserTitle>
                  {userDetail?.jobTitle}
                  <Match><IoFlowerOutline />Match</Match>
                </UserTitle>
              </div>
            </MainInfo>
            <ConnectionsRating>
              <Connections>
                <span>Conexiones</span>
                <span># {userData!.countMatches}</span>
              </Connections>
              <RatingSection>
                <div>Calificación</div>
                <DivRating>
                  <div>{userData!.qualification}</div>
                  <RatingStars>
                    {[...Array(5)].map((_, index) => {
                      const rating = Math.floor(userData!.qualification ?? 0);
                      return (
                        <Star key={index}>
                          {index < rating ? "★" : "☆"}{" "}
                          {/* Muestra estrellas llenas o vacías */}
                        </Star>
                      );
                    })}
                  </RatingStars>
                </DivRating>
              </RatingSection>
            </ConnectionsRating>
          </UserInfo>
        </Header>
        <DivUserDetails>
          <DivContent>
            <MediaContainer>
              <MediaContent>
                <H3>Enlaces Externos</H3>
                <SocialButtons>
                  <SocialButton
                    className={userDetail?.urlLinkedin ? "" : "disabled-social-link"}
                  >
                    <FaLinkedin />
                    <NavLink
                      target="_blank"
                      hover={{ fontWeight: '700', transition: '0.4s'}}
                      href={userDetail?.urlLinkedin ? userDetail.urlLinkedin : "#"}
                      label="LinkedIn"
                    />
                  </SocialButton>

                  <SocialButton
                    className={userDetail?.urlGithub ? "" : "disabled-social-link"}
                  >
                    <FaGithubSquare />
                    <NavLink
                      target="_blank"
                      hover={{ fontWeight: '700', transition: '0.4s'}}
                      href={userDetail?.urlGithub ? userDetail.urlGithub : "#"}
                      label="GitHub"
                    />
                  </SocialButton>

                  <SocialButton
                    className={userDetail?.urlBehance ? "" : "disabled-social-link"}
                  >
                    <FaBehanceSquare />
                    <NavLink
                      target="_blank"
                      hover={{ fontWeight: '700', transition: '0.4s'}}
                      href={userDetail?.urlBehance ? userDetail.urlBehance : "#"}
                      label="Adobe Behance"
                    />
                  </SocialButton>
                </SocialButtons>
                {isGitHub && (
                  <StatsContainer>
                    <StatsImage
                      src={`https://github-readme-stats.vercel.app/api?username=${usernameGitHub}&show_icons=true&theme=default&locale=es&hide_title=true&hide_border=true`}
                      alt={`${usernameGitHub}-stats`}
                    />
                    {languages.length !== 0 && (
                      <StatsImage
                        src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${usernameGitHub}&theme=default&hide_border=true&hide_title=true&langs_count=6&layout=compact`}
                        alt={`${usernameGitHub}-top-langs`}
                      />
                    )}
                  </StatsContainer>
                )}
              </MediaContent>
              <MediaContent>
                <H3>Cultura</H3>
                <P>{getCommunityInfo(userDetail?.category)}</P>
              </MediaContent>
            </MediaContainer>
            <UserDescription style={{ minHeight: isGitHub ? '22.5rem' : '16rem' }}>
              <H3>Descripción</H3>
              <P>{userDetail?.description}</P>
              <ContactInfo>
                <h3>Comunidad</h3>
                <span>{userDetail?.category}</span>
              </ContactInfo>
              <ContactInfo>
                <h3>Email</h3>
                <span>{userDetail?.email}</span>
              </ContactInfo>
              <ContactInfo>
                <h3>Teléfono</h3>
                <span>{userDetail?.phoneNumber}</span>
              </ContactInfo>
              <ContactInfo>
                <h3>Generación</h3>
                <span>{userDetail?.birthdate!.slice(0, 4)}</span>
              </ContactInfo>
            </UserDescription>
          </DivContent>
        </DivUserDetails>
        <Skills>
          <SkillTag page={'detail'} skillsArray={abilitiesArray} />
        </Skills>
      </ProfileContainer>

      {isModalTipsOpen && (
        <ModalTips
          userToInteractWith={userData!}
          isOpen={isModalTipsOpen}
          onClose={() => setIsModalTipsOpen(false)} />
      )}

      {isModalReportOpen && (
        <ModalReport
          userToInteractWith={userData!}
          isOpen={isModalReportOpen}
          onClose={() => setIsModalReportOpen(false)} />
      )}
    </>
  );
};

export default UserProfileDetail;
