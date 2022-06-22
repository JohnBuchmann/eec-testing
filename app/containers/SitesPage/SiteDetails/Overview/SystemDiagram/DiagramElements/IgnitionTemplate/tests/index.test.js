import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import IgnitionTemplate from '..';

describe('IgnitionTemplate', () => {
  it('should display Ignition Template', () => {
    const actualComponent = mount(
      <svg xmlns="http://www.w3.org/2000/svg">
        <IntlProvider locale="en">
          <IgnitionTemplate />
        </IntlProvider>
      </svg>
    );

    expect(actualComponent).toMatchSnapshot();
  });
});
