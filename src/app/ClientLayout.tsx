'use client';
import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { usePathname, useRouter } from 'next/navigation';
import { Navbar } from "../shared/ui/organisms/navbar/NavbarOffline";
import { Logobar } from "../shared/ui/atoms/logobar/Logobar";
import { clearStorage } from "../lib/utils/storageCleaner";
import { getAuthToken } from "../lib/utils/getAuthToken";
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
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [theme] = useTheme();
    const [themeAuth] = useThemeAuth();
    const [definedTheme, setDefinedTheme] = useState<IGlobalTheme | null>(null);

    const isAuth = pathname.startsWith('/auth');
    const isOffline = pathname.startsWith('/auth') || pathname.startsWith('/legal');

    useEffect(() => {
        const storedToken = globalThis.window === undefined ? null : getAuthToken();
        setToken(storedToken);
        console.log(storedToken);

        const handleStart = () => setLoading(true);
        const handleComplete = () => {
            setTimeout(() => setLoading(false), 3000);
        };

        if (!storedToken) {
            clearStorage();

            if (!isOffline) {
                router.push("/");
                return;
            }
        }

        router.prefetch(pathname);

        handleStart();
        handleComplete();
    }, [pathname, router, isOffline]);

    useEffect(() => {
        const themeToUse = (pathname === '/auth') ? themeAuth : theme;
        setDefinedTheme(themeToUse);
    }, [themeAuth, theme, token, pathname]);

    if (loading) {
        return <LoadingScreen />;
    }

    if (!definedTheme) {
        return null;
    }

    return (
        <ThemeProvider theme={definedTheme}>
            <GlobalStyle />
            <LayoutContainer>
                {!isAuth && <Navbar />}
                {children}
                {!isAuth && <Logobar />}
            </LayoutContainer>
        </ThemeProvider>
    );
};

export default ClientLayout;
