"use client";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import CarouselHome from "../../shared/ui/organisms/carousels/CarouselHome";
import ButtonTag from "@/src/shared/ui/atoms/tags/ButtonTag";
import Image from "next/image";
import hands_swap from "../../../public/img/hands-swap.webp";
import { FooterUser } from "@/src/shared/ui/organisms/footer/FooterUser";
import { MdOutlineReplay } from "react-icons/md";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { IoPlay } from "react-icons/io5";
import { IoMdPause } from "react-icons/io";
import { Baskervville } from "next/font/google";

const baskervville = Baskervville({
    weight: '400',
    subsets: ['latin'],
    style: 'normal'
});

// ---------------------- Estilos para el contenedor principal ---------------------
const HomeContainer = styled.div`
  padding: 0;
  padding-top: 74px;
  padding-bottom: 54px;
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

// Estilos para el logo y el botón
const Logo = styled.h1`
  background: ${({ theme }) => theme.colors.gradientText};
  font-size: 12vw;
  margin-top: 0.57em;
  margin-bottom: 0.4em;
  font-weight: bold;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    padding: 20px 0;
  }
`;

// Estilos para texto en itálica
const Italic = styled.span`
  font-weight: normal;
  font-style: italic;
  font-family: ${baskervville.style.fontFamily};
`;

// Estilos para el texto principal
const MainText = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 15vw;
  background: transparent;
  align-items: end;
  padding: 50px;
  padding-bottom: 5vw;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
    padding-bottom: 35px;
  }
`;

// Estilos para cada cuadro de texto
const Slogan = styled.div`
  display: flex;
  text-align: start;
  align-items: end;
  background: transparent;
  background: ${({ theme }) => theme.colors.gradientText};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  border: 4px solid ${({ theme }) => theme.colors.textYellow};
  flex: 1;
  width: 50%;
  padding: 0 45px;

  & h2 {
    font-size: 2.5vw;
    font-weight: 600;
  }

  &:first-child {
    border-right: 1px solid transparent;
    border-bottom: 1px solid transparent;
    border-top: 1px solid transparent;
  }

  &:last-child {
    border-left: 1px solid transparent;
  }

  @media (max-width: 768px) {
    padding: 0 20px;
    width: 100%;
    font-weight: bold;
    border: 2px solid ${({ theme }) => theme.colors.textYellow};

    &:first-child {
      border-right: 1px solid transparent;
      border-bottom: 1px solid transparent;
      border-top: 1px solid transparent;
    }

    &:last-child {
      border-left: 1px solid transparent;
    }

    & h2 {
      font-size: 4.5vw;
      font-weight: bold;
    }
  }
`;

const Catchphrase = styled.div`
  align-items: center;
  justify-content: end;
  text-align: end;
  display: none;
  background: transparent;
  display: flex;
  border: 4px solid ${({ theme }) => theme.colors.textSecondary};
  flex: 1;
  width: 50%;
  padding: 0 45px;

  & h2 {
    font-size: 2.5vw;
    font-weight: 600;
  }

  &:first-child {
    border-right: 1px solid transparent;
  }

  &:last-child {
    border-left: 1px solid transparent;
    border-top: 1px solid transparent;
    border-bottom: 1px solid transparent;
  }

  @media (max-width: 768px) {
    display: flex;
    font-weight: bold;
    border: 2px solid ${({ theme }) => theme.colors.textSecondary};
    padding: 0;
    padding-right: 20px;
    width: 100%;

    & h2 {
      font-size: 4.5vw;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.textSecondary};
    }

    &:first-child {
      border-right: 1px solid transparent;
    }

    &:last-child {
      border-left: 1px solid transparent;
      border-top: 1px solid transparent;
      border-bottom: 1px solid transparent;
    }
  }

  @media (max-width: 500px) {
    border: none;
    padding: 0;
    padding-top: 10px;
  }
`;

//--------------------- Estilos para section 2 ---------------------
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  padding: 50px;
  gap: 50px;

  @media (max-width: 1200px) {
    padding: 0;
    padding-top: 50px;
    padding-bottom: 10px;
    gap: 0;
  }

  @media (max-width: 768px) {
    padding-top: 10px;
    padding-bottom: 20px;
  }
`;

const Section1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  border-radius: 10px;
`;

const Section2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 10px;
  font-weight: 100;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding-left: 50px;

  @media (max-width: 1200px) {
    padding: 0;
    flex-direction: column;
    justify-content: flex-end;
    text-align: end;
  }
