import "react-native";
import React from "react";
import Home from "../containers/Home";
import renderer from "react-test-renderer";

test("Home page snapshot", () => {
  const snap = renderer.create(<Home />).toJSON();
  expect(snap).toMatchSnapshot();
});
