import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Hero from "../images/hero.svg";
import { useSelector, useDispatch } from "react-redux";
import Inputs from "../components/Form/Inputs";
import { motion } from "framer-motion";
import { SignInBtn } from "../UI/Buttons";
import "./Login.css";
import { setCurrentUser } from "../redux/user";
import { signOut } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth } from "../components/firebase";
import { useNavigate } from "react-router-dom";
import { ContentArea } from "../UI/signLoginGlobal";
import { HeroImg } from "../UI/signLoginGlobal";
import { Container } from "../UI/signLoginGlobal";
import { H1 } from "../UI/signLoginGlobal";
import { P } from "../UI/signLoginGlobal";
import { db } from "../components/firebase";
import Textify from "../components/LoadingTheme/Textify";

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

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((user) => user);
  // console.log(user);
  const { styles } = useSelector((styles) => styles);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  // console.log(email);
  // console.log(password);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setCurrentUser({ user: user.email }));
      navigate("/Home");
      // console.log("true :" + user);
    } else {
      // console.log("false :" + user);
    }
  });
  useEffect(() => {
    if (
      email.length > 11 &&
      email.includes("@") &&
      email.includes(".com") &&
      password.length > 5
    ) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [email, password]);
  const login = async (e) => {
    setLoading(true);
    e.preventDefault();
    setTimeout(() => {
      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          setLoading(false);
          // navigate("/");
        })
        .catch((res) => {
          setLoading(false);
          alert(res.message);
        });
    }, 2000);
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
        duration: 1,
        ease: "easeInOut",
        // times: [0, 0.2, 0.5, 0.8, 1],
        // repeat: Infinity,
        repeatDelay: 1,
      }}
    >
      <Container font={styles.fonts.main}>
        {loading ? <Textify size="1rem" top="40%" left="25%" /> : null}
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
            <SignInBtn
              valid={formIsValid}
              onClick={login}
              colors={styles.colors}
              disabled={!formIsValid}
            >
              Sign In
            </SignInBtn>
          </Form>
        </ContentArea>
        <H1>
          Don't have an account? &nbsp;
          <P onClick={() => navigate("/Register")} cl={styles.colors.mainGreen}>
            Sign up
          </P>
        </H1>
      </Container>
    </motion.div>
  );
};

export default Login;
