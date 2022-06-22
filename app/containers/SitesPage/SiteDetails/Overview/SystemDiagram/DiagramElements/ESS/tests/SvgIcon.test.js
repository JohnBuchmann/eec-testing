import React from 'react';
import { shallow } from 'enzyme';
import SvgIcon from '../SvgIcon';

describe('SvgIconEss', () => {
  it('should render SVG', () => {
    const mockPositionX = 100;
    const mockPositionY = 100;
    const actual = shallow(<SvgIcon x={mockPositionX} y={mockPositionY} />);

    expect(actual).toMatchSnapshot();
  });

  it('should return SVG with zero position X and Y when no  location is sent', () => {
    const expectedPositionX = 0;
    const expectedPositionY = 0;

    const actualComponent = shallow(<SvgIcon />);
    const { x: actualPositionX, y: actualPositionY } = actualComponent
      .find('svg')
      .first()
      .props();

    expect(actualPositionX).toBe(expectedPositionX);
    expect(actualPositionY).toBe(expectedPositionY);
  });
});