`;

const Section3 = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  border-radius: 10px;

  @media (max-width: 1200px) {
    display: none;
  }
`;

const ProfileBoxStart = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 100px 30px 50px;
  border: none;
  text-align: start;
  align-items: start;
  justify-content: flex-start;
  transition: 1s;
  width: fit-content;

  &:hover {
    transition: 1s;
    transform: scale(1.05);
  }

  @media (max-width: 1200px) {
    width: 100%;
    padding: 30px 100px 30px 100px;
  }

  @media (max-width: 768px) {
    padding: 30px 100px 30px 50px;
  }
`;

const ProfileBoxMiddle = styled.div`
  display: flex;
  flex-direction: column;
  border: none;
  padding: 30px 50px 30px 100px;
  text-align: start;
  align-items: start;
  justify-content: flex-start;
  transition: 1s;
  width: fit-content;

  &:hover {
    transition: 1s;
    transform: scale(1.05);
  }

  @media (max-width: 1200px) {
    width: 100%;
    border-radius: 0;
    text-align: end;
    align-items: end;
    justify-content: flex-end;
    padding: 30px 100px 30px 100px;

    & div {
      text-align: end;
      align-items: end;
      justify-content: end !important;
    }
  }

  @media (max-width: 768px) {
    padding: 30px 50px 30px 100px;
  }
`;

const ProfileBoxEnd = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 50px 30px 100px;
  border: none;
  text-align: end;
  align-items: end;
  justify-content: flex-end;
  transition: 1s;
  width: fit-content;

  & div {
    text-align: end;
    align-items: end;
    justify-content: end !important;
  }

  &:hover {
    transition: 1s;
    transform: scale(1.05);
  }

  @media (max-width: 1200px) {
    padding: 30px 100px 30px 50px;
    width: 100%;
  }
`;

const BoxTitle = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  text-align: end;
  width: 25%;
  margin-right: 70px;

  @media (max-width: 1200px) {
    width: 100%;
    margin-right: 0;
    text-align: center;
    justify-content: center;
  }
`;

const Title = styled.h1`
  background: ${({ theme }) => theme.colors.gradientText};
  font-size: 2.5rem;
  font-weight: normal;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: grayscale();

  @media (max-width: 1492px) {
    font-size: 1.7rem;
    margin-top: 0;
    margin-bottom: 30px;
  }

  @media (max-width: 1200px) {
    display: none;
  }
`;

const Name = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.textSecondary};

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Message = styled.p`
  font-size: 1.1rem;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.bgSecondary};
  hyphens: none;
  word-wrap: normal;
  overflow-wrap: normal;

  @media (max-width: 768px) {
    font-size: 15px;
    width: 350px;
  }

  @media (max-width: 600px) {
    width: 200px;
  }
`;

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px !important;

  @media (max-width: 768px) {
    gap: 10px !important;
  }
`;

//--------------------- estilos para section 4 ---------------------

const ContainerDiscover = styled.div`
  display: flex;
  width: 100vw;
  justify-content: space-between;
  padding: 10vw 50px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  border-left: 4px solid ${({ theme }) => theme.colors.textYellow};
  padding-left: 50px;

  @media (max-width: 768px) {
    padding-left: 30px;
    border-left: 2px solid ${({ theme }) => theme.colors.textYellow};
  }
`;

const RightSection = styled.div`
  text-align: right;
  justify-content: center;

  @media (max-width: 768px) {
    text-align: end;
    margin-top: 10px;
  }
`;

const SwapText = styled.h1`
  font-size: clamp(2.5rem, 8vw, 8rem);
  background: ${({ theme }) => theme.colors.gradientText};
  font-weight: bold;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  margin: 0;
`;

const SubText = styled.p`
  font-size: clamp(12px, 2vw, 2rem);
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textYellow};
  margin: 10px 0 130px;
`;

const RightTextLine1 = styled.div`
  padding-right: 50px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: clamp(2rem, 8vw, 8rem);
  font-weight: 100;

  @media (max-width: 768px) {
    padding-right: 30px;
  }
`;

const RightTextLine2 = styled.div`
  border-right: 4px solid ${({ theme }) => theme.colors.textSecondary};
  padding-right: 50px;
  font-size: clamp(2rem, 8vw, 8rem);
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 400;

  @media (max-width: 768px) {
    border-right: 2px solid ${({ theme }) => theme.colors.textSecondary};
    padding-right: 30px;
  }
`;

