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

const Container = styled.div`
  font-family: ${({ font }) => font};
  position: relative;
`;
const Input = styled.input`
  width: 100%;
  height: 3rem;

  border: none;
  /* background-color: ${({ colors }) => colors.lightBgGreen}; */
  font-size: 1.1rem;
  padding: 0 0 0 3rem;
  box-sizing: border-box;
  font-family: inherit;
  border-radius: 0.3rem;
`;
const Label = styled.label`
  font-size: 1.2rem;
  color: ${({ cl }) => cl};
  font-weight: 600;
  font-family: inherit;
`;
const Privacy = styled.div`
  position: absolute;
  top: 9.3rem;
  right: 2rem;
`;
const UserIconContainer = styled.div`
  position: absolute;
  top: 15.8rem;
  left: 1rem;
`;
const MessageIconContainer = styled.div`
  position: absolute;
  top: 3rem;
  left: 1rem;
`;
const LockIconContainer = styled.div`
  position: absolute;
  top: 9.3rem;
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
  const [nicknameIsValid, setNicknameIsValid] = useState(true);
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
      setNicknameIsValid(true);
    } else {
      setNicknameIsValid(false);
    }
  };

  return (
    <Container font={styles.fonts.main}>
      <Label cl={styles.colors.textBlack}>Email</Label>
      <br />
      <br />
      <MessageIconContainer>
        <MessageIcon size="1.5rem" />
      </MessageIconContainer>
      <Input
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
      <Label cl={styles.colors.textBlack}>Password</Label>
      <br />
      <br />
      <Privacy
        onClick={() => {
          setPrivacy((state) => !state);
        }}
      >
        {!privacy ? <ShowIcon size="1.5rem" /> : <HideIcon size="1.5rem" />}
      </Privacy>
      <LockIconContainer>
        <LockIcon size="1.5rem" />
      </LockIconContainer>

      <Input
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
          <Label cl={styles.colors.textBlack}>Nickname</Label>
          <br />
          <br />
          <UserIconContainer>
            <UserIcon size="1.5rem" />
          </UserIconContainer>
          <Input
            className={nicknameIsValid ? classes.valid : classes.invalid}
            onChange={nicknameHandler}
            onBlur={nicknameHandler}
            onFocus={nicknameHandler}
            placeholder="Enter a nickname"
            colors={styles.colors}
          />
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default Inputs;
