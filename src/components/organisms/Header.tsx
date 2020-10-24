import React, { ReactElement } from "react";
import { ImHome } from "react-icons/im";
import { Link } from "react-router-dom";
import styled from "styled-components";
import theme from "../../theme/nice"

export default (): ReactElement => {
  return (
    <Header>
      <Title>Wall-App</Title>
      <Link to="/home">
        <ImHome size={'2em'} color={theme.colors.secondary[200]} />
      </Link>
    </Header>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${theme.colors.primary[500]}
`;

const Title = styled.h1`
  color: ${theme.colors.secondary[200]}
`;