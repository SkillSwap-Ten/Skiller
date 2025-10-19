"use client";
import { ISearchProps } from "@/src/shared/types/molecules/search.type";
import React, { useState } from "react";
import { VscSearch, VscWholeWord } from "react-icons/vsc";
import styled from "styled-components";
import ButtonAside from "../../atoms/buttons/ButtonAside";
import InputTable from "../../atoms/inputs/InputTable";

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 1rem;
`;

const InputContainer = styled.div`
  width: 60%;
  min-width: 222px !important;
  height: 50px;
`;

const ButtonContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.textDark};
  width: 50px;
  height: 50px;
`;

const Search: React.FC<ISearchProps> = ({ placeholder, label, onSearch, onTogglePartialSearch, isPartialSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setQuery(newValue);
    onSearch(newValue);
  };


  return (
    <SearchContainer>
      <InputContainer>
        {label && <label hidden>{label}</label>}
        <InputTable
          name="search"
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
        />
      </InputContainer>
      <ButtonContainer>
      <ButtonAside type="button" label={isPartialSearch ? "Exacta" : "Parcial"} onClick={onTogglePartialSearch}>
        {isPartialSearch ? <VscWholeWord /> : <VscSearch />}
      </ButtonAside>
      </ButtonContainer>
    </SearchContainer>
  );
};

export default Search;
