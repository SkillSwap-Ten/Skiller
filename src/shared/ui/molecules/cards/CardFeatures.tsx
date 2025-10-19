'use client';
import styled from "styled-components";
import CardProfileLink from "./CardProfileLink";
import NoContentContainer from "@/src/shared/ui/organisms/containers/NoContentContainer";
import SliderFeature from "../../organisms/sliders/SliderFeatures";
import React from "react";
import { ICardFeaturesProps } from "@/src/shared/types/molecules/card.type";

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const FeaturesCardContainer = styled.div`
  background: ${({ theme }) => theme.colors.bgSidebar};
  width: 100%;
  min-height: 100% !important;
  max-height: 75vh !important;
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
  gap: 1rem;

  @media (max-width: 950px) {
    display: none !important;
  }
`;

const ProfileCardContent = styled.div`
  background: ${({ theme }) => theme.colors.bgSidebar};
  width: 100%;
  height: 45%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  padding-top: 0;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.textDark};

  & a {
    &:hover {
        font-weight: initial !important;
        transform: scale(1.01);
    }
  }
`;

const FeaturesCardContent = styled.div`
  background: ${({ theme }) => theme.colors.bgSidebar};
  border: 1px solid ${({ theme }) => theme.colors.textDark};
  width: 100%;
  height: 55%;
  display: flex;
  flex-direction: column;
  padding: 0;
  border-radius: 10px;
`;

const SkeletonColumn = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const FeaturesCard: React.FC<ICardFeaturesProps> = ({ error, loading, userData, openModalReport, openModalTips }) => {
  if (loading) return (
    <SkeletonTheme baseColor="#c2c2c2" highlightColor="#e0e0e0">
      <SkeletonColumn style={{ maxHeight: "75vh" }}>
        <Skeleton style={{ display: 'flex', height: '35.75vh', width: '100%' }} />
        <Skeleton style={{ display: 'flex', height: '35.75vh', width: '100%' }} />
      </SkeletonColumn>
    </SkeletonTheme>
  );

  if (error !== null)
    return (
      <FeaturesCardContainer style={{ minHeight: "75vh" }}>
        <ProfileCardContent style={{ height: "50%", padding: '0' }}>
          <NoContentContainer error={error} />
        </ProfileCardContent>
        <ProfileCardContent style={{ height: "50%", padding: '0' }}>
          <NoContentContainer error={error} />
        </ProfileCardContent>
      </FeaturesCardContainer>
    );

  return (
    <FeaturesCardContainer>
      <ProfileCardContent>
        <CardProfileLink
          userData={userData!}
        />
      </ProfileCardContent>
      <FeaturesCardContent>
        <SliderFeature openModalReport={openModalReport} openModalTips={openModalTips} />
      </FeaturesCardContent>
    </FeaturesCardContainer>
  );
};

export default FeaturesCard;