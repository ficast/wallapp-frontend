import React from "react";
import renderer from "react-test-renderer";
import Post from "../../../src/components/organisms/Post";

const title = "";
const body = "";
const author = "";

it("renders correctly", () => {
  const component = renderer
    .create(<Post title={title} body={body} author={author} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});
