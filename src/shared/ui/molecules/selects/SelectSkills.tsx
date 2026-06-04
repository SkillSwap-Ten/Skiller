'use client';
import React, { useState, ChangeEvent, useMemo } from 'react';
import { ISelectSkillsProps } from '@/src/shared/types/atoms/select.type';
import { IoAdd, IoClose } from 'react-icons/io5';
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
  border-radius: 10px;
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

const SkillOption = styled.span<{ $active: boolean }>`
  background-color: ${({ $active, theme }) =>
    $active ? `${theme.colors.textSecondary}33` : 'transparent'};
  border: 1px solid ${({ $active, theme }) =>
    $active ? 'transparent' : theme.colors.textSecondary};
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 80px;
  width: fit-content;
  border-radius: 9999px;
  padding: 6px 10px;
  font-size: 14px;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
    transition: all 0.2s ease-in-out;
  }

  @media (max-width: 500px) {
    min-width: 60px;
  }
`;

const SelectSkills: React.FC<ISelectSkillsProps> = ({
  title,
  name,
  allSkills,
  value,
  onChange,
}) => {
  // --- Estado ---
  const [search, setSearch] = useState('');
  const selectedSkills = useMemo(
  () =>
    value
      .split(',')
      .map(skill => skill.trim())
      .filter(Boolean),
  [value]
);

  // --- Evento que dispara cambio ---
  const triggerChangeEvent = (skills: string[]) => {
    const event = {
      target: {
        name,
        value: skills.join(','),
      },
    } as unknown as React.ChangeEvent<HTMLSelectElement>;

    onChange(event);
  };

  // --- Toggle skill ---
const handleToggle = (skillName: string) => {
  const newSelection = selectedSkills.includes(skillName)
    ? selectedSkills.filter(skill => skill !== skillName)
    : [...selectedSkills, skillName];

  triggerChangeEvent(newSelection);
};

  // --- Normalización ---
  const normalize = (str: string) =>
    str
      .toLowerCase()
      .normalize('NFD')
      .replaceAll(/[\u0300-\u036f]/g, '')
      .replaceAll(/[^a-z0-9\s]/gi, '')
      .trim();

  const normalizedSearch = normalize(search);

  // --- Filtrado principal ---
  const filtered = allSkills.filter(skill => {
    if (!normalizedSearch) return true;

    const searchWords = normalizedSearch.split(/\s+/);
    const name = normalize(skill.name);
    const aliases = skill.aliases?.map(a => normalize(a)) || [];

    return searchWords.every(
      word => name.includes(word) || aliases.some(alias => alias.includes(word))
    );
  });

  // --- Mapa de relevancia de relacionados ---
  const relatedCountMap = new Map<string, number>();
  if (normalizedSearch) {
    filtered.forEach(skill => {
      (skill.related || []).forEach(rel => {
        relatedCountMap.set(rel, (relatedCountMap.get(rel) || 0) + 1);
      });
    });
  }

  // --- Skills relacionadas con peso ---
  const relatedSkills = Array.from(relatedCountMap.entries())
    .map(([name, count]) => ({
      skill: allSkills.find(s => s.name === name),
      count,
    }))
    .filter(
      (item): item is { skill: typeof allSkills[0]; count: number } => !!item.skill
    );

  // --- Unificar sin duplicados ---
  const skillMap = new Map<string, typeof allSkills[0]>();
  // 1. Seleccionados
  selectedSkills.forEach(name => {
    const skill = allSkills.find(s => s.name === name);
    if (skill) skillMap.set(skill.name, skill);
  });
  // 2. Filtrados
  filtered.forEach(skill => {
    if (!skillMap.has(skill.name)) {
      skillMap.set(skill.name, skill);
    }
  });
  // 3. Relacionados
  relatedSkills.forEach(({ skill }) => {
    if (!skillMap.has(skill.name)) {
      skillMap.set(skill.name, skill);
    }
  });

  // --- Lista final ordenada ---
  const finalSkills = Array.from(skillMap.values()).sort((a, b) => {
    const aSelected = selectedSkills.includes(a.name);
    const bSelected = selectedSkills.includes(b.name);
    if (aSelected !== bSelected) return aSelected ? -1 : 1;

    const aInFiltered = filtered.some(f => f.name === a.name);
    const bInFiltered = filtered.some(f => f.name === b.name);
    if (aInFiltered !== bInFiltered) return aInFiltered ? -1 : 1;

    const aRel = relatedCountMap.get(a.name) || 0;
    const bRel = relatedCountMap.get(b.name) || 0;
    return bRel - aRel;
  });

  // --- Render ---
  return (
    <Container>
      <SearchInput
        type="text"
        placeholder="Busca tu habilidad..."
        value={search}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
      />
      <SkillsWrapper>
        {finalSkills.map(skill => {
          const active = selectedSkills.includes(skill.name);
          return (
            <SkillOption
              key={skill.name}
              $active={active}
              onClick={() => handleToggle(skill.name)}
            >
              {skill.name}
              {active ? <IoClose /> : <IoAdd />}
            </SkillOption>
          );
        })}
      </SkillsWrapper>

      {/* select hidden para integrarse al form */}
      <select
        title={title}
        name={name}
        multiple
        hidden
        value={selectedSkills}
        onChange={() => {}}
      >
        {allSkills.map(skill => (
          <option
            key={skill.name}
            value={skill.name}
          >
            {skill.name}
          </option>
        ))}
      </select>
    </Container>
  );
};

export default SelectSkills;
