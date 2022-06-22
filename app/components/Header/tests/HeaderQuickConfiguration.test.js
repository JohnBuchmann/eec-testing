/**
 * Testing our Header Basic component
 */

import React from 'react';
import { IntlProvider } from 'react-intl';
import { mount } from 'enzyme';
import HeaderQuickConfiguration from '../HeaderQuickConfiguration';

const mountComponent = (props = {}) =>
  mount(
    <IntlProvider locale="en">
      <HeaderQuickConfiguration {...props} />
    </IntlProvider>
  );

describe('HeaderQuickConfiguration', () => {
  describe('#constructor', () => {
    it('should render without props', () => {
      const container = mountComponent();
      const actual = container.find('[data-testid="header-title"]').exists();
      const expected = true;
      expect(actual).toBe(expected);
    });
  });
});
