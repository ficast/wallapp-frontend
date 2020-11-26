import React from "react";
import renderer from "react-test-renderer";
import NotFound from "../../../src/components/pages/NotFound";

it("renders correctly", () => {
  const component = renderer.create(<NotFound />).toJSON();
  expect(component).toMatchSnapshot();
});
