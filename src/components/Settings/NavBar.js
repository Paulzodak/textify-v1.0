import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FiChevronDown as DownCaret } from "react-icons/fi";
import userIcon from "../../images/user.png";
import { useState } from "react";
import MenuDropdown from "./MenuDropdown";
import { AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const StyledContainer = styled.section`
  /* border: 1px solid red; */
  box-shadow: 0px 0px 10px rgb(175, 206, 210);
  position: fixed;
  top: 0rem;
  width: 100vw;
  background-color: white;
  padding: 1rem;
  box-sizing: border-box;
  max-height: 4rem;
`;

const StyledDropMenu = styled.div``;
const StyledMenuHeader = styled.span`
  font-size: 1.3rem;
  /* border: 1px solid red; */
  font-weight: bold;
`;
const StyledDownCaret = styled(motion.span)`
  font-size: 1.2rem;
  /* width: 3rem; */
  float: left;
  margin: 0.2rem;

  /* margin: 0.2rem; */
  transform: ${({ showMenu }) => showMenu && "rotate(180deg)"};
  transition: 0.5s;
  /* border: 1px solid red; */
`;
const StyledDownCaret2 = styled(StyledDownCaret)`
  float: right;

  margin: 0.3rem 0 0 0;
`;
// const StyledNavBar = styled(NavBar)`
//   .downcaret {
//     padding: 1rem;
//   }
// `;
const StyledUserImage = styled.img`
  float: right;
  height: 1.7rem;
  width: 1.7rem;
`;
const NavBar = () => {
  const [showNavMenu, setShowNavMenu] = useState([false, false]);
  // const [showUtilityMenu, setShowUtilityMenu] = useState([false, false]);));
  const { navMenuItems } = useSelector((state) => state.settings.layout);
  const { utilityMenuItems } = useSelector((state) => state.settings.layout);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const showMenuHandler = (index) => {
    // const tempindex = index;
    setShowNavMenu((prev) => {
      const temp = [...prev];
      temp[index] = !temp[index];
      return temp;
    });
  };
  console.log(showNavMenu);
  return (
    <StyledContainer>
      <StyledDropMenu>
        <StyledMenuHeader
          onClick={() => {
            showMenuHandler(0);
          }}
        >
          Edit Profile
        </StyledMenuHeader>
        <AnimatePresence>
          {showNavMenu[0] && <MenuDropdown items={navMenuItems} />}
        </AnimatePresence>
        <StyledDownCaret
          onClick={() => {
            showMenuHandler(0);
          }}
          showMenu={showNavMenu[0]}
        >
          <DownCaret
          // style={{ position: "relative", top: "0.2rem", left: "0.2rem" }}
          />
        </StyledDownCaret>
        <StyledUserImage
          onClick={() => {
            showMenuHandler(1);
          }}
          showMenu={showNavMenu[1]}
          src={userIcon}
        />
        <AnimatePresence>
          {showNavMenu[1] && (
            <MenuDropdown ps={"right"} items={utilityMenuItems} />
          )}
        </AnimatePresence>
        <StyledDownCaret2
          onClick={() => {
            showMenuHandler(1);
          }}
          showMenu={showNavMenu[1]}
        >
          <DownCaret
          /* style={{
              float: "right",
              position: "relative",
              top: "0.4rem",
              right: "0.2rem",
            }} */
          />
        </StyledDownCaret2>
      </StyledDropMenu>
    </StyledContainer>
  );
};

export default NavBar;
