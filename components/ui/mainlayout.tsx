import React from "react";
import NavbarMinimal from "./navbar";
import styled from "@emotion/styled";
type Props = {
  children?: React.ReactNode;
  order: number;
};

const MainLayout: React.FC<Props> = (props) => {
  return (
    <Container>
      <NavbarMinimal order={props.order} />
      {props.children}
    </Container>
  );
};

export default MainLayout;

const Container = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #f8f9fa;
`;
