import React from 'react';
import { shallow } from 'enzyme';
import SvgFaulted from '../SvgFaulted';

describe('SvgFaulted', () => {
  it('should render SVG core structure', () => {
    const actual = shallow(<SvgFaulted />);

    expect(actual).toMatchSnapshot();
  });
});
