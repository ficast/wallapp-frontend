import React from "react";
import renderer from "react-test-renderer";
import Header from "../../../src/components/organisms/Header";

const username = "";

it("renders correctly", () => {
  const component = renderer.create(<Header username={username} />).toJSON();
  expect(component).toMatchSnapshot();
});
