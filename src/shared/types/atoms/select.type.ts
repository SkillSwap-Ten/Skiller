import React from "react";

export interface ISelectProps {
  id:string
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  disabled?: boolean;
  ariaLabel: string;
  name: string;
  title: string;
  required?: boolean;
  autoComplete?: string
  children?: React.ReactNode
}

export interface ISelectSkillsProps extends ISelectProps {
  allSkills: string; // String con todas las skills disponibles (separadas por comas)
  value: string; // String con las skills del usuario (separadas por comas)
}