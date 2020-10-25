import React, { ReactElement } from "react";
import Loader from "react-loader-spinner";
import styled from "styled-components";
import theme from "../../theme/nice";

function Loading(): ReactElement {
  return (
    <Container>
      <Loader
        type="Bars"
        color={theme.colors.primary[300]}
        height={100}
        width={100}
      />
    </Container>
  );
}

export default Loading;

const Container = styled.div`
  align-items: center;
  justify-content: center;
  align-self: center;
  display: flex;
  height: 100vh;
`;
