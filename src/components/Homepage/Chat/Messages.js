import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useEffect } from "react";
import userIcon from "../../../images/user.png";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
const StyledContainer = styled.div`
  position: fixed;
  width: 100vw;
  top: 4.2rem;
  bottom: 3.5rem;
  overflow-x: hidden;
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
const StyledMessageContainer = styled.div`
  /* border: 1px solid red; */
  font-size: 1rem;
  /* width: 50vw; */
  margin: 0.5rem;
  /* position: relative; */
  display: grid;
  column-gap: 0.5rem;
`;
const Left = styled(StyledMessageContainer)`
  float: left;
  grid-template-columns: 2rem auto;
  max-width: 60%;
  /* border: 1px solid red; */
`;
const Right = styled(StyledMessageContainer)`
  float: right;
  grid-template-columns: auto 2rem;
  max-width: 60%;
  /* border: 1px solid green; */
`;
const StyledProfileImage = styled.img`
  width: 100%;
  /* height: 100%; */
`;
const StyledMsgContent = styled.div`
  /* border: 1px solid red; */
  background-color: ${({ bg }) => bg};
  padding: 0.5rem;
  box-sizing: border-box;
  /* border-radius: 0.5rem 0.5rem 0.5rem 0.5rem; */
  border-radius: ${({ ps }) =>
    ps === "right" ? " 0.5rem 0 0.5rem 0.5rem" : " 0 0.5rem 0.5rem 0.5rem "};
`;

const StyledBlockWrapper = styled(motion.div)`
  /* top: 0rem; */
  /* display: block; */
  /* border: 1px solid red; */
  display: inline-block;
  width: 100vw;

  /* height: 3rem; */
  /* margin: 1rem 0.5rem; */
`;
const StyledTime = styled.div`
  color: ${({ cl }) => cl};
  font-size: 0.8rem;
  text-align: ${({ align }) => align};
  /* border: 1px solid red; */
`;
const Messages = ({ messages, focused }) => {
  const { currentUser } = useSelector((state) => state.user);
  const { lightBgGreen } = useSelector((state) => state.styles.colors);
  const { bgGrey } = useSelector((state) => state.styles.colors);
  const { textGrey } = useSelector((state) => state.styles.colors);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, focused]);
  return (
    <StyledContainer>
      <AnimatePresence>
        {[...messages].map((message) => {
          if (message.sender === currentUser.username) {
            return (
              <StyledBlockWrapper
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: 1,

                  opacity: 1,
                }}
                exit={{ opacity: 0, scale: 0 }}
                key={message.message}
              >
                <Right ref={ref}>
                  <StyledMsgContent ps={"right"} bg={bgGrey}>
                    {message.message}
                  </StyledMsgContent>
                  <StyledProfileImage src={userIcon} />
                  <StyledTime align={"right"} cl={textGrey}>
                    {message.createdAt}
                  </StyledTime>
                </Right>
              </StyledBlockWrapper>
            );
          } else {
            return (
              <StyledBlockWrapper
                initial={{ x: -500 }}
                animate={{
                  x: 0,
                  transition: {
                    type: "spring",
                    stiffness: 200,
                    damping: 40,
                    mass: 2,
                  },
                }}
                exit={{ x: -500, ease: "easeOut" }}
                key={message.message}
              >
                <Left ref={ref}>
                  <StyledProfileImage src={userIcon} />
                  <StyledMsgContent ps={"left"} bg={lightBgGreen}>
                    {message.message}
                  </StyledMsgContent>
                  <div></div>
                  <StyledTime alight={"left"} cl={textGrey}>
                    {message.createdAt}
                  </StyledTime>
                </Left>
              </StyledBlockWrapper>
            );
            // }
          }
        })}
      </AnimatePresence>
    </StyledContainer>
  );
};

export default Messages;
