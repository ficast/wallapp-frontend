import React from "react";
import renderer from "react-test-renderer";
import Home from "../../../src/components/pages/Home";

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    location: {
      state: jest.fn(),
    },
  }),
}));

it("renders correctly", () => {
  const component = renderer.create(<Home />).toJSON();
  expect(component).toMatchSnapshot();
});
