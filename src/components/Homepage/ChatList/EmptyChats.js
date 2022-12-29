import React from "react";
import styled from "styled-components";
import liveChat from "../../../images/svgs/livechat.svg";
import { motion } from "framer-motion";

const StyledContainer = styled(motion.div)`
  margin-top: 3rem;
`;
const StyledSvgImage = styled.img`
  width: 100%;
  height: 100%;
  max-width: 30rem;
  margin: auto;
  max-height: 30rem;
`;
const StyledHeader = styled.div`
  font-size: 1.7rem;
  font-family: inherit;
`;
const StyledText = styled.p``;
const EmptyChats = () => {
  const container = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        delay: 0.8,
        ease: [0, 0.71, 0.2, 1.01],
      },
    },
  };

  return (
    <StyledContainer variants={container} initial="hidden" animate="show">
      <center>
        <StyledSvgImage src={liveChat} />
        <StyledHeader>It's nice to chat with someone</StyledHeader>
        <StyledText>Click the button below to start a chat!</StyledText>
      </center>
    </StyledContainer>
  );
};

export default EmptyChats;
