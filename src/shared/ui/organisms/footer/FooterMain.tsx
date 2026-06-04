'use client';
import styled from "styled-components";
import React from "react";

const PageWrapper = styled.div`
    margin-top: 48px;
`;

const FooterStyled = styled.footer`
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    bottom: 0.5rem ;
`;

const FooterText = styled.p`
    font-size: 14px;
    padding: 20px 0;
    min-width: 180px;
    width: 50%;
    margin: 0;
    border-top: 1px solid ${({ theme }) => theme.colors.bgGray};
    color: ${({ theme }) => theme.colors.bgGray};
    hyphens: none;
    word-wrap: normal;
    overflow-wrap: normal;

    @media (max-width: 768px) {
        font-size: 12px;
        width: 60%;
    }
`;

export const FooterMain: React.FC = () => {
    return (
        <PageWrapper>
            <FooterStyled>
                <FooterText>© {new Date().getFullYear()} SkillSwap. Todos los derechos reservados.</FooterText>
            </FooterStyled>
        </PageWrapper>
    );
};
