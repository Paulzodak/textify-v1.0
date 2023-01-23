import styled from "styled-components";
import { motion } from "framer-motion";
export const StyledMenuItem = styled(motion.div)`
  margin: 1.6rem 1rem;
  /* border: 1px solid red; */
  justify-content: space-between;
  display: grid;
  border-bottom: 1px solid ${({ cl }) => cl};
  color: ${({ cl }) => cl};
  grid-template-columns: 1rem 4rem 1rem;
`;
export const StyledMenuName = styled.div`
  font-size: 0.8rem;
  /* border: 1px solid red; */
`;
