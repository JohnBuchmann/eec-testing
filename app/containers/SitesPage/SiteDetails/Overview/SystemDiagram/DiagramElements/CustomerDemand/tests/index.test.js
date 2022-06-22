import React from 'react';
import { mount } from 'enzyme';
import CustomerDemand from '..';

describe('<CustomerDemand/>', () => {
  const mockPositionX = 100;
  const mockPositionY = 100;

  it('should display CustomerDemand', () => {
    const expectedPositionX = mockPositionX;
    const expectedPositionY = mockPositionY;
    const actualComponent = mount(
      <svg xmlns="http://www.w3.org/2000/svg">
        <CustomerDemand x={mockPositionX} y={mockPositionY} />
      </svg>
    );

    const { x: actualPositionX, y: actualPositionY } = actualComponent
      .find('[data-testid="svg-customer-demand-title"]')
      .first()
      .props();

    expect(actualComponent).toBeDefined();
    expect(actualPositionX).toBe(expectedPositionX);
    expect(actualPositionY).toBe(expectedPositionY);
  });

  it('should display CustomerDemand at position zero when no location is sent', () => {
    const expectedPositionX = 0;
    const expectedPositionY = 0;

    const actualComponent = mount(
      <svg xmlns="http://www.w3.org/2000/svg">
        <CustomerDemand />
      </svg>
    );

    const { x: actualPositionX, y: actualPositionY } = actualComponent
      .find('[data-testid="svg-customer-demand-title"]')
      .first()
      .props();

    expect(actualComponent).toBeDefined();
    expect(actualPositionX).toBe(expectedPositionX);
    expect(actualPositionY).toBe(expectedPositionY);
  });
});
