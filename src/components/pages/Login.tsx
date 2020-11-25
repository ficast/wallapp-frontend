import React, { FormEvent, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ReactElement } from "react-dom/node_modules/@types/react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import theme from "../../theme/nice";
import Loading from "../atoms/Loading";
import WallLogo from "../molecules/WallLogo";
import Api from "../services/Api";

function Login(): ReactElement {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  function validateForm(): boolean {
    return email.length > 3 && password.length >= 6;
  }

  async function authUser(): Promise<void> {
    setLoading(true);
    setError("");
    try {
      const response = await Api.authUser({ password, email });

      const TOKEN = JSON.stringify({
        token: response.token,
        name: response.data.name,
        email: response.data.email,
        id: response.data.id
      });

      setToken(TOKEN);
      localStorage.setItem("THE_WALL_TOKEN", TOKEN);

      redirectAuthUser();
    } catch (err) {
      setError("Wrong Password or Email, please try again");
    }
    setLoading(false);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await authUser();
  }

  function tokenVerification(): void {
    const storageToken: string | null = localStorage.getItem("THE_WALL_TOKEN");
    if (typeof storageToken === "string") {
      setToken(storageToken);
    }
    return setLoading(false);
  }

  const history = useHistory();

  function redirect(pathname: string, state?: string | null): void {
    history.push({ pathname, state });
  }

  function redirectAuthUser(): void {
    redirect("/home", token);
    setLoading(false);
  }

  useEffect(() => {
    setToken("");
    tokenVerification();
  }, []);

  useEffect(() => {
    token !== "" && redirectAuthUser();
  }, [token]);

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
        {error && <ErrorMsg>{error}</ErrorMsg> }
      </Container>
    </>
  );
}

export default Login;

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

const ErrorMsg = styled.p`
  color: ${theme.colors.primary[100]};
  font-family: ${theme.font.family.OpenSans};
  font-weight: ${theme.font.weight.bold};
`;