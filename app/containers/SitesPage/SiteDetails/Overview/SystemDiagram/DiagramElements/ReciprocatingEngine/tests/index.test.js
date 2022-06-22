import React from 'react';
import { mount } from 'enzyme';
import ReciprocatingEngine from '..';

describe('<ReciprocatingEngine/>', () => {
  const mockPositionX = 100;
  const mockPositionY = 100;
  const titleOffsetPositionX = -20;

  it('should display ReciprocatingEngine', () => {
    const expectedPositionX = mockPositionX + titleOffsetPositionX;
    const expectedPositionY = mockPositionY;

    const actualComponent = mount(
      <svg xmlns="http://www.w3.org/2000/svg">
        <ReciprocatingEngine x={mockPositionX} y={mockPositionY} />
      </svg>
    );

    const { x: actualPositionX, y: actualPositionY } = actualComponent
      .find('[data-testid="svg-reciprocating-engine-title"]')
      .first()
      .props();

    expect(actualComponent).toBeDefined();
    expect(actualPositionX).toBe(expectedPositionX);
    expect(actualPositionY).toBe(expectedPositionY);
  });

  it('should display ReciprocatingEngine at position zero when no location is sent', () => {
    const expectedPositionX = titleOffsetPositionX;
    const expectedPositionY = 0;

    const actualComponent = mount(
      <svg xmlns="http://www.w3.org/2000/svg">
        <ReciprocatingEngine />
      </svg>
    );

    const { x: actualPositionX, y: actualPositionY } = actualComponent
      .find('[data-testid="svg-reciprocating-engine-title"]')
      .first()
      .props();

    expect(actualComponent).toBeDefined();
    expect(actualPositionX).toBe(expectedPositionX);
    expect(actualPositionY).toBe(expectedPositionY);
  });
});
