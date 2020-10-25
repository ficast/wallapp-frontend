import React, { FormEvent, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ReactElement } from "react-dom/node_modules/@types/react";
// import { Redirect } from "react-router-dom";
import styled from "styled-components";
import theme from "../../theme/nice";
import Api from "../services/Api";
import WallLogo from "../molecules/WallLogo";
import { MdArrowBack as ArrowBackIcon } from "react-icons/md";
import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import Loading from "../atoms/Loading";

export default function Login(): ReactElement {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userCreated, setUserCreated] = useState(false);

  const history = useHistory();

  function validateEmail(email: string): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function validadePassword(pass: string, confirmPass: string): boolean {
    return pass === confirmPass && pass.length >= 6;
  }

  async function createUser(): Promise<void> {
    try {
      await Api.createUser({ name, password, email });
      setUserCreated(true);
    } catch (e) {
      setError(e.message);
    }
  }

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();
    setLoading(true);
    await createUser();
    setLoading(false);
  }

  useEffect(() => {
    setUserCreated(false);
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <Container>
      <WallLogo size="5em" />
      <ArrowBackIcon
        size={"2em"}
        color={theme.colors.primary[300]}
        onClick={() => history.goBack()}
        style={{ cursor: "pointer" }}
      />
      {!userCreated && (
        <Box>
          <FormContainer style={{ width: "90%" }}>
            <Form style={{ width: "100%" }}>
              <Form.Control
                autoFocus
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={inputStyle}
                placeholder="Name"
              />
            </Form>
            <Form style={{ width: "100%" }}>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
                placeholder="Email"
              />
            </Form>
            <Form style={{ width: "100%" }}>
              <Form.Control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                style={inputStyle}
                placeholder="Password"
              />
            </Form>
            <Form style={{ width: "100%" }}>
              <Form.Control
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                style={inputStyle}
                placeholder="Confirm Passowrd"
              />
            </Form>
            <Buttons>
              <Button
                style={buttonStyle}
                block
                onClick={(e) => handleSubmit(e)}
                type="submit"
                disabled={loading}
              >
                Sign Up
              </Button>
            </Buttons>
          </FormContainer>
        </Box>
      )}
      {userCreated && (
        <>
          <Text>
            {`Account successfully created!
            An email has been sent to:`}
          </Text>
          <TextBold>{email}</TextBold>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: auto;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  margin-top: ${theme.sizes[300]};
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

const Text = styled.p`
  color: ${theme.colors.primary[300]};
  font-family: ${theme.font.family.OpenSans};
  font-weight: ${theme.font.weight.regular};
`;

const TextBold = styled.p`
  color: ${theme.colors.primary[300]};
  font-family: ${theme.font.family.OpenSans};
  font-weight: ${theme.font.weight.bold};
`;
