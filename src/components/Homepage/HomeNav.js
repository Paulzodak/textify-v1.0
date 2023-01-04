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
const StyledNav = styled(motion.nav)`
  position: fixed;
  bottom: 0rem;
  height: 3.5rem;
  /* border: 1px solid red; */
  padding: 0.25rem 0rem;
  background-color: rgb(255, 255, 255);
  border: 1px solid #f5f5f6;
  width: 100%;
  box-sizing: border-box;

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
const HomeNav = () => {
  const dispatch = useDispatch();
  const { colors } = useSelector((styles) => styles);
  const [size, setsize] = useState("1.7rem");
  const [color, setColor] = useState(" #565E6CFF;");

  const dummyNavList = [
    {
      id: 0,
      name: "Message",
      Icon: <MessageIcon color="inherit" size={size} />,
      active: true,
    },
    {
      id: 1,
      name: "Calls",
      Icon: <VideoIcon color="inherit" size={size} />,
      active: false,
    },
    {
      id: 2,
      name: "People",
      Icon: <PeopleIcon color="inherit" size={size} />,
      active: false,
    },
    {
      id: 3,
      name: "Settings",
      Icon: <SettingsIcon color="inherit" size={size} />,
      active: false,
    },
  ];
  //   useEffect(()=>{
  //     navList.map((item)=>{
  // if (item.id )
  //     })
  //   },[])
  const [navList, setNavList] = useState(dummyNavList);
  const setActiveNav = (index) => {
    console.log(index);
    switch (index) {
      case 0:
        dispatch(setShowPeoplePage({ showPeoplePage: false }));
        dispatch(setShowChatsPage({ showChatsPage: true }));

        break;
      case 1:
        dispatch(setShowChatsPage({ showChatsPage: false }));
        dispatch(setShowPeoplePage({ showPeoplePage: false }));
        break;
      case 2:
        dispatch(setShowChatsPage({ showChatsPage: false }));
        dispatch(setShowPeoplePage({ showPeoplePage: true }));
        break;
      case 3:
        dispatch(setShowChatsPage({ showChatsPage: false }));
        dispatch(setShowPeoplePage({ showPeoplePage: false }));
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
  console.log(navList);
  return (
    <StyledNav>
      {[...navList].map((item, index) => {
        return (
          <StyledNavItem
            className={`${item.active ? classes.active : null} ${
              classes.nav_item
            }`}
            layout={true}
            key={item.id}
            onClick={() => setActiveNav(index)}
          >
            {item.Icon}
            <StyledName
              className={item.active ? classes.active : null}
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
