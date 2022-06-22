import React from 'react';
import { shallow } from 'enzyme';
import SvgAlarm from '../SvgAlarm';

describe('SvgAlarm', () => {
  it('should render SVG core structure', () => {
    const actual = shallow(<SvgAlarm />);

    expect(actual).toMatchSnapshot();
  });
});
