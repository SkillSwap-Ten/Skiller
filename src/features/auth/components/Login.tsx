"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/src/features/auth/authSlice";
import { IUserAuthResponse, IUserLoginRequest } from "../../../core/dto/auth/auth.dto"
import { handlePageTheme } from "@/src/lib/utils/themeHandler";
import { toast } from "react-toastify";
import { RootState } from '../../../lib/store';
import { AppDispatch } from "@/src/lib/store";
import { ILoginPageProps } from "@/src/features/auth/types/auth.type";
import InputAuth from "../../../shared/ui/atoms/inputs/InputAuth";
import ButtonAuth from "../../../shared/ui/atoms/buttons/ButtonAuth";
import Label from "../../../shared/ui/atoms/labels/LabelAuth";
import NavLink from "../../../shared/ui/atoms/links/NavLinks";
import styled from 'styled-components';

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
  justify-content: start;
  background-color: transparent;
  border: none;
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textWhite};
  text-decoration: none;
  gap:4px;
  margin: 0;
  padding-bottom: 5px;

  a {
    padding: 0 !important;
    margin: 0 !important;
    font-weight: 500;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end !important;
  margin: 0;
  border: none !important;

  @media (max-width: 1070px) {
    flex-direction: column;
    align-items: center; 
    justify-content: center; 
  }
`;

const FormWrapper = styled.div`
  background: ${({ theme }) => theme.colors.gradientPrimary};
  border-top: 1px solid ${({ theme }) => theme.colors.borderAuthLeft};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderAuthLeft};
  border-left: 1px solid ${({ theme }) => theme.colors.borderAuthLeft};
  border-bottom-left-radius:15px ;
  transition: 1s ease-in-out;
  border-top-left-radius:15px ;
  padding: 50px;
  width: 60%;
  height: 450px;
  text-align: start;
  margin: 0;
  position: relative;

  @media (max-width: 1070px) {
    border-radius: none;
    border-radius: 15px; 
    border: 0;
    width: 300px;
    height: 460px !important;

    & form{
        display: flex;
        flex-direction: column;

        & :nth-child(5){
        display: flex;
        align-self: center !important;
      }
    }
  }
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.textWhite};
  font-size: 2rem;
  background: transparent;
  font-weight: 400;
  padding-bottom: 20px;
  margin: 0;

`;

const DivButtonLogin = styled.div`
  position: absolute;
  bottom: 3.2rem;
  display: flex;
  gap: 20px;
  border: none;

  @media (max-width: 1070px) { 
    width: inherit;
    display: flex;
    justify-content: center;
  }
`;

export default function LoginPage({ resetPasswordProp }: ILoginPageProps) {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);
  const [form, setForm] = useState<IUserLoginRequest>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { email, password } = form;

    if (!email || !password) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    const resultAction = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(resultAction)) {
      handleLoginSuccess(resultAction.payload);
    } else {
      toast.error("Error al intentar iniciar sesión.");
    }
  }

  const handleLoginSuccess = (payload: IUserAuthResponse) => {
    const token = payload?.data.response.token;
    const role = payload?.data.response.role;
    const userId = payload?.data.response.id;

    if (token) {
      toast.success("¡Inicio de sesión exitoso!");

      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", role.toString());
      localStorage.setItem("userId", userId.toString());
      document.cookie = `authToken=${token}; path=/;`;
      document.cookie = `userRole=${role}; path=/;`;

      if (role === 1) {
        router.push("/admin");
      } else if (role === 2) {
        router.push("/user");
      } else {
        toast.error("Rol no reconocido.");
      }
    }
  };

  return (
    <Container>
      <FormWrapper>
        <BackLink onClick={() => handlePageTheme("INICIO")}>
          <Arrow>&lt;</Arrow> VOLVER A <NavLink hover={{ fontWeight: '700', transition: '0.4s'}} href="/" label="INICIO"></NavLink>
        </BackLink>
        <Title>Iniciar Sesión</Title>
        <form onSubmit={handleSubmit}>
          <Label text="Email" htmlFor="email-login" />
          <InputAuth
            type="email"
            id="email-login"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
          <Label text="Contraseña" htmlFor="password-login" />
          <InputAuth
            type="password"
            id="password-login"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
          <DivButtonLogin>
            <ButtonAuth type="submit" disabled={loading} onClick={() => handlePageTheme('INICIO')}>
              {loading ? "Cargando..." : "ENTRAR"}
            </ButtonAuth>
          </DivButtonLogin>

          {/* Botón estilizado de "Olvidaste tu contraseña" */}
          {resetPasswordProp}
        </form>
      </FormWrapper>
    </Container>
  );
}
