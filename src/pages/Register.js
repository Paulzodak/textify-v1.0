import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { SignInBtn } from "../UI/Buttons";
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
import { ContentArea } from "../UI/signLoginGlobal";
import { HeroImg } from "../UI/signLoginGlobal";
import { Container } from "../UI/signLoginGlobal";

import { H1 } from "../UI/signLoginGlobal";
import { P } from "../UI/signLoginGlobal";

import { addDoc, collection } from "firebase/firestore";

import { db } from "../components/firebase";

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

const Checkbox = styled.input`
  background-color: ${(props) => props.cl};
  margin: 0 1rem 0 0;
`;
const Box = styled.div`
  margin: 1.5rem 0;
`;
const Terms = styled.span``;
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  console.log(user);
  const { styles } = useSelector((styles) => styles);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
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
  const signup = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815,
      });
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      className="container"
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
          <Hello cl={styles.colors.textBlack}>Welcome!</Hello>
          <Welcome cl={styles.colors.textGrey}>Create an account</Welcome>
          <Form>
            <Inputs
              showNickname
              nickname={nickname}
              setNickname={setNickname}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
            <Box>
              <Checkbox cl={styles.colors.mainGreen} type="checkbox" />
              <Terms>
                I agree with
                <P cl={styles.colors.mainGreen}> Terms & Conditions</P>
              </Terms>
            </Box>

            <SignInBtn onClick={signup} bg={styles.colors.mainGreen}>
              Sign Up
            </SignInBtn>
          </Form>
          <H1>
            Already have an account? &nbsp;
            <P onClick={() => navigate("/")} cl={styles.colors.mainGreen}>
              Sign in
            </P>
          </H1>
        </ContentArea>
      </Container>
    </motion.div>
  );
};

export default Register;
