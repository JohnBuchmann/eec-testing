import React from 'react';
import { mount } from 'enzyme';
import LoadAc from '..';

describe('<LoadAc/>', () => {
  const mockPositionX = 50;
  const mockOffsetPositionX = -20;
  const mockPositionY = 50;

  it('should display LoadAc', () => {
    const expectedPositionX = mockPositionX + mockOffsetPositionX;
    const expectedPositionY = mockPositionY;
    const actualComponent = mount(
      <svg xmlns="http://www.w3.org/2000/svg">
        <LoadAc x={mockPositionX} y={mockPositionY} />
      </svg>
    );

    const { x: actualPositionX, y: actualPositionY } = actualComponent
      .find('[data-testid="svg-load-ac-title"]')
      .first()
      .props();

    expect(actualComponent).toBeDefined();
    expect(actualPositionX).toBe(expectedPositionX);
    expect(actualPositionY).toBe(expectedPositionY);
  });

  it('should display LoadAc at position zero when no location is sent', () => {
    const expectedPositionX = mockOffsetPositionX;
    const expectedPositionY = 0;

    const actualComponent = mount(
      <svg xmlns="http://www.w3.org/2000/svg">
        <LoadAc />
      </svg>
    );

    const { x: actualPositionX, y: actualPositionY } = actualComponent
      .find('[data-testid="svg-load-ac-title"]')
      .first()
      .props();

    expect(actualComponent).toBeDefined();
    expect(actualPositionX).toBe(expectedPositionX);
    expect(actualPositionY).toBe(expectedPositionY);
  });
});
