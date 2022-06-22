import React from 'react';
import { mount } from 'enzyme';
import Wire from '..';
import { FlowDirection } from 'Utils/enums/systemDiagram';

describe('<Wire/>', () => {
  it('should display Wire when valid segments are sent', () => {
    const expected = 'M100 100 v50 h275';
    const mockPositionX = 100;
    const mockPositionY = 100;
    const mockSegments = [
      {
        direction: 2,
        length: 50,
      },
      {
        direction: 1,
        length: 275,
      },
    ];
    const actualComponent = mount(
      <svg xmlns="http://www.w3.org/2000/svg">
        <Wire x={mockPositionX} y={mockPositionY} segments={mockSegments} />
      </svg>
    );

    const { d: actual } = actualComponent
      .find('[data-testid="path-wire"]')
      .first()
      .props();

    expect(actual).toBe(expected);
  });

  it('should display Wire at position 0,0 when no location X and Y are sent', () => {
    const expected = 'M0 0 v50 h275';
    const mockSegments = [
      {
        direction: 2,
        length: 50,
      },
      {
        direction: 1,
        length: 275,
      },
    ];
    const actualComponent = mount(
      <svg xmlns="http://www.w3.org/2000/svg">
        <Wire segments={mockSegments} />
      </svg>
    );

    const { d: actual } = actualComponent
      .find('[data-testid="path-wire"]')
      .first()
      .props();

    expect(actual).toBe(expected);
  });

  it('should display Wire and Wire Flow when valid flow direction is sent', () => {
    const expected = 'M100 100 v50 h275';
    const mockFlowDirection = FlowDirection.StartToEnd;
    const mockPositionX = 100;
    const mockPositionY = 100;
    const mockSegments = [
      {
        direction: 2,
        length: 50,
      },
      {
        direction: 1,
        length: 275,
      },
    ];
    const actualComponent = mount(
      <svg xmlns="http://www.w3.org/2000/svg">
        <Wire
          x={mockPositionX}
          y={mockPositionY}
          segments={mockSegments}
          flowDirection={mockFlowDirection}
        />
      </svg>
    );

    const { d: actualPathWire } = actualComponent
      .find('[data-testid="path-wire"]')
      .first()
      .props();

    const { d: actualPathWireFlow } = actualComponent
      .find('[data-testid="path-flow"]')
      .first()
      .props();

    expect(actualPathWire).toBe(expected);
    expect(actualPathWireFlow).toBe(expected);
  });

  it('should Wire flow goes to end to start when flow direction param is EndToStart', () => {
    const expected = 'M100 100 v50 h275';
    const expectedPathWireFlowValues = '325;0';
    const mockFlowDirection = FlowDirection.EndToStart;
    const mockPositionX = 100;
    const mockPositionY = 100;
    const mockSegments = [
      {
        direction: 2,
        length: 50,
      },
      {
        direction: 1,
        length: 275,
      },
    ];
    const actualComponent = mount(
      <svg xmlns="http://www.w3.org/2000/svg">
        <Wire
          x={mockPositionX}
          y={mockPositionY}
          segments={mockSegments}
          flowDirection={mockFlowDirection}
        />
      </svg>
    );

    const { d: actualPathWire } = actualComponent
      .find('[data-testid="path-wire"]')
      .first()
      .props();

    const { d: actualPathWireFlow } = actualComponent
      .find('[data-testid="path-flow"]')
      .first()
      .props();

    const { values: actualPathWireFlowValues } = actualComponent
      .find('[data-testid="path-flow-animation"]')
      .first()
      .props();

    expect(actualPathWire).toBe(expected);
    expect(actualPathWireFlow).toBe(expected);
    expect(actualPathWireFlowValues).toBe(expectedPathWireFlowValues);
  });
});
