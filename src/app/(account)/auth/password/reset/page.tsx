"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { postSetNewPassword } from "@/src/app/api/auth/auth";
import { FooterMain } from '@/src/shared/ui/organisms/footer/FooterMain';
import { handlePageTheme } from "@/src/lib/utils/themeHandler";
import { toast } from "react-toastify";
import styled from "styled-components";
import NavLink from "@/src/shared/ui/atoms/links/NavLinks";

// Styled Components para el formulario
const PageContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.bgTertiary};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const PageSideBanner = styled.div<{ urlImage: string }>`
  background-image: url(${(props) => props.urlImage});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 50%;

  @media (max-width: 950px) {
    display: none;
  }
`;

const PageContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 50%;

  & div {
    width: 100%;
  }

  @media (max-width: 950px) {
    width: 100%;
  }
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const FormWrapper = styled.div`
  padding: 2rem;
  background: #fff;
  border-radius: 10px;
  border: 1px solid #00000033;
  text-align: center;
  width: 100%;
  max-width: 400px;

  @media (min-width: 950px) {
    text-align: start;
  }

  @media (max-width: 450px) {
    max-width: 80%;
  }
`;

const Title = styled.h1`
  background: ${({ theme }) => theme.colors.gradientText};
  font-weight: bold;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  margin-top: 0;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.7rem;
  margin-top: 0.5rem;
  margin-bottom: 1.2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;

    @media (max-width: 450px) {
    padding: 0.6rem 0.7rem;
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
  opacity: 0.6;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  padding-top: 3rem;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textBlack};
  text-decoration: none;
  gap:4px;
  margin: 0;
  padding-bottom: 5px;
  max-width: 400px;

  @media (max-width: 450px) {
    max-width: 80%;
  }

  a {
    color: ${({ theme }) => theme.colors.textBlack};
    padding: 0 !important;
    margin: 0 !important;
    font-weight: 500;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  background-color: #222;
  color: ${({ theme }) => theme.colors.textWhite};
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1rem;

  &:hover {
    background-color: #000;
  }
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
      <PageSideBanner urlImage="/img/bg-banner.webp" />
      <PageContent>
        <FormContainer>
          <BackLink onClick={() => handlePageTheme("INICIAR SESIÓN")}>
            <Arrow>&lt;</Arrow> VOLVER A <NavLink hover={{ fontWeight: '700', transition: '0.4s' }} href="/auth" label="AUTH"></NavLink><Arrow>&gt;</Arrow>
          </BackLink>
          <FormWrapper>
            <Title>SkillSwap</Title>
            <form onSubmit={handleSubmit}>
              <label htmlFor="password">Crear nueva contraseña</label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="confirm-password">Confirmar nueva contraseña</label>
              <Input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <SubmitButton type="submit">ENVIAR</SubmitButton>
            </form>
          </FormWrapper>
        </FormContainer>
        <FooterMain />
      </PageContent>
    </PageContainer>
  );
}

export default ResetPassword;
