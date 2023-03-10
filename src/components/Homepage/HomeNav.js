import React from "react";
import styled from "styled-components";
import { BsInbox as MessageIcon } from "react-icons/bs";
import { BsCameraVideo as VideoIcon } from "react-icons/bs";
import { BsPeople as PeopleIcon } from "react-icons/bs";
import { CiSettings as SettingsIcon } from "react-icons/ci";
import { FiMenu as MenuIcon } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import classes from "./HomeNav.module.css";
import { setActive } from "../../redux/user";
import { useDispatch } from "react-redux";
import { setShowChatsPage, setShowPeoplePage } from "../../redux/home";
import { setShowChat } from "../../redux/home";
import { setShowSettingsPage } from "../../redux/home";
const StyledNav = styled(motion.nav)`
  position: fixed;
  bottom: 0.01vh;
  height: 3.5rem;
  /* border: 1px solid red; */
  padding: 0.25rem 0rem;
  background-color: rgb(255, 255, 255);
  border: 1px solid #f5f5f6;
  width: 100%;
  box-sizing: border-box;
  z-index: 10;
  @media (min-width: 800px) {
    display: none;
  }

  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  justify-content: space-around;
`;
const StyledName = styled.div`
  font-size: 0.7rem;
  text-align: center;
  font-weight: bolder;
  color: ${({ color }) => color};
  box-sizing: border-box;
`;
const StyledNavItem = styled(motion.div)`
  text-align: center;
  box-sizing: border-box;
  transition: 0.5s;
  -webkit-user-select: none; /* Chrome/Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+ */
  user-select: none; /* Standard */
  /* padding: 0.5rem; */
  /* color: #414650; */

  &:hover {
    color: #00bdd6ff;
    /* box-shadow: 0px 0px 1px #efefef; */
    border-radius: 0.4rem;
    background-color: #ebfdffff;

    box-sizing: border-box;
  }
`;
const StyledIcon = styled(motion.div)``;
const HomeNav = ({ navWidth }) => {
  const dispatch = useDispatch();
  const { colors } = useSelector((styles) => styles);
  const [size, setsize] = useState("1.7rem");
  const [color, setColor] = useState(" #565E6CFF;");

  const dummyNavList = [
    {
      id: 0,
      name: "Message",
      Icon: (
        <StyledIcon>
          <MessageIcon color="inherit" size={size} />
        </StyledIcon>
      ),
      active: true,
    },
    {
      id: 1,
      name: "Calls",
      Icon: (
        <StyledIcon>
          <VideoIcon color="inherit" size={size} />
        </StyledIcon>
      ),
      active: false,
    },
    {
      id: 2,
      name: "People",
      Icon: (
        <StyledIcon>
          <PeopleIcon color="inherit" size={size} />
        </StyledIcon>
      ),
      active: false,
    },
    {
      id: 3,
      name: "Settings",
      Icon: (
        <StyledIcon
          whileHover={{ scale: 1.2, rotate: 90 }}
          whileTap={{
            scale: 0.8,
            rotate: -90,
            borderRadius: "100%",
          }}
        >
          <SettingsIcon color="inherit" size={size} />
        </StyledIcon>
      ),
      active: false,
    },
  ];

  const [navList, setNavList] = useState(dummyNavList);
  const setActiveNav = (index) => {
    dispatch(setShowChat({ showChat: false }));

    switch (index) {
      case 0:
        dispatch(setShowPeoplePage({ showPeoplePage: false }));
        dispatch(setShowChatsPage({ showChatsPage: true }));
        dispatch(setShowSettingsPage({ showSettingsPage: false }));

        break;
      case 1:
        dispatch(setShowChatsPage({ showChatsPage: false }));
        dispatch(setShowPeoplePage({ showPeoplePage: false }));
        dispatch(setShowSettingsPage({ showSettingsPage: false }));
        break;
      case 2:
        dispatch(setShowChatsPage({ showChatsPage: false }));
        dispatch(setShowPeoplePage({ showPeoplePage: true }));
        dispatch(setShowSettingsPage({ showSettingsPage: false }));
        break;
      case 3:
        dispatch(setShowChatsPage({ showChatsPage: false }));
        dispatch(setShowPeoplePage({ showPeoplePage: false }));
        dispatch(setShowSettingsPage({ showSettingsPage: true }));
        break;
    }
    // if (index !== 0) {
    //   setShowChatPage(false);
    // }
    setNavList((prev) => {
      const temp = [...prev];
      temp.map((item) => {
        if (item.id === index) {
          item.active = true;
        } else {
          item.active = false;
        }
      });
      return temp;
    });
  };

  return (
    <StyledNav
      initial={{ x: -100, opacity: 0 }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      exit={{ x: -100, opacity: 0 }}
    >
      {[...navList].map((item, index) => {
        return (
          <StyledNavItem
            className={`${item.active && classes.active} ${classes.nav_item}`}
            layout={true}
            key={item.id}
            onClick={() => setActiveNav(index)}
          >
            {item.Icon}
            <StyledName
              className={item.active && classes.active}
              color="inherit"
            >
              {item.name}
            </StyledName>
          </StyledNavItem>
        );
      })}
    </StyledNav>
  );
};

export default HomeNav;
