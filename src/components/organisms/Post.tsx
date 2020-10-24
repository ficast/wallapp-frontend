import React, { ReactElement } from "react";
import { ImHome } from "react-icons/im";
import { Link } from "react-router-dom";
import styled from "styled-components";
import theme from "../../theme/nice";

type Post = {
  title: string;
  body: string;
  author: string;
};

export default ({ title, body, author }: Post): ReactElement => {
  return (
    <Container>
      <h1>{title}</h1>
      <p>{body}</p>
      <h3>{author}</h3>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${theme.colors.secondary[100]};
`;
