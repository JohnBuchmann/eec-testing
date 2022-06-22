import React from 'react';
import { mount } from 'enzyme';
import Inverter from '..';

describe('<Inverter/>', () => {
  it('should display Inverter', () => {
    const mockPositionX = 50;
    const mockPositionY = 50;

    const expectedPositionX = '60%';

    const actualComponent = mount(
      <svg xmlns="http://www.w3.org/2000/svg">
        <Inverter x={mockPositionX} y={mockPositionY} />
      </svg>
    );

    const { x: actualPositionX } = actualComponent
      .find('[data-testid="svg-inverter-title"]')
      .first()
      .props();

    expect(actualComponent).toBeDefined();
    expect(actualPositionX).toBe(expectedPositionX);
  });

  it('should display Inverter at position zero when no location is sent', () => {
    const expectedPositionX = '60%';

    const actualComponent = mount(
      <svg xmlns="http://www.w3.org/2000/svg">
        <Inverter />
      </svg>
    );

    const { x: actualPositionX } = actualComponent
      .find('[data-testid="svg-inverter-title"]')
      .first()
      .props();

    expect(actualComponent).toBeDefined();
    expect(actualPositionX).toBe(expectedPositionX);
  });
});
