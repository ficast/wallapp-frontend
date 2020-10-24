import React, { FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ReactElement } from "react-dom/node_modules/@types/react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import theme from "../../theme/nice";
import Api from "../services/Api";

export default function Login(): ReactElement {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisitor, setIsVisitor] = useState(false);

  function validateForm(): boolean {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    // Api.loginAuth(password, email);
  }

  return (
    <Container>
      <FormContainer onSubmit={handleSubmit}>
        <Form>
          <Label>Email</Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form>
        <Form>
          <Label>Password</Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </Form>
        <Buttons>
          <Button
            style={buttonStyle}
            block
            disabled={!validateForm()}
            type="submit"
          >
            Login
          </Button>
          <Button
            style={buttonStyle}
            block
            onClick={() => setIsVisitor(true)}
            type="button"
          >
            Sign Up
          </Button>
          <Button
            style={buttonStyle}
            block
            onClick={() => setIsVisitor(true)}
            type="button"
          >
            Visitor
          </Button>
        </Buttons>
      </FormContainer>
      {isVisitor && <Redirect to="/home" />}
    </Container>
  );
}

const Container = styled.div`
  align-items: center;
  border: 1px solid ${theme.colors.primary[500]};
  border-radius: 5px;
  display: flex;
  justify-content: center;
  margin: auto;
  padding: 2em;
  background-color: ${theme.colors.secondary[400]};
  width: 20em;
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
  fontFamily: theme.font.family.semiBold,
  fontSize: theme.sizes[300],
  padding: "0 1em",
};

const Label = styled.h3`
  font-family: ${theme.font.family.semiBold};
  font-size: ${theme.sizes[300]};
  margin: 1em auto 0 auto;
`;
