'use client';
import React from "react";
import styled from "styled-components";
import { ILabelProps } from '@/src/shared/types/atoms/label.type';

const LabelStyled = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 5px;
`;

const Label: React.FC<ILabelProps> = ({ text, htmlFor, className }) => {
  return (
    <LabelStyled htmlFor={htmlFor} className={className}>
      {text}
    </LabelStyled>
  );
};

export default Label;