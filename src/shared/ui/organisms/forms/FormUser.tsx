"use client";
import React, { useEffect, useMemo, useState } from "react";
import { IUserFormProps } from "@/src/shared/types/organisms/form.type";
import { IUser } from "../../../../core/models/users/users.model";
import { getAllSkills } from "@/src/lib/utils/getStaticData";
import { useDebouncedCallback } from "@/src/shared/hooks/useDebouncedState";
import styled from "styled-components";
import Label from "../../atoms/labels/Label";
import TextArea from "../../atoms/textareas/TextArea";
import Input from "../../atoms/inputs/Input";
import Select from "../../molecules/selects/Select";
import SelectSkills from "../../molecules/selects/SelectSkills";

//Formulario
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  & article{
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1.5rem;
  }
`;

const Div = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.5rem;

  & label{
    align-self: start;
  }

  & sub {
    opacity: 0.7;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  border-radius: 10px;
  border: 1px #222 solid;
  color: #222;
  cursor: pointer;
  background: none;
  padding: 5px 10px;
  transition: 0.4s ease;

  &:hover {
    transition: 0.4s ease;
    background-color: grey;
    color: ${({ theme }) => theme.colors.textWhite};
    border: none
  }
`;

const DivButton = styled.div`
  display: flex;
  justify-content: end;
  gap: 1rem;
`;

//Contenedor global
const DivContent = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content : center;
  gap: 50px;
