import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ChatItem from "./ChatItem/ChatItem";
import ChatItemSkeleton from "./ChatItem/ChatItemSkeleton";
import { AnimatePresence, motion } from "framer-motion";
const ChatList = ({ mountChat }) => {
  const { chats } = useSelector((state) => state.user);
  console.log(chats);
  const container = {
    hidden: {
      opacity: 1,
      transition: {
        x: 200,
      },
    },
    show: {
      opacity: 1,
      transition: {
        x: 0,
        delayChildren: 0.5,
        staggerDirection: -1,
      },
    },
  };

  const items = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };
  return (
    <>
      {/* <motion.ul variants={container} initial="hidden" animate="show">
        <AnimatePresence>
          <motion.li variants={items}>edede</motion.li>
          <motion.li variants={items}>edede</motion.li>
        </AnimatePresence>
      </motion.ul> */}
      {mountChat ? (
        <motion.div variants={container} initial="hidden" animate="show">
          <AnimatePresence>
            {[...chats].map((item) => {
              return (
                <motion.div
                  key={item.id}
                  // layout={true}
                  // whileTap={{ scale: 1.1 }}
                  // whileHover={{ x: 5 }}
                  variants={items}
                  // transition={{ ease: "easeInOut", duration: 2 }}
                  // drag="x"
                  // dragConstraints={{ left: -10, right: 10 }}
                  // initial={{ x: 30, opacity: 0 }}
                  // animate={{ x: 0, opacity: 1 }}
                  // exit={{ x: 30, opacity: 0 }}
                >
                  <ChatItem item={item} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div variants={container} initial="hidden" animate="show">
          <AnimatePresence>
            {[...chats].map((item) => {
              return (
                <motion.div
                  key={item.id}
                  // layout={true}
                  // whileTap={{ scale: 1.1 }}
                  // whileHover={{ x: 5 }}
                  variants={items}

                  // transition={{ ease: "easeOut", duration: 2 }}
                  // drag="x"
                  // dragConstraints={{ left: -10, right: 10 }}
                  // initial={{ x: 30, opacity: 0 }}
                  // animate={{ x: 0, opacity: 1 }}
                  // exit={{ x: 30, opacity: 0 }}
                >
                  <ChatItemSkeleton item={item} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}

      {/* <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem /> */}
    </>
  );
};

export default ChatList;
