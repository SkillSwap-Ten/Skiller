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
import ScreenLoading from "../shared/ui/screens/ScreenLoading";

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
    const [isOfflineRoute, setIsOfflineRoute] = useState(false);

    // Effect exclusivo para detectar rutas
    useEffect(() => {
        // Calculamos primero
        const authRoute = pathname.startsWith('/auth');
        const protectedRoutes = ['/user', '/admin'];
        const offlineRoute = !protectedRoutes.some(route => pathname.startsWith(route));

        // Actualizamos el estado de forma diferida
        setTimeout(() => {
            setIsAuthRoute(authRoute);
            setIsOfflineRoute(offlineRoute);
        }, 0);
    }, [pathname]);

    // Effect con toda la lógica de token / loading / prefetch
    useEffect(() => {
        const runEffect = async () => {
            // Activamos loading inmediatamente
            setLoading(true);

            // Validación de token
            if (typeof window !== 'undefined') {
                const token = getAuthData("token");
                if (token) {
                    try {
                        if (!isValidToken(token)) clearStorage();
                    } catch (e) {
                        console.warn("Error al validar token:", e);
                    }
                }
            }

            // Prefetch de la ruta
            router.prefetch(pathname);

            // Desactivar loading después de 3s
            setTimeout(() => setLoading(false), 3000);
        };

        runEffect();

        // Validación periódica cada 5 minutos
        const interval = setInterval(() => {
            if (typeof window !== 'undefined') {
                const token = getAuthData("token");
                if (token) {
                    try {
                        if (!isValidToken(token)) clearStorage();
                    } catch (e) {
                        console.warn("Error al validar token:", e);
                    }
                }
            }
        }, 5 * 60 * 1000);

        return () => clearInterval(interval);
    }, [pathname, router]);

    // Effect para aplicar el tema correcto
    useEffect(() => {
        const themeToUse = isAuthRoute ? themeAuth : theme;
        setTimeout(() => setDefinedTheme(themeToUse), 0);
    }, [themeAuth, theme, isAuthRoute]);

    if (loading) return <ScreenLoading />;
    if (!definedTheme) return null;

    return (
        <ThemeProvider theme={definedTheme}>
            <GlobalStyle />
            <LayoutContainer>
                {!isAuthRoute && isOfflineRoute && <Navbar />}
                {children}
                {!isAuthRoute && isOfflineRoute && <Bottombar />}
            </LayoutContainer>
        </ThemeProvider>
    );
};

export default ClientLayout;
