import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
const StyledContainer = styled(motion.div)`
  background-color: rgba(0, 0, 0, 0.33);
  position: fixed;
  top: 0;
  z-index: 10;
  /* left: 15%; */
  /* box-shadow: 0px 0px 80px rgb(235, 235, 235); */
  /* border-radius: 1rem; */
  height: 100vh;
  width: 100vw;
  /* max-width: 40rem; */
  padding: 1rem;

  box-sizing: border-box;
`;
const StyledContentArea = styled(motion.div)`
  /* box-shadow: 0px 0px 80px rgb(235, 235, 235); */
  height: ${({ height }) => height};
  /* border-radius: 1rem; */
  width: ${({ width }) => width};
  margin-top: ${({ marginTop }) => marginTop};
  background-color: white;
  border-radius: 1rem;
  padding: 1rem;
  position: relative;
`;
const BasicModal = ({ children, height, width, marginTop }) => {
  return (
    <StyledContainer>
      <center>
        <AnimatePresence>
          <StyledContentArea
            height={height}
            width={width}
            marginTop={marginTop}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 360,
              damping: 30,
              mass: 2,
              staggerChildren: 0.08,
            }}
            exit={{
              opacity: 0,
              scale: 0,
            }}
          >
            {children}
          </StyledContentArea>
        </AnimatePresence>
      </center>
    </StyledContainer>
  );
};

export default BasicModal;
