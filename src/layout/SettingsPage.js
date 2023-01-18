import React from "react";
import Settings from "../components/Settings/Settings";
import NavBar from "../components/Settings/NavBar";
import styled from "styled-components";
import Form from "../components/Settings/Form/Form";
const StyledContainer = styled.div`
  /* overflow: scroll; */
`;
const SettingsPage = () => {
  return (
    <>
      {/* MOBILE */}
      <StyledContainer>
        <NavBar />
        <Form />
      </StyledContainer>
    </>
  );
};

export default SettingsPage;
