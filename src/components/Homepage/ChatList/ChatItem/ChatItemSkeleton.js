import React from "react";
import ContentLoader from "react-content-loader";
import { StyledContainerSkeleton } from "./ChatItem";
import { StyledRow_1_skeleton } from "./ChatItem";
import { StyledRow_2_skeleton } from "./ChatItem";
import { StyledRow_3_skeleton } from "./ChatItem";
import styled from "styled-components";
const StyledContainer = styled.div`
  margin: 1rem;
  width: 100%;
  position: relative;
  left: 0rem;
  /* border: 1px solid red; */
`;
const ChatItemSkeleton = () => {
  return (
    <StyledContainer>
      <center>
        <ContentLoader
          speed={2}
          width={"100%"}
          height={44}
          viewBox="0 0 476 44"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="48" y="8" rx="3" ry="3" width="80%" height="6" />
          <rect x="48" y="26" rx="3" ry="3" width="80%" height="6" />
          <circle cx="20" cy="20" r="20" />
        </ContentLoader>
      </center>
    </StyledContainer>

    // <StyledContainerSkeleton>
    //   <StyledRow_1_skeleton>
    //     {/* <StyledUserImage src={userImage} /> */}
    //   </StyledRow_1_skeleton>
    //   <StyledRow_2_skeleton>
    //     {/* <StyledUsername cl={textBlack}>{item.user}</StyledUsername>
    //       <StyledLastMsg cl={textGrey}> Thanks you are welcome</StyledLastMsg> */}
    //   </StyledRow_2_skeleton>
    //   <StyledRow_3_skeleton>
    //     {/* <Empty />
    //       <StyledDay cl={textGrey}>{item.createdAt}</StyledDay> */}
    //   </StyledRow_3_skeleton>
    // </StyledContainerSkeleton>
  );
};

export default ChatItemSkeleton;
