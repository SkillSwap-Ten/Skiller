'use client';
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavLink from "../../atoms/links/NavLinks";
import SkillTagTinyList from "../../atoms/tags/SkillTagTiny";
import { ICardUserProps } from "@/src/shared/types/molecules/card.type";
import { validateImageUrl } from "@/src/lib/utils/imageValidator";

// Contenedor de la tarjeta
const CardContainer = styled.div`
  display: flex;
  width: 100%;
  height: 16rem;
`;

// Contenido de la tarjeta
const CardContent = styled.div`
  overflow: hidden;
  display: flex;
  height: auto;
  width: 100%;
  max-width: 500px;
  gap: 1rem;
`;

// Estilo para la columna de la imagen
const ImageColumn = styled.div`
  min-width: 40%;
  min-height: 14rem;
  max-height: 16rem;
`;

// Estilo para la columna de la información
const InfoColumn = styled.div`
  width: 50%;
  height: auto;
  padding: 0;
  padding-left: 1rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;


// Estilo para el nombre
const ImageCard = styled.article<{ urlImage?: string }>`
  background-image: url(${(props) => props.urlImage});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: solid 1px ${({ theme }) => theme.colors.textDark};
`;

// Estilo para el nombre
const Name = styled.h3`
  margin-top: 0;
  font-size: 1.3rem;
  margin-bottom: 4px;
`;

const JobTitle = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

// Estilo para el contenedor de estrellas
const StarsContainer = styled.div`
  display: flex;
`;

const Star = styled.span`
  color: ${({ theme }) => theme.colors.textYellow};;
  font-size: 16px;
  margin: 0 2px;
`;

const Skills = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 60%;
  padding-bottom: 0 !important;

  & p{
    color: ${({ theme }) => theme.colors.textOrange};
  }
`;

const CardUserLink: React.FC<ICardUserProps> = ({
  userData, key
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

  // Constante que convierte abilities de string a array
  const abilitiesArray =
    typeof userData?.abilities === 'string'
      ? userData.abilities.split(',').map((ability: string) => ability.trim())
      : [];

  return (
    <NavLink hover={{ transform: 'scale(1.01)', transition: '0.4s' }} key={key} href={`/user/detail/u/${userData.id}`} label="DETALLE" >
      <CardContainer>
        <CardContent>
          <ImageColumn>
            <ImageCard urlImage={imageUrl} />
          </ImageColumn>
          <InfoColumn>
            <Name>{userData.fullName}</Name>
            <JobTitle>{userData.createdAt ? `${userData.createdAt.slice(0, 7)} · ${userData.jobTitle}` : userData.jobTitle}</JobTitle>
            <StarsContainer>
              {userData.qualification !== -1 &&
                [...Array(5)].map((_, index) => {
                  const rating = Math.floor(userData.qualification ?? 0);
                  return (
                    <Star key={index}>
                      {index < rating ? "★" : "☆"}{" "}
                      {/* Muestra estrellas llenas o vacías */}
                    </Star>
                  );
                })
              }
            </StarsContainer>

            <Skills>
              <SkillTagTinyList skillsArray={abilitiesArray.slice(0, 3)} />
              <p>...</p>
            </Skills>
          </InfoColumn>
        </CardContent>
      </CardContainer>
    </NavLink>
  );
};
export default CardUserLink;