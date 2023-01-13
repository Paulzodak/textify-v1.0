import React from "react";
import ChatList from "../components/Homepage/ChatList/ChatList";
import HomeNav from "../components/Homepage/HomeNav";
import styled from "styled-components";
import { motion } from "framer-motion";
import Chat from "../components/Homepage/Chat/Chat";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineUserAdd as AddUserIcon } from "react-icons/ai";
import { AnimatePresence } from "framer-motion";

const StyledContainer = styled.div`
  position: relative;
  /* border: 1px solid red; */
  top: 0rem;
  width: 100vw;
  height: 100vh;

  @media (min-width: 500px) {
    display: grid;
    grid-template-columns: 50% 50%;
  }
`;
const StyledPosition = styled.div`
  @media (min-width: 500px) {
    position: relative;
    top: 0rem;
    height: 100%;
    width: 100%;
  }
`;
const StyledAddUser = styled(motion.div)`
  border-radius: 100%;
  position: fixed;
  z-index: -10;
  bottom: 5rem;
  right: 1.5rem;
  display: inline-block;
  padding: 1rem;
  box-shadow: 0px 0px 10px #95b0b6;

  background-image: linear-gradient(
    to right top,
    #00d1ed,
    #00c5e0,
    #00bad3,
    #00aec6,
    #00a3b9,
    #0098ac,
    #008d9f,
    #008293,
    #007483,
    #006774,
    #005a65,
    #004d57
  );
`;

const ChatPage = ({ mountChats }) => {
  const { showChat } = useSelector((state) => state.home.layout);
  return (
    <>
      <StyledContainer>
        <ChatList key="chatList" mountChats={mountChats} />
        <AnimatePresence>
          <StyledPosition> {showChat && <Chat />}</StyledPosition>
        </AnimatePresence>
        {/* <StyledAddUser
        initial={{ x: "200%" }}
        animate={{
          x: "0%",
          transition: {
            type: "spring",
            stiffness: 500,
            damping: 100,
            mass: 20,
          },
        }}
        exit={{ x: "200%", transition: { duration: 0.1 } }}
        // transition={{
        //   type: "spring",
        //   stiffness: 500,
        //   damping: 100,
        //   mass: 20,
        // }}
        key="userIcon"
      >
        <AddUserIcon color="white" size="2.5rem" />
      </StyledAddUser> */}
      </StyledContainer>
    </>
  );
};

export default ChatPage;
