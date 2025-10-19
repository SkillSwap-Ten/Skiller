import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IReport, IReportsState } from "@/src/core/models/reports/reports.model";

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL as string;

// Estado inicial
const initialState: IReportsState = {
  reports: [],
  loading: false,
  error: null,
};

// Acción asíncrona para obtener reportes
export const fetchReports = createAsyncThunk<IReport[], void, { rejectValue: string }>(
  "reports/fetchReports",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_API_URL}/ReportGet/GetReportsAll`);
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData)
        return rejectWithValue(errorData.message);
      }

      const data = await response.json();
      const reports = data.data.response.map((report: IReport): IReport => ({
        id: report.id,
        titleReport: report.titleReport,
        description: report.description,
        dateReport: report.dateReport,
        actionTaken: report.actionTaken,
        actionDetails: report.actionDetails,
        idActionTaken: report.idActionTaken,
        idState: report.idState,
        idUser: report.idUser,
        idReportedUser: report.idReportedUser,
        state: report.state,
        user: report.user,
        reportedUser: report.reportedUser
      }));

      return reports;
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);

// Slice de Redux
const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    createReport: (state, action: PayloadAction<IReport>) => {
      const newReport: IReport = {
        id: Date.now(),
        titleReport: action.payload.titleReport,
        description: action.payload.description,
        dateReport: new Date(),
        actionTaken: action.payload.actionTaken,
        actionDetails: action.payload.actionDetails,
        idActionTaken: action.payload.idActionTaken,
        state: "pendiente",
        idState: 1,
        idUser: action.payload.idUser,
        idReportedUser: action.payload.idReportedUser,
      };

      state.reports.push(newReport);
    },

    updateReport: (state, action: PayloadAction<IReport>) => {
      const updatedReport = action.payload;
      const index = state.reports.findIndex((report) => report.id === updatedReport.id);

      if (index !== -1) {
        state.reports[index] = updatedReport;
      }
    },

    deleteReport: (state, action: PayloadAction<number>) => {
      state.reports = state.reports.filter((report) => report.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReports.fulfilled, (state, action: PayloadAction<IReport[]>) => {
        state.loading = false;
        state.reports = action.payload;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

// Exporta las acciones y el reducer
export const { createReport, updateReport, deleteReport } = reportsSlice.actions;
export default reportsSlice.reducer;
