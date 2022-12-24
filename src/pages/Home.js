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

const StyledHeader = styled.header`
  position: fixed;
  top: 0rem;
`;

const Home = () => {
  const navigate = useNavigate();
  const signout = async () => {
    await signOut(auth);
    console.log("s");
  };

  // useEffect(()=>{},[])
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const docRef = doc(db, "users", user.uid);
      getDoc(docRef).then((res) => console.log(res.data()));
    } else {
      navigate("/");
    }
  });
  return (
    <>
      <div>Home</div>

      <HomeNav />
      <button onClick={signout}>signout</button>
    </>
  );
};

export default Home;
