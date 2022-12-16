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
  top: 7rem;
  right: 1rem;
`;

const Email = () => {
  const { styles } = useSelector((styles) => styles);
  const [privacy, setPrivacy] = useState(true);

  return (
    <Container font={styles.fonts.main}>
      <Label cl={styles.colors.textBlack}>Email</Label>
      <br />
      <br />
      <Message />
      <Input placeholder="Enter email" bg={styles.colors.bgGrey} />
      <br />
      <br />
      <Privacy
        onClick={() => {
          setPrivacy((state) => !state);
        }}
      >
        {privacy ? <ShowIcon /> : <HideIcon />}
      </Privacy>
      <Lock />

      <Input placeholder="Enter password" bg={styles.colors.bgGrey} />
    </Container>
  );
};

export default Email;
