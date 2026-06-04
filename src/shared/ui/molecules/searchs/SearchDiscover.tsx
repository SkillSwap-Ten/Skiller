"use client";
import { ISearchProps } from "@/src/shared/types/molecules/search.type";
import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0 !important;
  margin: 0;
  width: 100%;
`;

const Label = styled.label`
  font-size: 18px;
  background: ${({ theme }) => theme.colors.bgPrimary};
  color: ${({ theme }) => theme.colors.textDark};
  border: 1px solid ${({ theme }) => theme.colors.borderDark};
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  width: 2.6rem;
  height: 38px;
  padding: 0;
  margin: 0;
  opacity: 0.8;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: none;
  font-weight: bolder;
`;

const Input = styled.input`
  width: 100%;
  height: 38px;
  max-width: 1000px;
  padding: 8px 12px;
  font-size: 15px;
  background: ${({ theme }) => theme.colors.bgPrimary};
  border: 1px solid ${({ theme }) => theme.colors.borderDark};
  border-right: none;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  margin: 0;
  transition: background 0.4s ease;

  &:focus {
    outline: none;    
    transition: background 0.4s ease; 
    background: ${({ theme }) => theme.colors.bgNeutral}; 
    border-right: 1px solid ${({ theme }) => theme.colors.borderDark};
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