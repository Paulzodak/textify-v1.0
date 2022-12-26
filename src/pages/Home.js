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

const StyledHeader = styled.header`
  position: fixed;
  top: 0rem;
`;
const Inputs = styled.input``;

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((user) => user.user);
  const { chats } = useSelector((user) => user.user);
  console.log(chats);
  const signout = async () => {
    await signOut(auth);
    console.log("s");
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        getDoc(docRef).then((res) => {
          dispatch(setCurrentUser({ currentUser: res.data() }));
          console.log(res.data());
          dispatch(setChats({ chats: res.data().chats }));
        });
      } else {
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
      {/* <div>Home</div> */}
      <ChatList />
      <HomeNav />
      {/* <button onClick={signout}>signout</button>
      <br />
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
    </>
  );
};

export default Home;
