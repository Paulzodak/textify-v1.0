import React from "react";
import styled from "styled-components";
import Message from "../../images/svgs/Message";
import Lock from "../../images/svgs/Lock";
import { useSelector } from "react-redux";
import ShowIcon from "../../images/svgs/ShowIcon";
import HideIcon from "../../images/svgs/HideIcon";
import { useState } from "react";

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
  top: 15.5rem;
  right: 2rem;
`;
const UserIcon = styled.div`
  position: absolute;
  top: 1rem;
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
      {showNickname ? (
        <>
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
          <br />
          <br />
        </>
      ) : (
        <></>
      )}
      <Label cl={styles.colors.textBlack}>Email</Label>
      <br />
      <br />
      <Message top="9.3rem" left="1rem" />
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
        {!privacy ? <ShowIcon /> : <HideIcon />}
      </Privacy>
      <Lock top="15.5rem" left="1rem" />

      <Input
        onChange={passwordHandler}
        // value={password}
        placeholder="Enter password"
        bg={styles.colors.bgGrey}
        type={privacy ? "password" : null}
      />
    </Container>
  );
};

export default Inputs;
