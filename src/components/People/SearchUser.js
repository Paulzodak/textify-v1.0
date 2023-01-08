import React from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import userImage from "../../images/user.png";
import { updateDoc, getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import Chat from "../Homepage/Chat/Chat";
import { useState } from "react";
import { setChatItemData } from "../../redux/people";
import {
  setShowChatsPage,
  setShowPeoplePage,
  setShowHomeNav,
  setShowChat,
} from "../../redux/home";
const StyledContainer = styled(motion.div)`
  width: 100%;
  /* height: 4rem; */
  box-shadow: 0px 0px 50px rgb(240, 240, 240);
  border-radius: 0.5rem;
  padding: 1rem;
  display: grid;
  grid-template-columns: 7rem 7rem;
  justify-content: space-around;
  box-sizing: border-box;
  border-left: 4px solid ${({ cl }) => cl};
`;
const StyledUserImage = styled.img`
  width: 7rem;
`;
const StyledUsername = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  text-align: center;
`;
const StyledBtn = styled.button`
  margin: 0 -10rem 0 0;
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
  color: white;
  border: none;
  border-radius: 0.5rem;
  width: 100%;
  height: 2.5rem;
`;
const SearchUser = ({ item }) => {
  const { colors } = useSelector((state) => state.styles);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { showChat } = useSelector((state) => state.home.layout);
  const { chatItemData } = useSelector((state) => state.people);
  const { searchedUser } = useSelector((state) => state.people);

  useEffect(() => {}, []);

  const sendMessageHandler = () => {
    dispatch(setShowChat({ showChat: true }));
    dispatch(setShowHomeNav({ showHomeNav: false }));

    const tempChats = [...searchedUser.chats];
    const currentUserTempChats = [...currentUser.chats];

    // CHECKS IF FRIEND HAS FRIENDS INITIALLY SINCE WE ARE USING PUSH METHOD TO ADD DATA
    searchedUser.chats.length > 0 &&
      searchedUser.chats.map((friends) => {
        //CHECK IF USER EXISTS IN FRIENDS CHATS
        if (friends.username !== currentUser.username) {
          tempChats.push({
            username: currentUser.username,
            messages: [],
            email: currentUser.email,
            isActive: currentUser.isActive,
            isTyping: false,
            uid: currentUser.uid,
          });

          tempChats.map((chat) => {
            if (chat.username === currentUser.username) {
              console.log(chat + "done");
            }
          });

          console.log("friend doesnt exist initially");
          const docRef = doc(db, "users", searchedUser.uid);
          const data = { chats: tempChats };
          updateDoc(docRef, data);
        }
      });
    // CHECKS IF CURRENT USER HAS FRIENDS INITIALLY SINCE WE ARE USING PUSH METHOD TO ADD DATA
    currentUser.chats.length > 0 &&
      currentUser.chats.map((friends) => {
        //CHECK IF FRIEND EXISTS IN CURRENT USER CHATS
        if (friends.username !== searchedUser.username) {
          currentUserTempChats.push({
            username: searchedUser.username,
            messages: [],
            email: searchedUser.email,
            isActive: searchedUser.isActive,
            isTyping: false,
            uid: searchedUser.uid,
          });

          const docRef = doc(db, "users", currentUser.uid);
          const data = { chats: currentUserTempChats };
          updateDoc(docRef, data).then((res) => {
            const ref = doc(db, "users", currentUser.uid);
            getDoc(ref).then((res) =>
              res.data().chats.map((chat) => {
                if (chat.username === searchedUser.username) {
                  dispatch(setChatItemData({ chatItemData: chat }));
                }
              })
            );
          });
        }
      });

    if (searchedUser.chats.length < 1) {
      tempChats.push({
        username: currentUser.username,
        messages: [],
        email: currentUser.email,
        isActive: currentUser.isActive,
        isTyping: false,
        uid: currentUser.uid,
      });

      const docRef = doc(db, "users", searchedUser.uid);
      const data = { chats: tempChats };

      console.log("updated");
      updateDoc(docRef, data);
    }
    if (currentUser.chats.length < 1) {
      currentUserTempChats.push({
        username: searchedUser.username,
        messages: [],
        email: searchedUser.email,
        isActive: searchedUser.isActive,
        isTyping: false,
        uid: searchedUser.uid,
      });

      const docRef = doc(db, "users", currentUser.uid);
      const data = { chats: currentUserTempChats };

      updateDoc(docRef, data).then((res) => {
        const ref = doc(db, "users", currentUser.uid);
        getDoc(ref).then((res) =>
          res.data().chats.map((chat) => {
            if (chat.username === searchedUser.username) {
              dispatch(setChatItemData({ chatItemData: chat }));
            }
          })
        );
      });
    }
  };
  return (
    <>
      {showChat && <Chat />}
      <StyledContainer cl={colors.mainGreen}>
        <StyledUserImage src={userImage} />
        <StyledUsername>{searchedUser.username}</StyledUsername>
        <div></div>
        <StyledBtn onClick={sendMessageHandler}>Send Message</StyledBtn>
      </StyledContainer>
    </>
  );
};

export default SearchUser;
