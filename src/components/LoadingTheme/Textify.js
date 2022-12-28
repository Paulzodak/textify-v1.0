import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import "./Textify.css";
import PropTypes from "prop-types";
const StyledContentArea = styled(motion.div)`
  text-align: center;
  margin: auto;
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  font-size: ${({ size }) => size};
  /* color: #0095a9ff; */
  /* color: #ebfdffff; */
  color: #00bdd6ff;
  /* box-shadow: 0px 0px 1px grey; */
  border-left: 2px solid #0095a9ff;
  border-right: 2px solid #0095a9ff;
`;
const StyledContainer = styled.div`
  position: fixed;
  top: 0rem;
  width: 100vw;
  z-index: 10;
  height: 100vh;
  background-color: #00000000;
`;
const StyledText = styled.span``;

const Textify = ({ size, top, left }) => {
  return (
    <StyledContainer>
      <StyledContentArea
        transition={{ type: "spring", stiffness: 500, damping: 50, mass: 1 }}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        size={size}
        top={top}
        left={left}
      >
        <motion.div
          className="box"
          animate={{
            scale: [3, 1, 3],
            // rotate: [0, 0, 180, 180, 0],
            // borderRadius: ["0%", "0%", "50%", "50%", "0%"],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            // times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            delay: 0,
            // repeatDelay: 1,
          }}
        >
          T
        </motion.div>
        <motion.div
          className="box"
          animate={{
            scale: [3, 1, 3],
            // rotate: [0, 0, 180, 180, 0],
            // borderRadius: ["0%", "0%", "50%", "50%", "0%"],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            // times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            delay: 0.2,
            // repeatDelay: 1,
          }}
        >
          E
        </motion.div>
        <motion.div
          className="box"
          animate={{
            scale: [3, 1, 3],
            // rotate: [0, 0, 180, 180, 0],
            // borderRadius: ["0%", "0%", "50%", "50%", "0%"],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            // times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            delay: 0.4,
            // repeatDelay: 1,
          }}
        >
          X
        </motion.div>
        <motion.div
          className="box"
          animate={{
            scale: [3, 1, 3],
            // rotate: [0, 0, 180, 180, 0],
            // borderRadius: ["0%", "0%", "50%", "50%", "0%"],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            // times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            delay: 0.6,
            // repeatDelay: 1,
          }}
        >
          T
        </motion.div>
        <motion.div
          className="box"
          animate={{
            scale: [3, 1, 3],
            // rotate: [0, 0, 180, 180, 0],
            // borderRadius: ["0%", "0%", "50%", "50%", "0%"],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            // times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            // repeatDelay: 1,
            delay: 0.8,
          }}
        >
          I
        </motion.div>
        <motion.div
          className="box"
          animate={{
            scale: [3, 1, 3],
            // rotate: [0, 0, 180, 180, 0],
            // borderRadius: ["0%", "0%", "50%", "50%", "0%"],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            // times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            // repeatDelay: 1,
            delay: 1,
          }}
        >
          F
        </motion.div>
        <motion.div
          className="box"
          animate={{
            scale: [3, 1, 3],
            // rotate: [0, 0, 180, 180, 0],
            // borderRadius: ["0%", "0%", "50%", "50%", "0%"],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            // times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            // repeatDelay: 1,
            delay: 1.2,
          }}
        >
          Y
        </motion.div>
      </StyledContentArea>
    </StyledContainer>
  );
};
Textify.propTypes = {
  size: PropTypes.string.isRequired,
  top: PropTypes.string.isRequired,
  left: PropTypes.string.isRequired,
};

export default Textify;
