'use client';
import React from 'react';
import styled from 'styled-components';

const LayoutContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100dvh;
    height: 100%;
`;

const ContentContainer = styled.div`
    flex: 1; 
    height: 100%;
    overflow: auto; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <LayoutContainer>
            <ContentContainer>
                {children}
            </ContentContainer>
        </LayoutContainer>
    );
}

