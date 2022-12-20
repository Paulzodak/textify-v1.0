import React from "react";
import styled from "styled-components";
import Lock from "../../images/svgs/Lock";
import { useSelector } from "react-redux";
import { useState } from "react";
import { MdOutlineMailOutline as MessageIcon } from "react-icons/md";

import { BiLockAlt as LockIcon } from "react-icons/bi";
import { BiShowAlt as ShowIcon } from "react-icons/bi";
import { BiHide as HideIcon } from "react-icons/bi";

const Container = styled.div`
  font-family: ${({ font }) => font};
  position: relative;
`;
const Input = styled.input`
  width: 100%;
  height: 3rem;

  border: none;
  background-color: ${({ bg }) => bg};
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
const UserIcon = styled.div`
  position: absolute;
  top: 1rem;
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

  const emailHandler = (e) => setEmail(e.target.value);
  const passwordHandler = (e) => setPassword(e.target.value);
  const nicknameHandler = (e) => setNickname(e.target.value);

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
        onChange={emailHandler}
        placeholder="Enter email"
        bg={styles.colors.bgGrey}
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
        // value={password}
        placeholder="Enter password"
        bg={styles.colors.bgGrey}
        type={privacy ? "password" : null}
      />
      {showNickname ? (
        <>
          <br />
          <br />
          <Label cl={styles.colors.textBlack}>Nickname</Label>
          <br />
          <br />
          <UserIcon></UserIcon>
          <Input
            // value={email}
            onChange={emailHandler}
            placeholder="Enter a nickname"
            bg={styles.colors.bgGrey}
          />
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default Inputs;
