import React from "react";
import styled from "styled-components";
const Container = styled.div`
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  background-color: green;
`;
const Message = ({ ps, top, left, width, height }) => {
  return (
    <Container ps={ps} top={top} left={left}>
      <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
        <path d="M4 20q-.825 0-1.412-.587Q2 18.825 2 18V6q0-.825.588-1.412Q3.175 4 4 4h16q.825 0 1.413.588Q22 5.175 22 6v12q0 .825-.587 1.413Q20.825 20 20 20Zm8-7L4 8v10h16V8Zm0-2 8-5H4ZM4 8V6v12Z" />
      </svg>
    </Container>
  );
};

export default Message;
