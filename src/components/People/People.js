import React from "react";
import PeopleImage from "../../images/svgs/people.svg";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { GoSearch as SearchIcon } from "react-icons/go";
import { BsArrowRight as Arrow } from "react-icons/bs";
import SearchUser from "./SearchUser";
import { useDispatch } from "react-redux";
import { setSearchedUser } from "../../redux/people";
import HomeNav from "../Homepage/HomeNav";
import { Helmet } from "react-helmet";
const StyledImage = styled.img`
  width: 80%;
  max-width: 20rem;
`;
const StyledContainer = styled(motion.div)`
  /* height: 100vh; */

  padding: 0 2rem;
  /* border: 1px solid red; */
  /* position: relative;
  top: -1rem; */
`;

const StyledInput = styled.input`
  width: 100%;

  height: 2.5rem;
  margin: 2rem 0 2rem 0;
  border: none;
  border-radius: 0.5rem;
  background-color: ${({ colors }) => colors.lightBgGreen};
  font-size: 1.1rem;
  padding: 0 0 0 3rem;
  /* box-shadow: 0px 0px 10px rgb(240, 240, 240); */
  box-sizing: border-box;
  font-family: inherit;
`;
const StyledSearchIconContainer = styled.div`
  position: absolute;
  top: 2.7rem;
  margin: 0 0 0 1rem;
  /* left: 0.5rem; */
`;

const StyledH1 = styled.h1`
  text-align: center;
`;
const StyledH2 = styled.h2`
  text-align: center;
  font-size: 1.6rem;
  color: white;

  /* margin: 2rem; */
`;
const StyledP = styled.p`
  /* margin: 2rem; */
  font-size: 1.2rem;
  text-align: center;
  color: rgb(221, 241, 243);
`;
const StyledTextbox = styled(motion.div)`
  /* height: 1rem; */
  padding: 1rem 2rem;
  box-sizing: border-box;
  margin: 4rem auto;
  border-radius: 1rem;
  box-shadow: 0px 0px 30px rgb(190, 190, 190);
  width: 100%;
  max-width: 25rem;
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
const StyledSearch = styled(motion.div)``;

const StyledContentArea = styled(motion.div)``;

const StyledBtn = styled.button`
  -webkit-user-select: none; /* Chrome/Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+ */
  user-select: none; /* Standard */
  width: 100%;
  border: none;
  background-color: white;
  color: rgb(37, 37, 37);
  height: 3rem;
  font-size: 1.1rem;
  border-radius: 1rem;
`;
const StyledInputContainer = styled.div`
  /* border: 1px solid red; */
  width: 100%;
  max-width: 30rem;
`;
const People = () => {
  const dispatch = useDispatch();
  const { colors } = useSelector((state) => state.styles);
  const { searchedUser } = useSelector((state) => state.people);
  const [searchInput, setSearchInput] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const [showLoading, setShowLoading] = useState(true);

  const handler = (e) => {
    setSearchInput(e.target.value);
  };

  const showSearchHandler = () => setShowSearch(true);
  useEffect(() => {
    const colRef = collection(db, "users");

    const q = query(colRef, where("username", "==", searchInput));
    onSnapshot(q, (snapshot) => {
      if (snapshot.docs.length > 0) {
        setShowLoading(false);
        snapshot.docs.forEach((user) => {
          dispatch(setSearchedUser({ searchedUser: user.data() }));
          // users.push(user.data());
        });
      } else {
        dispatch(setSearchedUser({ searchedUser: {} }));
      }
    });

    if (searchInput.length < 1) {
      setShowLoading(true);
    }
  }, [searchInput]);

  const ModalOne = () => {
    return (
      <StyledTextbox
        key="modal1"
        exit={{
          x: -500,
          transition: {
            duration: 0.1,
          },
        }}
      >
        <Helmet>
          <title> Textify | People </title>
          <meta name="description" content="Home page" />
        </Helmet>
        <StyledH2>Text anyone on Textify</StyledH2>
        <StyledP>
          Find people from every country and any place in the world
        </StyledP>
        {/* <StyledBtn onClick={showSearchHandler}>Get Started</StyledBtn> */}
        <StyledBtn
          onClick={() => {
            setShowNext(false);
          }}
        >
          <Arrow size={"1.2rem"} />
        </StyledBtn>
      </StyledTextbox>
    );
  };
  const ModalTwo = () => {
    return (
      <StyledTextbox
        key="modal2"
        initial={{
          x: 500,
          transition: {},
        }}
        animate={{
          x: 0,
          transition: {
            delay: 0.2,
            type: "spring",
            stiffness: 800,
            damping: 80,
            mass: 5,
          },
        }}
      >
        <StyledH2>Speed of light!</StyledH2>
        <StyledP>
          Send messages to friends and loved ones with the speed of light!
        </StyledP>
        {/* <StyledBtn onClick={showSearchHandler}>Get Started</StyledBtn> */}
        <StyledBtn onClick={showSearchHandler}>Get Started</StyledBtn>
      </StyledTextbox>
    );
  };
  const [showNext, setShowNext] = useState(true);
  return (
    <StyledContainer
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        transition: { duration: 0.2, delay: 0.5 },
      }}
      exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
    >
      <AnimatePresence>
        {showSearch && (
          <StyledSearch
            initial={{ y: -150 }}
            animate={{
              y: 0,
              transition: {
                type: "spring",
                stiffness: 500,
                damping: 50,
                mass: 5,
              },
            }}
            exit={{ y: -150 }}
          >
            <center>
              <StyledInputContainer>
                <StyledInput
                  value={searchInput}
                  onChange={handler}
                  colors={colors}
                />
                <StyledSearchIconContainer>
                  <SearchIcon size="1.3rem" />
                </StyledSearchIconContainer>
              </StyledInputContainer>
            </center>
          </StyledSearch>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {searchInput.length < 1 ? (
          <StyledContentArea key="contentarea">
            <StyledH1>Find new friends</StyledH1>

            <center>
              <StyledImage src={PeopleImage} />
            </center>
            <AnimatePresence>
              {showNext ? ModalOne() : ModalTwo()}
            </AnimatePresence>
          </StyledContentArea>
        ) : (
          searchedUser.username && <SearchUser />
        )}
      </AnimatePresence>
      {/* <HomeNav /> */}
    </StyledContainer>
  );
};

export default People;
