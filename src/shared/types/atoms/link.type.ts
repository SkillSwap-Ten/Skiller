import React from 'react';

export interface ILinkProps {
    id?: string;
    href: string | URL;
    label?: string; 
    target?: '_blank' | '_self'; 
    icon?:  React.ReactNode;
    onClick?: (() => void) | ((e: React.MouseEvent<HTMLAnchorElement>) => void);
    children?:  React.ReactNode;
    className?: string;
    hover?: React.CSSProperties;
}
