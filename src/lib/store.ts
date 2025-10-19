import { configureStore } from "@reduxjs/toolkit"; 
import authReducer from "@/src/features/auth/authSlice";
import usersReducer from "@/src/features/users/usersSlice";
import reportsReducer from "@/src/features/reports/reportsSlice"

const store = configureStore({
    reducer: {
        auth: authReducer, 
        users: usersReducer,
        reports: reportsReducer,
    },
});

// Define el tipo RootState basado en el store
export type RootState = ReturnType<typeof store.getState>;

// Define el tipo AppDispatch si es necesario
export type AppDispatch = typeof store.dispatch;

export default store;
