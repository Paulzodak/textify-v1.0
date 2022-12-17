import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Hero from "../images/hero.svg";
import { useSelector, useDispatch } from "react-redux";
import Inputs from "../components/Form/Inputs";
import { motion } from "framer-motion";
import "./Login.css";
import { setCurrentUser } from "../redux/user";
import { signOut } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../components/firebase";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  console.log(user);
  const { styles } = useSelector((styles) => styles);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(email);
  console.log(password);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setCurrentUser({ user: user.email }));
      navigate("/Home");
      console.log("true :" + user);
    } else {
      console.log("false :" + user);
    }
  });
  const login = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };
  const signout = async () => {
    await signOut(auth)
      .then()
      .catch((err) => console.log(err));
  };
  return (
    <motion.div
      className="box"
      animate={{
        scale: [3, 1],
        // rotate: [0, 0, 180, 180, 0],
        // borderRadius: ["0%", "0%", "50%", "50%", "0%"],
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        // times: [0, 0.2, 0.5, 0.8, 1],
        // repeat: Infinity,
        repeatDelay: 1,
      }}
    >
      <Container font={styles.fonts.main}>
        <HeroImg src={Hero} />
        <ContentArea>
          <Hello cl={styles.colors.textBlack}>Hello!</Hello>
          <Welcome cl={styles.colors.textGrey}>Welcome back!</Welcome>
          <Form>
            <Inputs
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
            <ForgotPassword cl={styles.colors.mainGreen}>
              Forgot Password?
            </ForgotPassword>
            <SignInBtn onClick={login} bg={styles.colors.mainGreen}>
              Sign In
            </SignInBtn>
          </Form>
        </ContentArea>
      </Container>
      <button onClick={signout}>Sign out</button>
    </motion.div>
  );
};

export default Login;
