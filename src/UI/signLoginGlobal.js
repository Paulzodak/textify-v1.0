import styled from "styled-components";
import Swal from "sweetalert2";
export const StyledContentArea = styled.div`
  /* border: 1px solid green; */
  position: relative;
  /* top: -14rem; */
  background-color: white;
  margin: -2rem 0 0 0;
  /* height: 100vh; */
  border-radius: 1rem 1rem 0 0;
  /* border: 1px solid green; */
  padding: 0.5rem 1rem;
  @media (min-width: 800px) {
    border-radius: 0;
  }
`;

export const StyledHeroImg = styled.img`
  /* height: 100%; */
  width: 100%;
  max-width: 50rem;
  position: relative;
  @media (min-width: 800px) {
    display: none;
  }
  /* top: -6rem; */
`;

export const StyledContainer = styled.div`
  /* border: 1px solid red; */
  width: 100vw;
  /* max-width: 100vw; */
  overflow-x: hidden;
  /* max-height: 100vh; */
  font-family: ${({ font }) => font};
  @media (min-width: 800px) {
    border-radius: 1rem;
    box-shadow: 0px 0px 80px rgb(235, 235, 235);
    padding: 4rem 2rem 2rem 2rem;
    width: 30rem;
    margin: 10vh auto 0 auto;
  }
`;
export const StyledH1 = styled.div`
  margin: 2rem 0;
  text-align: center;
`;
export const StyledP = styled.span`
  color: ${({ cl }) => cl};
  cursor: pointer;
`;
export const StyledLoadingContainer = styled.div`
  /* border: 1px solid red; */
  width: 3rem;
  height: 100%;
  /* width: 3rem; */
`;
export const Toast = Swal.mixin({
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
