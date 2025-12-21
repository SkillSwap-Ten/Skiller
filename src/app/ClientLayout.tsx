'use client';
import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { usePathname, useRouter } from 'next/navigation';
import { isValidToken } from "../lib/utils/tokenValidator";
import { Navbar } from "../shared/ui/organisms/navbar/NavbarOffline";
import { Bottombar } from "../shared/ui/molecules/bottombar/Bottombar";
import { clearStorage } from "../lib/utils/storageCleaner";
import { getAuthData } from "../lib/utils/getAuthData";
import { useTheme } from "../shared/hooks/useTheme";
import { useThemeAuth } from "../shared/hooks/useThemeAuth";
import { IGlobalTheme } from "../shared/types/styles/theme.type";
import { GlobalStyle } from "../shared/styles/GlobalStyling";
import LoadingScreen from "../shared/ui/screens/LoadingScreen";

const LayoutContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 0;
    padding: 0;
`;

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const pathname = usePathname();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [theme] = useTheme();
    const [themeAuth] = useThemeAuth();
    const [definedTheme, setDefinedTheme] = useState<IGlobalTheme | null>(null);
    const [isAuthRoute, setIsAuthRoute] = useState(false);

    // Effect exclusivo para detectar rutas /auth
    useEffect(() => {
        setIsAuthRoute(pathname.startsWith('/auth'));
    }, [pathname]);

    // Effect con toda la lógica de token / loading / prefetch
    useEffect(() => {
        // Validar token inmediatamente al montar
        const storedToken = globalThis.window === undefined ? null : getAuthData("token");

        if (storedToken) {
            try {
                if (!isValidToken(storedToken)) {
                    clearStorage();
                }
            } catch (e) {
                console.warn("Error al validar token:", e);
            }
        }

        // Validación periódica (cada 5 minutos)
        const interval = setInterval(() => {
            const tokenCheck = globalThis.window === undefined ? null : getAuthData("token");
            if (tokenCheck) {
                try {
                    if (!isValidToken(tokenCheck)) {
                        clearStorage();
                    }
                } catch (e) {
                    console.warn("Error al validar token:", e);
                }
            }
        }, 5 * 60 * 1000);

        // Prefetch y animación de carga
        router.prefetch(pathname);
        setLoading(true);
        const timeout = setTimeout(() => setLoading(false), 3000);

        // Limpiar cuando el componente se desmonta
        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [pathname, router]);

    // Effect para aplicar el tema correcto
    useEffect(() => {
        // Aplicar tema según la ruta actual
        const themeToUse = isAuthRoute ? themeAuth : theme;
        setDefinedTheme(themeToUse);
    }, [themeAuth, theme, isAuthRoute]);

    if (loading) return <LoadingScreen />;
    if (!definedTheme) return null;

    return (
        <ThemeProvider theme={definedTheme}>
            <GlobalStyle />
            <LayoutContainer>
                {!isAuthRoute && <Navbar />}
                {children}
                {!isAuthRoute && <Bottombar />}
            </LayoutContainer>
        </ThemeProvider>
    );
};

export default ClientLayout;
