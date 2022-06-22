import React from 'react';
import { shallow } from 'enzyme';
import SvgMaintenance from '../SvgMaintenance';

describe('SvgMaintenance', () => {
  it('should render SVG core structure', () => {
    const actual = shallow(<SvgMaintenance />);

    expect(actual).toMatchSnapshot();
  });
});
