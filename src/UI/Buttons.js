import styled from "styled-components";
export const SignInBtn = styled.button`
  width: 100%;
  height: 3rem;
  background-color: ${({ bg }) => bg};
  border: none;
  color: white;
  font-size: 1.1rem;
  transition: 0.4s;
  border-radius: 0.3rem;
  &:hover {
    background-color: transparent;
    color: ${({ bg }) => bg};
    border: 1px solid ${({ bg }) => bg};
  }
`;
