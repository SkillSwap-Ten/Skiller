"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { postSetNewPassword } from "@/src/app/api/auth/auth";
import { FooterMain } from '@/src/shared/ui/organisms/footer/FooterMain';
import { handlePageTheme } from "@/src/lib/utils/themeHandler";
import { toast } from "react-toastify";
import styled from "styled-components";
import NavLink from "@/src/shared/ui/atoms/links/NavLinks";
import Input from "@/src/shared/ui/atoms/inputs/Input";

// Styled Components para el formulario
const PageContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.bgNeutral};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100dvh;
  width: 100%;
`;

const PageSideBanner = styled.div<{ $urlImage: string }>`
  background-image: url(${(props) => props.$urlImage});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 50%;

  @media (max-width: 1000px) {
    display: none;
  }
`;

const PageContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  width: 50%;

  & div {
    width: 100%;
  }

  @media (max-width: 1000px) {
    width: 100%;
  }
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const FormWrapper = styled.div`
  padding: 2.5rem 3rem;
  background: ${({ theme }) => theme.colors.bgWhite};
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.borderNeutral};
  text-align: center;
  max-width: 400px;

  & label {
    color: ${({ theme }) => theme.colors.textNeutral};
  }

  @media (max-width: 450px) {
    max-width: 80%;
    padding: 2rem 2.5rem;

      & label {
        font-size: 14px;
    }
  }

  @media (max-width: 360px) {
    padding: 2rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 12px;
  padding: 0 0.5rem;

  @media (max-width: 450px) {
    padding: 0 0.25rem 0.25rem 0.25rem;
  }
`;

const Title = styled.h1`
  background: ${({ theme }) => theme.colors.gradientText};
  font-weight: bold;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  transform-origin: center;
  margin-top: 0;
  margin-bottom: 1.2rem;
  animation: wavePerspective 3.5s ease-in-out infinite;

  @keyframes wavePerspective {
    0% {
      transform: perspective(400px) rotateY(6deg) skewX(2deg) scale(1);
    }
    25% {
      transform: perspective(400px) rotateY(3deg) skewX(-1deg) scale(1.02);
    }
    50% {
      transform: perspective(400px) rotateY(-6deg) skewX(-2deg) scale(1);
    }
    75% {
      transform: perspective(400px) rotateY(-3deg) skewX(1deg) scale(1.02);
    }
    100% {
      transform: perspective(400px) rotateY(6deg) skewX(2deg) scale(1);
    }
  }
`;

const Arrow = styled.span`
  margin-right: 8px;
  font-size: 18px;
  font-weight: 500;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  transform: scaleX(0.5);
`;

const BackLink = styled.div` 
  color: ${({ theme }) => theme.colors.textNeutral};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  gap:4px;
  margin: 0;
  padding-top: 36px;
  padding-bottom: 12px;
  max-width: 400px;

  a {
    color: ${({ theme }) => theme.colors.textNeutral};
    font-weight: 500;
    padding: 0;
    margin: 0;

  }

  @media (max-width: 450px) {
    max-width: 80%;
  }
`;

const SubmitButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.textOrange};
  color: ${({ theme }) => theme.colors.textOrange};
  transition: 0.5s ease-in-out;
  background-color: transparent;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin-top: 8px;
  border-radius: 20px;
  width: 150px;
  font-size: 12px;
  font-weight: 500;

  &:hover {
    transform: scale(0.95);
    transition: 0.5s ease-in-out;
  }
`;

const FooterContainer = styled.div`
  width: 100%;
  height: auto;
`;

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(globalThis.location.search);
    const tokenFromURL = params.get("token");
    if (tokenFromURL) {
      setToken(tokenFromURL);
      localStorage.setItem("resetToken", tokenFromURL);
    } else {
      toast.error("Token inválido o ausente.");
      router.push("/auth");
      console.log(tokenFromURL);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    if (password.length < 8) {
      toast.error("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

    if (!token) {
      toast.error("Token inválido.");
      return;
    }

    try {
      const response = await postSetNewPassword(token, password);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al actualizar la contraseña: ${errorText}`);
      }

      toast.success("Contraseña actualizada con éxito.");
      router.push("/auth");
    } catch (error) {
      let errorMessage = "Ocurrió un error desconocido";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      toast.error(errorMessage);
    }
  };

  return (
    <PageContainer>
      <PageSideBanner $urlImage="/img/bg-banner.webp" />
      <PageContent>
        <FormContainer>
          <BackLink onClick={() => handlePageTheme("INICIAR SESIÓN")}>
            <Arrow>&lt;</Arrow> VOLVER A <NavLink hover={{ fontWeight: '700', transition: '0.4s' }} href="/auth" label="AUTH"></NavLink><Arrow>&gt;</Arrow>
          </BackLink>
          <FormWrapper>
            <Title>SkillSwap</Title>
            <Form onSubmit={handleSubmit}>
              <label htmlFor="new-password">Contraseña nueva</label>
              <Input
                type="password"
                id="new-password"
                name="new-password"
                placeholder="Escribe tu clave nueva..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="confirm-password">Confirmar contraseña</label>
              <Input
                type="password"
                id="confirm-password"
                name="confirm-password"
                placeholder="Escribe tu clave de nuevo..."
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <SubmitButton aria-label="Submit Button" type="submit">RESTAURAR</SubmitButton>
            </Form>
          </FormWrapper>
        </FormContainer>
        <FooterContainer>
          <FooterMain />
        </FooterContainer>
      </PageContent>
    </PageContainer>
  );
}

export default ResetPassword;
