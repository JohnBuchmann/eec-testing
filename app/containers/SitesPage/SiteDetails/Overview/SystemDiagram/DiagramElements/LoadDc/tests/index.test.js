import React from 'react';
import { mount } from 'enzyme';
import LoadDc from '..';

describe('<LoadDc/>', () => {
  const mockPositionX = 50;
  const mockOffsetPositionX = -20;
  const mockPositionY = 50;

  it('should display LoadDc', () => {
    const expectedPositionX = mockPositionX + mockOffsetPositionX;
    const expectedPositionY = mockPositionY;
    const actualComponent = mount(
      <svg xmlns="http://www.w3.org/2000/svg">
        <LoadDc x={mockPositionX} y={mockPositionY} />
      </svg>
    );

    const { x: actualPositionX, y: actualPositionY } = actualComponent
      .find('[data-testid="svg-load-dc-title"]')
      .first()
      .props();

    expect(actualComponent).toBeDefined();
    expect(actualPositionX).toBe(expectedPositionX);
    expect(actualPositionY).toBe(expectedPositionY);
  });

  it('should display LoadDc at position zero when no location is sent', () => {
    const expectedPositionX = mockOffsetPositionX;
    const expectedPositionY = 0;

    const actualComponent = mount(
      <svg xmlns="http://www.w3.org/2000/svg">
        <LoadDc />
      </svg>
    );

    const { x: actualPositionX, y: actualPositionY } = actualComponent
      .find('[data-testid="svg-load-dc-title"]')
      .first()
      .props();

    expect(actualComponent).toBeDefined();
    expect(actualPositionX).toBe(expectedPositionX);
    expect(actualPositionY).toBe(expectedPositionY);
  });
});
