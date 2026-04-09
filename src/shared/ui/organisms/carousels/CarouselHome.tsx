"use client";
import styled from "styled-components";
import React, { useState } from "react";
import { GrNext } from "react-icons/gr";
import { Baskervville } from "next/font/google";

const baskervville = Baskervville({
  weight: '400',
  subsets: ['latin'],
  style: 'normal'
});

interface CardData {
  id: number;
  imgSrc: string;
}

const initialCards: CardData[] = [
  {
    id: 1,
    imgSrc:
      "https://images.pexels.com/photos/17612180/pexels-photo-17612180/free-photo-of-blanco-y-negro-mujer-cara-enfrentarse.jpeg",
  },
  {
    id: 2,
    imgSrc:
      "https://images.pexels.com/photos/15169306/pexels-photo-15169306/free-photo-of-blanco-y-negro-mujer-joven-retrato.jpeg",
  },
  {
    id: 3,
    imgSrc:
      "https://images.pexels.com/photos/13944737/pexels-photo-13944737.jpeg",
  },
  {
    id: 4,
    imgSrc:
      "https://images.pexels.com/photos/16557436/pexels-photo-16557436/free-photo-of-retrato-para-mi-prima.jpeg",
  },
  {
    id: 5,
    imgSrc:
      "https://images.pexels.com/photos/24017554/pexels-photo-24017554/free-photo-of-cara-de-nino-en-blanco-y-negro.jpeg",
  },
  {
    id: 6,
    imgSrc:
      "https://images.pexels.com/photos/2558823/pexels-photo-2558823.jpeg",
  },
  {
    id: 7,
    imgSrc:
      "https://images.pexels.com/photos/8727669/pexels-photo-8727669.jpeg",
  },
];

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.bgGrey};
  flex-direction: column;
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 45px;
  padding-bottom: 140px;

  @media (max-width: 768px) {
    padding-top: 25px;
    padding-bottom: 90px;
  }

  @media (max-width: 500px) {
    padding-top: 70px;
    padding-bottom: 80px;
  }
`;

const Italic = styled.span`
  font-weight: normal;
  font-style: italic;
  font-family: ${baskervville.style.fontFamily};
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.textWhite};
  font-weight: bold;
  text-align: center;
  margin: 0.67em 0;
  font-size: 35px;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 23px;
  }
`;

const Subtitle = styled.span`
  color: ${({ theme }) => theme.colors.textWhite};
  text-align: center;
  font-size: 16px;
  opacity: 0.5;
  margin-bottom: 40px;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const CarouselWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 310px;

  & article {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  @media (max-width: 768px) {
    height: 260px;
  }

  @media (max-width: 480px) {
    height: 220px;
  }
`;

const ControlButton = styled.button`
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.bgPrimary};
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  border-radius: 50%;
  bottom: -5px;
  font-size: 1rem;
  width: 40px;
  height: 40px;
  transition: 1s;

  &:hover {
    transform: scale(1.1);
    transition: 1s;
  }
`;

const CardsContainer = styled.div`
  transition: all 0.7s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 10px;

  @media (max-width: 768px) {
    justify-content: space-around;
  }

  @media (max-width: 480px) {
    overflow: hidden;
  }
`;

const Card = styled.div<{ $imgSrc: string; $isExiting?: boolean; $isEntering?: boolean }>`
  margin: 5px;
  height: 180px;
  width: 150px;
  border-radius: 15px;
  overflow: hidden;
  background-color: #555;
  background-image: url(${(props) => props.$imgSrc});
  background-size: cover;
  background-position: center;
  transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1) !important;
  transform: ${(props) => props.$isExiting ? 'scale(0.8)' :
    props.$isEntering ? 'scale(1)' : 'scale(1)'};
  filter: grayscale();

  &.card-1 {
    width: 150px;
    height: 175px;
    transition: all 0.7s ease-in-out;

    @media (max-width: 768px) {
      height: 130px;
      width: 100px;
    }
  }

  &.card-2 {
    width: 150px;
    height: 210px;
    transition: all 0.7s ease-in-out;

    @media (max-width: 768px) {
      height: 160px;
      width: 100px;
    }

    @media (max-width: 480px) {
      height: 100px;
    }
  }

  &.card-3 {
    width: 180px;
    height: 240px;
    transition: all 0.7s ease-in-out;

    @media (max-width: 768px) {
      height: 190px;
      width: 150px;
    }

    @media (max-width: 480px) {
      height: 140px;
    }
  }

  &.card-4 {
    width: 210px;
    height: 280px;
    transition: all 0.7s ease-in-out;

    @media (max-width: 768px) {
      height: 230px;
      width: 200px;
    }

    @media (max-width: 480px) {
      height: 190px;
    }
  }

  &.card-5 {
    width: 180px;
    height: 240px;
    transition: all 0.7s ease-in-out;

    @media (max-width: 768px) {
      height: 190px;
      width: 150px;
    }

    @media (max-width: 480px) {
      height: 140px;
    }
  }

  &.card-6 {
    width: 150px;
    height: 210px;
    transition: all 0.7s ease-in-out;

    @media (max-width: 768px) {
      height: 160px;
      width: 100px;
    }

    @media (max-width: 480px) {
      height: 100px;
    }
  }

  &.card-7 {
    width: 150px;
    height: 175px;
    transition: all 0.7s ease-in-out;

    @media (max-width: 768px) {
      height: 130px;
      width: 100px;
    }
  }

  @media (max-width: 600px) {
    &:nth-child(1) {
      display: none;
    }

    &:nth-child(7) {
      display: none;
    }
  }
`;

const CarouselHome: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>(initialCards);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [exitingIndex, setExitingIndex] = useState<number | null>(null);

  const handleNext = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setExitingIndex(0);

    // Después de la animación, actualiza el array
    setTimeout(() => {
      const updated = [...cards];
      const first = updated.shift();
      if (first) {
        updated.push(first);
      }
      setCards(updated);
      setExitingIndex(null);
      setIsTransitioning(false);
    }, 700);
  };

  return (
    <Container>
      <Title>
        MATCH<Italic> con tu skill ideal</Italic>
      </Title>
      <Subtitle>
        &quot;A VECES NI SABEMOS QUE LO
        <br />
        NECESITAMOS, HASTA QUE LO VEMOS.&quot;
      </Subtitle>
      <CarouselWrapper>
        <CardsContainer>
          {cards.map((card, index) => (
            <Card
              key={card.id}
              $imgSrc={card.imgSrc}
              $isExiting={index === exitingIndex}
              className={`card-${index + 1}`}
            />
          ))}
        </CardsContainer>
        <article>
          <ControlButton aria-label="Control Button" onClick={handleNext}><GrNext /></ControlButton>
        </article>
      </CarouselWrapper>
    </Container>
  );
};

export default CarouselHome;
