"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FooterMain } from "@/src/shared/ui/organisms/footer/FooterMain";
import styled from "styled-components";
import NavLink from "@/src/shared/ui/atoms/links/NavLinks";
import ModalResetPassword from "@/src/shared/ui/organisms/modals/ModalResetPassword";
import LoginPage from "@/src/features/auth/components/Login";
import RegisterPage from "@/src/features/auth/components/Register";

// Texto de cambio
const TextWrapper = styled.div`
  width: max-content;
  position: absolute;
  right: 15vw;
  top: -75px;
  display: flex;
  flex-direction: column;
  text-align: start;
  z-index: 100;

  & span {
    background-color: ${({ theme }) => theme.colors.bgPrimary};
  }

  @media (max-width: 1070px) {
    right: 10%;
    bottom: 10%;
    width: 100%;
    text-align: center;
    display: none;
  }
`;

const SkillSwapText = styled(motion.h1)`
  font-size: 4rem;
  font-weight: bold;
  background: ${({ theme }) => theme.colors.gradientText};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  line-height: 1.2;
  text-transform: uppercase;
`;

// Contenedor principal
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  width: 100%;
  height: auto;
  margin-top: 100px;
  min-height: 70vh;

  @media (max-width: 1070px) {
    margin-top: 0 !important;
    flex-direction: column; 
    align-items: flex-start;
    justify-content: end;
    min-height: 552px;
    height: 77.5vh;
    max-height: 842px;
  }
`;

const MotionDiv = styled(motion.div)`
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 1070px) {
    display: flex;
    flex-direction: column;
    width: 90%;
    justify-content: center;
    border-radius: none 
  }
`;

// Contenedor de la capa superpuesta
const OverlayContainer = styled.div`
  position: absolute;
  border: 5px solid ${({ theme }) => theme.colors.bgPrimary};
  border-left: none;
  left: 50%;
  width: 50%;
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  display: flex;
  justify-content: flex-start;
  align-items: center;

  @media (max-width: 1070px) {
    position: static;
    width: 100%;
    height: auto;
    padding: 0;
  }
`;

// Panel dentro de la capa superpuesta
const OverlayPanel = styled.div`
  border: none;
  width: 60%;
  justify-content: start;
  align-items: center;

  @media (max-width: 1070px) {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

const Div = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.borderAuthRight};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderAuthRight};
  border-right: 1px solid ${({ theme }) => theme.colors.borderAuthRight};
  background: ${({ theme }) => theme.colors.bgPrimary};
  border-radius: none;
  border-bottom-right-radius: 15px;
  border-top-right-radius: 15px;
  padding: 50px;
  width: 100%;
  height: 450px;
  text-align: start;
  justify-content: center;
  align-items: center;
  margin: 0;

  @media (max-width: 1070px) {
    padding: 0;
    padding-top: 1.4rem;
    height: auto;
    border:0; 
  }
`;

const H1 = styled.h1`
  display: flex;
  justify-content: end;
  align-items: end;
  height: 100%;
  padding-bottom: 20px;

  h1 {
    font-size: 2rem;
  }

  p {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  @media (max-width: 1070px) {
    justify-content: center;
    padding: 0;
    margin: 0;
  }
`;

// Botones para alternar entre vistas
const SwitchButton = styled.button`
  padding: 0 !important;
  border-radius: 20px;
  width: 150px;
  border: 1px solid ${({ theme }) => theme.colors.textYellow};
  background-color: transparent;
  font-size: 12px;
  font-weight: 500;
  transition: 0.5s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;

  & a {
    width: 100% !important;
    height: 100% !important;
    color: ${({ theme }) => theme.colors.textYellow};
    border: 0;
    padding: 10px;
  }

  &:hover {
    transform: scale(0.95);
    transition: 0.5s ease-in-out;

    & a{
    font-weight: normal;
  }
  }

  @media (max-width: 1070px) {
    width: inherit; 
    padding: 0 20px !important;
  }
`;

const ResetPasswordButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textWhite};
  opacity: 0.7;
  text-decoration: underline;
  cursor: pointer;
  text-align: left;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  padding-left: 0;
  display: block;
  width: 100%;
`;

const FooterContainer = styled.div`
  width: 100%;
  height: auto;

  @media (max-width: 1070px) {
    & div {
      margin-top: 48px !important;
    }
  }
`;

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [isModalResetPasswordOpen, setIsModalResetPasswordOpen] = useState(false);

  const openModalResetPassword = () => setIsModalResetPasswordOpen(true);
  const closeModalResetPassword = () => setIsModalResetPasswordOpen(false);

  useEffect(() => {
    const currentPage = localStorage.getItem("currentPage");
    if (currentPage === "REGISTRO") {
      setIsRegister(true);
    }
  }, []);

  return (
    <>
      <Container>
        {/* Framer Motion wrapper for form animations */}
        <motion.div
          initial={false}
          animate={isRegister ? { x: "-50%" } : { x: "0%" }}
          transition={{ duration: 1 }}
          style={{
            width: "200%",
            display: "flex",
          }}
        >
          {/* Formulario de Iniciar Sesión */}
          <MotionDiv
            initial={false}
            animate={isRegister ? { x: "200%" } : { x: "0%" }}
            transition={{ duration: 1.2 }}
            style={isRegister ? { width: "50%", visibility: "hidden" } : { width: "50%", visibility: "visible" }}
          >
            <LoginPage resetPasswordProp={
              <ResetPasswordButton type="button" onClick={openModalResetPassword}>
                ¿Olvidaste tu contraseña?
              </ResetPasswordButton>
            } />
          </MotionDiv>

          {/* Formulario de Registrarse */}
          <MotionDiv
            initial={false}
            animate={isRegister ? { x: "0%" } : { x: "200%" }}
            transition={{ duration: 1.2 }}
            style={isRegister ? { width: "50%", visibility: "visible" } : { width: "50%", visibility: "hidden" }}
          >
            <RegisterPage />
          </MotionDiv>
        </motion.div>

        {/* Overlay Panel */}
        <OverlayContainer>
          <TextWrapper>
            <SkillSwapText
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              SWAP
            </SkillSwapText>
            <SkillSwapText
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              ➜ SWAP
            </SkillSwapText>
            <span>
              <SkillSwapText
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                SKILL SWAP
              </SkillSwapText>
            </span>
          </TextWrapper>
          <OverlayPanel>
            <Div>
              {isRegister ? (
                <H1>
                  <SwitchButton onClick={() => setIsRegister(false)}>
                    <NavLink hover={{ fontWeight: '700', transition: '0.4s' }} href="/auth" label="INICIAR SESIÓN" />
                  </SwitchButton>
                </H1>
              ) : (
                <H1>
                  <SwitchButton onClick={() => setIsRegister(true)}>
                    <NavLink hover={{ fontWeight: '700', transition: '0.4s' }} href="/auth" label="REGISTRO" />
                  </SwitchButton>
                </H1>
              )}
            </Div>
          </OverlayPanel>
        </OverlayContainer>
      </Container>
      <FooterContainer>
        <FooterMain />
      </FooterContainer>
      <ModalResetPassword isOpen={isModalResetPasswordOpen} onClose={closeModalResetPassword} />
    </>
  );
}