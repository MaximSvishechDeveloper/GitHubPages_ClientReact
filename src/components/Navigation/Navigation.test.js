import { shallow } from "enzyme";
import Navigation from "./Navigation";
import React from "react";

it("renders without crashing", () => {
  expect(shallow(<Navigation />)).toMatchSnapshot();
});
