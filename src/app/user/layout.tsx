'use client';
import React from 'react';
import styled from 'styled-components';
import { NavbarUser } from '../../shared/ui/organisms/navbar/NavbarUser';
import { Logobar } from '@/src/shared/ui/atoms/logobar/Logobar';

const LayoutContainer = styled.div`
    display: flex;
    padding: 0;         
    margin: 0;
    flex-direction: column;
    height: 100%;
`;

const ContentContainer = styled.div`
    flex: 1; 
    overflow: auto; 
`;

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <LayoutContainer>
            <ContentContainer>
                <NavbarUser />
                {children}
                <Logobar />
            </ContentContainer>
        </LayoutContainer>
    );
}

