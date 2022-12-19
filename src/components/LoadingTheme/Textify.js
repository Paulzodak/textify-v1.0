import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import "./Textify.css";

const ContentArea = styled.div`
  text-align: center;
  margin: 4rem;
`;
const Text = styled.span``;
const Textify = () => {
  return (
    <div>
      <ContentArea>
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
            delay: 1,
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
            delay: 1.2,
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
            delay: 1.4,
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
            delay: 1.6,
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
            delay: 1.8,
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
            delay: 2,
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
            delay: 2.2,
          }}
        >
          Y
        </motion.div>
      </ContentArea>
    </div>
  );
};

export default Textify;
