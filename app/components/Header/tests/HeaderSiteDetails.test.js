/**
 * Testing our Header Site Details component
 */

import React from 'react';
import { IntlProvider } from 'react-intl';
import { mount } from 'enzyme';

import HeaderSiteDetails from '../HeaderSiteDetails';

const renderComponent = (props = {}) =>
  mount(
    <IntlProvider locale="en">
      <HeaderSiteDetails {...props} />
    </IntlProvider>
  );

describe('<HeaderSiteDetails />', () => {
  describe('#constructor', () => {
    it('should render with no props', () => {
      const container = renderComponent();
      const actual = container.find('[data-testid="header-site"]').exists();
      const expected = true;
      expect(actual).toBe(expected);
    });

    it('should render one h2 tag when site details = true', () => {
      const container = renderComponent({
        title: 'Header',
        subtitle: 'Subtitle',
        breadcrumbs: [],
        isSiteLive: true,
        isRendered: true,
      });
      const actual = container.find('[data-testid="header-title"]').exists();
      const expected = true;
      expect(actual).toBe(expected);
    });

    it('should render emulated site subtitle when input property live in "false"', () => {
      const container = renderComponent({
        title: 'Header',
        subtitle: 'Subtitle',
        breadcrumbs: [],
        isSiteLive: false,
        isRendered: true,
      });
      const actual = container
        .find('[data-testid="emulated-subtitle"]')
        .exists();
      const expected = true;
      expect(actual).toBe(expected);
    });
  });
});
