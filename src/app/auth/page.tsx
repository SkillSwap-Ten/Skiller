"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FooterMain } from "@/src/shared/ui/organisms/footer/FooterMain";
import styled from "styled-components";
import NavLink from "@/src/shared/ui/atoms/links/NavLinks";
import ModalResetPassword from "@/src/shared/ui/organisms/modals/ModalResetPassword";
import FormLogin from "@/src/features/auth/components/FormLogin";
import FormRegister from "@/src/features/auth/components/FormRegister";

// Texto de cambio
const TextWrapper = styled.div`
  width: max-content;
  position: absolute;
  display: flex;
  flex-direction: column;
  text-align: start;
  right: 15vw;
  top: -76px;
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
  font-weight: bold;
  background: ${({ theme }) => theme.colors.gradientText};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
  margin: 0;
  line-height: 1.2;
  font-size: 4rem;
`;

// Contenedor principal
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  height: auto;
  width: 100%;
  margin-top: 96px;
  min-height: 70vh;

  @media (max-width: 1070px) {
    margin-top: 0 !important;
    min-height: 560px;
    flex-direction: column; 
    align-items: flex-start;
    justify-content: end;
  }

  @media (max-width: 340px) {
    min-height: 550px;
  }
`;

const MotionDiv = styled(motion.div)`
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 1070px) {
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: none 
  }
`;

// Contenedor de la capa superpuesta
const OverlayContainer = styled.div`
  position: absolute;
  left: 50%;
  width: 50%;
  border: 5px solid ${({ theme }) => theme.colors.bgPrimary};
  border-left: none;
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
  width: 60%;
  justify-content: start;
  align-items: center;
  border: none;

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
  text-align: start;
  justify-content: center;
  align-items: center;
  border-radius: none;
  border-bottom-right-radius: 15px;
  border-top-right-radius: 15px;
  padding: 50px;
  width: 100%;
  height: 450px;
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
  min-height: 36px;
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
`;

export default function AuthPage() {
  const [isModalResetPasswordOpen, setIsModalResetPasswordOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("currentPage") === "REGISTRO";
    }
    return false;
  });

  const openModalResetPassword = () => setIsModalResetPasswordOpen(true);
  const closeModalResetPassword = () => setIsModalResetPasswordOpen(false);

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
            <FormLogin resetPasswordProp={
              <ResetPasswordButton aria-label="Control Button" type="button" onClick={openModalResetPassword}>
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
            <FormRegister />
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
                  <SwitchButton aria-label="Control Button" onClick={() => setIsRegister(false)}>
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
