import React from "react";
import styled from "styled-components";
import Hero from "../images/hero.svg";
import { useSelector } from "react-redux";
import Email from "../components/Form/Email";
const Container = styled.div`
  /* border: 1px solid red; */
  width: 100vw;
  max-width: 100vw;
  overflow-y: hidden;
  max-height: 100vh;
  font-family: ${({ font }) => font};
`;
const HeroImg = styled.img`
  height: 100vw;
  width: 100%;
  position: relative;
  top: -6rem;
`;
const ContentArea = styled.div`
  position: relative;
  top: -14rem;
  background-color: white;
  height: 100vh;
  border-radius: 1rem 1rem 0 0;
  /* border: 1px solid green; */
  padding: 0.5rem 1rem;
`;
const Hello = styled.h1`
  color: ${({ cl }) => cl};
  /* margin: 0.5rem 0; */
`;
const Welcome = styled.h2`
  color: ${(props) => props.cl};
  margin: 0;
  font-weight: 500;
`;
const Form = styled.form`
  margin: 3rem 0 0 0;
`;

const ForgotPassword = styled.p`
  float: right;
  color: ${({ cl }) => cl};
  margin: 1rem 0;
`;
const SignInBtn = styled.button`
  width: 100%;
  height: 3rem;
  background-color: ${({ bg }) => bg};
  border: none;
  color: white;
  font-size: 1.1rem;
`;
const Login = () => {
  const { styles } = useSelector((styles) => styles);

  return (
    <Container font={styles.fonts.main}>
      <HeroImg src={Hero} />
      <ContentArea>
        <Hello cl={styles.colors.textBlack}>Hello!</Hello>
        <Welcome cl={styles.colors.textGrey}>Welcome back!</Welcome>
        <Form>
          <Email />
          <ForgotPassword cl={styles.colors.mainGreen}>
            Forgot Password?
          </ForgotPassword>
          <SignInBtn bg={styles.colors.mainGreen}>Sign In</SignInBtn>
        </Form>
      </ContentArea>
    </Container>
  );
};

export default Login;
