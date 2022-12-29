import React from "react";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../components/firebase";
import { onAuthStateChanged } from "firebase/auth";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import HomeNav from "../components/Homepage/HomeNav";
import { getDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { useEffect } from "react";
import { setCurrentUser } from "../redux/user";
import { useDispatch, useSelector } from "react-redux";
import { setDoc } from "firebase/firestore";
import { func } from "prop-types";
import { async } from "@firebase/util";
import { setChats } from "../redux/user";
import ChatList from "../components/Homepage/ChatList/ChatList";
import Utility from "../components/Homepage/Utility/Utility";
import Textify from "../components/LoadingTheme/Textify";
import ChatItemSkeleton from "../components/Homepage/ChatList/ChatItem/ChatItemSkeleton";
import { setActive } from "../redux/user";
import { updateDoc } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { AiOutlineUserAdd as AddUserIcon } from "react-icons/ai";

const StyledHeader = styled.header`
  position: fixed;
  top: 0rem;
`;
const Inputs = styled.input``;
const Container = styled.div`
  max-width: 100vw;
`;
const StyledAddUser = styled.div`
  border-radius: 100%;
  /* background-color: #00bdd6ff; */
  /* height: 10rem; */
  /* width: 10rem; */
  position: fixed;
  bottom: 5rem;
  right: 1.5rem;
  display: inline-block;
  padding: 0.7rem;
  box-shadow: 0px 0px 10px #95b0b6;
  /* background-image: linear-gradient(
    to right top,
    #00bdd6,
    #04a2b7,
    #06889a,
    #076f7d,
    #075762
  ); */
  background-image: linear-gradient(
    to right top,
    #00d1ed,
    #00c5e0,
    #00bad3,
    #00aec6,
    #00a3b9,
    #0098ac,
    #008d9f,
    #008293,
    #007483,
    #006774,
    #005a65,
    #004d57
  );
`;

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { chats } = useSelector((state) => state.user);
  const [mountChats, setMountChats] = useState(false);

  console.log(chats);
  console.log(currentUser);
  const signout = async () => {
    dispatch(setActive({ isActive: false }));
    const docRef = doc(db, "users", currentUser.uid);
    const data = { isActive: false };
    console.log("updated");
    updateDoc(docRef, data)
      .then((res) => console.log(res))
      .catch((res) => console.log(res));
    navigate("/");
    await signOut(auth);
    console.log("s");
  };

  useEffect(() => {}, []);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        getDoc(docRef).then((res) => {
          dispatch(setCurrentUser({ currentUser: res.data() }));
          console.log(res.data());
          dispatch(setChats({ chats: res.data().chats }));

          setMountChats(true);
          dispatch(setActive({ isActive: true }));

          // SET ACTIVENESS IN THE DB
          setTimeout(() => {
            const docRef = doc(db, "users", user.uid);
            const data = { isActive: true };
            console.log("updated");
            updateDoc(docRef, data)
              .then((res) => console.log(res))
              .catch((res) => console.log(res));
          }, 1000);
        });
      } else {
        // dispatch(setActive({ isActive: false }));
        // const docRef = doc(db, "users", currentUser.uid);
        // const data = { isActive: false };
        // console.log("updated");
        // updateDoc(docRef, data)
        //   .then((res) => console.log(res))
        //   .catch((res) => console.log(res));
        navigate("/");
      }
    });

    // const docRef = doc(db, "users", currentUser.uid);
    // getDoc(docRef).then((res) => {
    //   dispatch(setCurrentUser({ currentUser: res.data() }));
    //   console.log(res.data());
    // });
  }, []);
  useEffect(() => {
    console.log(currentUser);
  }, [currentUser, dispatch]);

  const getMessage = (e) => {
    const docRef2 = doc(db, "users", currentUser.uid);

    getDoc(docRef2)
      .then((res) => console.log(res.data()))
      .catch((res) => console.log(res));
  };

  const getChat = (e) => {
    // console.log(currentUser.uid);
    // // const docRef = doc(db, "users", currentUser.uid, "chats", "ppiano");
    // // const data = {};
    // // setDoc(docRef, data);
    // const docRef2 = doc(db, "users", currentUser.uid, "chats");
    // getDoc(docRef2)
    //   .then((res) => console.log(res.data()))
    //   .catch((res) => console.log(res));
  };

  const createChat = () => {
    const docRef = doc(db, "users", currentUser.uid);
    const data = { null: "null" };

    setDoc(docRef, data);
  };

  const createMessage = () => {
    const docRef = doc(
      db,
      "users",
      currentUser.uid,
      "chats",
      "chats",
      "peter"
      // "peter",
      // "message",
      // "Hello"
    );
    const data = { message: "Hello", by: currentUser.name };

    setDoc(docRef, data);
  };

  return (
    <>
      <Container>
        {/* <div>Home</div> */}
        <Utility />
        <ChatList mountChat={mountChats} />
        <button onClick={signout}>signout</button>
        <br />
        <StyledAddUser>
          <AddUserIcon color="white" size="2.5rem" />
        </StyledAddUser>

        <HomeNav />

        {/*  <br />
      <br />
      <br />
      <Inputs />
      <br />
      <button onClick={getChat}>get chat</button>
      <br />
      <button onClick={getMessage}>get message</button>
      <br />
      <button onClick={createChat}>create chat</button>
      <br />
      <button onClick={createMessage}>create Message</button> */}
      </Container>
    </>
  );
};

export default Home;
