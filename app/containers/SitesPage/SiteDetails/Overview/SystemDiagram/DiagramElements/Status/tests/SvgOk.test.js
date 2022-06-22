import { shallow } from 'enzyme';
import React from 'react';
import SvgOk from '../SvgOk';

describe('SvgOk', () => {
  it('should render SVG core structure', () => {
    const actual = shallow(<SvgOk />);

    expect(actual).toMatchSnapshot();
  });
});
