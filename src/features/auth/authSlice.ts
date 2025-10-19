import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IAuthState } from "@/src/core/models/auth/auth.model";
import { IUserLoginRequest, IUserAuthResponse, IUserRegisterRequest, IUserAuthError } from "@/src/core/dto/auth/auth.dto";
import { clearStorage } from "@/src/lib/utils/storageCleaner";

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL as string;

// Estado inicial
const initialState: IAuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Acción asíncrona para iniciar sesión
export const loginUser = createAsyncThunk<IUserAuthResponse, IUserLoginRequest>(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      localStorage.removeItem("authToken");
      const response = await fetch(`${BASE_API_URL}/Auth/PostAuthLogin`, {
        method: "POST",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData: IUserAuthError = await response.json();
        return rejectWithValue(errorData.error?.message || "An error occurred");
      }

      const data: IUserAuthResponse = await response.json();
      return data;
    } catch (error) {
      // Aseguramos que sea un error de tipo conocido
      const errMsg =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred during authentication";
      return rejectWithValue(errMsg);
    }
  }
);

// Acción asíncrona para registro
export const registerUser = createAsyncThunk<IUserAuthResponse, IUserRegisterRequest>(
  "auth/registerUser",
  async (newUser, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_API_URL}/UsersPost/PostUserCreate`, {
        method: "POST",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      // Manejo de errores HTTP
      if (!response.ok) {
        const errorData: IUserAuthError = await response.json();
        return rejectWithValue(errorData.error?.message || "An error occurred during registration");
      }

      // Usuario creado correctamente
      const data: IUserAuthResponse = await response.json();
      return data;
    } catch (error) {
      // Manejo de errores inesperados
      const errMsg =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred during registration";
      return rejectWithValue(errMsg);
    }
  }
);

// Slice de Redux
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      clearStorage();
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<IUserAuthResponse>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem("authToken", action.payload.data.response.token);
        localStorage.setItem("userId", action.payload.data.response.id.toString());
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<IUserAuthResponse>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

// Exporta las acciones y el reducer
export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;