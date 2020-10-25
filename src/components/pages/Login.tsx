import React, { FormEvent, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ReactElement } from "react-dom/node_modules/@types/react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import theme from "../../theme/nice";
import Loading from "../atoms/Loading";
import WallLogo from "../molecules/WallLogo";
import Api from "../services/Api";

export default function Login(): ReactElement {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  function validateForm(): boolean {
    return email.length > 3 && password.length > 6;
  }

  const history = useHistory();

  function redirect(pathname: string, state?: string | null): void {
    history.push({ pathname, state });
  }

  async function authUser(): Promise<void> {
    const response = await Api.authUser({ password, email });
    console.log(response);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await authUser();
  }

  function getLocalToken(): void {
    const TOKEN = localStorage.getItem("TOKEN");
    if (typeof TOKEN === "string" && TOKEN.length > 0) {
      setToken(TOKEN);
      redirect("/home", TOKEN);
    }
    setLoading(false);
  }

  useEffect(() => {
    getLocalToken();
  });

  return loading ? (
    <Loading />
  ) : (
    <>
      <Container>
        <WallLogo size="15em" />
        <FormContainer>
          <Form style={{ width: "90%" }}>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              style={inputStyle}
            />
          </Form>
          <Form style={{ width: "90%" }}>
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              style={inputStyle}
            />
          </Form>
          <Buttons>
            <Button
              style={buttonStyle}
              block
              disabled={!validateForm()}
              onClick={(e) => handleSubmit(e)}
              type="submit"
            >
              Login
            </Button>
            <Button
              style={buttonStyle}
              onClick={() => redirect("/signup")}
              type="button"
            >
              Sign Up
            </Button>
            <Button
              style={buttonStyle}
              onClick={() => redirect("/home")}
              type="button"
            >
              Visitor
            </Button>
          </Buttons>
        </FormContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  align-items: center;
  border: 1px solid ${theme.colors.primary[500]};
  border-radius: 5px;
  display: flex;
  margin: auto;
  padding: 2em;
  flex-direction: column;
  width: 20em;
`;

const FormContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: auto;
  flex-direction: column;
  width: 100%;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1.5em;
  width: 100%;
`;

const buttonStyle = {
  fontFamily: theme.font.family.OpenSans,
  fontSize: theme.sizes[300],
  padding: "0 1em",
};

const inputStyle = {
  marginLeft: "-5px",
  width: "100%",
  height: "2em",
};
