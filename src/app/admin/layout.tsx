'use client';
import React from 'react';
import styled from 'styled-components';
import { NavbarAdmin } from '../../shared/ui/organisms/navbar/NavbarAdmin';
import { Bottombar } from '@/src/shared/ui/molecules/bottombar/Bottombar';

const LayoutContainer = styled.div`
    display: flex;
    padding: 0; 
    margin: 0;
    height: 100%;
    flex-direction: column;
`;

const ContentContainer = styled.div`
    flex: 1; 
    overflow: auto; 
`;

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <LayoutContainer>
            <ContentContainer>
                <NavbarAdmin />
                    {children}
                    <Bottombar />
            </ContentContainer>
        </LayoutContainer>
    );
}
