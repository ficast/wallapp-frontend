import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import theme from "./theme/nice";

function App() {
  return (
    <Container className={"App"}>
      <Router>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;

const Container = styled.div`
  height: 100vh;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.primary[500]}
`;
