import React from "react";
import styled from "styled-components";
import classes from "./Inputs.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { MdOutlineMailOutline as MessageIcon } from "react-icons/md";

import { BiLockAlt as LockIcon } from "react-icons/bi";
import { BiShowAlt as ShowIcon } from "react-icons/bi";
import { BiHide as HideIcon } from "react-icons/bi";
import { FiUser as UserIcon } from "react-icons/fi";

import { PropTypes } from "prop-types";
const StyledContainer = styled.div`
  font-family: ${({ font }) => font};
  position: relative;
`;
const StyledInput = styled.input`
  width: 100%;
  height: 3rem;

  border: none;
  /* background-color: ${({ colors }) => colors.lightBgGreen}; */
  font-size: 1.1rem;
  padding: 0.3rem 0 0 3rem;
  box-sizing: border-box;
  font-family: inherit;
  border-radius: 0.3rem;
`;
const StyledLabel = styled.label`
  font-size: 1.2rem;
  color: ${({ cl }) => cl};
  font-weight: 600;
  font-family: inherit;
`;
const StyledPrivacy = styled.div`
  position: absolute;
  top: 9.5rem;
  right: 2rem;
`;
const StyledUserIconContainer = styled.div`
  position: absolute;
  top: 15.8rem;
  left: 1rem;
`;
const StyledMessageIconContainer = styled.div`
  position: absolute;
  top: 3.2rem;
  left: 1rem;
`;
const StyledLockIconContainer = styled.div`
  position: absolute;
  top: 9.5rem;
  left: 1rem;
`;
const Inputs = ({
  setNickname,
  nickname,
  email,
  setEmail,
  password,
  setPassword,
  showNickname,
}) => {
  const { styles } = useSelector((styles) => styles);
  const [privacy, setPrivacy] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [usernameIsValid, setUsernameIsValid] = useState(true);
  const emailHandler = (e) => {
    setEmail(e.target.value);
    if (
      e.target.value.length > 11 &&
      e.target.value.includes("@") &&
      e.target.value.includes(".com")
    ) {
      setEmailIsValid(true);
      console.log(emailIsValid);
    } else {
      setEmailIsValid(false);
      console.log(emailIsValid);
    }

    // setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length > 5) {
      setPasswordIsValid(true);
    } else {
      setPasswordIsValid(false);
    }
  };
  const nicknameHandler = (e) => {
    setNickname(e.target.value);
    if (e.target.value.length > 5) {
      setUsernameIsValid(true);
    } else {
      setUsernameIsValid(false);
    }
  };

  return (
    <StyledContainer font={styles.fonts.main}>
      <StyledLabel cl={styles.colors.textBlack}>Email</StyledLabel>
      <br />
      <br />
      <StyledMessageIconContainer>
        <MessageIcon size="1.5rem" />
      </StyledMessageIconContainer>
      <StyledInput
        // value={email}
        className={emailIsValid ? classes.valid : classes.invalid}
        onChange={emailHandler}
        onFocus={emailHandler}
        onBlur={emailHandler}
        placeholder="Enter email"
        colors={styles.colors}
      />
      <br />
      <br />
      <StyledLabel cl={styles.colors.textBlack}>Password</StyledLabel>
      <br />
      <br />
      <StyledPrivacy
        onClick={() => {
          setPrivacy((state) => !state);
        }}
      >
        {!privacy ? <ShowIcon size="1.5rem" /> : <HideIcon size="1.5rem" />}
      </StyledPrivacy>
      <StyledLockIconContainer>
        <LockIcon size="1.5rem" />
      </StyledLockIconContainer>

      <StyledInput
        onChange={passwordHandler}
        onBlur={passwordHandler}
        onFocus={passwordHandler}
        className={passwordIsValid ? classes.valid : classes.invalid}
        placeholder="Enter password"
        colors={styles.colors}
        type={privacy ? "password" : null}
      />
      {showNickname ? (
        <>
          <br />
          <br />
          <StyledLabel cl={styles.colors.textBlack}>Username</StyledLabel>
          <br />
          <br />
          <StyledUserIconContainer>
            <UserIcon size="1.5rem" />
          </StyledUserIconContainer>
          <StyledInput
            className={usernameIsValid ? classes.valid : classes.invalid}
            onChange={nicknameHandler}
            onBlur={nicknameHandler}
            onFocus={nicknameHandler}
            placeholder="Enter a username"
            colors={styles.colors}
          />
        </>
      ) : (
        <></>
      )}
    </StyledContainer>
  );
};

Inputs.propTypes = {
  setNickname: PropTypes.func,
  nickname: PropTypes.string,
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  showNickname: PropTypes.bool,
};

export default Inputs;
