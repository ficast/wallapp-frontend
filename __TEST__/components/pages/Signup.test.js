import React from "react";
import renderer from "react-test-renderer";
import Signup from "../../../src/components/pages/Signup";

it("renders correctly", () => {
  const component = renderer.create(<Signup />).toJSON();
  expect(component).toMatchSnapshot();
});
