import React from "react";
import styled from "styled-components";
import { AiOutlineMenu as MenuIcon } from "react-icons/ai";
import ChatSearch from "./ChatSearch";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const StyledContainer = styled(motion.div)`
  height: 8rem;
  /* border: 1px solid red; */
  border-radius: 0 0 0.5rem 0.5rem;
  /* padding: 1rem 1rem 0 1rem; */
  border-bottom: 1px solid ${({ bd }) => bd};
  position: sticky;
  background-color: white;
  width: 100%;
  top: 0rem;
  margin: 0rem;
  z-index: 10;
  box-sizing: border-box;
  /* @media (min-width: 500px) {
    position: relative;
    transform: none;
  } */
`;
const Row_1 = styled.div`
  /* border: 1px solid red; */
  /* height: 3rem; */
  border-bottom: 1px solid ${({ bd }) => bd};
  padding: 1.2rem 1rem;
  box-sizing: border-box;
`;
const Messages = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
`;
const MenuIconContainer = styled.span`
  float: right;
`;
const Utility = () => {
  const { colors } = useSelector((state) => state.styles);
  const [showNav, setShowNav] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const { showHomeNav } = useSelector((state) => state.home.layout);
  const controlBar = () => {
    if (window.scrollY > lastScroll && window.scrollY > 60) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
    setLastScroll(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", controlBar);
    return () => {
      window.removeEventListener("scroll", controlBar);
    };
  }, [lastScroll]);
  // console.log(showNav);
  return (
    <StyledContainer
      bd={colors.bgGrey}
      bg={colors.lightBgGreen}
      initial={{ opacity: 0, y: -150 }}
      // animate={{ y: showNav ? 0 : -150 }}
      animate={{
        opacity: 1,
        // y: 0,
        y: showNav ? 0 : -150,
        transition: { delay: 0.2, duration: 0.4 },
      }}
      exit={{ opacity: 0, y: -150, transition: { duration: 0.2 } }}
      // transition={{
      //   duration: 0.2,
      //   // type: "spring",
      //   // stiffness: 300,
      //   // damping: 100,
      //   // mass: 5,
      // }}
    >
      <Row_1 bd={colors.bgGrey}>
        <Messages>Messages</Messages>
        <MenuIconContainer>
          <MenuIcon size="1.5rem" />
        </MenuIconContainer>
      </Row_1>
      <ChatSearch />
    </StyledContainer>
  );
};

export default Utility;
