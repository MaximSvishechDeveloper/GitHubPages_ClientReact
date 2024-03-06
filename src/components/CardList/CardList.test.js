import React from "react";
import { shallow } from "enzyme";
import CardList from "./CardList";
import Card from "../Card/Card";

describe("CardList component", () => {
  it("should render Card components with correct props", () => {
    const mockProfiles = [
      {
        id: 1,
        login: "john_doe",
        html_url: "https://example.com/john_doe",
        avatar_url: "https://example.com/avatar.jpg",
      },
      {
        id: 2,
        login: "jane_doe",
        html_url: "https://example.com/jane_doe",
        avatar_url: "https://example.com/avatar2.jpg",
      },
    ];

    const wrapper = shallow(<CardList profiles={mockProfiles} />);

    expect(wrapper.find(Card)).toHaveLength(mockProfiles.length);

    mockProfiles.forEach((profile, index) => {
      const cardProps = wrapper.find(Card).at(index).props();
      expect(cardProps.id).toEqual(profile.id);
      expect(cardProps.name).toEqual(profile.login);
      expect(cardProps.page).toEqual(profile.html_url);
      expect(cardProps.image).toEqual(profile.avatar_url);
    });
  });
});
