import React, { ReactElement } from "react";
import { GiStoneWall as WallIcon } from "react-icons/gi";
import { MdArrowBack as ArrowBackIcon } from "react-icons/md";
import { ImExit } from "react-icons/im";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import theme from "../../theme/nice";
import { RiLogoutBoxFill } from "react-icons/ri";

type HeaderProps = {
  username?: string;
};

const Header = ({ username }: HeaderProps): ReactElement => {
  const history = useHistory();

  const logout = (): void => {
    username && localStorage.removeItem("THE_WALL_TOKEN");
    history.push("/");
  };

  return (
    <Container>
      <Title>
        <ArrowBackIcon
          size={"2em"}
          color={theme.colors.primary[300]}
          onClick={() => history.goBack()}
          style={{ cursor: "pointer" }}
        />
        <WallIcon
          size={"2em"}
          color={theme.colors.primary[300]}
          onClick={() => history.push("/home")}
          style={{ cursor: "pointer", margin: "1em" }}
        />
      </Title>
      <Title>
        <User>{username || "Anonymous"}</User>
        <Text> , wellcome to The Wall</Text>
      </Title>
      <ImExit
        size={"2em"}
        color={theme.colors.primary[300]}
        onClick={() => logout()}
        style={{ cursor: "pointer" }}
      />
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const User = styled.h3`
  color: ${theme.colors.primary[300]};
  font-family: ${theme.font.family.OpenSans};
  font-weight: ${theme.font.weight.bold};

  @media (max-width: 500px) {
    font-size: ${theme.sizes[200]};
  }
`;

const Text = styled.h3`
  color: ${theme.colors.primary[300]};
  font-family: ${theme.font.family.OpenSans};
  font-weight: ${theme.font.weight.regular};

  @media (max-width: 500px) {
    font-size: ${theme.sizes[200]};
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
