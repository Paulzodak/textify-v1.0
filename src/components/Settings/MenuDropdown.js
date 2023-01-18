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

const StyledBackdrop = styled.div`
  background: red;
  position: absolute;
  height: 100vh;
  width: 100vw;
`;
const StyledContainer = styled(motion.div)`
  position: absolute;
  top: 3rem;
  right: ${({ ps }) => ps && "1rem"};
  background-color: white;
  z-index: 1;
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
const MenuDropdown = ({ items, ps }) => {
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

  //   console.log(ps.right);
  console.log(items);

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
      {[...items].map((item) => {
        return (
          <StyledMenuItem
            layout={true}
            key={item.title}
            initial={{ opacity: 0, x: -50 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { duration: item.duration },
            }}
            cl={item.active ? textBlack : textGrey}
            whileHover={{ scale: 1.08 }}
            onClick={item.action && signout}
          >
            <div>{item.icon}</div>
            <StyledMenuName>{item.title}</StyledMenuName>
            <RightArrow />
          </StyledMenuItem>
        );
      })}
    </StyledContainer>
  );
};
MenuDropdown.propTypes = {
  navMenuItems: PropTypes.array,
  ps: PropTypes.string.isRequired, // THIS SHOWS WHERE THE DROPDOWN POSITION SHOULD FLOAT TO
};

export default MenuDropdown;
