'use client'
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { GlobalDarkTheme, GlobalTheme, darkThemeLabels, darkThemePaths } from '../styles/GlobalStyling';
import { IGlobalTheme } from '../types/styles/theme.type';

// Hook personalizado para manejar el tema 
export function useTheme(): [IGlobalTheme, (theme: 'dark' | 'light') => void] {
    const pathname = usePathname();
    const [theme, setTheme] = useState<IGlobalTheme>(GlobalTheme);

    // Utilidad para obtener el label según el pathname
    const checkIsDark = (path: string, currentPage: string): boolean => {
        if (darkThemePaths.includes(path) && darkThemeLabels.includes(currentPage)) return true;
        return false;
    };

    useEffect(() => {
        const handleThemeChange = () => {
            const currentPage = localStorage.getItem('currentPage') ?? 'DEFAULT_LABEL';
            const newTheme = checkIsDark(pathname, currentPage) ? GlobalDarkTheme : GlobalTheme;

            // Aplicar el nuevo tema con retardo
            setTimeout(() => {
                setTheme(newTheme);
            }, 3000);
        };

        // Llamar cuando cambia el pathname
        handleThemeChange();

        // Escuchar cambios en el almacenamiento local para actualizar el tema
        globalThis.addEventListener('themechange', handleThemeChange);

        // Cleanup listener on unmount
        return () => {
            globalThis.removeEventListener('themechange', handleThemeChange);
        };

    }, [pathname]);

    // Método manual por si quieres cambiarlo desde otro lado
    const setPageTheme = (theme: 'dark' | 'light') => {
        const newTheme = theme === 'dark' ? GlobalDarkTheme : GlobalTheme;

        setTimeout(() => {
            setTheme(newTheme);
            localStorage.setItem('theme', theme);
        }, 3000);
    };

    return [theme, setPageTheme];
}