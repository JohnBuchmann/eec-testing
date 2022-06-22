import { mount } from 'enzyme';
import React from 'react';
import { IntlProvider } from 'react-intl';
import NoDevices from '..';

describe('NoDevices', () => {
  it('should display NoDevices', () => {
    const actualComponent = mount(
      <svg xmlns="http://www.w3.org/2000/svg">
        <IntlProvider locale="en">
          <NoDevices />
        </IntlProvider>
      </svg>
    );

    expect(actualComponent).toMatchSnapshot();
  });
});
