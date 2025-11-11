"use client";
import React, { FormEvent, MouseEvent, useState, useEffect, useMemo } from "react";
import { IAdminReportFormProps } from "@/src/shared/types/organisms/form.type";
import { IReport } from "../../../../core/models/reports/reports.model";
import { useDebouncedCallback } from "@/src/shared/hooks/useDebouncedState";
import styled from "styled-components";
import Label from "../../atoms/labels/Label";
import Select from "../../molecules/selects/Select";
import TextArea from "../../atoms/textareas/TextArea";
import Input from "../../atoms/inputs/Input";

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

  @media (max-width: 510px) {
    padding: 32px;
    padding-bottom: 0;
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

//Contenedor global
const DivContent = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content : center;
  gap: 50px;
`;

const AdminReportForm: React.FC<IAdminReportFormProps> = ({ onUpdateData, dataToEdit, setDataToEdit, onClose }) => {
  const initialFormState = useMemo<IReport>(() => ({
    id: dataToEdit?.id ?? 0,
    titleReport: dataToEdit?.titleReport ?? "",
    description: dataToEdit?.description ?? "",
    dateReport: dataToEdit?.dateReport ?? new Date(),
    idActionTaken: dataToEdit?.idActionTaken ?? 0,
    actionTaken: dataToEdit?.actionTaken ?? "",
    actionDetails: dataToEdit?.actionDetails ?? "",
    idState: dataToEdit?.idState ?? 0,
    state: dataToEdit?.state ?? "",
    idUser: dataToEdit?.idUser ?? 0,
    idReportedUser: dataToEdit?.idReportedUser ?? 0,
    user: dataToEdit?.user ?? "",
    reportedUser: dataToEdit?.reportedUser ?? "",
  }), [dataToEdit]);

  const [form, setForm] = useState<IReport>(initialFormState);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (dataToEdit) {
      setForm({
        ...dataToEdit,
        dateReport: dataToEdit.dateReport ?? null,
      });
    } else {
      setForm(initialFormState);
    }
  }, [dataToEdit, initialFormState]);


  useEffect(() => {
    const base = dataToEdit || initialFormState;
    const changedFields = Object.keys(form).filter(
      (key) => form[key as keyof IReport] !== base[key as keyof IReport]
    );

    const totalFields = Object.keys(base).length;
    setHasChanges(changedFields.length > 0 && changedFields.length < totalFields);
  }, [form, dataToEdit, initialFormState]);

  const handleChangeDebounced = useDebouncedCallback((value: string | number) => {
    console.log("Debounced value:", value);
  },
    500);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, selectedOptions } = e.target as HTMLSelectElement;

    // Obtenemos el texto visible del <option> seleccionado (si aplica)
    const selectedText =
      selectedOptions && selectedOptions.length > 0
        ? selectedOptions[0].text
        : "";

    // Actualizamos el form normalmente
    setForm((prev) => {
      let updatedForm = { ...prev, [name]: value };

      // Si cambia el select de acción tomada, también cambiamos el texto actionTaken
      if (name === "idActionTaken") {
        updatedForm = { ...updatedForm, actionTaken: selectedText };
      }

      // Si cambia el select de estado, también cambiamos el texto state
      if (name === "idState") {
        updatedForm = { ...updatedForm, state: selectedText };
      }

      return updatedForm;
    });
    handleChangeDebounced(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (dataToEdit) {
      const reportToUpdate = { id: dataToEdit.id, ...form };
      onUpdateData(reportToUpdate);
      handleReset(e);
      onClose?.();
    }
    onClose?.();
  };

  const handleReset = (
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setForm(initialFormState);
    setDataToEdit(initialFormState);
  };


  const formatDate = (date: Date | string) => {
    if (typeof date === 'string') {
      return date;
    }
    return date.toISOString().split('T')[0];
  };

  const getButtonText = () => {
    if (hasChanges) return "Actualizar";
    return "Mantener";
  };

  return (
    <DivContent>
      <Form onSubmit={handleSubmit}>
        <Div>
          <Label htmlFor="id" text="ID del Reporte" />
          <Input
            type="number"
            name="id"
            id="id"
            value={form.id}
            placeholder="ID del Reporte"
            readOnly
          />
        </Div>

        <Div>
          <Label htmlFor="titleReport" text="Título del Reporte" />
          <Input
            type="text"
            name="titleReport"
            id="titleReport"
            placeholder="Título del Reporte"
            value={form.titleReport}
            readOnly
          />
        </Div>

        <Div>
          <Label htmlFor="description" text="Descripción del Reporte" />
          <TextArea
            name="description"
            title="description"
            ariaLabel="description"
            id="description"
            placeholder="Descripción detallada..."
            value={form.description! || ""}
            readOnly
          />
        </Div>

        <Div>
          <Label htmlFor="dateReport" text="Fecha del Reporte" />
          <Input
            type="date"
            name="dateReport"
            id="dateReport"
            value={form.dateReport ? formatDate(form.dateReport) : ""}
            readOnly
          />
        </Div>

        <Div>
          <Label htmlFor="idActionTaken" text="Acción tomada" />
          <Select
            ariaLabel="idActionTaken"
            title="idActionTaken"
            name="idActionTaken"
            id="idActionTaken"
            onChange={handleChange}
            value={form.idActionTaken! || 0}
            required
          >
            <option value="">Selecciona una opción...</option>
            <option value={1}>Activo</option>
            <option value={2}>Inactivo</option>
            <option value={3}>Suspendido</option>
          </Select>
        </Div>

        <Div>
          <Label htmlFor="descriptionActionTaken" text="Descripción de Acción tomada" />
          <TextArea
            ariaLabel="descriptionActionTaken"
            name="descriptionActionTaken"
            title="descriptionActionTaken"
            id="descriptionActionTaken"
            placeholder="Descripción de Acción tomada"
            onChange={handleChange}
            value={form.actionDetails! || ""}
            maxLength={300}
          />
          <sub>{form.actionDetails!.length} / 300 caracteres.</sub>
        </Div>

        <Div>
          <Label htmlFor="idState" text="Estado del Reporte" />
          <Select
            ariaLabel="idState"
            title="idState"
            name="idState"
            id="idState"
            onChange={handleChange}
            value={form.idState! || ""}
            required
          >
            <option value="">Selecciona una opción...</option>
            <option value={1}>Pendiente</option>
            <option value={2}>Revisión</option>
            <option value={3}>Resuelto</option>
          </Select>
        </Div>

        <Div>
          <Label htmlFor="idUser" text="ID del Informante" />
          <Input
            type="number"
            name="idUser"
            id="idUser"
            value={form.idUser}
            placeholder="ID del Informante"
            readOnly
          />
        </Div>

        <Div>
          <Label htmlFor="user" text="Nombre del Informante" />
          <Input
            type="text"
            name="user"
            id="user"
            value={form.user}
            placeholder="Nombre del Informante"
            readOnly
          />
        </Div>

        <Div>
          <Label htmlFor="idReportedUser" text="ID del Reportado" />
          <Input
            type="number"
            name="idReportedUser"
            id="idReportedUser"
            value={form.idReportedUser}
            placeholder="ID del Reportado"
            readOnly
          />
        </Div>

        <Div>
          <Label htmlFor="reportedUser" text="Nombre del Reportado" />
          <Input
            type="text"
            name="reportedUser"
            id="reportedUser"
            value={form.reportedUser}
            placeholder="Nombre del Reportado"
            readOnly
          />
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

export default AdminReportForm;