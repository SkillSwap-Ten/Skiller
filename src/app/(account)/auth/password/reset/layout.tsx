'use client';
import React from 'react';
import styled from 'styled-components';

const LayoutContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const ContentContainer = styled.div`
    flex: 1; 
    overflow: auto; 
    background-color: ${({ theme }) => theme.colors.bgTertiary};
    padding: 2rem 0;
`;

export default function ResetPasswordLayout({ children }: { children: React.ReactNode }) {
    return (
        <LayoutContainer>
            <ContentContainer>
                    {children}
            </ContentContainer>
        </LayoutContainer>
    );
}

