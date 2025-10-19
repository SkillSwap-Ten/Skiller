'use client';
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NoContentContainer from "@/src/shared/ui/organisms/containers/NoContentContainer";
import InfoTag from "../../atoms/tags/InfoTag";
import NavLink from "../../atoms/links/NavLinks";
import { validateImageUrl } from "@/src/lib/utils/imageValidator";
import { ICardAdsDiscoverProps } from "@/src/shared/types/molecules/card.type";

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProfileHeader = styled.div`
    display: flex;
    width: 100%;
    gap: 1rem;
    justify-content: start;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.textTertiary};
`;

const Avatar = styled.div<{ urlImage: string }>`
    border: 1px solid ${({ theme }) => theme.colors.textDark};
    background-image: url(${(props) => props.urlImage});
    background-size: cover;
    background-position: center;
    width: 3rem;
    height: 3rem;
    border-radius: 10px;
`;

const ProfileName = styled.div`
    text-transform: capitalize;
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 5px;
    color: ${({ theme }) => theme.colors.textBlack};
`;

const JobTitle = styled.div`
    text-transform: capitalize;
    opacity: 0.7;
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.textSecondary};
`;

const CardContainer = styled.div`
    display: flex;
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.textWhite};
    padding: 1rem;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.colors.textDark};

    & a {
        &:hover {
            font-weight: initial !important;
            transform: scale(1.01);
        }
    }
`;

const AdSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1rem;
    padding-top: 0;
`;

const SkeletonRow = styled.div`
    display: flex;
    gap: 0.5rem;
    padding: 1rem;
    padding-bottom: 0.25rem;
`;

const SkeletonColumn = styled.div`
    display: inline-block;
    width: 30%;
`;

const Ad = styled.video`
    width: 100%;
    height: 100%;
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
    object-fit: cover;
    background: transparent;
    border-radius: 12px;
`;

const CardAdsDiscover: React.FC<ICardAdsDiscoverProps> = ({ loading, error, user }) => {
    const [imageUrl, setImageUrl] = useState<string>("/img/default-picture-full.webp");

    useEffect(() => {
        const checkImageUrl = (url: string) => {
            const img = new Image();
            img.src = url;
            img.onerror = () => {
                // Si la imagen da error, se usa la imagen por defecto
                setImageUrl("/img/default-picture-full.webp");
            };
            img.onload = () => {
                // Si la imagen carga correctamente, se usa la URL
                setImageUrl(url);
            };
        };

        if (user && user.urlImage && validateImageUrl(user.urlImage)) {
            checkImageUrl(user.urlImage);
        } else {
            setImageUrl("/img/default-picture-full.webp");
        }
    }, [user]);

    if (error) return (
        <CardContainer style={{ padding: '0' }}>
            <NoContentContainer error={error} />
        </CardContainer>
    );

    if (loading) return (
        <SkeletonTheme baseColor="#c2c2c2" highlightColor="#e0e0e0">
            <CardContainer>
                <SkeletonRow>
                    <Skeleton style={{ display: 'inline-block', marginRight: '0.5rem' }} height={48} width={48} />
                    <SkeletonColumn>
                        <Skeleton height={20} width={80} />
                        <Skeleton height={16} width={50} />
                    </SkeletonColumn>
                </SkeletonRow>
                <AdSection>
                    <Skeleton height={18} width={36} />
                    <Skeleton height={122} width={284} />
                </AdSection>
            </CardContainer>
        </SkeletonTheme>
    );

    return (
        <CardContainer>
            <NavLink hover={{ transform: 'scale(1.01)', transition: '0.4s'}} href="/user/profile" label="PERFIL">
                <ProfileHeader>
                    <Avatar urlImage={imageUrl} />
                    <div>
                        <ProfileName>{user.fullName}</ProfileName>
                        <JobTitle>{user.jobTitle}</JobTitle>
                    </div>
                </ProfileHeader>
            </NavLink>
            <AdSection>
                <InfoTag label={"#AD"} />
                <Ad loop autoPlay muted playsInline>
                    <source src="/vid/skillswap-ad.mp4" type="video/mp4" />
                    Tu navegador no soporta el video HTML5.
                </Ad>
            </AdSection>
        </CardContainer>
    );
};

export default CardAdsDiscover;