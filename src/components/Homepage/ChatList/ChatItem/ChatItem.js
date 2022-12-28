import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import userImage from "../../../../images/user.png";
const StyledContainer = styled.div`
  height: 3rem;
  margin: 1rem 0;
  width: 100%;
  font-family: "Inter", sans-serif;
  display: grid;
  grid-template-columns: 22% 55% 23%;
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
  font-size: 0.9rem;
  color: ${({ cl }) => cl};
`;
const StyledLastMsg = styled.div`
  font-size: 0.7rem;
  vertical-align: text-bottom;
  color: ${({ cl }) => cl};
`;

const StyledDay = styled.div`
  color: ${({ cl }) => cl};
  font-size: 0.7rem;
`;

const StyledUserImage = styled.img`
  width: 3rem;
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
  const { textGrey } = useSelector((state) => state.styles.colors);
  const { textBlack } = useSelector((state) => state.styles.colors);
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  console.log(item);
  return (
    <>
      <StyledContainer>
        <StyledRow_1>
          <StyledUserImage src={userImage} />
          <StyledActive bg={currentUser.isActive ? "#1dd75bff" : "grey"} />
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