const RightTextLine3 = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  border-right: 4px solid ${({ theme }) => theme.colors.textSecondary};
  padding-right: 50px;
  font-size: clamp(2rem, 8vw, 8rem);
  font-weight: 800;

  @media (max-width: 768px) {
    border-right: 2px solid ${({ theme }) => theme.colors.textSecondary};
    padding-right: 30px;
  }
`;

const Video = styled.video`
  width: 75%;
  height: auto;
  border-radius: 30px;
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  object-fit: cover;
  background: transparent;

  @media (max-width: 768px) {
    border-radius: 20px;
    width: 80%;
  }

  @media (max-width: 570px) {
    border-radius: 15px;
  }

  @media (max-width: 400px) {
    border-radius: 10px;
  }
`;

const ControlsButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.textOrange};
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: 1s;

  & * {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textOrange};
    transition: 1s;
  }

  @media (max-width: 768px) {
    & p {
      display: none;
    }
  }

  &:hover {
    transition: 1s;
    scale: 0.95;
  }
`;

const VideoContainer = styled.div`
  background: ${({ theme }) => theme.colors.bgTertiary};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 100px 0;

  & h2 {
    font-size: 35px;
    color: ${({ theme }) => theme.colors.textOrange};
    margin: 10px 0;
    width: 100%;
    padding: 0 180px;
    text-align: start;
  }

  & h3 {
    text-align: start;
    width: 100%;
    margin: 0;
    font-size: 16px;
    font-weight: 400;
    padding: 0 180px;
    color: ${({ theme }) => theme.colors.textSecondary};
    opacity: 0.8;
  }

  & small {
    text-align: justify;
    width: 100%;
    padding: 0 180px;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 10px;
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    padding: 50px 0;

    & h2 {
      font-size: 20px;
      padding: 0 50px;
    }

    & h4 {
      font-weight: 300;
      padding: 0 50px;
      color: ${({ theme }) => theme.colors.textSecondary};
    }

    & small {
      padding: 0 50px;
      color: ${({ theme }) => theme.colors.textSecondary};
      font-size: 10px;
    }
  }

  @media (max-width: 480px) {
    & h2{
      font-size: 23px;
    }
  }

  & article {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  & section {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 1rem;
  }
`;

