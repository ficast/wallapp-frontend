import React, { ReactElement } from "react";
import { GiStoneWall as WallIcon } from "react-icons/gi";
import { MdArrowBack as ArrowBackIcon } from "react-icons/md";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import theme from "../../theme/nice";

const Header = (): ReactElement => {
  const history = useHistory();

  return (
    <Container>
      <ArrowBackIcon
        size={"2em"}
        color={theme.colors.primary[300]}
        onClick={() => history.goBack()}
        style={{ cursor: "pointer" }}
      />
      <Title>The Wall</Title>
      <Link to="/home">
        <WallIcon
          size={"2em"}
          color={theme.colors.primary[300]}
          onClick={() => history.push("/home")}
        />
      </Link>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Title = styled.h1`
  color: ${theme.colors.primary[300]};
  font-family: ${theme.font.family.OpenSans};
  font-weight: ${theme.font.weight.bold};
`;
