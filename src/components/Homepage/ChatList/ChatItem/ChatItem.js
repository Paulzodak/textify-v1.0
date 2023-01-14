import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import userImage from "../../../../images/user.png";
import { useState, useEffect } from "react";
import Chat from "../../Chat/Chat";
import { AnimatePresence } from "framer-motion";
import { setChatItemData } from "../../../../redux/people";
import { setShowChat, setShowHomeNav } from "../../../../redux/home";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "../../../firebase";
import useFetchMessages from "../../../../Hooks/useFetchMessages";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
const StyledContainer = styled(motion.div)`
  /* height: 3rem; */
  margin: 1rem 2.5%;
  padding: 0.5rem 0;
  width: 95%;
  overflow: hidden;
  font-family: "Inter", sans-serif;
  display: grid;
  grid-template-columns: 22% 55% 23%;
  transition: 0.5s;
  border-radius: 1rem;
  :hover {
    background-color: ${({ hoverCl }) => hoverCl};
  }
`;

const Empty = styled.div`
  /* border: 1px solid red; */
`;
const StyledRow_1 = styled.div`
  text-align: center;
  position: relative;
  top: 0;
`;

const StyledRow_2 = styled.div`
  display: grid;
  grid-template-rows: 50% 50%;

  padding: 0 0.2rem;
  box-sizing: border-box;
`;
const StyledRow_3 = styled.div`
  display: grid;
  grid-template-rows: 50% 50%;

  padding: 0 0.2rem;
  box-sizing: border-box;
`;
const StyledUsername = styled.div`
  font-size: 1.2rem;
  color: ${({ cl }) => cl};
`;
const StyledLastMsg = styled.div`
  font-size: 0.9rem;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: text-bottom;
  color: ${({ cl }) => cl};
`;

const StyledDay = styled.div`
  color: ${({ cl }) => cl};
  font-size: 0.9rem;
`;

const StyledUserImage = styled.img`
  width: 3.5rem;
`;

const StyledActive = styled.div`
  height: 0.6rem;
  width: 0.6rem;
  background-color: ${({ bg }) => bg};
  position: absolute;
  top: 60%;
  left: 62%;
  border-radius: 100%;
  border: 0.1rem solid white;
`;
const ChatItem = ({ item }) => {
  const [activeStatusForThisUser, setActiveStatusForThisUser] = useState(false);
  const { textGrey } = useSelector((state) => state.styles.colors);
  const { textBlack } = useSelector((state) => state.styles.colors);

  const { lightBgGreen } = useSelector((state) => state.styles.colors);

  const { currentUser } = useSelector((state) => state.user);

  const { chatItemData } = useSelector((state) => state.people);

  const { showChat } = useSelector((state) => state.home.layout);
  const isTablet = useMediaQuery({ query: "(min-width: 500px)" });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setChatItemData({ chatItemData: item }));
    const colRef = collection(db, "users");

    const q = query(colRef, where("username", "==", item.username));
    onSnapshot(q, (snapshot) => {
      console.log("chatitem");
      snapshot.docs.forEach((user) => {
        setActiveStatusForThisUser(user.data().isActive);
      });
    });
  }, []);

  const showChatHandler = () => {
    dispatch(setShowChat({ showChat: true }));
    dispatch(setChatItemData({ chatItemData: item }));
    // !isTablet && dispatch(setShowHomeNav({ showHomeNav: false }));
  };
  // useFetchMessages(currentUser.uid, chatItemData.uid);
  // console.log(chatItemData);
  return (
    <>
      <StyledContainer
        whileHover={{
          scale: 1.05,
          transition: {
            type: "spring",
            stiffness: 1000,
            damping: 5,
            mass: 5,
          },
        }}
        onClick={showChatHandler}
        hoverCl={lightBgGreen}
      >
        <StyledRow_1>
          <StyledUserImage src={userImage} />
          <StyledActive bg={activeStatusForThisUser ? "#1dd75bff" : "grey"} />
        </StyledRow_1>
        <StyledRow_2>
          <StyledUsername cl={textBlack}>{item.username}</StyledUsername>
          {item.messages.map((items, index) => {
            if (index === item.messages.length - 1) {
              return (
                <StyledLastMsg cl={textGrey}>{items.message}</StyledLastMsg>
              );
            }
          })}
        </StyledRow_2>
        <StyledRow_3>
          <Empty />
          {item.messages.map((item, index) => {
            if (index === 0) {
              return <StyledDay cl={textGrey}>{item.createdAt}</StyledDay>;
            }
          })}
        </StyledRow_3>
      </StyledContainer>
    </>
  );
};

export default ChatItem;
