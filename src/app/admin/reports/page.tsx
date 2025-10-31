"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReports, updateReport, deleteReport } from "../../../features/reports/reportsSlice";
import { deleteReportById, putReportByAction } from "../../api/reports/reports";
import { AppDispatch, RootState } from "../../../lib/store";
import { IReport } from "../../../core/models/reports/reports.model";
import { toast } from "react-toastify";
import { FooterMain } from '@/src/shared/ui/organisms/footer/FooterMain';
import Table from "../../../shared/ui/organisms/tables/TableReports";
import styled from "styled-components";

//Container for page.tsx content
const Container = styled.div`
  width: 100%;
  margin: 54px 0;
  flex-direction: column;
  display: flex;
`;

//Container for the whole page.tsx
const PageContainer = styled.section`
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  display: flex;

  & h1 {
    margin: 0;
    height: min-content;
    translate: 0 1rem;
    font-size: 70px;
    opacity: 0.15;
    padding-left: 1rem;
  }

  & h3 {
    margin: 0;
    margin-bottom: 10px;
    width: 100%;
    font-weight: 500;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.textGrey};
  }

  & p {
    margin: 0;
    width: 100%;
    font-size: 0.9rem;
    font-weight: 400;
    text-align: justify;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  & strong{
    font-weight: bold;
  }
`;

//Container for INFO content
const PageContent = styled.div`
  padding: 1rem;
  padding-bottom: 0;
  width: 100%;
  max-width: 1000px;
  display: flex;
  align-items: start;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 769px) {
    padding-bottom: 0;
  }
`;

//Containers for banner
const Banner = styled.article`
  background-color: ${({ theme }) => theme.colors.bgTertiary};
  display: flex;
  padding: 1rem;
  justify-content: space-between;
  align-items: center;
  position: relative;
  border-radius: 10px;
  width: 100%;
  min-height: 120px;
`;

const BannerBody = styled.div`
  width: 1000px !important;
  display: flex;
  justify-content: space-between;
`;

const WidgetContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.borderDark};
  border-radius: 10px;
`

const DivInfo = styled.div`
  text-align: justify;
`;

//Containers for Widgets and Aside
const WidgetBody = styled.div`
  padding: 1.5rem 2rem;
  width: 100%;
  min-width: 220px;
  display: flex;
  flex-direction: column;
`;

const Reports: React.FC = () => {
  const { reports, loading, error } = useSelector((state: RootState) => state.reports);
  const [editedReport, setEditedReport] = useState<IReport | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  // Llamar a la acción asíncrona para obtener reportes
  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  // Actualizar reporte
  const handleUpdateReport = async (reportToUpdate: IReport) => {
    try {
      const responseUpdate = await putReportByAction(reportToUpdate);

      if (!responseUpdate.ok) {
        try {
          const errorData = await responseUpdate.json();
          console.error("Error actualizando reporte:", errorData.details?.text || 'No se proporcionaron detalles del error');
          toast.error("Error al actualizar el reporte.");
        } catch (jsonError) {
          console.error("Error al procesar la respuesta JSON:", jsonError);
          toast.error("Error al actualizar el reporte.");
        }
        return;
      }

      dispatch(updateReport(reportToUpdate));
      setEditedReport(null);
      toast.success("¡Reporte actualizado exitosamente!");
    } catch (error) {
      console.error("Error al actualizar el reporte:", error);
      toast.error("Error al actualizar el reporte.");
    }
  };

  // Eliminar reporte
  const handleDeleteReport = async (reportId: number) => {
    console.log("Intentando eliminar reporte con ID:", reportId);

    try {
      const responseDelete = await deleteReportById(reportId);

      if (!responseDelete.ok) {
        try {
          const errorData = await responseDelete.json();
          const errorMessage =
            errorData?.details?.text ||
            errorData?.message ||
            "Error desconocido al eliminar el reporte.";
          console.error("Error eliminando reporte:", errorMessage);
          toast.error(`Error: ${errorMessage}`);
        } catch (jsonError) {
          console.error("Error procesando respuesta JSON:", jsonError);
          toast.error("Error al eliminar el reporte (respuesta inválida).");
        }
        return;
      }

      dispatch(deleteReport(reportId));
      toast.success("¡Reporte eliminado exitosamente!");
    } catch (error) {
      console.error("Error eliminando reporte:", error);
      toast.error("Error de conexión o problema en el servidor.");
    }
  };

  return (
    <Container>
      <PageContainer>
        <PageContent>
          <Banner>
            <BannerBody>
              <h1>Admin</h1>
            </BannerBody>
          </Banner>

          <WidgetContainer>
            <WidgetBody>
              <h3>Gestor de reportes</h3>
              <article>
                <DivInfo>Aquí podrás resolver y tomar acción de los reportes realizados por usuarios de la plataforma. La acción tomada se aplicará al estado de cuenta del usuario reportado, por lo que debe ser alguna de las siguientes: <strong>1. Activo, 2. Inactivo</strong> o <strong>3. Suspendido</strong>. Los códigos de los estados de los reportes son: <strong> 1. Pendiente, 2. Revisión</strong> o <strong>3. Resuelto</strong>.</DivInfo>
              </article>
            </WidgetBody>
          </WidgetContainer>
          <Table
            data={reports}
            dataToEdit={editedReport}
            setDataToEdit={setEditedReport}
            onDeleteData={handleDeleteReport}
            onUpdateData={handleUpdateReport}
            loading={loading}
            error={error}
          />
        </PageContent>
      </PageContainer>
      <FooterMain />
    </Container>
  );
};

export default Reports;
