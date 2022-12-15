import React from "react";
import styled from "styled-components";
import Hero from "../images/hero.svg";
const Container = styled.div`
  border: 1px solid red;
  /* height: 2rem; */
  width: 100vw;
  max-width: 100vw;
  overflow-y: hidden;
`;
const HeroImg = styled.img`
  height: 50vw;
  width: 100vw;
  position: relative;
  /* top: -5rem; */
`;
const ContentArea = styled.div`
  position: relative;
  top: -10.5rem;
  border: 1px solid green;
`;
const Login = () => {
  return (
    <Container>
      <HeroImg src={Hero} />
      <ContentArea>default</ContentArea>
    </Container>
  );
};

export default Login;
