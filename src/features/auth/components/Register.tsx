'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../authSlice';
import { IUserAuthResponse, IUserRegisterRequest } from '@/src/core/dto/auth/auth.dto';
import { AppDispatch, RootState } from '../../../lib/store';
import { handlePageTheme } from '@/src/lib/utils/themeHandler';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import InputAuth from "../../../shared/ui/atoms/inputs/InputAuth";
import Label from "../../../shared/ui/atoms/labels/LabelAuth";
import Select from "../../../shared/ui/atoms/selects/SelectAuth";
import TextArea from "../../../shared/ui/atoms/textareas/TextAreaAuth";
import ButtonAuth from '../../../shared/ui/atoms/buttons/ButtonAuth';
import NavLink from '../../../shared/ui/atoms/links/NavLinks';
import Indicator from '../../../shared/ui/molecules/indicators/Indicator';
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & div{
    transition: 1s ease-in-out;
    animation: appear-form 0.75s ease-in-out;
    
    @keyframes appear-form {
        from {
            opacity: 0;
            translate: 1rem;
        }
        to {
            opacity: 1;
            translate: 0;
        }
    }
  }

  @media (max-width: 768px) {
    gap: 0.3rem;
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

const DivUserData = styled.div`
  width: 100%;
  height: inherit;
  text-align: start;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 768px) {
    padding: 0;
  }
`;

const DivUserInput = styled.div`
  sub {
    opacity: 0.7;
    color: ${({ theme }) => theme.colors.textWhite};
  }
`;

const DivUserTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const DivButtonSignUp = styled.div`
  position: absolute;
  bottom: 50px;
  display: flex;
  gap: 20px;
  transition: 1s ease-in-out;

  & .backBtn{
    transform: scale(0.85);
    opacity: 0.8;
    animation: appear-back-btn 1s ease;

    @keyframes appear-back-btn{
      from {
        transform: scale(0.01)
      }
      to {
        transform: scale(0.9);
      }
    }
  }

  @media (max-width: 1200px) {
    position: static;
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
  }
`;

const ErrorText = styled.p`
  color: #222;
`;

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [skills, setSkills] = useState<string>("");
  const [currentStep, setCurrentStep] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [form, setForm] = useState<IUserRegisterRequest>({
    email: "",
    password: "",
    name: "",
    lastName: "",
    birthdate: undefined,
    description: "",
    jobTitle: "",
    urlLinkedin: "",
    urlGithub: "",
    urlBehance: "",
    urlImage: "",
    phoneNumber: "",
    category: "",
    abilities: "",
  });

  // Manejar el select
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setSelectedOption(value);
    setForm({
      ...form,
      [name]: value,
    });
  };

  // Manejar el textarea
  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setSkills(value);
    setForm({
      ...form,
      [name]: value,
    });
  };

  // Manejar cambios en los inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "birthdate") {
      setForm((prevForm: IUserRegisterRequest) => ({
        ...prevForm,
        birthdate: value ? new Date(value) : undefined,
      }));
    } else {
      setForm((prevForm: IUserRegisterRequest) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  // Convierte una fecha a formato YYYY-MM-DD
  const formatDate = (date: Date | undefined | string) => {
    if (!date) return undefined;

    if (typeof date === 'string') {
      return date;
    }

    return date.toISOString().split('T')[0];
  };

  // Renderizar el input actual basado en la vista
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <DivUserInput>
            <BackLink onClick={() => handlePageTheme('INICIO')}>
              <Arrow>&lt;</Arrow> VOLVER A <NavLink hover={{ fontWeight: '700', transition: '0.4s'}} href="/" label="INICIO"></NavLink>
            </BackLink>
            <Title>Registro</Title>
            <Label text="Email *" htmlFor='email' />
            <InputAuth
              type="email"
              id="email"
              name="email"
              placeholder="Escribe tu email..."
              value={form.email}
              onChange={handleInputChange}
              required
              autoComplete="email"
            />
            <Label text="Contraseña *" htmlFor='password' />
            <InputAuth
              type="password"
              id="password"
              name="password"
              placeholder="Escribe tu contraseña..."
              value={form.password}
              onChange={handleInputChange}
              required
              autoComplete="new-password"
            />
            <sub>Los campos con (*) son requeridos.</sub>
          </DivUserInput>
        );
      case 1:
        return (
          <DivUserData>
            <Indicator currentStep={currentStep} />
            <DivUserTitle>
              <Title>Datos</Title>
            </DivUserTitle>
            <DivUserInput>
              <Label htmlFor="name" text="Nombre *" />
              <InputAuth
                type="text"
                id="name"
                name="name"
                placeholder="Escribe tu nombre..."
                value={form.name}
                onChange={handleInputChange}
                required
                autoComplete="given-name"
              />
            </DivUserInput>
            <DivUserInput>
              <Label htmlFor="lastName" text="Apellidos *" />
              <InputAuth
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Escribe tus apellidos..."
                value={form.lastName}
                onChange={handleInputChange}
                required
                autoComplete="family-name"
              />
            </DivUserInput>
          </DivUserData>
        );
      case 2:
        return (
          <DivUserData>
            <Indicator currentStep={currentStep} />
            <DivUserTitle>
              <Title>Datos</Title>
            </DivUserTitle>
            <DivUserInput>
              <Label htmlFor="birthdate" text="Fecha de nacimiento *" />
              <InputAuth
                type="date"
                id="birthdate"
                name="birthdate"
                placeholder="Escribe tu fecha de nacimiento..."
                value={form.birthdate ? formatDate(form.birthdate) : ""}
                onChange={handleInputChange}
                required
                autoComplete="birthdate"
              />
            </DivUserInput>
            <DivUserInput>
              <Label htmlFor="urlImage" text="Foto de Perfil *" />
              <InputAuth
                type="text"
                id="urlImage"
                name="urlImage"
                placeholder="https://..."
                value={form.urlImage}
                onChange={handleInputChange}
                required
                autoComplete="url-image"
              />
            </DivUserInput>
          </DivUserData>
        );
      case 3:
        return (
          <DivUserData>
            <Indicator currentStep={currentStep} />
            <DivUserTitle>
              <Title>Habilidades</Title>
            </DivUserTitle>
            <DivUserInput>
              <Label htmlFor="category" text="Comunidad *" />
              <Select
                title='category'
                id="category"
                value={selectedOption}
                onChange={handleSelectChange}
                ariaLabel="Select area"
                name="category"
                required
                autoComplete="category"
              />
            </DivUserInput>
            <DivUserInput>
              <Label htmlFor="abilities" text="Skills *" />
              <TextArea
                id="abilities"
                title="abilities"
                value={skills}
                onChange={handleTextAreaChange}
                ariaLabel="Escribe tus habilidades"
                name="abilities"
                placeholder="Escribe aquí tus habilidades separadas por coma (máx. 200 caracteres) ..."
                required
                maxLength={200}
                autoComplete="abilities"
              />
              <sub>{skills.length} / 200 caracteres</sub>
            </DivUserInput>
          </DivUserData>
        );
      case 4:
        return (
          <DivUserData>
            <Indicator currentStep={currentStep} />
            <DivUserTitle>
              <Title>Experiencia</Title>
            </DivUserTitle>
            <DivUserInput>
              <Label htmlFor="jobTitle" text="Trabajo/título *" />
              <InputAuth
                type="text"
                id="jobTitle"
                name="jobTitle"
                placeholder="Título de tu trabajo..."
                value={form.jobTitle}
                onChange={handleInputChange}
                required
                autoComplete="organization-title"
              />
            </DivUserInput>
            <DivUserInput>
              <Label htmlFor="description" text="Descripción *" />
              <TextArea
                id="description"
                title="description"
                value={form.description}
                onChange={handleTextAreaChange}
                ariaLabel="Escribe tus habilidades"
                name="description"
                placeholder="Describe tu experiencia profesional o académica..."
                required
                maxLength={500}
                autoComplete="description"
              />
              <sub>{form.description.length} / 500 caracteres</sub>
            </DivUserInput>
          </DivUserData>
        );
      case 5:
        return (
          <DivUserData>
            <Indicator currentStep={currentStep} />
            <DivUserTitle>
              <Title>Contacto</Title>
            </DivUserTitle>
            <DivUserInput>
              <Label htmlFor="phoneNumber" text="Teléfono" />
              <InputAuth
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Escribe tu número de teléfono..."
                value={form.phoneNumber || ""}
                onChange={handleInputChange}
                autoComplete="phone-number"
              />
            </DivUserInput>
            <DivUserInput>
              <Label htmlFor="urlLinkedin" text="LinkedIn" />
              <InputAuth
                type="text"
                id="urlLinkedin"
                name="urlLinkedin"
                placeholder="https://linkedin.com/in/..."
                value={form.urlLinkedin || ""}
                onChange={handleInputChange}
                autoComplete="url"
              />
            </DivUserInput>
          </DivUserData>
        );
      case 6:
        return (
          <DivUserData>
            <Indicator currentStep={currentStep} />
            <DivUserTitle>
              <Title>Contacto</Title>
            </DivUserTitle>
            <DivUserInput>
              <Label htmlFor="urlBehance" text="Behance" />
              <InputAuth
                type="text"
                id="urlBehance"
                name="urlBehance"
                placeholder="https://behance.net/..."
                value={form.urlBehance || ""}
                onChange={handleInputChange}
                autoComplete="url"
              />
            </DivUserInput>
            <DivUserInput>
              <Label htmlFor="urlGithub" text="GitHub" />
              <InputAuth
                type="text"
                id="urlGithub"
                name="urlGithub"
                placeholder="https://github.com/..."
                value={form.urlGithub || ""}
                onChange={handleInputChange}
                autoComplete="url"
              />
            </DivUserInput>
          </DivUserData>
        );
      default:
        return null;
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<boolean> => {
    e.preventDefault();

    if (currentStep < 6) {
      return false;
    }

    // Validación básica de campos
    const requiredFields: (keyof IUserRegisterRequest)[] = [
      "email", "password", "name", "lastName", "urlImage",
      "description", "jobTitle", "category", "abilities", "birthdate"
    ];

    const missing = requiredFields.some(field => !form[field]);
    if (missing) {
      toast.error("Por favor, completa todos los campos requeridos.");
      setHasError(true);
      setCurrentStep(0);
      return false;
    }

    try {
      const formToSend = {
        ...form,
        birthdate: formatDate(form.birthdate),
      };

      const resultAction = await dispatch(registerUser(formToSend)).unwrap();
      handleRegisterSuccess(resultAction);
      return true;

    } catch (error) {
      console.error(error);
      toast.error("Registro fallido. Inténtalo de nuevo.");
      setHasError(true);
      return false;
    }
  };

  const handleRegisterSuccess = (payload: IUserAuthResponse) => {
    const token = payload?.data.response.token;
    const role = payload?.data.response.role;
    const userId = payload?.data.response.id;

    if (token) {
      toast.success("¡Registro exitoso!");

      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", role.toString());
      localStorage.setItem("userId", userId.toString());
      document.cookie = `authToken=${token}; path=/;`;
      document.cookie = `userRole=${role}; path=/;`;

      if (role === 2) {
        router.push("/user");
      } else {
        toast.error("Rol no reconocido.");
      }
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Form onSubmit={handleSubmit}>
          {renderStep()}
          <DivButtonLogin />
          <DivButtonSignUp>
            {currentStep > 0 && (
              <ButtonAuth
                className="backBtn"
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                ATRÁS
              </ButtonAuth>
            )}
            {currentStep < 6 ? (
              <ButtonAuth
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
              >
                SIGUIENTE
              </ButtonAuth>
            ) : (
              loading ? (
                <ButtonAuth type="submit" disabled={loading}>
                  Registrando...
                </ButtonAuth>
              ) : (
                <ButtonAuth type="submit" onClick={() => setCurrentStep(currentStep)}>
                  ENVIAR
                </ButtonAuth>
              )
            )}
          </DivButtonSignUp>
        </Form>
        {hasError && error && <ErrorText>{error}</ErrorText>}
      </FormWrapper>
    </Container>
  );
}
