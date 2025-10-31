'use client';
import React, { useState } from "react";
import styled from "styled-components";
import { ISelectProps } from "@/src/shared/types/atoms/select.type";
import { LuAppWindow, LuBarChart, LuCode2, LuPencil } from "react-icons/lu";
import { IoChatbubblesOutline } from "react-icons/io5";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

const SelectStyled = styled.select`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.textWhite};
  color: ${({ theme }) => theme.colors.textWhite};
  background: transparent;
  border-radius: 10px;
  font-size: 16px;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  pointer-events: none;
  user-select: none;
  opacity: 0.8;
`;

const ButtonRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  & button:hover{
    transform: scale(1.1);
    transition: 0.6s ease-in-out;
    background: #ffffff4c;
  }
`;

const InfoText = styled.sub`
  padding-left: 12px;
  border-left: 3px solid #ffffff66;
`;

const OptionButton = styled.button<{ active: boolean }>`
  width: ${({ active }) => active ? 'clamp(2.5rem,5vw,3.25rem)' : 'clamp(1.75rem,5vw,2.5rem)'};
  height: ${({ active }) => active ? 'clamp(2.5rem,5vw,3.25rem)' : 'clamp(1.75rem,5vw,2.5rem)'};
  color: ${({ theme }) => theme.colors.textGrey};
  font-size: 2rem;
  cursor: pointer;
  background: ${({ active }) => active ? '#ffffff66' : '#ffffff33'};
  transition: 0.6s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: none;
  color: ${({ theme }) => theme.colors.textWhite};
  cursor: pointer;
  backdrop-filter: blur(4px);

  & svg {
    width: ${({ active }) => active ? 'clamp(1.5rem,5vw,1.75rem)' : 'clamp(1rem,5vw,1.25rem)'};
    height: ${({ active }) => active ? 'clamp(1.5rem,5vw,1.75rem)' : 'clamp(1rem,5vw,1.25rem)'};
  }
`;

const SelectAuth: React.FC<ISelectProps> = ({
  id,
  title,
  className,
  onChange,
  ariaLabel,
  name,
  required = false,
  autoComplete,
}) => {
  const options = [
    { value: "Desarrollo", text: "Aquí viven las mentes inquietas del código y amantes de los retos lógicos que transforman ideas en realidad digital.", icon: <LuCode2 /> },
    { value: "Diseño", text: "Estás entre artistas visuales, creadores de experiencias y amantes de lo estético. Ven la belleza donde otros no la notan.", icon: <LuPencil /> },
    { value: "Marketing", text: "Estás rodeado de creativos y estrategas, con un olfato increíble para las tendencias. ¡Saben cómo hacer que el mundo los escuche!", icon: <LuBarChart /> },
    { value: "Comunicación", text: "Aquí reinan los que dominan las palabras, conectan con el mundo y saben cómo contar historias que inspiran.", icon: <IoChatbubblesOutline /> },
    { value: "Entretenimiento", text: "Aquí se vibra alto con creatividad, carisma y pasión por hacer reír, emocionar y entretener al mundo.", icon: <LuAppWindow /> },
  ];

  const [selected, setSelected] = useState<string>(options[0].value);

  return (
    <Container>
      {/* select disabled para integrarse al form */}
      <SelectStyled
        id={id}
        title={title}
        value={selected}
        aria-label={ariaLabel}
        name={name}
        required={required}
        autoComplete={autoComplete}
        onChange={onChange}
        className={className}
        disabled
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            Bienvenido a {opt.value}
          </option>
        ))}
      </SelectStyled>

      <ButtonRow>
        {options.map((opt) => (
          <OptionButton
            type={"button"}
            key={opt.value}
            active={opt.value === selected}
            onClick={() => setSelected(opt.value)}
          >
            {opt.icon}
          </OptionButton>
        ))}
      </ButtonRow>

      <InfoText>
        {options.find((opt) => opt.value === selected)?.text}
      </InfoText>
    </Container>
  );
};

export default SelectAuth;
