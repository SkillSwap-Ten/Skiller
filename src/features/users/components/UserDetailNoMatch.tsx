"use client"
import { useState, useEffect } from "react";
import { IDetailUserProps } from "@/src/features/users/types/detail.type";
import { getCommunityInfo } from "@/src/lib/utils/getStaticData";
import { isValidImageUrl } from "@/src/lib/utils/imageValidator";
import { FaArrowRight, FaExclamationTriangle, FaShieldAlt } from "react-icons/fa";
import { MdQuestionMark } from "react-icons/md";
import styled from "styled-components";
import ModalMatch from "../../../shared/ui/organisms/modals/ModalMatch";
import SkillTag from "../../../shared/ui/atoms/tags/SkillTag";
import ButtonFeature from "../../../shared/ui/atoms/buttons/ButtonFeature";
import ModalTips from "../../../shared/ui/organisms/modals/ModalTips";
import ModalReport from "../../../shared/ui/organisms/modals/ModalReport";
import NoContentContainer from "@/src/shared/ui/organisms/containers/NoContentContainer";

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
  height: 100%;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.borderDark};
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
  flex-direction: column;
  justify-content: start;
  align-items: end;
`;

const DivContent = styled.div`
    display: flex;
    align-items: start;
    height: 100%;
    min-height: 16rem;
    width: 100%;
    gap: 1rem;
    padding-top: 1rem;

    & section{
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    & span{
    display: none;
  }
  }

  @media (max-width: 600px) {
    flex-direction: column;

    & section{
      align-items: center;

          & span {
      display: block;
      width: 50%;
      height: 1px;
      border-top: 1px solid ${({ theme }) => theme.colors.textGrey};
      margin: 1rem 5px;
      opacity: 0.5;
    }
    }
  }
`;

const SendButton = styled.button`
  display: flex;
  justify-content: end;
  align-items: center;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.textGrey};
  padding: 14px 24px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.textGrey};
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s ease;
  gap: 10px;

  &:hover{
    transform: scale(0.95);
  }

  @media (max-width: 600px) {
    width: 90%;
    }
`;

const ButtonText = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textGrey};
`;

const MediaContent = styled.div`
  width: 100%;
  height: 11.5rem !important;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.borderDark};
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    height: 12rem !important;
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

const Unknown = styled.span`
  display: flex;
  gap: 3px;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textGrey};
  padding: 2px 10px;
  border-radius: 20px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.textGrey};
  font-size: 8px;
  font-weight: bold;
`;

const SkeletonWrap = styled.div`
    display: flex;
    align-items: start;
    height: 100%;
    min-height: 16rem;
    width: 100%;
    gap: 1rem;
    padding-top: 1rem;

    & section{
      width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const UserProfileNoDetail: React.FC<IDetailUserProps> = ({ loading, error, userData, userDetail }) => {
  const [isModalMatchOpen, setIsModalMatchOpen] = useState<boolean>(false);
  const [isModalReportOpen, setIsModalReportOpen] = useState<boolean>(false);
  const [isModalTipsOpen, setIsModalTipsOpen] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("/img/default-picture-full.webp");

  const openModalMatch = () => setIsModalMatchOpen(true);
  const closeModalMatch = () => setIsModalMatchOpen(false);

  useEffect(() => {
    const runUserDetail = async () => {
      try {
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
      } catch (error) {
        console.error(error);
      }
    };

    runUserDetail();
  }, [userData]);

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
        <SkeletonWrap>
          <section>
            <Skeleton height={"16vw"} borderRadius={10} />
            <Skeleton height={"4vw"} borderRadius={10} />
          </section>
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
        </SkeletonWrap>

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
                  <Unknown><MdQuestionMark />Unknown</Unknown>
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
            <section>
              <MediaContent>
                <H3>Cultura</H3>
                <P>{getCommunityInfo(userDetail?.category)}</P>
              </MediaContent>
              <span></span>
              <SendButton onClick={openModalMatch}>
                <ButtonText>ENVIAR SOLICITUD</ButtonText><FaArrowRight />
              </SendButton>
              <span></span>
            </section>
            <UserDescription>
              <H3>Descripción</H3>
              <P>{userDetail?.description}</P>
            </UserDescription>
          </DivContent>
          <Skills>
            <SkillTag page={'detail'} skillsArray={abilitiesArray} />
          </Skills>
        </DivUserDetails>
        <ModalMatch userToInteractWith={userData!} isOpen={isModalMatchOpen} onClose={closeModalMatch} />
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

export default UserProfileNoDetail;
