import React from "react";
import renderer from "react-test-renderer";
import Login from "../../../src/components/pages/Login";

it("renders correctly", () => {
  const component = renderer.create(<Login />).toJSON();
  expect(component).toMatchSnapshot();
});
