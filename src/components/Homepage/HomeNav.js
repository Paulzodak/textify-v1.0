import React from "react";
import styled from "styled-components";
import { BsInbox as MessageIcon } from "react-icons/bs";
import { BsCameraVideo as VideoIcon } from "react-icons/bs";
import { BsPeople as PeopleIcon } from "react-icons/bs";
import { CiSettings as SettingsIcon } from "react-icons/ci";
import { useSelector } from "react-redux";
import { useState } from "react";
const Nav = styled.nav`
  position: fixed;
  bottom: 0rem;
  height: 5rem;
  /* border: 1px solid red; */
  padding: 0.5rem 0rem;
  background-color: rgb(255, 255, 255);
  border: 1px solid #f5f5f6;
  width: 100%;
  box-sizing: border-box;

  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  justify-content: space-around;
`;
const Name = styled.div`
  font-size: 0.8rem;
  text-align: center;
  font-weight: bolder;
  color: ${({ color }) => color};
`;
const NavItem = styled.div`
  text-align: center;
  box-sizing: border-box;
  transition: 0.5s;
  padding: 0.5rem;
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
  const [size, setsize] = useState("2rem");
  const [color, setColor] = useState(" #565E6CFF;");
  return (
    <div>
      <Nav>
        <NavItem>
          <MessageIcon color="inherit" size={size} />
          <Name color="inherit">Messages</Name>
        </NavItem>
        <NavItem>
          <VideoIcon color="inherit" size={size} />
          <Name color="inherit">Calls</Name>
        </NavItem>
        <NavItem>
          <PeopleIcon color="inherit" size={size} />
          <Name color="inherit">People</Name>
        </NavItem>
        <NavItem>
          <SettingsIcon color="inherit" size={size} />
          <Name color="inherit">Settings</Name>
        </NavItem>
      </Nav>
    </div>
  );
};

export default HomeNav;