`;
const FormUser: React.FC<IUserFormProps> = ({ onUpdateData, dataToEdit, onClose, setDataToEdit }) => {
  const allSkills = getAllSkills();
  const initialFormState = useMemo<IUser>(() => ({
    id: dataToEdit?.id ?? 0,
    name: dataToEdit?.name ?? "",
    lastName: dataToEdit?.lastName ?? "",
    abilities: dataToEdit?.abilities ?? "",
    category: dataToEdit?.category ?? "",
    email: dataToEdit?.email ?? "",
    password: dataToEdit?.password ?? "",
    urlImage: dataToEdit?.urlImage ?? "",
    birthdate: dataToEdit?.birthdate ?? "",
    jobTitle: dataToEdit?.jobTitle ?? "",
    description: dataToEdit?.description ?? "",
    phoneNumber: dataToEdit?.phoneNumber ?? "",
    idStateUser: dataToEdit?.idStateUser ?? 0,
    idRoleUser: dataToEdit?.idRoleUser ?? 0,
    suspensionDate: dataToEdit?.suspensionDate ?? null,
    reactivationDate: dataToEdit?.reactivationDate ?? null,
    urlLinkedin: dataToEdit?.urlLinkedin ?? "",
    urlGithub: dataToEdit?.urlGithub ?? "",
    urlBehance: dataToEdit?.urlBehance ?? "",
  }), [dataToEdit]);

  const [form, setForm] = useState<IUser>(initialFormState);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (dataToEdit) {
      setForm({
        ...dataToEdit,
        suspensionDate: dataToEdit.suspensionDate ?? null,
        reactivationDate: dataToEdit.reactivationDate ?? null,
      });
    } else {
      setForm(initialFormState);
    }
  }, [dataToEdit, initialFormState]);


  useEffect(() => {
    const base = dataToEdit || initialFormState;
    const changedFields = Object.keys(form).filter(
      (key) => form[key as keyof IUser] !== base[key as keyof IUser]
    );

    const totalFields = Object.keys(base).length;
    setHasChanges(changedFields.length > 0 && changedFields.length < totalFields);
  }, [form, dataToEdit, initialFormState]);

  const handleChangeDebounced = useDebouncedCallback((value: string | number) => {
    console.log("Debounced value:", value);
  },
    500);

  const handleChange =
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({
        ...prev,
        [name]:
          name === "suspensionDate" || name === "reactivationDate"
            ? value || null
            : value,
      }));
      handleChangeDebounced(e.target.value);
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (dataToEdit) {
      const userToUpdate = { ...dataToEdit, ...form };
      if (form.password === dataToEdit.password) {
        delete userToUpdate.password; // No cambió la contraseña
      }
      onUpdateData(userToUpdate);
      onClose?.();
    }
  };

  const handleReset = () => {
    setForm(initialFormState);
    setDataToEdit(initialFormState);
  };

  const getButtonText = () => {
    if (hasChanges) return "Actualizar";
    return "Mantener";
  };

  return (
    <DivContent>
      <Form onSubmit={handleSubmit}>
        <Div>
          <Label htmlFor="name" text="Nombre del Usuario" />
          <Input placeholder="Nombre del Usuario" type="text" name="name" id="name" value={form.name} onChange={handleChange} required />
        </Div>

        <Div>
          <Label htmlFor="lastName" text="Apellidos del Usuario" />
          <Input placeholder="Apellidos del Usuario" type="text" name="lastName" id="lastName" value={form.lastName} onChange={handleChange} required />
        </Div>

        <Div>
          <Label htmlFor="birthdate" text="Fecha de Nacimiento" />
          <Input type="date" name="birthdate" id="birthdate" value={form.birthdate ?? ""} onChange={handleChange} />
        </Div>

        <Div>
          <Label htmlFor="email" text="Correo Electrónico" />
          <Input placeholder="example@correo.com" type="email" name="email" id="email" value={form.email} onChange={handleChange} required />
        </Div>

        <Div>
          <Label htmlFor="password" text="Contraseña" />
          <Input placeholder="..." type="password" name="password" id="password" value={form.password} onChange={handleChange} required />
        </Div>

        <Div>
          <Label htmlFor="phoneNumber" text="Teléfono" />
          <Input placeholder="+57..." type="tel" name="phoneNumber" id="phoneNumber" value={form.phoneNumber} onChange={handleChange} />
        </Div>

        <Div>
          <Label htmlFor="jobTitle" text="Cargo / Rol Profesional" />
          <Input placeholder="Cargo / Rol Profesional" type="text" name="jobTitle" id="jobTitle" value={form.jobTitle} onChange={handleChange} />
        </Div>

        <Div>
          <Label htmlFor="description" text="Descripción o Biografía" />
          <TextArea ariaLabel="description" title="description" maxLength={300} name="description" id="description" value={form.description!} onChange={handleChange} />
          <sub>{form.description!.length} / 300 caracteres.</sub>
        </Div>

        <Div>
          <Label htmlFor="abilities" text="Habilidades" />
          <SelectSkills ariaLabel="abilities" id="abilities" title="abilities" name="abilities" allSkills={allSkills} value={form.abilities || ""} onChange={handleChange} />
          <sub>{form.abilities!.split(',').filter(s => s.trim()).length} habilidades seleccionadas.</sub>
        </Div>

        <Div>
          <Label htmlFor="category" text="Comunidad" />
          <Select title="category" name="category" ariaLabel="category" id="category" value={form.category! || ""} onChange={handleChange}>
            <option value="" disabled>Selecciona una opción...</option>
            <option value="Desarrollo">Desarrollo</option>
            <option value="Marketing">Marketing</option>
            <option value="Comunicación">Comunicación</option>
            <option value="Diseño">Diseño</option>
            <option value="Entretenimiento">Entretenimiento</option>
          </Select>
        </Div>

        <Div>
          <Label htmlFor="suspensionDate" text="Fecha de Suspensión" />
          <Input type="date" name="suspensionDate" id="suspensionDate" value={form.suspensionDate ?? ""} readOnly />
        </Div>

        <Div>
          <Label htmlFor="reactivationDate" text="Fecha de Reactivación" />
          <Input type="date" name="reactivationDate" id="reactivationDate" value={form.reactivationDate ?? ""} readOnly />
        </Div>

        <Div>
          <Label htmlFor="urlImage" text="URL de Imagen" />
          <Input type="url" name="urlImage" id="urlImage" placeholder="https://..." value={form.urlImage} onChange={handleChange} />
        </Div>

        <Div>
          <Label htmlFor="urlLinkedin" text="URL de LinkedIn" />
          <Input type="url" name="urlLinkedin" id="urlLinkedin" placeholder="https://linkedin.com/in/..." value={form.urlLinkedin} onChange={handleChange} />
        </Div>

        <Div>
          <Label htmlFor="urlGithub" text="URL de GitHub" />
          <Input type="url" name="urlGithub" id="urlGithub" placeholder="https://github.com/..." value={form.urlGithub} onChange={handleChange} />
        </Div>

        <Div>
          <Label htmlFor="urlBehance" text="URL de Behance" />
          <Input type="url" name="urlBehance" id="urlBehance" placeholder="https://behance.net/..." value={form.urlBehance} onChange={handleChange} />
        </Div>

        <DivButton>
          <Button aria-label="Control Button" type="submit">{getButtonText()}</Button>
          <Button aria-label="Control Button" type="button" onClick={handleReset}>
            Limpiar
          </Button>
        </DivButton>
      </Form>
    </DivContent>
  );
};

export default FormUser;
