import React, { ReactElement } from "react";
import styled from "styled-components";
import theme from "../../theme/nice";

type PostProps = {
  title: string;
  body: string;
  author?: string;
};

export default function Post({ title, body, author }: PostProps): ReactElement {
  return (
    <Container>
      <Title>{title}</Title>
      <Body>{`"${body}"`}</Body>
      {author && <Author>{author}</Author>}
    </Container>
  );
}

const Container = styled.div`
  padding: 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
  background-color: ${theme.colors.secondary[100]};
  width: 85%;
  align-self: center;
  text-align: left;
  margin: 1em;

  @media (min-width: 750px) and (max-width: 1199px) {
    width: 70%;
  }

  @media (min-width: 1200px) {
    width: 40%;
  }
`;

const Title = styled.h3`
  font-family: ${theme.font.family.OpenSans};
`;

const Body = styled.p`
  font-style: italic;
  font-family: ${theme.font.family.OpenSans};
`;

const Author = styled.h4`
  align-self: flex-end;
  font-family: ${theme.font.family.OpenSans};
`;
