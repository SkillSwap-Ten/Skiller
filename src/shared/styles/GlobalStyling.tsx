'use client';
import { createGlobalStyle } from "styled-components";
import { IGlobalTheme } from "../types/styles/theme.type";
import { Urbanist } from "next/font/google";

const urbanist = Urbanist({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export const darkThemePaths = ['auth'];
export const darkThemeLabels = ['REGISTRO'];

// Configuramos nuestro Global Theme
export const GlobalTheme: IGlobalTheme = {
    colors: {
        bgNavbar: '#222222',
        bgBanner: 'rgba(0, 0, 0, 0.1)',
        bgMainOpacity: '#00000050',
        bgSidebar: '#FFFFFF',
        bgNotFound: '#F5F5F5',
        bgPrimary: '#FFFFFF',
        bgSecondary: '#222222',
        bgTertiary: '#F5F5F5',
        bgOrange: '#F4F2EE',
        bgGray: '#777777',
        bgGrey: '#222222',

        textSecondary: '#222222',
        textPrimary: '#FFFFFF',
        textBlack: '#555555',
        textSidebar: '#555555',
        textDark: '#00000020',
        textWhite: '#FFFFFF',
        textGray: '#707070',
        textTertiary: '#00000050',

        textPurple: '#7A5CCC',
        textOrange: '#DC7D2F',
        textOrange2: '#D13B00',
        textOrange3: '#CF3B00',
        textCyan: '#54A9D1',
        textBlue: '#093A98',
        textYellow: '#F0AC27',
        textGreen: '#2C8560',
        textGreen2: '#2F966B',
        textRed: '#891E1E',
        textBrown: '#7F6229',
        textPink: '#EFC7C5',

        borderLogobar: '#DDDDDD',
        borderNavs: '#333333',
        borderAuthLeft: '#FFFFFF',
        borderAuthRight: '#F0AC27',

        gradientText: 'linear-gradient(90deg, #F0AC27 0%,  #DC7D2F 60%, #D13B00 100% )',
        gradientPrimary: 'linear-gradient(90deg, #F0AC27 0%,  #DC7D2F 60%, #D13B00 100% )',
        gradientSecondary: 'linear-gradient(270deg, #F0AC2790 20%,  #DC7D2F90 80%, #D13B0090 100% )',

        gradientPink: 'linear-gradient(90deg, #7D93FF 0%, #F093C0 85%, #EFC7C5 100%)',
        gradientGreen: 'linear-gradient(90deg, #B6CB65 0%, #37A879 52%, #4A54AE66 100%)',
    }
};

export const GlobalDarkTheme: IGlobalTheme = {
    colors: {
        bgNavbar: '#222222',
        bgBanner: 'rgba(255, 255, 255, 0.05)',
        bgMainOpacity: '#00000050',
        bgSidebar: '#1A1A1A',
        bgNotFound: '#0E0E0E',
        bgPrimary: '#222222',
        bgSecondary: '#FFFFFF',
        bgTertiary: '#3A3A3A',
        bgOrange: '#3B2B1A',
        bgGray: '#999999',
        bgGrey: '#CCCCCC',

        textSecondary: '#222222',
        textPrimary: '#FFFFFF',
        textBlack: '#CCCCCC',
        textSidebar: '#DDDDDD',
        textDark: '#FFFFFF20',
        textWhite: '#FFFFFF',
        textGray: '#BBBBBB',
        textTertiary: '#FFFFFF60',

        textPurple: '#A88CFF',
        textOrange: '#F7A94B',
        textOrange2: '#E86C2D',
        textOrange3: '#E14E18',
        textCyan: '#61A7C7',
        textBlue: '#3A6FF8',
        textYellow: '#F5C14B',
        textGreen: '#4CC68A',
        textGreen2: '#56D99C',
        textRed: '#E05A5A',
        textBrown: '#866E3E',
        textPink: '#FFB6C1',

        borderLogobar: '#2D2D2D',
        borderNavs: '#444444',
        borderAuthLeft: '#FFFFFF',
        borderAuthRight: '#FFFFFF',

        gradientText: 'linear-gradient(90deg, #F0AC27 0%,  #DC7D2F 60%, #D13B00 100% )',
        gradientPrimary: 'linear-gradient(90deg, #F0AC27 0%,  #DC7D2F 60%, #D13B00 100% )',
        gradientSecondary: 'linear-gradient(270deg, #F0AC2790 20%,  #DC7D2F90 80%, #D13B0090 100% )',

        gradientPink: 'linear-gradient(90deg, #9DAAFF 0%, #F5A3D4 85%, #FFCDD2 100%)',
        gradientGreen: 'linear-gradient(90deg, #85A84F 0%, #2C8F66 52%, #3E47A066 100%)',
    },
};


// Global styling para elementos HTML importantes
export const GlobalStyle = createGlobalStyle`

html {
    background-color: ${({ theme }) => theme.colors.bgPrimary};
    width: 100vw !important;
    overflow-x: hidden;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

*,
*::before,
*::after{
    font-family: ${urbanist.style.fontFamily};
    box-sizing: inherit;
}

div, section, article, aside, table, ul, ol, textarea {
    &::-webkit-scrollbar {
        width: 4px;
        height: 4px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
        margin: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.colors.textTertiary};
        border-radius: 4px;
    }
}

body {
    min-height: 100vh;
    width: 100% !important;
    overflow-x: hidden;
    margin: 0;
    padding: 0;
}

h1, h2, h3, h4, h5, h6 {
    font-weight: bolder;
}

p {
    color: ${({ theme }) => theme.colors.bgPrimary};
    line-height: 1.3;
    font-weight: 300;
    margin: 0;
    hyphens: auto;
    word-wrap: break-word;
    overflow-wrap: break-word;
}

.gradient-bg-primary {
    background-color: ${({ theme }) => theme.colors.gradientPrimary};
}

.gradient-bg-secondary {
    background-color: ${({ theme }) => theme.colors.gradientSecondary};
}

input, select, textarea, span, button {
    font-family: ${urbanist.style.fontFamily};
}
`;