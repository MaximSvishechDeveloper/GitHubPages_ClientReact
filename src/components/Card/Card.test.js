import { shallow } from "enzyme";
import Card from "./Card";
import React from "react";

it("renders without crashing", () => {
  expect(shallow(<Card />)).toMatchSnapshot();
});
