/**
 * Testing our Header Basic component
 */

import React from 'react';
import { IntlProvider } from 'react-intl';
import { mount } from 'enzyme';
import HeaderBasic from '../HeaderBasic';

const renderComponent = (props = {}) =>
  mount(
    <IntlProvider locale="en">
      <HeaderBasic {...props} />
    </IntlProvider>
  );

describe('HeaderBasic', () => {
  describe('#constructor', () => {
    it('should render one h2 tag when basic = true', () => {
      const container = renderComponent({
        title: 'Header',
        breadcrumbs: [],
      });
      const actual = container.find('[data-testid="header-title"]').exists();
      const expected = true;
      expect(actual).toBe(expected);
    });
  });
});
