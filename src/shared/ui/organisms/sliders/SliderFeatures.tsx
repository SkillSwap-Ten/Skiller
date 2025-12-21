"use client"
import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { ISliderFeaturesProps, ISliderFeaturesData } from "@/src/shared/types/organisms/slider.type"
import { FaChevronLeft, FaChevronRight, FaShare, FaShieldAlt, FaExclamationTriangle } from "react-icons/fa"
import { toast } from "react-toastify"
import styled from "styled-components"
import ButtonFeature from "../../atoms/buttons/ButtonFeature"

const ANIM_DURATION = 500

const SliderContainer = styled.div<{ backgroundImage: string }>`
  position: relative;
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: bottom;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  margin: 0 auto;
  overflow: hidden;
`;

const SliderWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 8;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.75rem 2rem;
  color: ${({ theme }) => theme.colors.textWhite};
`;

const NavigationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: absolute;
  top: 45%;
  width: 100%;
  padding: 10px;
`;

const NavButton = styled(ButtonFeature)`
  width: 2rem;
  height: 2rem;

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;
  width: 100%;
  height: 100%;

  & > *{
    width: 100%;
  }
`;

const SlideArea = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

/**
 * single-layer slide content with animation stages:
 * - idle: visible (default)
 * - out: animate current out (with transition)
 * - preIn: new content positioned off-screen, NO transition (so it snaps into start pos)
 * - in: animate new content into place (with transition)
 */

