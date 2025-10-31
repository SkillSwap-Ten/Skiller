"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { getCheckRequestConnection } from "@/src/app/api/requests/requests";
import { IMatchedUserCarouselProps } from "@/src/shared/types/organisms/carousel.type";
import { getUsersForImages } from "../../../../app/api/users/users";
import { handlePageTheme } from "@/src/lib/utils/themeHandler";
import { IoFlowerOutline } from "react-icons/io5";
import NoContentContainer from "@/src/shared/ui/organisms/containers/NoContentContainer";
import Picture from "../../atoms/pictures/Picture";
import styled from "styled-components";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { isValidImageUrl } from "@/src/lib/utils/imageValidator";
import { IUserForImages } from "@/src/core/models/users/users.model";

const CarouselWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  padding: 1rem !important;
`;

const CustomSwiper = styled(Swiper)`
  width: 100%;
  padding: 0 !important;

  .swiper-button-next,
  .swiper-button-prev {
    translate:0 -22px;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    transition: 0.6s ease;
    background: ${({ theme }) => theme.colors.bgTertiary};
    color: ${({ theme }) => theme.colors.textSecondary};
    border: 1px solid ${({ theme }) => theme.colors.textTertiary};
    transform: scale(0.75);
  }

  .swiper-button-next::after,
  .swiper-button-prev::after {
    transform: scale(0.5);
  }

  .swiper-button-prev:hover,
  .swiper-button-next:hover {
    transform: scale(0.70);
    transition: 0.6s ease;
  }

  .swiper-wrapper {
    width: 100%;
    padding: 0;
    align-items: center;
  }

  & a{
    text-decoration: none;
  }
`;

const UserCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center !important;
  gap: 0.1rem;
`;

const AvatarWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    border: 1px solid ${({ theme }) => theme.colors.borderDark};
    border-radius: 50%;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }

  @media (max-width: 480px) {
    width: 55px;
    height: 55px;
  }
`;

const Job = styled.p`
  font-size: 0.6rem !important;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center !important;
  max-width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0;
  padding: 0;
  text-transform: capitalize;

  @media (max-width: 768px) {
    font-size: 0.55rem !important;
  }

  @media (max-width: 480px) {
    font-size: 0.45rem !important;
  }
`;

const Username = styled.p`
  font-size: 0.85rem !important;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center !important;
  max-width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-transform: capitalize;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    font-size: 0.75rem !important;
  }

  @media (max-width: 480px) {
    font-size: 0.65rem !important;
  }
`;

const Match = styled.span`
  display: flex;
  gap: 3px;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textOrange};
  padding: 2px 10px;
  border-radius: 20px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.textOrange};
  font-size: 8px;
  font-weight: bold;
  margin-top: 4px;
