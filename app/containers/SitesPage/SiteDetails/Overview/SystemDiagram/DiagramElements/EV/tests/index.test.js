import React from 'react';
import { mount } from 'enzyme';
import EV from '..';

describe('<EV/>', () => {
  it('should display EV', () => {
    const expectedPositionX = 1;
    const expectedPositionY = 1;

    const actualComponent = mount(
      <svg xmlns="http://www.w3.org/2000/svg">
        <EV x={expectedPositionX} y={expectedPositionY} />
      </svg>
    );

    const { x: actualPositionX, y: actualPositionY } = actualComponent
      .find('[data-testid="svg-ev-title"]')
      .first()
      .props();

    expect(actualComponent).toBeDefined();
    expect(actualPositionX).toBe(expectedPositionX);
    expect(actualPositionY).toBe(expectedPositionY);
  });

  it('should display EV at position zero when no location is sent', () => {
    const expectedPositionX = 0;
    const expectedPositionY = 0;

    const actualComponent = mount(
      <svg xmlns="http://www.w3.org/2000/svg">
        <EV />
      </svg>
    );

    const { x: actualPositionX, y: actualPositionY } = actualComponent
      .find('[data-testid="svg-ev-title"]')
      .first()
      .props();

    expect(actualComponent).toBeDefined();
    expect(actualPositionX).toBe(expectedPositionX);
    expect(actualPositionY).toBe(expectedPositionY);
  });
});
