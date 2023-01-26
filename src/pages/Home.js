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
import { setDoc, onSnapshot } from "firebase/firestore";
import { func } from "prop-types";
import { async } from "@firebase/util";
import { setChats } from "../redux/user";
import ChatList from "../components/Homepage/ChatList/ChatList";
import Utility from "../components/Homepage/Utility/Utility";
import Textify from "../components/LoadingTheme/Textify";
import ChatItemSkeleton from "../components/Homepage/ChatList/ChatItem/ChatItemSkeleton";
import { setActive } from "../redux/user";
import { updateDoc, collection, query } from "firebase/firestore";
import { AiOutlineUserAdd as AddUserIcon } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import People from "../components/People/People";
import SearchTest from "../components/SearchTest";
import Chat from "../components/Homepage/Chat/Chat";
import { setMountChats, setShowHomeNav } from "../redux/home";
import useConsistentCurrentUserDataFetch from "../Hooks/useConsistentCurrentUserDataFetch";
import useConsistentlyFetchChatItemData from "../Hooks/useConsistentlyFetchChatItemData";
import ChatPage from "../layout/ChatPage";
import HomeNavDesktop from "../components/Homepage/HomeNavDesktop";
import SettingsPage from "../layout/SettingsPage";
import { Helmet } from "react-helmet";
const StyledHeader = styled.header`
  position: fixed;
  top: 0rem;
`;
const Inputs = styled.input``;
const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  /* background-color: black; */
`;
const StyledAddUser = styled(motion.div)`
  border-radius: 100%;
  position: fixed;
  z-index: -10;
  bottom: 5rem;
  right: 1.5rem;
  display: inline-block;
  padding: 1rem;
  box-shadow: 0px 0px 10px #95b0b6;

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
const StyledSubContainer = styled.div`
  @media (min-width: 800px) {
    display: grid;
    grid-template-columns: 7% 93%;
    /* border: 1px solid red; */
  }
`;
const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { chats } = useSelector((state) => state.user);
  const { mountChats } = useSelector((state) => state.home.layout);
  const { showPeoplePage } = useSelector((state) => state.home.layout);
  const { showChatsPage } = useSelector((state) => state.home.layout);
  const { showHomeNav } = useSelector((state) => state.home.layout);
  const { showSettingsPage } = useSelector((state) => state.home.layout);
  const { searchedUser } = useSelector((state) => state.people);
  const { chatItemData } = useSelector((state) => state.people);
  console.log(currentUser);
  // const signout = async () => {
  //   await signOut(auth);
  //   // SETS ACTIVE TO FALSE IN DB
  //   dispatch(setActive({ isActive: false }));
  //   const docRef = doc(db, "users", currentUser.uid);
  //   const data = { isActive: false };
  //   updateDoc(docRef, data);
  //   navigate("/");
  // };

  //  GETS DATA FOR THE CURRENTUSER ON FIRST AND INITIAL LOGIN AND STORES IN REDUX CURRENTUSER STATE
  useEffect(() => {
    const unsubscribe = () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const docRef = doc(db, "users", user.uid);
          getDoc(docRef).then((res) => {
            dispatch(setCurrentUser({ currentUser: res.data() }));

            dispatch(setChats({ chats: res.data().chats }));

            dispatch(setMountChats({ mountChats: true }));
            dispatch(setActive({ isActive: true }));
          });
        } else if (!user) {
          signOut(auth);
          // SETS ACTIVE TO FALSE IN DB

          const docRef = doc(db, "users", currentUser.uid);
          const data = { isActive: false };
          updateDoc(docRef, data);
          navigate("/");
        }
        // SETS ISACTIVE TO TRUE IN THE DB
        const docRef = doc(db, "users", user.uid);
        const data = { isActive: true };
        console.log("updated");
        updateDoc(docRef, data);
      });
    unsubscribe();
    return () => unsubscribe();
  }, []);
  //
  // HIGHT PRIORITY!! | KEEPS ALL CURRENTUSER DATA IN THE DOM UPDATED WITH DATA IN THE DB
  useConsistentCurrentUserDataFetch(currentUser);

  return (
    <>
      <Container>
        <Helmet>
          <title> Textify | Home </title>
          <meta name="description" content="Home page" />
        </Helmet>
        <AnimatePresence>
          {/*CONDITIONALLY RENDERED INDIVIDUALLY DUE TO EXIT ANIMATION CRITERIA */}
          <StyledSubContainer>
            <div>{showHomeNav && <HomeNavDesktop />}</div>
            <div>
              {showPeoplePage && <People key="people" />}

              {showChatsPage && <ChatPage mountChats={mountChats} />}
              {showHomeNav && <HomeNav key="Homenav" />}
              {showSettingsPage && <SettingsPage key="settingspage" />}
            </div>
          </StyledSubContainer>
        </AnimatePresence>
        {/* <button key="btn" onClick={signout}>
          signOut
        </button> */}
      </Container>

      <br />
    </>
  );
};

export default Home;
