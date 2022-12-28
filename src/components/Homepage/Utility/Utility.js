import React from "react";
import styled from "styled-components";
import { AiOutlineMenu as MenuIcon } from "react-icons/ai";
import ChatSearch from "./ChatSearch";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
const StyledContainer = styled(motion.div)`
  /* height: 5rem; */
  padding: 1rem 1rem 0 1rem;
  border-bottom: 1px solid ${({ bd }) => bd};
  position: sticky;

  background-color: white;
  width: 100%;
  top: 0rem;
  box-sizing: border-box;
`;
const Row_1 = styled.div`
  /* border: 1px solid red; */
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
  const controlBar = () => {
    if (window.scrollY > lastScroll && window.scrollY > 60) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
    setLastScroll(window.scrollY);
  };
  useEffect(() => {
    // setTimeout(() => {
    //   window.addEventListener("scroll", controlBar);
    //   return () => {
    //     window.removeEventListener("scroll", controlBar);
    //   };
    // }, 500);
    window.addEventListener("scroll", controlBar);
    return () => {
      window.removeEventListener("scroll", controlBar);
    };
  }, [lastScroll]);

  return (
    <>
      <StyledContainer
        bd={colors.bgGrey}
        bg={colors.lightBgGreen}
        initial={{ y: -20 }}
        animate={{ y: showNav ? 0 : -150 }}
        exit={{ y: -20 }}
        transition={{ type: "spring", stiffness: 200, damping: 100, mass: 5 }}
      >
        <Row_1>
          <Messages>Messages</Messages>
          <MenuIconContainer>
            <MenuIcon size="1.5rem" />
          </MenuIconContainer>
        </Row_1>
        <ChatSearch />
      </StyledContainer>
    </>
  );
};

export default Utility;
