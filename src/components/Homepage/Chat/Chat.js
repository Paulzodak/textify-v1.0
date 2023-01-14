import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RxCaretLeft as BackIcon } from "react-icons/rx";
import userImage from "../../../images/user.png";
import { useSelector } from "react-redux";
import { BsTelephone as PhoneIcon } from "react-icons/bs";
import { BsCameraVideo as VideoIcon } from "react-icons/bs";
import { PropTypes } from "prop-types";
import { useDispatch } from "react-redux";
import { setChats } from "../../../redux/user";
import { setShowChat, setShowHomeNav } from "../../../redux/home";
import {
  collection,
  query,
  onSnapshot,
  where,
  setDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { setChatItemData } from "../../../redux/people";
import { db } from "../../firebase";
import { CiLocationOn as LocationIcon } from "react-icons/ci";
import { CiFaceSmile as SmileIcon } from "react-icons/ci";
import { GoFileMedia as GalleryIcon } from "react-icons/go";
import { AiOutlineSend as SendIcon } from "react-icons/ai";
import useFetchActive from "../../../Hooks/useFetchActive";
import useFetchisTyping from "../../../Hooks/useFetchisTyping";
import useUpdateisTyping from "../../../Hooks/useUpdateisTyping";
import Messages from "./Messages";
import useFetchMessages from "../../../Hooks/useFetchMessages";
import { pushMessage } from "../../../redux/user";
import useConsistentCurrentUserDataFetch from "../../../Hooks/useConsistentCurrentUserDataFetch";
import useConsistentlyFetchChatItemData from "../../../Hooks/useConsistentlyFetchChatItemData";
const StyledContainer = styled(motion.div)`
  position: absolute;
  top: 0rem;
  z-index: 100;
  left: 0rem;
  background-color: white;
  width: 100%;
  max-width: 100%;
  height: 100vh;
  overflow: hidden;

  display: grid;
  @media (min-width: 800px) {
    width: 50vw;
    max-width: 50vw;
    border-left: 1px solid ${({ bd }) => bd};
  }
  grid-template-rows: 5rem 2fr 4rem;
  /* box-shadow: 0px 0px 10px rgb(190, 190, 190); */
`;

const StyledNav = styled.nav`
  display: grid;
  grid-template-columns: 10% 15% 47% 14% 14%;
  position: fixed;
  width: 100%;
  @media (min-width: 800px) {
    width: 50%;
    /* height: 3rem; */
    /* position: relative; */
  }
  overflow: hidden;
  top: 0rem;
  background-color: white;
  /* border: 1px solid red; */
  /* height: 100%; */
  padding: 0.5rem 0;
  box-sizing: border-box;
  border-bottom: 1px solid ${({ border }) => border};
`;
const StyledBackIconContainer = styled.div`
  position: relative;
  top: 32%;
`;
const StyledProfileImage = styled.img`
  width: 3rem;
  position: relative;
  top: 10%;
  /* height: 100%; */
`;
const StyledUsername = styled.div`
  margin: 0.5rem 1rem 0 1rem;
  font-weight: bold;
  font-size: 1.2rem;
  letter-spacing: 0.1rem;
`;
const StyledActive = styled.div`
  color: ${({ cl }) => cl};
  margin: 0.3rem 1rem 0 1rem;
  font-size: 0.8rem;
`;
const StyledIconContainer = styled.div`
  position: relative;
  top: 30%;
`;
const StyledUtilityContainer = styled.div`
  position: fixed;
  bottom: 0rem;
  /* left: 0; */
  height: 3.5rem;
  background-color: white;
  width: 100%;
  @media (min-width: 800px) {
    width: 50%;
  }
  /* border: 1px solid red; */
  border-top: 1px solid ${({ bd }) => bd};
  display: grid;
  grid-template-columns: 2rem 2rem 2rem 60% 2rem;
  justify-content: space-between;
  padding: 1rem 0.5rem;
  box-sizing: border-box;
`;
const StyledInput = styled.input`
  background-color: ${({ bg }) => bg};
  font-size: 1rem;
  border: none;
  padding: 0rem 1rem;
  height: 2.5rem;
  position: relative;
  top: -0.5rem;
  border-radius: 0.3rem;
  &::placeholder {
    color: ${({ textGrey }) => textGrey};
  }
`;

const Chat = () => {
  const dispatch = useDispatch();

  const { bgGrey } = useSelector((state) => state.styles.colors);
  const { currentUser } = useSelector((state) => state.user);
  const { textGrey } = useSelector((state) => state.styles.colors);
  const { mainGreen } = useSelector((state) => state.styles.colors);
  const { chatItemData } = useSelector((state) => state.people);
  const { chats } = useSelector((state) => state.user);

  const [isOtherUserTyping, setIsOtherUserTyping] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [userActiveStatus] = useFetchActive(chatItemData.uid);
  const [userTypingStatus] = useFetchisTyping(
    currentUser.uid,
    chatItemData.uid
  );
  const [showMessages, setShowMessages] = useState(false);
  const { messages } = useSelector((state) => state.user);
  const [focused, setFocused] = useState(false);

  useUpdateisTyping(currentUser.uid, chatItemData.uid, userInput);
  useFetchMessages(currentUser.uid, chatItemData.uid, chatItemData);
  useConsistentlyFetchChatItemData(chatItemData, currentUser);
  useConsistentCurrentUserDataFetch(currentUser);

  useEffect(() => {
    setTimeout(() => {
      setShowMessages(true);
    }, 400);
  }, []);

  const hideChatHandler = () => {
    dispatch(setShowChat({ showChat: false }));
    dispatch(setShowHomeNav({ showHomeNav: true }));
  };
  const utilityIconSize = "1.5rem";
  const utilityIconColor = mainGreen;

  const inputHandler = (e) => {
    setUserInput(e.target.value);
  };
  // console.log(userInput);

  const sendMessageHandler = () => {
    const tempMsg = [...messages];
    const message = userInput;
    const createdAt = "12:00";
    const sender = currentUser.username;
    const read = false;
    const data = {
      message: message,
      createdAt: createdAt,
      sender: sender,
      // read: read,
    };
    tempMsg.push({
      ...data,
    });
    // console.log(tempMsg);
    // dispatch(
    //   pushMessage({
    //     data: {
    //       ...data,
    //     },
    //   })
    // );
    // PUSH TO CURRENT USER CHATS
    let tempChats = [...chats];
    [...tempChats].map((item, index) => {
      if (item.username === chatItemData.username) {
        const chatItem = { ...item };

        chatItem.messages = [...chatItem.messages, data];
        // console.log(chatItem);
        tempChats[index] = chatItem;
        // console.log(tempChats);
      }
    });
    const docRef = doc(db, "users", currentUser.uid);
    const d = { chats: tempChats };
    updateDoc(docRef, d);

    // PUSH TO OTHER USER CHATS
    // console.log(chatItemData.uid);
    const userDocRef = doc(db, "users", chatItemData.uid);
    getDoc(userDocRef).then((res) => {
      setUserInput("");
      // console.log(res.data());
      let userTempChats = [...res.data().chats];

      res.data().chats.map((item, index) => {
        if (item.username === currentUser.username) {
          const chatItem = { ...item };
          chatItem.messages = [...chatItem.messages, data];
          // console.log(chatItem.messages);
          userTempChats[index] = chatItem;
        }
        // const userDocRef2 = doc(db, "users", chatItemData.uid);
      });
      const d2 = { chats: userTempChats };
      updateDoc(userDocRef, d2);
      // console.log("done");
    });
  };
  // console.log(messages);
  return (
    <StyledContainer
      bd={bgGrey}
      initial={{ x: 500 }}
      animate={{
        x: 0,
        // scale: 1,
        transition: { duration: 0.2 },
        // transition: {
        //   // type: "spring",
        //   // stiffness: 200,
        //   // damping: 40,
        //   // mass: 2,
        // },
      }}
      exit={{ x: 500, ease: "easeOut" }}
      key="content"
    >
      {/* <StyledSubContainer> */}
      <div>
        <StyledNav border={bgGrey}>
          <StyledBackIconContainer onClick={hideChatHandler}>
            <BackIcon size="1.5rem" />
          </StyledBackIconContainer>
          <StyledProfileImage src={userImage} />
          <div>
            <StyledUsername>{chatItemData.username}</StyledUsername>
            <StyledActive cl={textGrey}>
              {userTypingStatus
                ? "Typing..."
                : userActiveStatus
                ? "Active now"
                : "Last seen recently"}
            </StyledActive>
          </div>
          <StyledIconContainer>
            <center>
              <PhoneIcon color={mainGreen} size="1.2rem" />
            </center>
          </StyledIconContainer>
          <StyledIconContainer>
            <center>
              <VideoIcon color={mainGreen} size="1.2rem" />
            </center>
          </StyledIconContainer>
        </StyledNav>
      </div>

      {showMessages && <Messages focused={focused} messages={messages} />}

      <StyledUtilityContainer bd={bgGrey}>
        <LocationIcon color={utilityIconColor} size={utilityIconSize} />
        <SmileIcon color={utilityIconColor} size={utilityIconSize} />
        <GalleryIcon color={utilityIconColor} size={utilityIconSize} />
        <StyledInput
          onChange={inputHandler}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => setFocused(false)}
          value={userInput}
          textGrey={textGrey}
          placeholder="Aa"
          color={utilityIconColor}
          bg={bgGrey}
        />
        <SendIcon
          onClick={() => {
            sendMessageHandler();
          }}
          color={utilityIconColor}
          size={utilityIconSize}
        />
      </StyledUtilityContainer>
      {/* </StyledSubContainer> */}
    </StyledContainer>
  );
};
Chat.propTypes = {
  data: PropTypes.object,
};
export default Chat;
