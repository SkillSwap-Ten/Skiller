'use client';
import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import { isValidImageUrl } from "@/src/lib/utils/imageValidator";
import { FaExclamationTriangle, FaShieldAlt } from "react-icons/fa";
import { ISliderMatchProps } from "@/src/shared/types/organisms/slider.type";
import { PiHandshake } from "react-icons/pi";
import ModalMatch from '../modals/ModalMatch';
import ModalReport from '../modals/ModalReport';
import ModalTips from '../modals/ModalTips';
import ButtonFeature from "../../atoms/buttons/ButtonFeature";
import NoContentContainer from "../containers/NoContentContainer";

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Animaciones tipo swipe
const swipeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(5%) rotate(0);
  }
  to {
    opacity: 1;
    transform: translateX(0) rotate(0);
  }
`;

const swipeOut = keyframes`
  from {
    opacity: 1;
    transform: translateX(0) rotate(0);
  }
  to {
    opacity: 0;
    transform: translateX(-10%) rotate(-4deg);
  }
`;

const CardContainer = styled.div<{ animateOut?: boolean }>`
  width: 50%;
  min-height: 100% !important;
  max-height: 75vh !important;
  border-radius: 0.5rem;
  position: relative;
  color: ${({ theme }) => theme.colors.textWhite};
  text-align: center;
  overflow: hidden;
  animation: ${(props) => (props.animateOut ? swipeOut : swipeIn)} 0.6s ease forwards;
  z-index: 9;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #0000007f;
    z-index: 1;
  }
`;

const SliderImage = styled.div<{ urlImage: string }>`
  background-image: url(${(props) => props.urlImage}); 
  background-size: cover;
  background-position: center;
  min-height: 450px;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  border: solid 1px ${({ theme }) => theme.colors.borderDark};
`;

const Title = styled.h3`
  width: 400px;
  font-size: 2rem;
  text-transform: capitalize;
  text-align: start;
  position: absolute;
  hyphens: auto;
  word-wrap: break-word;
  overflow-wrap: break-word;
  bottom: 2.5rem;
  left: 1.5rem;
  z-index: 99;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  font-weight: 300;
  position: absolute;
  text-transform: capitalize;
  bottom: 2.5rem;
  left: 1.5rem;
  z-index: 99;
  color: #ccc;
`;

const PassButton = styled.button`
  position: absolute;
  top: 1rem;
  padding: 0;
  right: 1.5rem;
  background: none;
  border: none;
  font-size: 2rem;
  z-index: 99;
  cursor: pointer;
  display: flex;
  gap: 0.5rem;
  color: #ffffffb2;

  & div {
    font-weight: 300;
    font-style: normal;
    transform: scaleX(0.5) scaleY(1.4) !important;
    color: #ffffffb2;
  }
`;

const MatchButton = styled(ButtonFeature)`
  width: 3rem;
  height: 3rem;
  position: absolute;
  bottom: 4.05rem;
  right: 1rem;
  color: ${({ theme }) => theme.colors.textWhite};
  font-size: 2rem;
  z-index: 99;
  cursor: pointer;

  :hover{
    color: ${({ theme }) => theme.colors.textWhite};
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
  z-index: 99;
  cursor: pointer;

  & svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  :hover{
    color: ${({ theme }) => theme.colors.textWhite};
  }

  @media (min-width: 950px) {
    display: none !important;
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
  z-index: 99;
  cursor: pointer;

  & svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  :hover{
    color: ${({ theme }) => theme.colors.textWhite};
  }

  @media (min-width: 950px) {
    display: none !important;
  }
`;

const SliderMatch: React.FC<ISliderMatchProps> = ({ user, loading, error, onPass }) => {
  const [isModalMatchOpen, setIsModalMatchOpen] = useState<boolean>(false);
  const [isModalReportOpen, setIsModalReportOpen] = useState<boolean>(false);
  const [isModalTipsOpen, setIsModalTipsOpen] = useState<boolean>(false);
  const [animateOut, setAnimateOut] = useState<boolean>(false);
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

    if (user && user.urlImage && isValidImageUrl(user.urlImage)) {
      checkImageUrl(user.urlImage);
    } else {
      setImageUrl("/img/default-picture-full.webp");
    }
  }, [user]);

  const handlePassClick = () => {
    // Primero animamos hacia afuera
    setAnimateOut(true);
    // Luego de la animación, disparamos el onPass
    setTimeout(() => {
      onPass();
      setAnimateOut(false);
    }, 600);
  };

  const handleMatchClick = () => {
    setIsModalMatchOpen(true);
  };

  const handleReportClick = () => {
    setIsModalReportOpen(true);
  };

  const handleTipsClick = () => {
    setIsModalTipsOpen(true);
  };

  if (loading) return (
      <SkeletonTheme baseColor="#c2c2c2" highlightColor="#e0e0e0">
            <Skeleton style={{ maxHeight: "75vh" }} height={"100%"} width={"100%"} borderRadius={10} />
      </SkeletonTheme>
    );
  
    if (error !== null) return (
          <NoContentContainer error={error} />
    );

  return (
    <>
      <CardContainer animateOut={animateOut}>
        <TipsButton type={"button"} onClick={handleTipsClick}><FaShieldAlt /></TipsButton>
        <ReportButton type={"button"} onClick={handleReportClick}><FaExclamationTriangle /></ReportButton>
        <PassButton aria-label="Pass Button" onClick={handlePassClick}><div>&lt;</div> pass</PassButton>
        <SliderImage urlImage={imageUrl} />
        <Title>{user.fullName}</Title>
        <Subtitle>{user.jobTitle}</Subtitle>
        <MatchButton type={"button"} onClick={handleMatchClick}><PiHandshake /></MatchButton>
      </CardContainer>

      {isModalMatchOpen && (
        <ModalMatch
          userToInteractWith={user}
          isOpen={isModalMatchOpen}
          onClose={() => setIsModalMatchOpen(false)}
        />
      )}

      {isModalTipsOpen && (
        <ModalTips
          userToInteractWith={user}
          isOpen={isModalTipsOpen}
          onClose={() => setIsModalTipsOpen(false)} />
      )}

      {isModalReportOpen && (
        <ModalReport
          userToInteractWith={user}
          isOpen={isModalReportOpen}
          onClose={() => setIsModalReportOpen(false)} />
      )}
    </>
  );
};

export default SliderMatch;
