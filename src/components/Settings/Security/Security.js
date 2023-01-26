import React from "react";
import styled from "styled-components";
import forgotPasswordImage from "../../../images/svgs/forgot.svg";
import { StyledInput } from "../Form/Form";
import { useSelector } from "react-redux";
import { useState } from "react";
import { StyledSaveBtn } from "../Form/Form";
import { motion } from "framer-motion";
const StyledContainer = styled(motion.div)`
  /* border: 1px solid red; */
  padding: 0 0 3rem 0;
  margin: 4rem 2rem 0 2rem;
  height: 80vh;
  overflow-y: scroll;
  box-sizing: border-box;
`;
const StyledImage = styled.img`
  margin: auto;
  height: 20rem;
  /* width: 10rem; */
`;
const StyledInputContainer = styled.div`
  /* border: 1px solid red; */
  max-width: 30rem;
  margin-top: 5rem;
`;
const Security = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { textGrey } = useSelector((state) => state.styles.colors);
  const { bgGrey } = useSelector((state) => state.styles.colors);
  const { errBgRed } = useSelector((state) => state.styles.colors);
  const { textBlack } = useSelector((state) => state.styles.colors);
  const { mainGreen } = useSelector((state) => state.styles.colors);
  const { lightBgGreen } = useSelector((state) => state.styles.colors);
  const [formIsValid, setFormIsValid] = useState(true);
  const [valid, setValid] = useState({
    oldPassword: true,
    newPassword: true,
    confirmNewPassword: true,
  });
  return (
    <StyledContainer
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 360,
        damping: 30,
      }}
      exit={{
        opacity: 0,
        scale: 0,
      }}
    >
      <center>
        <StyledImage src={forgotPasswordImage} />
        <StyledInputContainer>
          <StyledInput
            //  onChange={lnameHandler}
            //  onFocus={lnameHandler}
            //  onBlur={lnameHandler}
            placeholder="Old password"
            bg={valid.oldPassword ? bgGrey : errBgRed}
            type="text"
            id="LastName"
            full={false}
          />
          <br />
          <br />
          <br />
          <StyledInput
            //  onChange={lnameHandler}
            //  onFocus={lnameHandler}
            //  onBlur={lnameHandler}
            placeholder="New password"
            bg={valid.newPassword ? bgGrey : errBgRed}
            type="text"
            id="LastName"
            full={false}
          />
          <br />
          <br />
          <br />
          <StyledInput
            //  onChange={lnameHandler}
            //  onFocus={lnameHandler}
            //  onBlur={lnameHandler}
            placeholder="Re-enter new password"
            bg={valid.confirmNewPassword ? bgGrey : errBgRed}
            type="text"
            id="LastName"
            full={false}
          />
          <br />
          <br />
          <br />
          <StyledSaveBtn
            bd={formIsValid ? "none" : mainGreen}
            cl={formIsValid ? "white" : mainGreen}
            formisValid={formIsValid}
          >
            Save
          </StyledSaveBtn>
        </StyledInputContainer>
      </center>
    </StyledContainer>
  );
};

export default Security;
