import { mount } from 'enzyme';
import React from 'react';
import { IntlProvider } from 'react-intl';
import XcapeTemplate from '..';

describe('XcapeTemplate', () => {
  it('should display Xcape Template', () => {
    const actualComponent = mount(
      <svg xmlns="http://www.w3.org/2000/svg">
        <IntlProvider locale="en">
          <XcapeTemplate />
        </IntlProvider>
      </svg>
    );

    expect(actualComponent).toMatchSnapshot();
  });
});
