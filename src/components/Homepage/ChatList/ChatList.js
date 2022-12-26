import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ChatItem from "./ChatItem/ChatItem";
const ChatList = () => {
  const { chats } = useSelector((state) => state.user);
  console.log(chats);
  return (
    <>
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
      <ChatItem />
      <ChatItem />
    </>
  );
};

export default ChatList;
