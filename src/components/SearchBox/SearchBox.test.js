import React from "react";
import { mount, shallow } from "enzyme";
import SearchBox from "./SearchBox";

describe("SearchBox component", () => {
  it("should render without crashing", () => {
    const wrapper = shallow(<SearchBox searchProfile={() => {}} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should call searchProfile function when search button is clicked", () => {
    const mockSearchProfile = jest.fn();
    const wrapper = mount(<SearchBox searchProfile={mockSearchProfile} />);

    const searchInput = wrapper.find("input");
    const searchButton = wrapper.find("button");

    searchInput.simulate("change", { target: { value: "test" } });

    searchButton.simulate("click");

    expect(mockSearchProfile).toHaveBeenCalledWith("test");
  });
});
