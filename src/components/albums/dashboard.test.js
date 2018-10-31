import React from "react";
import { shallow } from "enzyme";

import {Dashboard} from "./dashboard"

const initialState = {auth: {currentUser: 'yes'}};
const callback = jest.fn();

describe("<Dashboard />", () => {
  const seedAlbums = [];
  beforeAll(() => {
    for (let i = 0; i < 10; i++) {
        seedAlbums.push({
        albumName: `album ${i}`
      });
    }
  });

  it("Renders without crashing", () => {
    shallow(<Dashboard albums={[initialState]} dispatch={callback}/>);
  });

  it('Renders the dashboard when user is logged in', () => {
    const wrapper = shallow(<Dashboard albums={[initialState]} dispatch={callback}/>);
    expect(wrapper.find('Link').length).toBe(1);
  });
});
