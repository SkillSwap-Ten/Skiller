"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { INewUserCarouselProps } from "@/src/shared/types/organisms/carousel.type";
import { getAllUsersSorted } from "../../../../app/api/users/users";
import { MdOutlineWatchLater } from "react-icons/md";
import { getCurrentUserId } from "@/src/lib/utils/getCurrentUserId";
import { handlePageTheme } from "@/src/lib/utils/themeHandler";
import NoContentContainer from "@/src/shared/ui/organisms/containers/NoContentContainer";
import Link from "next/link";
import styled from "styled-components";
import Picture from "../../atoms/pictures/Picture";
import "swiper/css";
import "swiper/css/navigation";

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { validateImageUrl } from "@/src/lib/utils/imageValidator";

const CarouselWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  padding: 0 !important;
`;

const CustomSwiper = styled(Swiper)`
  padding: 0 !important;

  .swiper-button-next,
  .swiper-button-prev {
    translate:0 -12px;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
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
  padding: 0;

  img {
    border: 1px solid ${({ theme }) => theme.colors.textDark};
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
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

const Community = styled.p`
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

const New = styled.span`
  display: flex;
  gap: 3px;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textPurple};
  padding: 2px 10px;
  border-radius: 20px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.textPurle};
  font-size: 8px;
  font-weight: bold;
  margin-top: 4px;
`;

const CarouselNewUsers = () => {
  const [allUsersData, setAllUsersData] = useState<INewUserCarouselProps[]>([]);
  const [imageUrls, setImageUrls] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const maxUsersToShow = 15;

  useEffect(() => {
    const fetchAllUsersData = async () => {
      try {
        const responseData = await getAllUsersSorted();

        const currentUserId = getCurrentUserId();
        const responseDataFiltered = responseData.filter(user => user.id !== currentUserId);

        console.log(responseData)
        console.log(currentUserId)
        console.log(responseDataFiltered)

        setAllUsersData(responseDataFiltered);
        setLoading(false);
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
  }, []);

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
    if (!allUsersData) return;

    allUsersData.forEach((user) => {
      if (validateImageUrl(user.urlImage)) {
        checkImageUrl(user.id, user.urlImage ?? "/img/default-picture-full.webp");
      } else {
        setImageUrls((prev) => ({ ...prev, [user.id]: "/img/default-picture-full.webp" }));
      }
    });
  }, [allUsersData]);

  console.log(allUsersData)

  if (loading) return (
    <SkeletonTheme baseColor="#c2c2c2" highlightColor="#e0e0e0">
      <CarouselWrapper>
        <CustomSwiper
          modules={[Navigation]}
          navigation
          loop={true}
          spaceBetween={12}
          slidesPerView={6}
          breakpoints={{
            320: { slidesPerView: 3 },
            340: { slidesPerView: 4 },
            440: { slidesPerView: 5 },
            540: { slidesPerView: 6 },
            768: { slidesPerView: 6 },
            1024: { slidesPerView: 6 },
            1280: { slidesPerView: 6 },
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

  return (
    <CarouselWrapper>
      <CustomSwiper
        modules={[Navigation]}
        navigation
        loop={true}
        spaceBetween={12}
        slidesPerView={6}
        breakpoints={{
          320: { slidesPerView: 3 },
          340: { slidesPerView: 4 },
          440: { slidesPerView: 5 },
          540: { slidesPerView: 6 },
          768: { slidesPerView: 6 },
          1024: { slidesPerView: 6 },
          1280: { slidesPerView: 6 },
        }}
      >
        {allUsersData.slice(0, maxUsersToShow).map((user) => (
          <SwiperSlide key={user.id}>
            <Link onClick={() => handlePageTheme("DETALLE")} href={`/user/detail/u/${user.id}`}>
              <UserCard>
                <AvatarWrapper>
                  <Picture
                    src={imageUrls[user.id] || "/img/default-picture-full.webp"}
                    alt={user.name}
                    width={60}
                    height={60}
                    type="full"
                  />
                </AvatarWrapper>
                <Username>{user.name}</Username>
                <Community>{user.category}</Community>
                <New><MdOutlineWatchLater />New User</New>
              </UserCard>
            </Link>
          </SwiperSlide>
        ))}
      </CustomSwiper>
    </CarouselWrapper>
  );
};

export default CarouselNewUsers;

