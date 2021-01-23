import React, { ReactElement } from "react";
import { RiErrorWarningFill as Error } from "react-icons/ri";
import styled from "styled-components";
import theme from "../../theme/nice";
import Header from "../organisms/Header";

export default function NotFound(): ReactElement {
  return (
    <>
      <Header />
      <Container>
        <Error size={"20em"} color={theme.colors.primary[200]} />
        <Title>Page Not Found</Title>
      </Container>
    </>
  );
}

const Title = styled.h1`
  color: ${theme.colors.primary[200]};
`;

const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: auto;
  width: 20em;
  flex-direction: column;
`;
