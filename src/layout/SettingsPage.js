import React from "react";
import Settings from "../components/Settings/Settings";
import NavBar from "../components/Settings/NavBar";
import styled from "styled-components";
import Form from "../components/Settings/Form/Form";
import Security from "../components/Settings/Security/Security";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
const StyledContainer = styled.div`
  /* overflow: scroll; */
`;
const SettingsPage = () => {
  const { navMenuItems } = useSelector((state) => state.settings.layout);
  return (
    <>
      {/* MOBILE */}
      <StyledContainer>
        <Helmet>
          <title> Textify | Settings </title>
          <meta name="description" content="Home page" />
        </Helmet>
        <NavBar />
        <AnimatePresence> {navMenuItems[0].active && <Form />}</AnimatePresence>
        <AnimatePresence>
          {navMenuItems[1].active && <Security />}
        </AnimatePresence>
      </StyledContainer>
    </>
  );
};

export default SettingsPage;
