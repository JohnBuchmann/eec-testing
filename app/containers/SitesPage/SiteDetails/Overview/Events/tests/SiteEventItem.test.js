import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import SiteEventItem from '../SiteEventItem';

describe('SiteEventItem', () => {
  it('should mount component', () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <BrowserRouter>
          <SiteEventItem />
        </BrowserRouter>
      </IntlProvider>
    );
    const actual = wrapper.exists();
    const expected = true;
    expect(actual).toBe(expected);
  });
});
