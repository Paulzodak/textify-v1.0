import React from "react";
import styled from "styled-components";
const Container = styled.div`
  position: absolute;
  top: 9.2rem;
  left: 0.7rem;
`;
const Lock = () => {
  return (
    <Container>
      <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
        <path d="M6 22q-.825 0-1.412-.587Q4 20.825 4 20V10q0-.825.588-1.413Q5.175 8 6 8h1V6q0-2.075 1.463-3.538Q9.925 1 12 1t3.538 1.462Q17 3.925 17 6v2h1q.825 0 1.413.587Q20 9.175 20 10v10q0 .825-.587 1.413Q18.825 22 18 22Zm0-2h12V10H6v10Zm6-3q.825 0 1.413-.587Q14 15.825 14 15q0-.825-.587-1.413Q12.825 13 12 13q-.825 0-1.412.587Q10 14.175 10 15q0 .825.588 1.413Q11.175 17 12 17ZM9 8h6V6q0-1.25-.875-2.125T12 3q-1.25 0-2.125.875T9 6ZM6 20V10v10Z" />
      </svg>
    </Container>
  );
};

export default Lock;
