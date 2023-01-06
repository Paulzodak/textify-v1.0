import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ChatItem from "./ChatItem/ChatItem";
import ChatItemSkeleton from "./ChatItem/ChatItemSkeleton";
import { AnimatePresence, motion } from "framer-motion";
import AddUser from "../../AddUsers/AddUser";
import EmptyChats from "./EmptyChats.js";
import Utility from "../Utility/Utility";

import { AiOutlineUserAdd as AddUserIcon } from "react-icons/ai";
const StyledContainer = styled.div``;
const StyledAddUser = styled(motion.div)`
  border-radius: 100%;
  position: fixed;
  bottom: 0rem;
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
  const { chats } = useSelector((state) => state.user);
  const [showAddUser, setShowAddUser] = useState(true);
  console.log(chats);
  const container = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const items = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };
  return (
    <StyledContainer
      initial={{ x: "-100%" }}
      animate={{ x: "0%", transition: { duration: 0.7, delay: 0.5 } }}
      exit={{ x: "-100%", transition: { ease: "easeOut" } }}
    >
      <Utility />
      {mountChats ? (
        <motion.div variants={container} initial="hidden" animate="show">
          {/* <AnimatePresence> */}
          {[...chats].map((item) => {
            // if (item.messages.length > 1) {
            return (
              <motion.div key={item.username} variants={items}>
                <ChatItem item={item} />
              </motion.div>
            );
            // }
          })}
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
      <AnimatePresence> {chats.length < 1 && <EmptyChats />}</AnimatePresence>
    </StyledContainer>
  );
};

export default ChatList;
