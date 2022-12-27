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
  width: 60%;
`;
const ChatItem = () => {
  const { textGrey } = useSelector((state) => state.styles.colors);
  const { textBlack } = useSelector((state) => state.styles.colors);
  console.log(textGrey);
  return (
    <>
      <StyledContainer>
        <StyledRow_1>
          <StyledUserImage src={userImage} />
        </StyledRow_1>
        <StyledRow_2>
          <StyledUsername cl={textBlack}>Jane Cooper</StyledUsername>
          <StyledLastMsg cl={textGrey}> Thanks you are welcome</StyledLastMsg>
        </StyledRow_2>
        <StyledRow_3>
          <Empty />
          <StyledDay cl={textGrey}>Mon</StyledDay>
        </StyledRow_3>
      </StyledContainer>
    </>
  );
};

export default ChatItem;
