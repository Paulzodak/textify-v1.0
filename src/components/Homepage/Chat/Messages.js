import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useEffect } from "react";
const StyledContainer = styled.div`
  position: fixed;
  width: 100vw;
  top: 4.2rem;
  bottom: 3.5rem;
  /* overflow-x: hidden; */
  overflow-y: scroll;
  /* border: 1px solid red; */
  &::-webkit-scrollbar {
    width: 0.2rem;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  /* height: 100%; */
`;
const StyledMessage = styled.div`
  background-color: blue;
  font-size: 1rem;
  width: 60vw;
`;
const Left = styled(StyledMessage)`
  float: left;

  /* border: 1px solid red; */
`;
const Right = styled(StyledMessage)`
  float: right;

  /* border: 1px solid red; */
  /* position: relative; */
`;

const Messages = ({ messages, focused }) => {
  const { currentUser } = useSelector((state) => state.user);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, focused]);
  return (
    <StyledContainer>
      {messages.map((message) => {
        if (message.sender === currentUser.username) {
          return (
            <>
              <br />
              <Right ref={ref}>{message.message}</Right>
              <br />
              <br />
            </>
          );
        } else {
          return (
            <>
              <br />
              <Left ref={ref}>{message.message}</Left>
              <br />
              <br />
            </>
          );
          // }
        }
      })}
    </StyledContainer>
  );
};

export default Messages;