`;

const CarouselMatched: React.FC<IMatchedUserCarouselProps> = ({ userId }) => {
  const [allUsersData, setAllUsersData] = useState<IUserForImages[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showNavigation, setShowNavigation] = useState<boolean>(false);
  const [imageUrls, setImageUrls] = useState<Record<number, string>>({});

  const [currentSlidesPerView, setCurrentSlidesPerView] = useState<number>(6);
  const maxUsersToShow = 15;

  const visibleUsers = allUsersData.slice(0, maxUsersToShow);
  const placeholdersNeeded = Math.max(
    0,
    Math.ceil(currentSlidesPerView) - visibleUsers.length
  );

  const checkImageUrl = (userId: number, url: string) => {
    const img = new Image();
    img.src = url;
    img.onerror = () => {
      setImageUrls((prev) => ({ ...prev, [userId]: "/img/default-picture-full.webp" }));
    };
    img.onload = () => {
      setImageUrls((prev) => ({ ...prev, [userId]: url }));
    };
  };

  useEffect(() => {
    const fetchCheckMatch = async (
      data: IUserForImages[],
      currentUser: number
    ): Promise<IUserForImages[]> => {
      const matchedUsers: IUserForImages[] = [];
      for (const user of data) {
        const isConnected = await getCheckRequestConnection(currentUser, user.id);
        if (isConnected) matchedUsers.push(user);
      }
      return matchedUsers;
    };

    const fetchAllUsersData = async () => {
      if (!userId) {
        setError("No se pudo obtener el ID del usuario.");
        setLoading(false);
        return;
      }

      try {
        const responseData = await getUsersForImages();
        const matchedUsers = await fetchCheckMatch(responseData, userId);

        const matchedUsersFiltered = matchedUsers.filter(user => user.id !== userId);

        setAllUsersData(matchedUsersFiltered);
      } catch (error) {
        console.error(error);
        setError("No se pudieron cargar los usuarios.");
      } finally {
        setLoading(false);
      }
    };

    if (globalThis.window !== undefined) {
      fetchAllUsersData();
    }
  }, [userId]);

  useEffect(() => {
    if (visibleUsers.length + placeholdersNeeded > currentSlidesPerView) {
      setShowNavigation(true);
    } else {
      setShowNavigation(false);
    }
  }, [visibleUsers.length, placeholdersNeeded, currentSlidesPerView]);

  useEffect(() => {
    if (!allUsersData) return;

    allUsersData.forEach((user) => {
      if (isValidImageUrl(user.urlImage)) {
        checkImageUrl(user.id, user.urlImage ?? "/img/default-picture-full.webp");
      } else {
        setImageUrls((prev) => ({ ...prev, [user.id]: "/img/default-picture-full.webp" }));
      }
    });
  }, [allUsersData]);

  if (loading) return (
    <SkeletonTheme baseColor="#c2c2c2" highlightColor="#e0e0e0">
      <CarouselWrapper>
        <CustomSwiper modules={[Navigation]}
          navigation={showNavigation}
          loop={showNavigation}
          spaceBetween={12}
          slidesPerView={7}
          breakpoints={{
            320: { slidesPerView: 3 },
            400: { slidesPerView: 4 },
            500: { slidesPerView: 5 },
            660: { slidesPerView: 6 },
            768: { slidesPerView: 4 },
            880: { slidesPerView: 5 },
            1024: { slidesPerView: 5 },
          }}
          onSwiper={(swiper) => {
            const spv =
              typeof swiper.params.slidesPerView === "number"
                ? swiper.params.slidesPerView
                : Number(swiper.params.slidesPerView) || currentSlidesPerView;
            setCurrentSlidesPerView(spv);
          }}
          onBreakpoint={(swiper) => {
            const spv =
              typeof swiper.params.slidesPerView === "number"
                ? swiper.params.slidesPerView
                : Number(swiper.params.slidesPerView) || currentSlidesPerView;
            setCurrentSlidesPerView(spv);
          }}>
          <SwiperSlide>
            <UserCard>
              <Skeleton circle width={60} height={60} />
              <Skeleton width={75} height={15} />
              <Skeleton width={90} height={13} />
              <Skeleton width={50} height={14} />
            </UserCard>
          </SwiperSlide>
          <SwiperSlide>
            <UserCard>
              <Skeleton circle width={60} height={60} />
              <Skeleton width={75} height={15} />
              <Skeleton width={90} height={13} />
              <Skeleton width={50} height={14} />
            </UserCard>
          </SwiperSlide>
          <SwiperSlide>
            <UserCard>
              <Skeleton circle width={60} height={60} />
              <Skeleton width={75} height={15} />
              <Skeleton width={90} height={13} />
              <Skeleton width={50} height={14} />
            </UserCard>
          </SwiperSlide>
        </CustomSwiper>
      </CarouselWrapper>
    </SkeletonTheme>
  );

  if (error) return (
    <CarouselWrapper>
      <NoContentContainer>{error}</NoContentContainer>
    </CarouselWrapper>
  );

  if (allUsersData.length === 0)
    return (
      <CarouselWrapper>
        <NoContentContainer>
          <p>Aún no tienes conexiones. Conecta con alguien en la sección de<strong> Descubre</strong></p>
        </NoContentContainer>
      </CarouselWrapper>
    );

  return (
    <CarouselWrapper>
      <CustomSwiper
        modules={[Navigation]}
        navigation={showNavigation}
        loop={showNavigation}
        spaceBetween={12}
        slidesPerView={7}
        breakpoints={{
          320: { slidesPerView: 3 },
          400: { slidesPerView: 4 },
          500: { slidesPerView: 5 },
          660: { slidesPerView: 6 },
          768: { slidesPerView: 4 },
          880: { slidesPerView: 5 },
          1024: { slidesPerView: 5 },
        }}
        onSwiper={(swiper) => {
          const spv =
            typeof swiper.params.slidesPerView === "number"
              ? swiper.params.slidesPerView
              : Number(swiper.params.slidesPerView) || currentSlidesPerView;
          setCurrentSlidesPerView(spv);
        }}
        onBreakpoint={(swiper) => {
          const spv =
            typeof swiper.params.slidesPerView === "number"
              ? swiper.params.slidesPerView
              : Number(swiper.params.slidesPerView) || currentSlidesPerView;
          setCurrentSlidesPerView(spv);
        }}
      >
        {visibleUsers.map((user) => (
          <SwiperSlide key={user.id}>
            <Link onClick={() => handlePageTheme("DETALLE")} href={`/user/detail/u/${user.id}`}>
              <UserCard>
                <AvatarWrapper>
                  <Picture
                    src={imageUrls[user.id] || "/img/default-picture-full.webp"}
                    alt={user.fullName}
                    width={60}
                    height={60}
                    type="full"
                  />
                </AvatarWrapper>
                <Username>{user.fullName}</Username>
                <Job>{user.jobTitle}</Job>
                <Match>
                  <IoFlowerOutline />
                  Match
                </Match>
              </UserCard>
            </Link>
          </SwiperSlide>
        ))}

        {/* Placeholders dinámicos */}
        {Array.from({
          length: Math.max(
            0,
            Math.ceil(currentSlidesPerView) - visibleUsers.length
          ),
        }).map((_, i) => (
          <SwiperSlide key={`placeholder-${i}`}>
            <UserCard>
              <Skeleton circle width={60} height={60} baseColor="#c2c2c2" highlightColor="#e0e0e0" />
              <Skeleton width={75} height={15} baseColor="#c2c2c2" highlightColor="#e0e0e0" />
              <Skeleton width={90} height={13} baseColor="#c2c2c2" highlightColor="#e0e0e0" />
              <Skeleton width={50} height={14} baseColor="#c2c2c2" highlightColor="#e0e0e0" />
            </UserCard>
          </SwiperSlide>
        ))}
      </CustomSwiper>
    </CarouselWrapper>
  );
};

export default CarouselMatched;