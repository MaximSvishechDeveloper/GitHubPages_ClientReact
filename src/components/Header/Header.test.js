import { shallow } from "enzyme";
import Header from "./Header";
import React from "react";

it("renders without crashing", () => {
  expect(shallow(<Header />)).toMatchSnapshot();
});
