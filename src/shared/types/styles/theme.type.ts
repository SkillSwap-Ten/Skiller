import "styled-components";

export interface IGlobalTheme {
    colors: IGlobalThemeAttributes
}

export interface IGlobalThemeAttributes {
    [key: string]: string;
}
// Extiende DefaultTheme con tu IGlobalTheme
declare module "styled-components" {
    export interface DefaultTheme extends IGlobalTheme {
        __brand?: "SkillSwap";
    }
}