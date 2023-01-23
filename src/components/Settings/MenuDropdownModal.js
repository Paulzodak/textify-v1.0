import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RxCaretRight as RightArrow } from "react-icons/rx";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { setActive } from "../../redux/settings";

const StyledContainer = styled(motion.div)`
  -webkit-user-select: none; /* Chrome/Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+ */
  user-select: none; /* Standard */
  position: absolute;
  top: 3rem;
  right: ${({ ps }) => ps && "1rem"};
  background-color: white;
  z-index: 2;
  /* right: 1rem; */
  /* border: 1px solid red; */
  width: 10rem;
  /* height: 10rem; */
  /* padding: 1rem; */
  border-radius: 0.5rem;
  background-color: white;
  overflow: hidden;
  box-sizing: border-box;
  box-shadow: 0px 0px 10px rgb(175, 206, 210);
`;
const StyledMenuItem = styled(motion.div)`
  margin: 1.6rem 1rem;
  /* border: 1px solid red; */
  justify-content: space-between;
  display: grid;
  border-bottom: 1px solid ${({ cl }) => cl};
  color: ${({ cl }) => cl};
  grid-template-columns: 1rem 4rem 1rem;
`;
const StyledMenuName = styled.div`
  font-size: 0.8rem;
  /* border: 1px solid red; */
`;
const MenuDropdownModal = ({ children, ps }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { textGrey } = useSelector((state) => state.styles.colors);
  const { textBlack } = useSelector((state) => state.styles.colors);
  const signout = async () => {
    navigate("/");
    // SETS ACTIVE TO FALSE IN DB
    // dispatch(setActive({ isActive: false }));
    // const docRef = doc(db, "users", currentUser.uid);
    // const data = { isActive: false };
    // updateDoc(docRef, data);

    await signOut(auth);
  };

  return (
    <StyledContainer
      ps={ps}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 360,
        damping: 30,
        staggerChildren: 0.08,
      }}
      exit={{
        opacity: 0,
        scale: 2,
      }}
    >
      {children}
    </StyledContainer>
  );
};
MenuDropdownModal.propTypes = {
  navMenuItems: PropTypes.array,
  ps: PropTypes.string.isRequired, // THIS SHOWS WHERE THE DROPDOWN POSITION SHOULD FLOAT TO
};

export default MenuDropdownModal;
