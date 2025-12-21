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

interface CardProps {
  imgsrc: string;
}

interface CardData {
  id: number;
  imgsrc: string;
}

const initialCards: CardData[] = [
  {
    id: 1,
    imgsrc:
      "https://images.pexels.com/photos/17612180/pexels-photo-17612180/free-photo-of-blanco-y-negro-mujer-cara-enfrentarse.jpeg",
  },
  {
    id: 2,
    imgsrc:
      "https://images.pexels.com/photos/15169306/pexels-photo-15169306/free-photo-of-blanco-y-negro-mujer-joven-retrato.jpeg",
  },
  {
    id: 3,
    imgsrc:
      "https://images.pexels.com/photos/13944737/pexels-photo-13944737.jpeg",
  },
  {
    id: 4,
    imgsrc:
      "https://images.pexels.com/photos/16557436/pexels-photo-16557436/free-photo-of-retrato-para-mi-prima.jpeg",
  },
  {
    id: 5,
    imgsrc:
      "https://images.pexels.com/photos/24017554/pexels-photo-24017554/free-photo-of-cara-de-nino-en-blanco-y-negro.jpeg",
  },
  {
    id: 6,
    imgsrc:
      "https://images.pexels.com/photos/2558823/pexels-photo-2558823.jpeg",
  },
  {
    id: 7,
    imgsrc:
      "https://images.pexels.com/photos/8727669/pexels-photo-8727669.jpeg",
  },
];

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.bgGrey};
  flex-direction: column;
  padding-top: 100px;
  padding-bottom: 150px;
  position: relative;
  width: 100%;
  overflow: hidden;

  @media (max-width: 768px) {
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
  font-size: 35px;
  font-weight: bold;
  text-align: center;
  margin: 0.67em 0;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 23px;
  }
`;

const Subtitle = styled.span`
  color: ${({ theme }) => theme.colors.textWhite};
  font-family: ${baskervville.style.fontFamily};
  font-size: 14px;
  opacity: 0.5;
  text-align: center;
  margin-bottom: 40px;
  font-weight: normal;
  font-style: italic;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const CarouselWrapper = styled.div`
  position: relative;
  width: 100vw;

  & article {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;

const ControlButton = styled.button`
  position: absolute;
  bottom: -5px;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.bgPrimary};
  border: none;
  border-radius: 50%;
  cursor: pointer;
  width: 40px;
  height: 40px;
  transition: 1s;

  &:hover {
    scale: 1.1;
    transition: 1s;
  }
`;

const CardsContainer = styled.div`
  transition: all 0.6s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  overflow: hidden;

  @media (max-width: 768px) {
    justify-content: space-around;
  }

  @media (max-width: 480px) {
    overflow: hidden;
  }
`;

const Card = styled.div<CardProps>`
  overflow: hidden;
  background-color: #c4c4c4;
  border-radius: 15px;
  background-image: url(${(props) => props.imgsrc});
  background-size: cover;
  background-position: center;
  margin: 5px;
  height: 180px;
  width: 150px;
  filter: grayscale();
  transition: all 0.6s ease-in-out !important;

  &.card-1 {
    width: 150px;
    height: 175px;
    transition: all 0.6s ease-in-out;

    @media (max-width: 768px) {
      height: 150px;
      width: 100px;
    }
  }

  &.card-2 {
    width: 150px;
    height: 210px;
    transition: all 0.6s ease-in-out;

    @media (max-width: 768px) {
      height: 180px;
      width: 100px;
    }

    @media (max-width: 480px) {
      height: 100px;
    }
  }

  &.card-3 {
    width: 180px;
    height: 240px;
    transition: all 0.6s ease-in-out;

    @media (max-width: 768px) {
      height: 210px;
      width: 150px;
    }

    @media (max-width: 480px) {
      height: 140px;
    }
  }

  &.card-4 {
    width: 210px;
    height: 280px;
    transition: all 0.6s ease-in-out;

    @media (max-width: 768px) {
      height: 250px;
      width: 200px;
    }

    @media (max-width: 480px) {
      height: 190px;
    }
  }

  &.card-5 {
    width: 180px;
    height: 240px;
    transition: all 0.6s ease-in-out;

    @media (max-width: 768px) {
      height: 210px;
      width: 150px;
    }

    @media (max-width: 480px) {
      height: 140px;
    }
  }

  &.card-6 {
    width: 150px;
    height: 210px;
    transition: all 0.6s ease-in-out;

    @media (max-width: 768px) {
      height: 180px;
      width: 100px;
    }

    @media (max-width: 480px) {
      height: 100px;
    }
  }

  &.card-7 {
    width: 150px;
    height: 175px;
    transition: all 0.6s ease-in-out;

    @media (max-width: 768px) {
      height: 150px;
      width: 100px;
    }
  }

  @media (max-width: 480px) {
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

  const handleNext = () => {
    const updated = [...cards];
    const last = updated.pop(); // quita el último
    if (last) {
      updated.unshift(last); // ... y lo pone al principio
      setCards(updated);
    }
  };

  return (
    <Container>
      <Title>
        MATCH<Italic> con tu skill ideal</Italic>
      </Title>
      <Subtitle>
        “A VECES NI SABEMOS QUE LO
        <br />
        NECESITAMOS, HASTA QUE LO VEMOS.”
      </Subtitle>
      <CarouselWrapper>
        <CardsContainer>
          {cards.map((card, index) => (
            <Card
              key={card.id}
              imgsrc={card.imgsrc}
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
