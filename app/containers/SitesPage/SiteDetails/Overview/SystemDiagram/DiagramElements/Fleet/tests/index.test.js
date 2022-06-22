import React from 'react';
import { mount } from 'enzyme';
import Fleet from '..';

describe('<Fleet/>', () => {
  it('should display Fleet', () => {
    const expectedPositionX = 1;
    const expectedPositionY = 1;
    const actualComponent = mount(
      <svg xmlns="http://www.w3.org/2000/svg">
        <Fleet x={expectedPositionX} y={expectedPositionY} />
      </svg>
    );

    const { x: actualPositionX, y: actualPositionY } = actualComponent
      .find('[data-testid="svg-fleet-title"]')
      .first()
      .props();

    expect(actualComponent).toBeDefined();
    expect(actualPositionX).toBe(expectedPositionX);
    expect(actualPositionY).toBe(expectedPositionY);
  });

  it('should display Fleet at position zero when no location is sent', () => {
    const expectedPositionX = 0;
    const expectedPositionY = 0;

    const actualComponent = mount(
      <svg xmlns="http://www.w3.org/2000/svg">
        <Fleet />
      </svg>
    );

    const { x: actualPositionX, y: actualPositionY } = actualComponent
      .find('[data-testid="svg-fleet-title"]')
      .first()
      .props();

    expect(actualComponent).toBeDefined();
    expect(actualPositionX).toBe(expectedPositionX);
    expect(actualPositionY).toBe(expectedPositionY);
  });
});
