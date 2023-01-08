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
const StyledContainer = styled(motion.div)`
  position: absolute;
  top: 0rem;
  z-index: 100;
  left: 0rem;
  background-color: white;
  width: 100vw;
  height: 100vh;
  /* overflow: hidden; */
  /* border: 1px solid red; */
  /* display: grid; */
  /* grid-template-rows: 4rem auto 3rem; */
  box-shadow: 0px 0px 10px rgb(190, 190, 190);
`;
const StyledSubContainer = styled.div`
  width: 100%;
  height: 100vh;
`;
const StyledNav = styled.nav`
  display: grid;
  grid-template-columns: 10% 15% 47% 14% 14%;
  position: fixed;
  width: 100%;
  overflow: hidden;
  top: 0rem;
  /* border: 1px solid red; */
  /* height: 4rem; */
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
  left: 0;
  height: 3.5rem;
  width: 100%;
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
  // const [activeStatusForThisUser, setActiveStatusForThisUser] = useState(false);
  // const [isTyping, setIsTyping] = useState(false);
  const [isOtherUserTyping, setIsOtherUserTyping] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [userActiveStatus] = useFetchActive(chatItemData.uid);
  const [userTypingStatus] = useFetchisTyping(
    currentUser.uid,
    chatItemData.uid
  );
  useUpdateisTyping(currentUser.uid, chatItemData.uid, userInput);

  useEffect(() => {
    return () => {
      let tempChats = [];
      const docRef = doc(db, "users", chatItemData.uid);
      getDoc(docRef)
        .then((res) => {
          tempChats = res.data().chats;
          tempChats.map((user) => {
            if (user.uid === currentUser.uid) {
              user.isTyping = false;
            }
          });
          const data = { chats: tempChats };
          updateDoc(docRef, data);
        })
        .catch((err) => console.log(err));
    };
  }, [userInput]);

  const showChatHandler = () => {
    dispatch(setShowChat({ showChat: false }));
    dispatch(setShowHomeNav({ showHomeNav: true }));
  };
  const utilityIconSize = "1.5rem";
  const utilityIconColor = mainGreen;

  const inputHandler = (e) => {
    setUserInput(e.target.value);
  };

  const sendMessageHandler = () => {};

  return (
    <StyledContainer
      initial={{ x: 500 }}
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
      key="content"
    >
      <StyledSubContainer>
        <StyledNav border={bgGrey}>
          <StyledBackIconContainer onClick={showChatHandler}>
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

        <StyledUtilityContainer bd={bgGrey}>
          <LocationIcon color={utilityIconColor} size={utilityIconSize} />
          <SmileIcon color={utilityIconColor} size={utilityIconSize} />
          <GalleryIcon color={utilityIconColor} size={utilityIconSize} />
          <StyledInput
            onChange={inputHandler}
            value={userInput}
            textGrey={textGrey}
            placeholder="Aa"
            color={utilityIconColor}
            bg={bgGrey}
          />
          <SendIcon
            onClick={sendMessageHandler}
            color={utilityIconColor}
            size={utilityIconSize}
          />
        </StyledUtilityContainer>
      </StyledSubContainer>
    </StyledContainer>
  );
};
Chat.propTypes = {
  data: PropTypes.object,
};
export default Chat;
