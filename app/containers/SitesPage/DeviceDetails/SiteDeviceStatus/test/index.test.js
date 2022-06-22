import { mount } from 'enzyme';
import React from 'react';
import { IntlProvider } from 'react-intl';
import SiteDeviceStatus from '../index';

describe('<DeviceEvents/>', () => {
  describe('#Tabs', () => {
    it('should render SiteDeviceStatus with 2 components inside', () => {
      const wrapper = mount(
        <IntlProvider locale="en">
          <SiteDeviceStatus />
        </IntlProvider>
      );
      const deviceSummary = wrapper.find('[data-testid="device-summary"]');

      let actual = !!deviceSummary;
      const expected = true;

      expect(actual).toBe(expected);

      const deviceSiteStatus = wrapper.find(
        '[data-testid="device-site-status"]'
      );
      actual = !!deviceSiteStatus;
      expect(actual).toBe(expected);
    });

    it('should render SiteDeviceStatus with params', () => {
      const props = {
        params: {
          deviceGroupId: '7',
          deviceId: '261',
        },
      };

      const wrapper = mount(
        <IntlProvider locale="en">
          <SiteDeviceStatus {...props} />
        </IntlProvider>
      );
      const deviceSummary = wrapper.find('[data-testid="device-summary"]');

      const actual = !!deviceSummary;
      const expected = true;

      expect(actual).toBe(expected);
    });
  });
});
