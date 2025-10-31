'use client';
import styled from "styled-components";
import SkillTag from "../../atoms/tags/SkillTag";
import NoContentContainer from "../../organisms/containers/NoContentContainer";
import { ICardMatchProps } from "@/src/shared/types/molecules/card.type";

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Estilos para el contenedor general de la tarjeta
const CardContainer = styled.div`
  width: 100%;
  min-height: 100% !important;
  max-height: 75vh !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.8rem 0;
  border: 1px solid ${({ theme }) => theme.colors.borderDark};
  border-radius: 0.5rem;
  padding-right: 0.2rem;

  > * {
    transition: 0.6s ease-in-out;
    width: 100% !important;
  }

  @media (max-width: 547px) {
    max-height: 100% !important;
  }
`;

const CardContent = styled.div`
  width: 100% !important;
  height: 100% !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
`;

const DivCardContent = styled.div`
  height: 100%;
  width: 100% !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;

  > * {
    width: 100% !important;
  }

  > :nth-child(2){
    border-bottom: 1px solid ${({ theme }) => theme.colors.textTertiary} !important;
  }
`;

const RatingSection = styled.div`
  display: flex;
  justify-content: end;
  gap: 2rem;
  text-align: center;
  padding: 1rem;
  margin-top: 0.5rem;

  & h1 {
    font-size: 2.8rem;
    margin: 0;
    color: ${({ theme }) => theme.colors.textTertiary};
    font-weight: bold;
  }

  & p {
    width: 100%;
    font-size: 0.9rem !important;
    font-weight: 500;
    margin: 0;
    color: ${({ theme }) => theme.colors.textTertiary};
  }
`;

const ConnectionsSection = styled.div`
  padding: 7px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textTertiary};
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.borderDark};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderDark};
  font-size: 0.8rem;
  width: 100%;
  font-weight: 500;
  margin: 0;
`;

const DivRate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & p {
    text-align: start;
    width: 100%;
  }
`;

const RatingStars = styled.div`
  opacity: 0.7;
  gap: 5px;
  display: flex;
`;

const Star = styled.span`
  color: ${({ theme }) => theme.colors.textGrey};
  font-size: 16px;
`;

const DescriptionSection = styled.div`
  text-align: justify;
  display: flex;
  flex-direction: column;
  padding: 0;
  padding-bottom: 1rem;
`;

const SkillsSection = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: end;

  & div {
    align-items: end;
  }
`;

const SubTitle = styled.h4`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textTertiary};
  font-weight: 500;
  padding: 0 1rem;
  margin: 0;
  margin-top: 1rem;
`;

const P = styled.p`
  color: ${({ theme }) => theme.colors.textGrey};
  font-size: 0.9rem;
  font-weight: 300;
  padding: 0;
  margin: 0;
  margin-top: 0.3rem;
  padding: 0 1rem;
  hyphens: auto;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

const MatchCard: React.FC<ICardMatchProps> = ({ user, loading, error }) => {
  if (loading) return (
    <SkeletonTheme baseColor="#c2c2c2" highlightColor="#e0e0e0">
      <Skeleton style={{ maxHeight: "75vh" }} height={"100%"} width={"100%"} borderRadius={10} />
    </SkeletonTheme>
  );

  if (error) return (
    <NoContentContainer error={error} />
  );

  // Constante que convierte abilities de string a array
  const abilitiesArray =
    typeof user?.abilities === 'string'
      ? user.abilities.split(',').map((ability: string) => ability.trim())
      : [];

  return (
    <CardContainer>
      <CardContent>
        <ConnectionsSection>
          Este perfil ha conectado con {Number.isNaN(user.countMatches) ? 0 : user.countMatches} {user.countMatches === 1 ? "persona" : "personas"}.
        </ConnectionsSection>
        <DivCardContent>
          <RatingSection>
            <h1>{(Math.floor(user.qualification! * 10)) / 10}</h1>
            <DivRate>
              <p>Calificación</p>
              <RatingStars>
                {[...Array(5)].map((_, index) => {
                  const stars = Math.floor(user.qualification!);
                  return (
                    <Star key={index}>
                      {index < stars ? "★" : "☆"}
                    </Star>
                  );
                })}
              </RatingStars>
            </DivRate>
          </RatingSection>

          <DescriptionSection>
            <SubTitle>Descripción</SubTitle>
            <P>{user.description}</P>
          </DescriptionSection>

          <SkillsSection>
            <SubTitle>Skills</SubTitle>
            <SkillTag page={'match'} skillsArray={abilitiesArray} />
          </SkillsSection>
        </DivCardContent>
      </CardContent>
    </CardContainer>
  );
};

export default MatchCard;
