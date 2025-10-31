"use client";
import { ISearchProps } from "@/src/shared/types/molecules/search.type";
import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: start !important;
  gap: 1rem;
  width: 100%;
  padding: 0 !important;
  margin: 0;
`;

const Label = styled.label`
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0.25;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 80%;
  max-width: 1000px;
  padding: 10px 20px;
  font-size: 15px;
  border: 1px solid ${({ theme }) => theme.colors.borderDark};
  border-radius: 5px;
  margin: 0;

  &:focus {
    border-color: ${({ theme }) => theme.colors.textSecondary};
    outline: none;
  }

  @media (max-width: 1000px) {
    width: 100%;
  }
`;

const SearchDiscover: React.FC<ISearchProps> = ({ label, placeholder, onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setQuery(newValue);
    onSearch(newValue);
  };

  return (
    <Container>
      <Input type="text" value={query} onChange={handleChange} placeholder={placeholder} />
      <Label>{label}</Label>
    </Container>
  );
};

export default SearchDiscover;