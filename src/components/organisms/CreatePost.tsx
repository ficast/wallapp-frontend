import React, { FormEvent, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ReactElement } from "react-dom/node_modules/@types/react";
import styled from "styled-components";
import theme from "../../theme/nice";
import Api from "../../services/Api";

type CreatePostProps = {
  onSubmit: () => Promise<void>;
  token: any;
};

const CreatePost = ({ onSubmit, token }: CreatePostProps): ReactElement => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [postCreated, setPostCreated] = useState(false);

  async function createNewPost(): Promise<void> {
    setError("");
    console.log({
      title,
      body,
      token: token.token,
    });
    try {
      await Api.createPost({
        title,
        body,
        token: token.token,
      });
      setPostCreated(true);
    } catch (e) {
      setError("Both are required fields with at least 3 characters each!");
    }
  }

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();
    setLoading(true);
    await createNewPost();
    setLoading(false);
  }

  useEffect(() => {
    onSubmit();
  }, [postCreated]);

  return (
    <Container>
      <Box>
        <FormContainer style={{ width: "90%" }}>
          <Form style={{ width: "100%" }}>
            <Form.Control
              autoFocus
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={inputStyle}
              placeholder="Title"
            />
          </Form>
          <Form style={{ width: "100%" }}>
            <Form.Control
              type="textbox"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              style={inputStyle}
              placeholder="Insert your message here"
            />
          </Form>
          {error && <ErrorMsg>{error}</ErrorMsg>}
          <Buttons>
            <Button
              style={buttonStyle}
              block
              onClick={(e) => handleSubmit(e)}
              type="submit"
              disabled={loading}
            >
              Create
            </Button>
          </Buttons>
        </FormContainer>
      </Box>
    </Container>
  );
};

export default CreatePost;

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

const Box = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  /* margin: auto; */
  padding: 2em;
  min-width: 30%;
  max-width: 90%;
`;

const FormContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: auto;
  flex-direction: column;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1.5em;
`;

const buttonStyle = {
  fontFamily: theme.font.family.OpenSans,
  fontSize: theme.sizes[300],
  padding: "0 1em",
};

const inputStyle = {
  marginLeft: "-5px",
  width: "100%",
  height: "3em",
  margin: "1em auto",
};

const ErrorMsg = styled.p`
  color: ${theme.colors.primary[100]};
  font-family: ${theme.font.family.OpenSans};
  font-weight: ${theme.font.weight.bold};
`;
