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
const StyledContainer = styled.div`
  /* height: 3rem; */
  margin: 1rem 0;
  padding: 0.5rem 0;
  width: 100%;
  font-family: "Inter", sans-serif;
  display: grid;
  grid-template-columns: 22% 55% 23%;
  transition: 0.5s;
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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setChatItemData({ chatItemData: item }));
    const colRef = collection(db, "users");

    const q = query(colRef, where("username", "==", item.username));
    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((user) => {
        setActiveStatusForThisUser(user.data().isActive);
      });
    });
  }, []);

  const { textGrey } = useSelector((state) => state.styles.colors);
  const { textBlack } = useSelector((state) => state.styles.colors);

  const { lightBgGreen } = useSelector((state) => state.styles.colors);

  const { currentUser } = useSelector((state) => state.user);
  // const { searchedUser } = useSelector((state) => state.people);
  // console.log(searchedUser);
  const { chatItemData } = useSelector((state) => state.people);
  const { showChat } = useSelector((state) => state.home.layout);
  const showChatHandler = () => {
    dispatch(setShowChat({ showChat: true }));
    dispatch(setChatItemData({ chatItemData: item }));
    dispatch(setShowHomeNav({ showHomeNav: false }));
  };
  console.log(chatItemData);
  // const [showChat, setShowChat] = useState(false);
  console.log(currentUser);
  console.log(item);

  return (
    <>
      <AnimatePresence>
        {showChat && <Chat data={chatItemData} />}
      </AnimatePresence>
      <StyledContainer onClick={showChatHandler} hoverCl={lightBgGreen}>
        <StyledRow_1>
          <StyledUserImage src={userImage} />
          <StyledActive bg={activeStatusForThisUser ? "#1dd75bff" : "grey"} />
        </StyledRow_1>
        <StyledRow_2>
          <StyledUsername cl={textBlack}>{item.username}</StyledUsername>
          {item.messages.map((item, index) => {
            if (index === 0) {
              return (
                <StyledLastMsg cl={textGrey}>{item.message}</StyledLastMsg>
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
