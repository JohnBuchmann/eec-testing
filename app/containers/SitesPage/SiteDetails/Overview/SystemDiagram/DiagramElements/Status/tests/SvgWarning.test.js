import React from 'react';
import { shallow } from 'enzyme';
import SvgWarning from '../SvgWarning';

describe('SvgWarning', () => {
  it('should render SVG core structure', () => {
    const actual = shallow(<SvgWarning />);

    expect(actual).toMatchSnapshot();
  });
});
