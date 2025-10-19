'use client';
import { darkThemeLabels } from "@/src/shared/styles/GlobalStyling";

export function handlePageTheme(label: string) {
    if (globalThis.window !== undefined) {
        if (label !== 'DEFAULT_LABEL') {
            localStorage.setItem('currentPage', label);

            const theme = darkThemeLabels.includes(label) ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
        }

        globalThis.dispatchEvent(new Event('storage'));
    }
}
