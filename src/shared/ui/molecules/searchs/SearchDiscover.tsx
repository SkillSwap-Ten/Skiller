"use client";
import { ISearchProps } from "@/src/shared/types/molecules/search.type";
import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 !important;
  margin: 0;
`;

const Label = styled.label`
  font-size: 26px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textDark};
  border: 1px solid ${({ theme }) => theme.colors.borderDark};
  width: 2.6rem;
  height: 39px;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-left: 0;
`;

const Input = styled.input`
  width: 80%;
  height: 39px;
  max-width: 1000px;
  padding: 8px 12px;
  font-size: 15px;
  border: 1px solid ${({ theme }) => theme.colors.borderDark};
  border-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  margin: 0;

  &:focus {
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