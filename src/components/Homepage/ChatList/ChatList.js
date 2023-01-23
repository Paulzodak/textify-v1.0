import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ChatItem from "./ChatItem/ChatItem";
import ChatItemSkeleton from "./ChatItem/ChatItemSkeleton";
import { AnimatePresence, motion } from "framer-motion";
import AddUser from "../../AddUsers/AddUser";
import EmptyChats from "./EmptyChats.js";
import Utility from "../Utility/Utility";
import useConsistentCurrentUserDataFetch from "../../../Hooks/useConsistentCurrentUserDataFetch";
import { AiOutlineUserAdd as AddUserIcon } from "react-icons/ai";
import propTypes from "prop-types";
const StyledContainer = styled(motion.div)`
  border-right: 1px solid ${({ bd }) => bd};
  height: 100%;
  width: 100%;
`;
const StyledChatsContainer = styled.div``;

const StyledAddUser = styled(motion.div)`
  border-radius: 100%;
  position: fixed;
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
const ChatList = ({ mountChats }) => {
  const { bgGrey } = useSelector((state) => state.styles.colors);
  const { chats } = useSelector((state) => state.user);
  const [state, setState] = useState(1);
  const { currentUser } = useSelector((state) => state.user);
  const container = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const items = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };
  return (
    <StyledContainer
      bd={bgGrey}
      initial={{ x: "-100%" }}
      animate={{ x: "0%", transition: { duration: 0.7, delay: 0.5 } }}
      exit={{ x: "-100%", transition: { ease: "easeOut" } }}
    >
      <Utility />
      <StyledChatsContainer>
        {mountChats ? (
          <motion.div variants={container} initial="hidden" animate="show">
            <AnimatePresence>
              {[...chats]
                .sort(() => state)
                .map((item) => {
                  // if (item.messages.length > 1) {
                  return (
                    <motion.div
                      layout={true}
                      key={item.username}
                      variants={items}
                    >
                      <ChatItem item={item} />
                    </motion.div>
                  );
                  // }
                })}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div variants={container} initial="hidden" animate="show">
            {/* <AnimatePresence> */}
            {[...chats].map((item) => {
              return (
                <motion.div key={item.id} variants={items}>
                  <ChatItemSkeleton item={item} />
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </StyledChatsContainer>
      <AnimatePresence> {chats.length < 1 && <EmptyChats />}</AnimatePresence>
      <StyledAddUser
        whileHover={{ scale: 1.3, rotate: 360 }}
        whileTap={{
          scale: 0.8,
          rotate: -90,
        }}
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
      </StyledAddUser>
      {/* <button onClick={() => setState(-1)}>set</button> */}
    </StyledContainer>
  );
};
ChatList.propTypes = {
  // AWAITS CHAT DATA FROM DB
  mountChats: propTypes.bool.isRequired,
  //
};
export default ChatList;