const SlideItem = styled.div<{
  stage: "idle" | "out" | "preIn" | "in";
  direction: "left" | "right";
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display:flex;
  flex-direction:column;
  justify-content:center;
  padding: 1.75rem 0.75rem;
  box-sizing: border-box;
  will-change: transform, opacity;

  ${(p) => {
    const dur = `${ANIM_DURATION}ms`;
    const dir = p.direction === "right" ? 1 : -1;
    switch (p.stage) {
      case "idle":
        return `
          transform: translateX(0);
          opacity: 1;
          transition: transform ${dur} ease, opacity ${dur} ease;
        `;
      case "out":
        // outgoing slides out opposite to incoming movement
        return `
          transform: translateX(${ -100 * dir }%);
          opacity: 0;
          transition: transform ${dur} ease, opacity ${dur} ease;
        `;
      case "preIn":
        // place incoming offscreen WITHOUT transition
        return `
          transform: translateX(${ 100 * dir }%);
          opacity: 0;
          transition: none;
        `;
      case "in":
        return `
          transform: translateX(0);
          opacity: 1;
          transition: transform ${dur} ease, opacity ${dur} ease;
        `;
      default:
        return "";
    }
  }}
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: #ffffffe5;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
  max-width: 32rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;
  background: #ffffff33;
  color: ${({ theme }) => theme.colors.textWhite};
  border: 1px solid #ffffff4c;
  backdrop-filter: blur(4px);
  transition: all 0.2s ease;
  font-size: 0.9rem;
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  cursor: pointer;

  &:hover {
    background: #ffffff4c;
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

const IndicatorsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
  gap: 0.5rem;
`;

const Indicator = styled.button<{ active: boolean }>`
  width: 0.25rem;
  height: 0.15rem;
  border-radius: 5px;
  display: flex;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${(props) => (props.active ? "#fff" : "#ffffff50")};
  transform: ${(props) => (props.active ? "scale(1.25)" : "scale(1)")};

  &:hover {
    background: ${(props) => (props.active ? "#fff" : "#ffffff50")};
  }
`;

const SliderFeature: React.FC<ISliderFeaturesProps> = ({
  openModalReport, openModalTips,
  autoAdvance = true,
  autoAdvanceInterval = 5000,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentIndexRef = useRef(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [animState, setAnimState] = useState<"idle" | "out" | "preIn" | "in">("idle")
  const [animDirection, setAnimDirection] = useState<"left" | "right">("right")

  const timersRef = useRef<number | null>(null)

  useEffect(() => { currentIndexRef.current = currentIndex }, [currentIndex])

  const slides: ISliderFeaturesData[] = [
    {
      title: "Compartir",
      description: "Invita a tus amigos a unirse a nuestra comunidad de habilidades digitales.",
      buttonText: "Compartir",
      buttonIcon: <FaShare />,
      backgroundImage: "/img/bg-feature.webp",
      action: () => {
        if (navigator.share) {
          navigator.share({
            title: "Visita SkillSwap · Looking for Skill",
            text: "✨ ¡Ya hago parte de la comunidad SkillSwap! 🚀 Aventúrate también a intercambiar habilidades digitales.",
            url: "https://skill-swap-ten.vercel.app/",
          }).catch(() => {});
        } else {
          toast.error("Tu navegador no soporta la opción de compartir directamente.");
        }
      },
    },
    {
      title: "Seguridad",
      description: "Conoce nuestras recomendaciones para una experiencia segura.",
      buttonText: "Ver Tips",
      buttonIcon: <FaShieldAlt />,
      backgroundImage: "/img/bg-feature.webp",
      action: openModalTips,
    },
    {
      title: "Reportar",
      description: "¿Encontraste un comportamiento inapropiado? Reporta al usuario.",
      buttonText: "Reportar",
      buttonIcon: <FaExclamationTriangle />,
      backgroundImage: "/img/bg-feature.webp",
      action: openModalReport,
    },
  ]

  // safe cleanup
  useEffect(() => {
    return () => {
      if (timersRef.current) {
        globalThis.clearTimeout(timersRef.current)
      }
    }
  }, [])

  // orchestrator: slide change with robust stages
  const animateTo = useCallback((index: number, direction: "left" | "right") => {
    if (index === currentIndexRef.current) return
    if (isAnimating) return

    setIsAnimating(true)
    setAnimDirection(direction)

    // start outgoing
    setAnimState("out")

    // after outgoing duration -> swap content and prepare preIn
    timersRef.current = window.setTimeout(() => {
      // swap index (this also changes the background since container uses currentIndex)
      setCurrentIndex(index)
      // snap new content to offscreen start without transition
      setAnimState("preIn")

      // next frame -> animate in
      requestAnimationFrame(() => {
        // second RAF to ensure the 'preIn' styles applied before transitioning
        requestAnimationFrame(() => {
          setAnimState("in")
        })
      })

      // finish after in duration
      timersRef.current = window.setTimeout(() => {
        setAnimState("idle")
        setIsAnimating(false)
      }, ANIM_DURATION)
    }, ANIM_DURATION)
  }, [isAnimating])

  // helpers to pick direction considering wrap-around (shortest path)
  const goToSlide = (index: number) => {
    const len = slides.length
    if (index === currentIndexRef.current) return
    const cur = currentIndexRef.current
    const forwardDistance = (index - cur + len) % len
    const backwardDistance = (cur - index + len) % len
    const direction = forwardDistance <= backwardDistance ? "right" : "left"
    animateTo(index, direction)
  }

  const nextSlide = () => {
    const len = slides.length
    const next = (currentIndexRef.current + 1) % len
    animateTo(next, "right")
  }

  const prevSlide = () => {
    const len = slides.length
    const prev = (currentIndexRef.current - 1 + len) % len
    animateTo(prev, "left")
  }

  // autoplay
  useEffect(() => {
    if (!autoAdvance) return
    const id = globalThis.setInterval(() => {
      nextSlide()
    }, autoAdvanceInterval)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoAdvance, autoAdvanceInterval, slides.length])

  const currentSlide = slides[currentIndex]

  const renderSlideContent = (index: number) => {
    const s = slides[index]
    return (
      <>
        <Title>{s.title}</Title>
        <Description>{s.description}</Description>
        <ActionButton aria-label="Action Button" onClick={s.action}>
          {s.buttonIcon}
          {s.buttonText}
        </ActionButton>
      </>
    )
  }

  return (
    <SliderContainer backgroundImage={currentSlide.backgroundImage} className={className}>
      <SliderWrapper>
        <ContentWrapper>
          <NavigationWrapper>
            <NavButton onClick={prevSlide} type={"button"} aria-label="Slide anterior">
              <FaChevronLeft />
            </NavButton>

            <NavButton onClick={nextSlide} type={"button"} aria-label="Siguiente slide">
              <FaChevronRight />
            </NavButton>
          </NavigationWrapper>

          <MainContent>
            <SlideArea>
              {/* single layer that animates across stages */}
              <SlideItem
                stage={animState}
                direction={animDirection}
                style={{ zIndex: 12, position: animState === "preIn" ? "absolute" : "absolute" }}
              >
                {renderSlideContent(currentIndex)}
              </SlideItem>
            </SlideArea>
          </MainContent>

          <IndicatorsWrapper>
            {slides.map((_, index) => (
              <Indicator
                key={index}
                active={index === currentIndex}
                onClick={() => goToSlide(index)}
                aria-label={`Ir al slide ${index + 1}`}
              />
            ))}
          </IndicatorsWrapper>
        </ContentWrapper>
      </SliderWrapper>
    </SliderContainer>
  )
}

export default SliderFeature;
