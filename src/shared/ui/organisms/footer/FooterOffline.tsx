'use client';
import styled from "styled-components";
import React from "react";
import NavLink from "../../atoms/links/NavLinks";
import { FaCode } from "react-icons/fa6";
import { FaFigma, FaInstagram } from "react-icons/fa";
import { VscGithubAlt } from "react-icons/vsc";

// Estilos para el footer
const FooterStyled = styled.footer`
  width: 100%;
  background: ${({ theme }) => theme.colors.bgGrey};
  color: ${({ theme }) => theme.colors.textWhite};
  padding: 120px 40px 90px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;

  ul{
    margin: 0;
    padding: 0;
    gap: 20px;    
    display: flex;
    text-align: start;
    list-style: none;
    justify-content: center;
    width: 80%;
  }

  section {
    gap: 20px;    
    width: 80%;
    display: flex;
    text-align: start;
  }

  @media (max-width: 679px) {
    padding: 80px 40px 50px 40px;
    
    section {
      display: flex;
      flex-direction: column;
      gap: 20px;
      text-align: center;
    }

    ul {
      flex-wrap: wrap;
      gap: 10px;
    }

    div {
      justify-content: center;
    }
  }

  a {
    color: ${({ theme }) => theme.colors.textWhite};
    text-decoration: none;
    font-size: 12px;

    &:hover {
      color: ${({ theme }) => theme.colors.textWhite};
    }
  }

  .social-icons {
    height: min-content;
    display: flex;
    gap: 20px;

    @media (max-width: 979px) {
      gap: 10px;
    }
  }
`;

const Box = styled.section`
  height: min-content;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
  border-top: 1px solid ${({ theme }) => theme.colors.textWhite};
  padding-top: 30px;
  width: 80%;

  > * {
    color: ${({ theme }) => theme.colors.textWhite};
    hyphens: none;
    word-wrap: normal;
    overflow-wrap: normal;
    font-size: 15px;
  }

  @media (max-width: 679px) {
    width: 95%;

    > * {
      font-size: 12px;
    }
  }
`;

const FooterNavItem = styled.li`
    display: inline-block;
    font-size: 15px;
    max-height: 54px;
    cursor: pointer;
    margin-top: 10px;

    a{
        padding: 0 15px;

        & svg{
            width: 50px;
            height: auto;
        }
    }
`;

export const FooterOffline: React.FC = () => {
  return (
    <FooterStyled>
      <ul>
        <FooterNavItem>
          <NavLink hover={{ fontWeight: '700', transition: '0.4s'}} href="/" label="INICIO" />
        </FooterNavItem>
        <FooterNavItem>
          <NavLink hover={{ fontWeight: '700', transition: '0.4s'}} href="/auth" label="AUTH" />
        </FooterNavItem>
        <FooterNavItem>
          <NavLink hover={{ fontWeight: '700', transition: '0.4s'}} href="/legal" label="LEGAL" />
        </FooterNavItem>
      </ul>
      <Box>
        <p>
          © {new Date().getFullYear()} SkillSwap. Todos los derechos reservados.
        </p>
        <div className="social-icons">
          <NavLink
            target="_blank"
            hover={{ transform: 'scale(0.95)', transition: '0.4s'}}
            href="https://www.instagram.com/franccoina"
            label="Instagram"
          >
            <FaInstagram />
          </NavLink>
          <NavLink
            target="_blank"
            hover={{ transform: 'scale(0.95)', transition: '0.4s'}}
            href="https://www.figma.com/design/FEDH5WgaGXBLSr2xBBA8OV/SkillSwap.ts-Mockup?t=O8A7L1zQEFkpy70a-1"
            label="Figma"
          >
            <FaFigma />
          </NavLink>
          <NavLink
            target="_blank"
            hover={{ transform: 'scale(0.95)', transition: '0.4s'}}
            href="https://github.com/SkillSwap-Ten/Skiller"
            label="GitHub-Frontend"
          >
            <VscGithubAlt />
          </NavLink>
          <NavLink
            target="_blank"
            hover={{ transform: 'scale(0.95)', transition: '0.4s'}}
            href="https://github.com/SkillSwap-Ten/SkillSwap"
            label="GitHub-Backend"
          >
            <FaCode />
          </NavLink>
        </div>
      </Box>
    </FooterStyled>
  );
};

