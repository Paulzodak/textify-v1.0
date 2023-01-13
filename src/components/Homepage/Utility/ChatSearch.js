import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { GoSearch as SearchIcon } from "react-icons/go";
const Container = styled.div`
  margin: 1rem 0.2rem;
  padding: 0 1rem;
`;
const Input = styled.input`
  width: 100%;
  font-size: 1rem;
  height: 2rem;
  background-color: ${({ bg }) => bg};
  border: none;
  border-radius: 0.5rem;
  box-sizing: border-box;
  position: relative;
  padding-left: 2.5rem;
  &::placeholder {
    font-size: inherit;
  }
`;
const StyledForm = styled.form``;
const SearchIconContainer = styled.div`
  position: absolute;
  top: 5.7rem;
  left: 2rem;
`;
const ChatSearch = () => {
  const { colors } = useSelector((state) => state.styles);
  return (
    <Container>
      <StyledForm>
        <Input placeholder="Search" bg={colors.bgGrey} />
      </StyledForm>
      <SearchIconContainer>
        <SearchIcon size="1rem" />
      </SearchIconContainer>
    </Container>
  );
};

export default ChatSearch;
