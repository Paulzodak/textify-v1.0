import styled from "styled-components";

export const ContentArea = styled.div`
  /* border: 1px solid green; */
  position: relative;
  /* top: -14rem; */
  background-color: white;
  margin: -2rem 0 0 0;
  /* height: 100vh; */
  border-radius: 1rem 1rem 0 0;
  /* border: 1px solid green; */
  padding: 0.5rem 1rem;
`;

export const HeroImg = styled.img`
  /* height: 100%; */
  width: 100%;
  position: relative;
  /* top: -6rem; */
`;

export const Container = styled.div`
  /* border: 1px solid red; */
  width: 100vw;
  /* max-width: 100vw; */
  overflow-x: hidden;
  /* max-height: 100vh; */
  font-family: ${({ font }) => font};
`;
export const H1 = styled.div`
  margin: 2rem 0;
  text-align: center;
`;
export const P = styled.span`
  color: ${({ cl }) => cl};
  cursor: pointer;
`;
