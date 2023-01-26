import React from "react";
import styled from "styled-components";
import userIcon from "../../../images/user.png";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BsPencilFill as EditIcon } from "react-icons/bs";
import { number } from "prop-types";
import FileUpload from "./FileUpload";
import { AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import BasicModal from "../../BasicModal";
import { motion } from "framer-motion";
const StyledContainer = styled(motion.div)`
  font-family: ${({ font }) => font};
  margin-top: 4rem;
  /* border: 1px solid red; */
  overflow-y: scroll;
  overflow-x: hidden;
  height: 80vh;
  /* position: relative;
  bottom: 10rem;
  z-index: -1; */
`;
const StyledProfileImage = styled.img`
  height: 9rem;
  width: 9rem;
  margin-top: 0.5rem;
  border-radius: 100%;
  /* border: 1px solid grey; */
  box-shadow: 0px 0px 5px #95b0b6;
  /* margin: auto; */
`;
const StyledForm = styled.form`
  margin-top: 1rem;
  /* border: 1px solid red; */
  display: grid;
  grid-template-columns: 100%;
  width: 85%;
  max-width: 30rem;
  row-gap: 1rem;
  @media (min-width: 800px) {
    width: 30rem;
    grid-template-columns: 43% 43%;
    justify-content: space-between;
  }
`;
export const StyledInput = styled.input`
  width: 100%;
  height: 3rem;
  border-radius: 0.5rem;
  padding: 0 1rem;
  font-size: 1.2rem;
  box-sizing: border-box;
  /* border: 1px solid ${({ bd }) => bd}; */
  border: none;
  background-color: ${({ bg }) => bg};
  &::placeholder {
    font-size: 1.2rem;
  }
`;
const StyledLabel = styled.label`
  float: left;
  font-family: inherit;
  font-size: 1.2rem;
  color: ${({ cl }) => cl};
  margin-bottom: 0.5rem;
`;
const StyledWrapper = styled.div`
  display: inline-block;
  margin-bottom: 0.5rem;
  /* border: 1px solid red; */
  width: 100%;
  @media (min-width: 800px) {
    grid-column-start: ${({ full }) => (full ? 1 : null)};
    grid-column-end: ${({ full }) => (full ? 3 : null)};
    width: ${({ full }) => (full ? "100%" : "100%")};
  } ;
`;
const StyledProfileWrapper = styled.div`
  position: relative;
  z-index: 0;
  /* border: 1px solid red; */
  width: 10rem;
`;
const StyledEditBtn = styled.span`
  z-index: 200;
  /* border: 1px solid red; */
  padding: 0.5rem 0.5rem 0.3rem 0.5rem;
  border-radius: 100%;
  box-sizing: border-box;
  box-shadow: 0px 0px 5px #95b0b6;
  position: absolute;
  top: 7rem;
  left: 7rem;
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

export const StyledSaveBtn = styled.button`
  float: left;
  font-size: 1rem;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 0.6rem;
  color: ${({ cl }) => cl};
  box-shadow: ${({ formIsValid }) => formIsValid && "0px 0px 5px #95b0b6"};
  border: 1px solid ${({ bd }) => bd};

  /* background-color: transparent; */
  background-image: ${({ formisValid }) =>
    formisValid &&
    `linear-gradient(
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
  )`};
`;
const Form = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { textGrey } = useSelector((state) => state.styles.colors);
  const { bgGrey } = useSelector((state) => state.styles.colors);
  const { errBgRed } = useSelector((state) => state.styles.colors);
  const { textBlack } = useSelector((state) => state.styles.colors);
  const { mainGreen } = useSelector((state) => state.styles.colors);
  const { lightBgGreen } = useSelector((state) => state.styles.colors);
  const { altmain } = useSelector((state) => state.styles.fonts);
  const [formIsValid, setFormIsValid] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  console.log(formIsValid);
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: currentUser.email,
    number: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  });
  const [valid, setValid] = useState({
    fName: true,
    lName: true,
    email: true,
    number: true,
    address: true,
    city: true,
    state: true,
    zipcode: true,
    country: true,
  });

  useEffect(() => {
    if (
      valid.fName &&
      valid.lName &&
      valid.email &&
      valid.number &&
      valid.address &&
      valid.city &&
      valid.state &&
      valid.zipcode &&
      valid.country
    ) {
      setFormIsValid(true);
    }
  }, [
    valid.fName,
    valid.lName,
    valid.email,
    valid.number,
    valid.address,
    valid.city,
    valid.state,
    valid.zipcode,
    valid.country,
  ]);

  const inputUpdater = (prev, e, index) => {
    const temp = { ...prev };
    temp[index] = e.target.value;
    return temp;
  };
  const validUpdater = (prev, item, value) => {
    const temp = { ...prev };
    temp[item] = value;
    return temp;
  };
  console.log(valid);
  const fnameHandler = (e) => {
    setInputs((prev) => {
      return inputUpdater(prev, e, "firstName");
    });
    e.target.value.length > 3
      ? setValid((prev) => validUpdater(prev, "fName", true))
      : setValid((prev) => validUpdater(prev, "fName", false));
  };
  const lnameHandler = (e) => {
    setInputs((prev) => {
      return inputUpdater(prev, e, "lastName");
    });
    e.target.value.length > 3
      ? setValid((prev) => validUpdater(prev, "lName", true))
      : setValid((prev) => validUpdater(prev, "lName", false));
  };
  const emailHandler = (e) => {
    setInputs((prev) => {
      return inputUpdater(prev, e, "email");
    });
    e.target.value.length > 7 && e.target.value.includes("@");
    e.target.value.includes(".com")
      ? setValid((prev) => validUpdater(prev, "email", true))
      : setValid((prev) => validUpdater(prev, "email", false));
  };
  const contactHandler = (e) => {
    setInputs((prev) => {
      return inputUpdater(prev, e, "number");
    });
    e.target.value.length > 10
      ? setValid((prev) => validUpdater(prev, "number", true))
      : setValid((prev) => validUpdater(prev, "number", false));
  };
  const addressHandler = (e) => {
    setInputs((prev) => {
      return inputUpdater(prev, e, "address");
    });
    e.target.value.length > 11
      ? setValid((prev) => validUpdater(prev, "address", true))
      : setValid((prev) => validUpdater(prev, "address", false));
  };
  const cityHandler = (e) => {
    setInputs((prev) => {
      return inputUpdater(prev, e, "city");
    });
    e.target.value.length > 1
      ? setValid((prev) => validUpdater(prev, "city", true))
      : setValid((prev) => validUpdater(prev, "city", false));
  };
  const stateHandler = (e) => {
    setInputs((prev) => {
      return inputUpdater(prev, e, "state");
    });
    e.target.value.length > 1
      ? setValid((prev) => validUpdater(prev, "state", true))
      : setValid((prev) => validUpdater(prev, "state", false));
  };
  const zipcodeHandler = (e) => {
    setInputs((prev) => {
      return inputUpdater(prev, e, "zipcode");
    });
    e.target.value.length > 3
      ? setValid((prev) => validUpdater(prev, "zipcode", true))
      : setValid((prev) => validUpdater(prev, "zipcode", false));
  };
  const countryHandler = (e) => {
    setInputs((prev) => {
      return inputUpdater(prev, e, "country");
    });
    e.target.value.length > 2
      ? setValid((prev) => validUpdater(prev, "country", true))
      : setValid((prev) => validUpdater(prev, "country", false));
  };
  console.log(showUpload);
  return (
    <StyledContainer
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 360,
        damping: 30,
      }}
      exit={{
        opacity: 0,
        scale: 0,
      }}
    >
      <Helmet>
        <title> Textify | Settings | Edit Profile </title>
        <meta name="description" content="Home page" />
      </Helmet>
      <center>
        <StyledProfileWrapper>
          <StyledProfileImage
            src={currentUser.pictureUrl ? currentUser.pictureUrl : userIcon}
            //    src={userIcon}
          />
          <StyledEditBtn
            onClick={() => setShowUpload((showUpload) => !showUpload)}
          >
            <EditIcon color="white" />
          </StyledEditBtn>
        </StyledProfileWrapper>
        <AnimatePresence>
          {showUpload && (
            <FileUpload setShowUpload={setShowUpload} />
            // <BasicModal />
          )}
        </AnimatePresence>
        <StyledForm font={altmain}>
          <StyledWrapper>
            <StyledLabel cl={textBlack} htmlFor="FirstName">
              First Name
            </StyledLabel>
            <br />
            <StyledInput
              onBlur={fnameHandler}
              onFocus={fnameHandler}
              onChange={fnameHandler}
              placeholder="Paul"
              bd={mainGreen}
              bg={valid.fName ? bgGrey : errBgRed}
              type="text"
              id="FirstName"
              full={false}
            />
          </StyledWrapper>
          <StyledWrapper>
            <StyledLabel cl={textBlack} htmlFor="LastName">
              Last Name
            </StyledLabel>
            <br />
            <StyledInput
              onChange={lnameHandler}
              onFocus={lnameHandler}
              onBlur={lnameHandler}
              placeholder="Oje"
              bg={valid.lName ? bgGrey : errBgRed}
              type="text"
              id="LastName"
              full={false}
            />
          </StyledWrapper>
          <StyledWrapper full={true}>
            <StyledLabel cl={textBlack} htmlFor="email">
              Email
            </StyledLabel>
            <br />
            <StyledInput
              onChange={emailHandler}
              onFocus={emailHandler}
              value={inputs.email}
              onBlur={emailHandler}
              placeholder="oje@gmail.com"
              bg={valid.email ? bgGrey : errBgRed}
              type="text"
              id="email"
              full={true}
            />
          </StyledWrapper>
          <StyledWrapper full={true}>
            <StyledLabel cl={textBlack} htmlFor="number">
              Contacts Number
            </StyledLabel>
            <br />
            <StyledInput
              onChange={contactHandler}
              onFocus={contactHandler}
              onBlur={contactHandler}
              placeholder="+2348164857706"
              bg={valid.number ? bgGrey : errBgRed}
              type="number"
              id="number"
              full={true}
            />
          </StyledWrapper>
          <StyledWrapper full={true}>
            <StyledLabel cl={textBlack} htmlFor="address">
              Address
            </StyledLabel>
            <br />
            <StyledInput
              onChange={addressHandler}
              onFocus={addressHandler}
              onBlur={addressHandler}
              bg={valid.address ? bgGrey : errBgRed}
              placeholder="No 18, Ojerinde Community,Apata,Ibadan"
              bd={mainGreen}
              type="text"
              id="address"
              full={true}
            />
          </StyledWrapper>
          <StyledWrapper>
            <StyledLabel cl={textBlack} htmlFor="City">
              City
            </StyledLabel>
            <br />
            <StyledInput
              onChange={cityHandler}
              onFocus={cityHandler}
              onBlur={cityHandler}
              placeholder="Ibadan"
              bd={mainGreen}
              bg={valid.city ? bgGrey : errBgRed}
              type="text"
              id="City"
              full={false}
            />
          </StyledWrapper>
          <StyledWrapper>
            <StyledLabel cl={textBlack} htmlFor="state">
              state
            </StyledLabel>
            <br />
            <StyledInput
              onChange={stateHandler}
              onFocus={stateHandler}
              onBlur={stateHandler}
              placeholder="Oyo state"
              bd={mainGreen}
              bg={valid.state ? bgGrey : errBgRed}
              id="state"
              type="text"
              full={false}
            />
          </StyledWrapper>
          <StyledWrapper>
            <StyledLabel cl={textBlack} htmlFor="zipcode">
              Zip code
            </StyledLabel>
            <br />
            <StyledInput
              onChange={zipcodeHandler}
              onFocus={zipcodeHandler}
              onBlur={zipcodeHandler}
              placeholder="200261"
              bd={mainGreen}
              bg={valid.zipcode ? bgGrey : errBgRed}
              id="zipcode"
              type="text"
              full={false}
            />
          </StyledWrapper>
          <StyledWrapper>
            <StyledLabel cl={textBlack} htmlFor="country">
              Country
            </StyledLabel>
            <br />
            <StyledInput
              onChange={countryHandler}
              onFocus={countryHandler}
              onBlur={countryHandler}
              placeholder="Nigeria"
              bd={mainGreen}
              bg={valid.country ? bgGrey : errBgRed}
              id="country"
              type="text"
              full={false}
            />
          </StyledWrapper>
          <StyledWrapper>
            <StyledSaveBtn
              bd={formIsValid ? "none" : mainGreen}
              cl={formIsValid ? "white" : mainGreen}
              formisValid={formIsValid}
            >
              Save
            </StyledSaveBtn>
          </StyledWrapper>
        </StyledForm>
      </center>
    </StyledContainer>
  );
};

export default Form;
