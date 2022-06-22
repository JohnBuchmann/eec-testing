import React from 'react';
import { mount } from 'enzyme';
import AutoSyncDCBus from '..';
import { IntlProvider } from 'react-intl';

describe('AutoSyncDCBus', () => {
  it('should display Inverter', () => {
    const expectedPositionX = 188;
    const expectedPositionY = 267;

    const actualComponent = mount(
      <svg xmlns="http://www.w3.org/2000/svg">
        <IntlProvider locale="en">
          <AutoSyncDCBus />
        </IntlProvider>
      </svg>
    );

    const { x: actualPositionX, y: actualPositionY } = actualComponent
      .find('[data-testid="svg-auto-sync"]')
      .first()
      .props();

    expect(actualComponent).toBeDefined();
    expect(actualPositionX).toBe(expectedPositionX);
    expect(actualPositionY).toBe(expectedPositionY);
  });
});
