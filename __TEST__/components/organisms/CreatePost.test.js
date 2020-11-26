import React from "react";
import renderer from "react-test-renderer";
import CreatePost from "../../../src/components/organisms/CreatePost";

const onSubmit = jest.fn();
const token = "";

it("renders correctly", () => {
  const component = renderer
    .create(<CreatePost onSubmit={onSubmit} token={token} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});
