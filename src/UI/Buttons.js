import styled from "styled-components";
export const SignInBtn = styled.button`
  width: 100%;
  height: 3rem;
  background-color: ${({ colors, valid }) =>
    valid ? colors.mainGreen : "transparent"};
  border: ${({ colors, valid }) =>
    valid ? "none" : `1px solid${colors.mainGreen}`};

  color: ${({ colors, valid }) => (valid ? "white" : colors.mainGreen)};
  cursor: ${({ valid }) => (valid ? null : "not-allowed")};
  font-size: 1.1rem;
  transition: 0.4s;
  border-radius: 0.3rem;
  &:hover {
    background-color: ${({ colors, valid }) =>
      valid ? colors.darkMainGreen : null};
  }
`;
