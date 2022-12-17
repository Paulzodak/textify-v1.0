import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../components/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const signout = async () => {
    await signOut(auth);
    console.log("s");
  };
  onAuthStateChanged(auth, (user) => {
    if (user) {
    } else {
      navigate("/");
    }
  });
  return (
    <>
      <div>Home</div>
      <button onClick={signout}>signout</button>
    </>
  );
};

export default Home;
