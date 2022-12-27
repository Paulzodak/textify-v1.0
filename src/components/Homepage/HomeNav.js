import React from "react";
import styled from "styled-components";
import { BsInbox as MessageIcon } from "react-icons/bs";
import { BsCameraVideo as VideoIcon } from "react-icons/bs";
import { BsPeople as PeopleIcon } from "react-icons/bs";
import { CiSettings as SettingsIcon } from "react-icons/ci";
import { useSelector } from "react-redux";
import { useState } from "react";
const StyledNav = styled.nav`
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
`;
const StyledNavItem = styled.div`
  text-align: center;
  box-sizing: border-box;
  transition: 0.5s;
  padding: 0.25rem;
  color: #414650;
  &:hover {
    color: #00bdd6ff;
    /* box-shadow: 0px 0px 5px #efefef; */
    border-radius: 0.4rem;
    background-color: #ebfdffff;
  }
`;
const HomeNav = () => {
  const styles = useSelector((styles) => styles);
  const [size, setsize] = useState("1.7rem");
  const [color, setColor] = useState(" #565E6CFF;");
  const NavList = [
    {
      name: "Message",
      Icon: <MessageIcon color="inherit" size={size} />,
    },
    {
      name: "Calls",
      Icon: <VideoIcon color="inherit" size={size} />,
    },
    {
      name: "People",
      Icon: <PeopleIcon color="inherit" size={size} />,
    },
    {
      name: "Settings",
      Icon: <SettingsIcon color="inherit" size={size} />,
    },
  ];

  return (
    <div>
      <StyledNav>
        {NavList.map((item) => {
          return (
            <StyledNavItem>
              {item.Icon}
              <StyledName color="inherit">{item.name}</StyledName>
            </StyledNavItem>
          );
        })}
      </StyledNav>
    </div>
  );
};

export default HomeNav;