const DecorationOne = styled.div<{ urlImage: string }>`
  display: flex;
  background-image: url(${(props) => props.urlImage});
  background-size: cover;
  background-position: left;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  width: 5%;
  height: 24vw;

  @media (max-width: 768px) {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }

  @media (max-width: 570px) {
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
  }

  @media (max-width: 400px) {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

const DecorationTwo = styled.div<{ urlImage: string }>`
  display: flex;
  background-image: url(${(props) => props.urlImage});
  background-size: cover;
  background-position: right;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  width: 5%;
  height: 24vw;

  @media (max-width: 768px) {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }

  @media (max-width: 570px) {
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
  }

  @media (max-width: 400px) {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
`;

const Imagenes = styled(Image)`
  height: 100vw;
  width: 100vw;
  position: absolute;
  top: -31.5vw;
  transform: rotate(-90deg);

  @media (max-width: 1024px) {
    top: -29.5vw;
  }

  @media (max-width: 900px) {
    top: -28.5vw;
  }

  @media (max-width: 800px) {
    top: -27.5vw;
  }

  @media (max-width: 769px) {
    top: -23.5vw;
  }

  @media (max-width: 669px) {
    top: -21.5vw;
  }

  @media (max-width: 569px) {
    top: -18.5vw;
  }

  @media (max-width: 469px) {
    top: -15vw;
  }

  @media (max-width: 369px) {
    top: -9.5vw;
  }

  @media (max-width: 320px) {
    top: -5.5vw;
  }
`;

//--------------------- Componente principal de la página de inicio ---------------------

const Home = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const handlePause = () => {
    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0; // vuelve al inicio
      videoRef.current.play(); // vuelve a reproducir
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !videoRef.current.muted;
      videoRef.current.muted = newMuted;
      videoRef.current.volume = newMuted ? 0 : 1;
      setIsMuted(newMuted);
    }
  };

  return (
    <HomeContainer>
      <Imagenes src={hands_swap} alt="swap-hands"></Imagenes>
      <Logo>SkillSwap</Logo>
      <MainText>
        <Slogan>
          <h2>
            <Italic>looking</Italic>
            <br></br>FOR SKILL
          </h2>
        </Slogan>
        <Catchphrase>
          <h2>
            INTERCAMBIO
            <br></br>
            <Italic>experiencia</Italic>
            <br></br>
            <Italic>destreza</Italic>
          </h2>
        </Catchphrase>
      </MainText>
      <CarouselHome />
      <VideoContainer>
        <h2>
          COMUNIDAD <Italic>skill 10&apos;</Italic>{" "}
        </h2>
        <h3>Elige como conectar con los profesionales de tu interés.</h3>
        <br />
        <small>
          *Secuencias abreviadas y simuladas. Resultados solo con fines
          ilustrativos. Los resultados pueden variar según las coincidencias
          visuales. Requiere conexión a Internet. Se requiere iniciar sesión en
          una cuenta SkillSwap. No se garantiza la precisión de los resultados.
        </small>
        <br />
        <br />
        <article>
          <DecorationOne urlImage="https://t4.ftcdn.net/jpg/05/01/83/79/360_F_501837926_xvM4Ym7pql243YOrjmct5NCXjFTxz11v.jpg"></DecorationOne>
          <Video ref={videoRef} autoPlay muted playsInline>
            <source src="/vid/skillswap-ad.mp4" type="video/mp4" />
            Tu navegador no soporta el video HTML5.
          </Video>
          <DecorationTwo urlImage="https://t4.ftcdn.net/jpg/05/01/83/79/360_F_501837926_xvM4Ym7pql243YOrjmct5NCXjFTxz11v.jpg"></DecorationTwo>
        </article>
        <section>
          <ControlsButton onClick={handleReplay}>
            <MdOutlineReplay />
            <p> Repetir</p>
          </ControlsButton>
          <ControlsButton onClick={handlePause}>
            {isPlaying ? (
              <>
                <IoMdPause /> <p> Pausar</p>
              </>
            ) : (
              <>
                <IoPlay />
                <p> Reanudar</p>
              </>
            )}
          </ControlsButton>
          <ControlsButton onClick={toggleMute}>
            {!isMuted ? (
              <>
                <FaVolumeMute />
                <p> Silencio</p>
              </>
            ) : (
              <>
                <FaVolumeUp />
                <p> Sonido</p>
              </>
            )}
          </ControlsButton>
        </section>
      </VideoContainer>
      <Container>
        {/* Profile Section 1 */}
        <Section1>
          <ProfileBoxStart>
            <Name>Diane Ressler</Name>
            <Message>
              ¡Hola Jorge! ¿Podrías enseñarme un poco sobre<br></br>programación
              en JavaScript?
            </Message>
            <ButtonGroup>
              <ButtonTag label={"Design"}></ButtonTag>
              <ButtonTag label={"Adobe"}></ButtonTag>
              <ButtonTag label={"Branding"}></ButtonTag>
            </ButtonGroup>
          </ProfileBoxStart>
        </Section1>
        <Section2>
          <BoxTitle>
            <Title>TODO SEGÚN TUS NECESIDADES E INTERESES</Title>
          </BoxTitle>
          <ProfileBoxMiddle>
            <Name>Jorge Torres</Name>
            <Message>
              ¡Claro! Y luego podrías ayudarme a mejorar<br></br>en Diseño y
              Redes Sociales.
            </Message>
            <ButtonGroup>
              <ButtonTag label={"Coding"}></ButtonTag>
              <ButtonTag label={"HTML"}></ButtonTag>
              <ButtonTag label={"JavaScript"}></ButtonTag>
            </ButtonGroup>
          </ProfileBoxMiddle>
        </Section2>
        <Section3>
          <ProfileBoxEnd>
            <Name>Sara Castillo</Name>
            <Message>
              Hey, soy creadora de contenido.<br></br>Me gustaría aprender sobre
              Coding contigo.
            </Message>
            <ButtonGroup>
              <ButtonTag label={"Entretenimiento"}></ButtonTag>
              <ButtonTag label={"Manejo Redes"}></ButtonTag>
            </ButtonGroup>
          </ProfileBoxEnd>
        </Section3>
      </Container>
      <ContainerDiscover>
        {/* Left Section */}
        <LeftSection>
          <div>
            <SwapText>Swap.</SwapText>
            <SubText>simple. dinámico. libre.</SubText>
          </div>
        </LeftSection>
        {/* Right Section */}
        <RightSection>
          <RightTextLine1>PARA</RightTextLine1>
          <RightTextLine1>LOS</RightTextLine1>
          <RightTextLine2>QUE</RightTextLine2>
          <RightTextLine2>VIVEN</RightTextLine2>
          <RightTextLine3>DIGITAL</RightTextLine3>
          <RightTextLine3>MENTE</RightTextLine3>
        </RightSection>
      </ContainerDiscover>
      <FooterUser />
    </HomeContainer>
  );
};

export default Home;