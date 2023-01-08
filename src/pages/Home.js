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
const StyledHeader = styled.header`
  position: fixed;
  top: 0rem;
`;
const Inputs = styled.input``;
const Container = styled.div`
  max-width: 100vw;
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

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { chats } = useSelector((state) => state.user);
  const { mountChats } = useSelector((state) => state.home.layout);
  const { showPeoplePage } = useSelector((state) => state.home.layout);
  const { showChatsPage } = useSelector((state) => state.home.layout);
  const { showHomeNav } = useSelector((state) => state.home.layout);

  // console.log(chats);
  // console.log(currentUser);
  const signout = async () => {
    await signOut(auth);
    dispatch(setActive({ isActive: false }));
    const docRef = doc(db, "users", currentUser.uid);
    const data = { isActive: false };
    // console.log("updated");
    updateDoc(docRef, data)
      .then((res) => console.log(res))
      .catch((res) => console.log(res));
    navigate("/");

    // console.log("s");
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const getData = () => {
          const docRef = doc(db, "users", user.uid);
          getDoc(docRef).then((res) => {
            dispatch(setCurrentUser({ currentUser: res.data() }));
            // console.log(res.data());
            dispatch(setChats({ chats: res.data().chats }));

            dispatch(setMountChats({ mountChats: true }));
            dispatch(setActive({ isActive: true }));

            // SET ACTIVENESS IN THE DB
            // setTimeout(() => {
            const docRef = doc(db, "users", user.uid);
            const data = { isActive: true };
            console.log("updated");
            updateDoc(docRef, data)
              .then((res) => console.log(res))
              .catch((res) => console.log(res));
          }, 1000);
          // });
        };
        getData();
      } else {
        // dispatch(setActive({ isActive: false }));
        // const docRef = doc(db, "users", currentUser.uid);
        // const data = { isActive: false };
        // console.log("updated");
        // updateDoc(docRef, data)
        //   .then((res) => console.log(res))
        //   .catch((res) => console.log(res));
        // navigate("/");
      }
    });

    const colRef = collection(db, "users");
    const q = query(colRef);
    onSnapshot(q, () => {
      const docRef = doc(db, "users", currentUser.uid);
      getDoc(docRef).then((res) => {
        // console.log("reupdated");
        dispatch(setCurrentUser({ currentUser: res.data() }));
        // console.log(res.data());
        dispatch(setChats({ chats: res.data().chats }));

        dispatch(setMountChats({ mountChats: true }));
        dispatch(setActive({ isActive: true }));
      });
      // });
    });
    // const docRef = doc(db, "users", currentUser.uid);
    // getDoc(docRef).then((res) => {
    //   dispatch(setCurrentUser({ currentUser: res.data() }));
    //   console.log(res.data());
    // });

    // const colRef2 = collection(db, "users");
    // const q2 = query(colRef2);
    // onSnapshot(q2, () => {
    //   chats.map(() => {
    //     const docRef = doc(db, "users", chats.uid);
    //     getDoc(docRef).then((res) => {
    //       console.log("reupdated 2");
    //       console.log(res.data());
    //       dispatch(setChats({ chats: res.data().chats }));
    //     });
    //   });

    //   // });
    // });
  }, []);

  // CONSISTENTLY LISTEN TO FRIENDS DATA

  // const colRef = collection(db, "users");
  // const q = query(colRef);
  // onSnapshot(q, () => {
  //   const docRef = doc(db, "users", currentUser.uid);
  //   getDoc(docRef).then((res) => {
  //     dispatch(setChats({ chats: res.data().chats }));
  //   });
  //   // });
  // });
  // useEffect(() => {
  //   const userDocRef = doc(db, "users", currentUser.uid);
  //   onSnapshot(userDocRef, (snapshot) => {
  //     console.log(snapshot.data());
  //   });
  //   console.log(currentUser);
  // }, [currentUser]);

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
        {/* {showChat && <Chat />} */}

        <AnimatePresence>
          {/*CONDITIONALLY RENDERED INDIVIDUALLY DUE TO EXIT ANIMATION CRITERIA */}
          {/* {showChatsPage && <Utility key="utility" />} */}
          {showPeoplePage && <People key="people" />}
          {showChatsPage && <ChatList key="chatList" mountChats={mountChats} />}
          {showChatsPage && (
            <StyledAddUser
              initial={{ x: "200%" }}
              animate={{
                x: "0%",
                transition: {
                  type: "spring",
                  stiffness: 500,
                  damping: 100,
                  mass: 20,
                },
              }}
              exit={{ x: "200%", transition: { duration: 0.1 } }}
              // transition={{
              //   type: "spring",
              //   stiffness: 500,
              //   damping: 100,
              //   mass: 20,
              // }}
              key="userIcon"
            >
              <AddUserIcon color="white" size="2.5rem" />
            </StyledAddUser>
          )}
          {showHomeNav && <HomeNav key="Homenav" />}
        </AnimatePresence>
      </Container>

      <button key="btn" onClick={signout}>
        signOut
      </button>
      <button
      // onClick={() => {
      //   setShowChat(true);
      // }}
      >
        show chat
      </button>

      <br />
    </>
  );
};

export default Home;
