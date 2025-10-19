'use client';
import React from "react";
import styled from "styled-components";
import { ILabelProps } from '@/src/shared/types/atoms/label.type';

const AuthLabelStyled = styled.label`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textWhite};
  margin-bottom: 5px;
  display: block;
  margin-top: 10px;
`;

const Label: React.FC<ILabelProps> = ({ text, htmlFor, className }) => {
  return (
    <AuthLabelStyled htmlFor={htmlFor} className={className}>
      {text}
    </AuthLabelStyled>
  );
};

export default Label;