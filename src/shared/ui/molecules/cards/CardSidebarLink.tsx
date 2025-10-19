'use client';
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavLink from "../../atoms/links/NavLinks";
import { ICardSidebarProps } from "@/src/shared/types/molecules/card.type";
import { validateImageUrl } from "@/src/lib/utils/imageValidator";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
`;

const ProfileHeader = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: start;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 20px;
  padding-left: 0.5rem;
  width: 236px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.textTertiary};
`;

const Avatar = styled.div<{ urlImage: string }>`
  border: 1px solid ${({ theme }) => theme.colors.textDark};
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

const JobTitle = styled.p`
  text-transform: capitalize;
  opacity: 0.75;
  font-size: 0.65rem;
  color: ${({ theme }) => theme.colors.textSidebar};
  margin: 0;
  padding: 0;
`;

const RatingSection = styled.div`
  display: flex;
  justify-content: end;
  gap: 2rem;
  text-align: center;
  margin-top: 0.7rem;

  & h1 {
    font-size: 2.8rem;
    margin: 0;
    color: ${({ theme }) => theme.colors.textTertiary};
    font-weight: bold;
  }

  & p {
    text-align: center;
    width: 100%;
    font-size: 0.9rem !important;
    font-weight: 500;
    margin: 0;
    color: ${({ theme }) => theme.colors.textTertiary};
  }
`;

const DivRate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & p {
    text-align: end;
    width: 100%;
    font-size: 0.7rem;
  }
`;

const RatingStars = styled.div`
  opacity: 0.7;
  gap: 5px;
  display: flex;
`;

const Star = styled.span`
  color:  ${({ theme }) => theme.colors.textBlack};
  font-size: 16px;
`;

const CardSidebarLink: React.FC<ICardSidebarProps> = ({
  userData,
}) => {
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

    if (userData.urlImage && validateImageUrl(userData.urlImage)) {
      checkImageUrl(userData.urlImage);
    } else {
      setImageUrl("/img/default-picture-full.webp");
    }
  }, [userData]);

  return (
    <NavLink hover={{ transform: 'scale(1.01)', transition: '0.4s' }} href="/user/profile" label="PERFIL">
      <CardContainer>
        <ProfileHeader>
          <Avatar urlImage={imageUrl} />
          <SidebarTitle>
            <Name>{userData?.fullName}</Name>
            <JobTitle>{userData?.jobTitle}</JobTitle>
          </SidebarTitle>
        </ProfileHeader>
        <RatingSection>
          <h1>{(Math.floor((userData?.qualification ?? 0) * 10)) / 10}</h1>
          <DivRate>
            <p>Tu Calificación</p>
            <RatingStars>
              {[...Array(5)].map((_, index) => {
                const rating = Math.floor(userData?.qualification ?? 0);
                return (
                  <Star key={index}>
                    {index < rating ? "★" : "☆"}
                  </Star>
                );
              })}
            </RatingStars>
          </DivRate>
        </RatingSection>
      </CardContainer>
    </NavLink>
  );
};
export default CardSidebarLink;