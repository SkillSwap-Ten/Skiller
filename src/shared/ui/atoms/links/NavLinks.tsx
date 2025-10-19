'use client';
import React from 'react';
import Link from 'next/link';
import styled, { CSSProperties } from 'styled-components';
import { ILinkProps } from '@/src/shared/types/atoms/link.type';
import { handlePageTheme } from '../../../../lib/utils/themeHandler';

const cssFromObject = (obj?: CSSProperties) => {
  if (!obj) return undefined;
  return Object.entries(obj)
    .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`)
    .join('\n');
};

const NavLinkComponent = styled(Link) <{ hover?: CSSProperties }>`
  text-decoration: none;
  padding: 16px;
  font-weight: 400;
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.textWhite};
  display: flex;
  transition: 0.4s;
  align-items: center; 
  justify-content: center;
  cursor: pointer;

  & svg {
    display: flex;
    align-items: center; 
    justify-content: center;
    width: 16px;
    height: 16px;
    fill: ${({ theme }) => theme.colors.textWhite}; 
  }

  & small {
    margin: 0;
    padding: 0;
    font-weight: 300;
    font-size: 12px;
    gap: 10px;
    font-style: italic;
    display: flex;
    align-items: center; 
    justify-content: center;
    color: ${({ theme }) => theme.colors.textWhite};
  }

  &:hover {
    ${(props) => cssFromObject(props.hover)}
  }
`;

const NavLink: React.FC<ILinkProps> = ({ href, hover, className, label, onClick, children }) => {
  const handleClick = (e?: React.MouseEvent) => {
    handlePageTheme(label ?? 'DEFAULT_LABEL');

    if (onClick) {
      if (e) {
        (onClick as (e: React.MouseEvent) => void)(e);
      } else {
        (onClick as () => void)();
      }
    }
  };

  return (
    <NavLinkComponent
      href={href}
      className={className}
      hover={hover}
      onClick={(e) => handleClick(e)}
    >
      {children ? children : label}
    </NavLinkComponent>
  );
};

export default NavLink;
