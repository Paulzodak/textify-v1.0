import React from "react";
import styled from "styled-components";
import { AiOutlineMenu as MenuIcon } from "react-icons/ai";
import ChatSearch from "./ChatSearch";
import { useSelector } from "react-redux";
const StyledContainer = styled.div`
  /* height: 5rem; */
  padding: 1rem 1rem 0 1rem;
  border-bottom: 1px solid ${({ bd }) => bd};
  position: sticky;
  /* border: 1px solid grey; */
  background-color: white;
  width: 100%;
  top: 0rem;
  box-sizing: border-box;
`;
const Row_1 = styled.div`
  /* border: 1px solid red; */
`;
const Messages = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
`;
const MenuIconContainer = styled.span`
  float: right;
`;
const Utility = () => {
  const { colors } = useSelector((state) => state.styles);
  return (
    <>
      <StyledContainer bd={colors.bgGrey}>
        <Row_1>
          <Messages>Messages</Messages>
          <MenuIconContainer>
            <MenuIcon size="1.5rem" />
          </MenuIconContainer>
        </Row_1>
        <ChatSearch />
      </StyledContainer>
    </>
  );
};

export default Utility;
