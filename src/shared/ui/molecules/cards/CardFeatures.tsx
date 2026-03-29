'use client';
import styled from "styled-components";
import CardProfileLink from "./CardProfileLink";
import NoContentContainer from "@/src/shared/ui/organisms/containers/NoContentContainer";
import SliderFeature from "../../organisms/sliders/SliderFeatures";
import React from "react";
import { ICardFeaturesProps } from "@/src/shared/types/molecules/card.type";

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CardFeaturesContainer = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100% !important;
  max-height: 75vh !important;
  padding: 0;
  gap: 1rem;

  @media (max-width: 950px) {
    display: none !important;
  }
`;

const ProfileCardContent = styled.div`
  background: ${({ theme }) => theme.colors.bgSidebar};
  border: 1px solid ${({ theme }) => theme.colors.borderDark};
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 45%;
  padding: 1rem;
  padding-top: 0;
  border-radius: 10px;

  & a {
    &:hover {
        font-weight: initial !important;
        transform: scale(1.01);
    }
  }
`;

const CardFeaturesContent = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.borderDark};
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
  justify-content: center;
  overflow: hidden;
  border-radius: 10px;

  @media (max-width: 950px) {
    display: none !important;
  }
`;

const CardFeatures: React.FC<ICardFeaturesProps> = ({ error, loading, userData, openModalReport, openModalTips }) => {
  if (loading) return (
    <SkeletonTheme baseColor="#c2c2c2" highlightColor="#e0e0e0">
      <SkeletonColumn style={{ maxHeight: "80vh", width: '100%' }}>
        <Skeleton style={{ display: 'flex', height: '40vh', width: '100%', borderRadius: "10px" }} />
        <Skeleton style={{ display: 'flex', height: '40vh', width: '100%', borderRadius: "10px" }} />
      </SkeletonColumn>
    </SkeletonTheme>
  );

  if (error !== null)
    return (
      <CardFeaturesContainer style={{ minHeight: "75vh" }}>
        <ProfileCardContent style={{ height: "50%", padding: '0' }}>
          <NoContentContainer error={error} />
        </ProfileCardContent>
        <ProfileCardContent style={{ height: "50%", padding: '0' }}>
          <NoContentContainer error={error} />
        </ProfileCardContent>
      </CardFeaturesContainer>
    );

  return (
    <CardFeaturesContainer>
      <ProfileCardContent>
        <CardProfileLink
          userData={userData!}
        />
      </ProfileCardContent>
      <CardFeaturesContent>
        <SliderFeature openModalReport={openModalReport} openModalTips={openModalTips} />
      </CardFeaturesContent>
    </CardFeaturesContainer>
  );
};

export default CardFeatures;