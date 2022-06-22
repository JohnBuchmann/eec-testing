import React from 'react';
import { mount } from 'enzyme';
import Wind from '..';

describe('<Wind/>', () => {
  it('should display Wind', () => {
    const expectedPositionX = 1;
    const expectedPositionY = 1;

    const actualComponent = mount(
      <svg xmlns="http://www.w3.org/2000/svg">
        <Wind x={expectedPositionX} y={expectedPositionY} />
      </svg>
    );

    const { x: actualPositionX, y: actualPositionY } = actualComponent
      .find('[data-testid="svg-wind-title"]')
      .first()
      .props();

    expect(actualComponent).toBeDefined();
    expect(actualPositionX).toBe(expectedPositionX);
    expect(actualPositionY).toBe(expectedPositionY);
  });

  it('should display Wind at position zero when no location is sent', () => {
    const expectedPositionX = 0;
    const expectedPositionY = 0;

    const actualComponent = mount(
      <svg xmlns="http://www.w3.org/2000/svg">
        <Wind />
      </svg>
    );

    const { x: actualPositionX, y: actualPositionY } = actualComponent
      .find('[data-testid="svg-wind-title"]')
      .first()
      .props();

    expect(actualComponent).toBeDefined();
    expect(actualPositionX).toBe(expectedPositionX);
    expect(actualPositionY).toBe(expectedPositionY);
  });
});
