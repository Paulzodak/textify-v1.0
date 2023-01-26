import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Hero from "../images/hero.svg";
import { useSelector, useDispatch } from "react-redux";
import Inputs from "../components/Form/Inputs";
import { motion } from "framer-motion";
import { StyledSignInBtn } from "../UI/Buttons";
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

import { StyledContentArea } from "../UI/signLoginGlobal";
import { StyledHeroImg } from "../UI/signLoginGlobal";
import { StyledContainer } from "../UI/signLoginGlobal";
import { StyledH1 } from "../UI/signLoginGlobal";
import { StyledP } from "../UI/signLoginGlobal";

import { db } from "../components/firebase";
import Textify from "../components/LoadingTheme/Textify";
import { TailSpin } from "react-loader-spinner";
import { StyledLoadingContainer } from "../UI/signLoginGlobal";
import { Toast } from "../UI/signLoginGlobal";
import { getDoc, doc } from "firebase/firestore";
const StyledHello = styled.h1`
  color: ${({ cl }) => cl};
  /* margin: 0.5rem 0; */
`;
const StyledWelcome = styled.h2`
  color: ${(props) => props.cl};
  margin: 0;
  font-weight: 500;
`;
const StyledForm = styled.form`
  margin: 3rem 0 0 0;
`;

const StyledForgotPassword = styled.p`
  float: right;
  color: ${({ cl }) => cl};
  margin: 1rem 0;
`;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((user) => user);
  const { mainGreen } = useSelector((state) => state.styles.colors);
  // console.log(user);
  const { styles } = useSelector((styles) => styles);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(email, password);

  // console.log(email);
  // console.log(password);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        getDoc(docRef).then((res) => {
          dispatch(setCurrentUser({ currentUser: res.data() }));
          setTimeout(() => navigate("/Home"), [200]);
        });
      } else {
        // console.log("false :" + user);
      }
    });
  }, []);

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
      signInWithEmailAndPassword(auth, email, password).then((res) => {
        setLoading(false);
        console.log(res);
        navigate("/Home");
        // setTimeout(() => navigate("/Home"), [200]);
        // navigate("/");
      });
      // .catch((res) => {
      //   setLoading(false);
      //   // alert(res.message);
      //   Toast.fire({
      //     title: "Error!",
      //     text:
      //       res.message === "Firebase: Error (auth/user-not-found)."
      //         ? "User not found, Check your credentials"
      //         : "unknown",
      //     icon: "error",
      //     confirmButtonText: "Okay",
      //     confirmButtonColor: mainGreen,
      //   });
      // });
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
      <StyledContainer font={styles.fonts.main}>
        <StyledHeroImg src={Hero} />
        <StyledContentArea>
          <StyledHello cl={styles.colors.textBlack}>Hello!</StyledHello>
          <StyledWelcome cl={styles.colors.textGrey}>
            Welcome back!
          </StyledWelcome>
          <StyledForm>
            <Inputs
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
            <StyledForgotPassword cl={styles.colors.mainGreen}>
              Forgot Password?
            </StyledForgotPassword>
            <StyledSignInBtn
              valid={formIsValid}
              onClick={login}
              colors={styles.colors}
              disabled={!formIsValid}
            >
              {loading ? (
                <center>
                  <StyledLoadingContainer>
                    <TailSpin
                      height="36"
                      width="36"
                      color="white"
                      ariaLabel="tail-spin-loading"
                      radius="3"
                      visible={true}
                    />
                  </StyledLoadingContainer>
                </center>
              ) : (
                "Sign In"
              )}
            </StyledSignInBtn>
          </StyledForm>
        </StyledContentArea>
        <StyledH1>
          Don't have an account? &nbsp;
          <StyledP
            onClick={() => navigate("/Register")}
            cl={styles.colors.mainGreen}
          >
            Sign up
          </StyledP>
        </StyledH1>
      </StyledContainer>
    </motion.div>
  );
};

export default Login;
