import React from "react";
import renderer from "react-test-renderer";
import WallLogo from "../../../src/components/molecules/WallLogo";

it("renders correctly", () => {
  const component = renderer.create(<WallLogo size={200} />).toJSON();
  expect(component).toMatchSnapshot();
});
