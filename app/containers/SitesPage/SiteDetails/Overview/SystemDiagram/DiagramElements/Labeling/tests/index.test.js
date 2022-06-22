import { mount } from 'enzyme';
import React from 'react';
import Labeling from '..';

describe('Labeling', () => {
  it('should display label with default values', () => {
    const actualComponent = mount(
      <svg xmlns="http://www.w3.org/2000/svg">
        <Labeling />
      </svg>
    );

    expect(actualComponent).toMatchSnapshot();
  });

  it('should display label', () => {
    const positionX = 100;
    const positionY = 100;
    const label = 'Test';
    const description = 'Testing';

    const actualComponent = mount(
      <svg xmlns="http://www.w3.org/2000/svg">
        <Labeling
          x={positionX}
          y={positionY}
          label={label}
          description={description}
        />
      </svg>
    );

    expect(actualComponent).toMatchSnapshot();
  });
});
