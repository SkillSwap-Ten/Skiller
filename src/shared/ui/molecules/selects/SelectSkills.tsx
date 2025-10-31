'use client';
import { ISelectSkillsProps } from '@/src/shared/types/atoms/select.type';
import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: transparent;
  padding-top: 2px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  outline: none;
  background-color: ${({ theme }) => `${theme.colors.textSecondary}33`};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 12px;

  &::placeholder {
    color: ${({ theme }) => `${theme.colors.textSecondary}AA`};
  }
`;

const SkillsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-height: 112px;
  overflow-y: auto;
  padding-right: 6px;
`;

const SkillOption = styled.span<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${({ active, theme }) => active ? 'transparent' : theme.colors.textSecondary};
  color: ${({ theme }) => theme.colors.textSecondary};
  background-color: ${({ active, theme }) =>
    active ? `${theme.colors.textSecondary}33` : 'transparent'};
  border-radius: 9999px;
  padding: 6px 10px;
  font-size: 14px;
  cursor: pointer;
  min-width: 100px;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 500px) {
    min-width: 60px;
  }
`;

const OptionSymbol = styled.span`
  margin-left: 6px;
  font-weight: bold;
`;

const SelectSkills: React.FC<ISelectSkillsProps> = ({
  title,
  name,
  allSkills,
  value,
  onChange,
}) => {
  // Convertir los strings entrantes en arrays limpios
  const allSkillsArray = allSkills
    .split(',')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  const userSkillsArray = value
    .split(',')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>(userSkillsArray);
  const selectRef = useRef<HTMLSelectElement>(null);

  // Sincronizar el estado interno con el valor externo del formulario
  useEffect(() => {
    const updated = value
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
    setSelected(updated);
  }, [value]);

  // Emitir un evento "real" compatible con handleSelectChange
  const triggerChangeEvent = (skills: string[]) => {
    if (!selectRef.current) return;

    const event = {
      target: {
        name,
        value: skills.join(','),
      },
    } as unknown as React.ChangeEvent<HTMLSelectElement>;

    onChange(event);
  };

  const handleToggle = (skill: string) => {
    setSelected(prev => {
      const newSelection = prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill];

      triggerChangeEvent(newSelection);
      return newSelection;
    });
  };

  // Normaliza texto: pasa a minúsculas y elimina caracteres no alfanuméricos
  const normalize = (str: string) =>
    str
      .toLowerCase()
      .normalize('NFD')
      .replaceAll(/[\u0300-\u036f]/g, '')
      .replaceAll(/[^a-z0-9\s]/gi, '')
      .trim();

  // Filtrado por palabras
  const filtered = allSkillsArray.filter(skill => {
    const normalizedSkill = normalize(skill);
    const normalizedSearch = normalize(search);

    if (!normalizedSearch) return true;

    const searchWords = normalizedSearch.split(/\s+/);
    return searchWords.every(word => normalizedSkill.includes(word));
  });

  // Mostrar primero las skills seleccionadas
  filtered.sort((a, b) => {
    const aSelected = selected.includes(a);
    const bSelected = selected.includes(b);
    return aSelected === bSelected ? 0 : aSelected ? -1 : 1;
  });

  return (
    <Container>
      <SearchInput
        type="text"
        placeholder="Busca tu habilidad..."
        value={search}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
      />
      <SkillsWrapper>
        {filtered.map(skill => {
          const active = selected.includes(skill);
          return (
            <SkillOption
              key={skill}
              active={active}
              onClick={() => handleToggle(skill)}
            >
              {skill}
              <OptionSymbol>{active ? '✕' : '+'}</OptionSymbol>
            </SkillOption>
          );
        })}
      </SkillsWrapper>

      {/* select hidden para integrarse al form */}
      <select title={title} ref={selectRef} name={name} multiple hidden>
        {selected.map(skill => (
          <option key={skill} value={skill} selected>
            {skill}
          </option>
        ))}
      </select>
    </Container>
  );
};

export default SelectSkills;
