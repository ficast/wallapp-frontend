import React from "react";
import { ReactElement } from "react-dom/node_modules/@types/react";
import styled from "styled-components";
import theme from "../../theme/nice";
import { GiStoneWall as WallIcon } from "react-icons/gi";

type LogoProps = {
  size: number | string;
};

function Logo({ size }: LogoProps): ReactElement {
  return (
    <>
      <WallIcon size={size} color={theme.colors.primary[300]} />
      <Title>The Wall</Title>
    </>
  );
}

export default Logo;

const Title = styled.h1`
  color: ${theme.colors.primary[300]};
  font-size: size;
`;
