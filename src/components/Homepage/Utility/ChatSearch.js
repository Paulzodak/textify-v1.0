import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { GoSearch as SearchIcon } from "react-icons/go";
const Container = styled.div`
  margin: 1rem 0.2rem;
`;
const Input = styled.input`
  width: 100%;
  font-size: 0.9rem;
  height: 2rem;
  background-color: ${({ bg }) => bg};
  border: none;
  border-radius: 0.5rem;
  position: relative;
  padding-left: 2.5rem;
  &::placeholder {
    font-size: inherit;
  }
`;

const SearchIconContainer = styled.div`
  position: absolute;
  top: 4.4rem;
  left: 2rem;
`;
const ChatSearch = () => {
  const { colors } = useSelector((state) => state.styles);
  return (
    <Container>
      <Input placeholder="Search" bg={colors.bgGrey} />
      <SearchIconContainer>
        <SearchIcon size="1rem" />
      </SearchIconContainer>
    </Container>
  );
};

export default ChatSearch;
