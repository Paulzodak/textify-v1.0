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
import { addDoc, getDoc, collection, setDoc } from "firebase/firestore";
import { db } from "../components/firebase";
import { doc } from "firebase/firestore";
import Textify from "../components/LoadingTheme/Textify";
import { TailSpin } from "react-loader-spinner";
import { StyledLoadingContainer } from "../UI/signLoginGlobal";
import { Toast } from "../UI/signLoginGlobal";
import Swal from "sweetalert2";
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
  const { mainGreen } = useSelector((state) => state.styles.colors);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setNickname] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  const [checkboxIsChecked, setCheckBoxIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(username);
  useEffect(() => {
    if (
      email.length > 11 &&
      email.includes("@") &&
      email.includes(".com") &&
      password.length > 5 &&
      username.length > 5 &&
      checkboxIsChecked
    ) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [email, password, username, checkboxIsChecked]);
  const checkboxHandler = (e) => setCheckBoxIsChecked(e.target.checked);

  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const docRef = doc(db, "users", res.user.uid);
        const data = {
          email: email,
          username: username,
          uid: res.user.uid,
          chats: [],
          isActive: false,
          pictureUrl: "",
        };
        setDoc(docRef, data)
          .then(() => {
            Swal.fire({
              icon: "success",
              iconColor: mainGreen,
              title: "Successful",
              showConfirmButton: false,
              timer: 1500,
            });
            setTimeout(() => navigate("/Home"), [1000]);
          })
          .catch((res) => {
            Toast.fire({
              title: "Error!",
              text: res.message,
              icon: "error",
              confirmButtonText: "Okay",
              confirmButtonColor: mainGreen,
            });
          });
        // Swal.fire({
        //   icon: "success",
        //   iconColor: mainGreen,
        //   title: "Successful, You can now proceed to Login!",
        //   showConfirmButton: false,
        //   timer: 1500,
        // });
        // setTimeout(() => navigate("/"), [1000]);
      })
      .catch((res) => {
        setLoading(false);
        Toast.fire({
          title: "Error!",
          text:
            res.message === "Firebase: Error (auth/email-already-in-use)." &&
            "Email has been taken, Choose a different email",
          icon: "error",
          confirmButtonText: "Okay",
          confirmButtonColor: mainGreen,
        });
        // alert(res.message);
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
        <StyledHeroImg src={Hero} />
        <StyledContentArea>
          <StyledHello cl={styles.colors.textBlack}>Welcome!</StyledHello>
          <StyledWelcome cl={styles.colors.textGrey}>
            Create an account
          </StyledWelcome>
          <StyledForm>
            <Inputs
              showNickname
              username={username}
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
                I agree with &nbsp;
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
                "Sign Up"
              )}
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
