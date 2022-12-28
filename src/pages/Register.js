import React from "react";
import { useState, useEffect } from "react";
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

import { StyledContentArea } from "../UI/signLoginGlobal";
import { StyledHeroImg } from "../UI/signLoginGlobal";
import { StyledContainer } from "../UI/signLoginGlobal";
import { StyledH1 } from "../UI/signLoginGlobal";
import { StyledP } from "../UI/signLoginGlobal";
import { StyledSignInBtn } from "../UI/Buttons";

import { addDoc, collection } from "firebase/firestore";

import { db } from "../components/firebase";

import { setDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import Textify from "../components/LoadingTheme/Textify";
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

const StyledCheckbox = styled.input`
  background-color: ${(props) => props.cl};
  margin: 0 1rem 0 0;
`;
const StyledBox = styled.div`
  margin: 1.5rem 0;
`;
const StyledTerms = styled.span``;
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((user) => user);
  // console.log(user);
  const { styles } = useSelector((styles) => styles);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  const [checkboxIsChecked, setCheckBoxIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(nickname);
  useEffect(() => {
    if (
      email.length > 11 &&
      email.includes("@") &&
      email.includes(".com") &&
      password.length > 5 &&
      nickname.length > 5 &&
      checkboxIsChecked
    ) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [email, password, nickname, checkboxIsChecked]);
  const checkboxHandler = (e) => setCheckBoxIsChecked(e.target.checked);
  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setLoading(false);
        const docRef = doc(db, "users", res.user.uid);
        const data = {
          email: email,
          name: nickname,
          uid: res.user.uid,
          chats: [],
          isActive: false,
        };
        setDoc(docRef, data);

        // const docRef2 = doc(db, "users", res.user.uid, "chats", "chats");

        // setDoc(docRef2, data);
        alert("Successful, You can now proceed to Login!");
        navigate("/");
      })
      .catch((res) => {
        setLoading(false);
        alert(res.message);
      });
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
        {loading ? <Textify size="1rem" top="40%" left="25%" /> : null}
        <StyledHeroImg src={Hero} />
        <StyledContentArea>
          <StyledHello cl={styles.colors.textBlack}>Welcome!</StyledHello>
          <StyledWelcome cl={styles.colors.textGrey}>
            Create an account
          </StyledWelcome>
          <StyledForm>
            <Inputs
              showNickname
              nickname={nickname}
              setNickname={setNickname}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
            <StyledBox>
              <StyledCheckbox
                onChange={checkboxHandler}
                cl={styles.colors.mainGreen}
                type="checkbox"
              />
              <StyledTerms>
                I agree with
                <StyledP cl={styles.colors.mainGreen}>
                  Terms & Conditions
                </StyledP>
              </StyledTerms>
            </StyledBox>

            <StyledSignInBtn
              valid={formIsValid}
              onClick={signup}
              colors={styles.colors}
              disabled={!formIsValid}
            >
              Sign Up
            </StyledSignInBtn>
          </StyledForm>
          <StyledH1>
            Already have an account? &nbsp;
            <StyledP onClick={() => navigate("/")} cl={styles.colors.mainGreen}>
              Sign in
            </StyledP>
          </StyledH1>
        </StyledContentArea>
      </StyledContainer>
    </motion.div>
  );
};

export default Register;
