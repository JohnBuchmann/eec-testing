/**
 * Testing IconStatusLabel component
 */

import IconStatusLabel from 'Components/IconStatusLabel/Index';
import { mount } from 'enzyme';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { render } from 'react-testing-library';
import { DeviceStatusId } from 'Utils/enums/deviceStatus';

describe('<IconStatusLabel />', () => {
  describe('#constructor', () => {
    it('should render a <IconStatusLabel> with only required parameters', () => {
      const statusMaintenance = DeviceStatusId.Maintenance;
      const { container } = render(
        <IntlProvider locale="en">
          <IconStatusLabel statusId={statusMaintenance} />
        </IntlProvider>
      );
      const mainDiv = container.querySelector('div');
      expect(mainDiv).toBeDefined();
    });

    it('should not render a <IconStatusLabel> invalid Status Id', () => {
      const statusMaintenance = 99999;

      const wrapper = mount(
        <IntlProvider locale="en">
          <IconStatusLabel statusId={statusMaintenance} />
        </IntlProvider>
      );
      const container = wrapper.find('div').first();
      const actual = !!container.text().length;
      const expected = false;
      expect(actual).toBe(expected);
    });

    it('should render a <IconStatusLabel> with Disconnected Status', () => {
      const statusMaintenance = DeviceStatusId.Disconnected;
      const { container } = render(
        <IntlProvider locale="en">
          <IconStatusLabel statusId={statusMaintenance} />
        </IntlProvider>
      );
      const mainDiv = container.querySelector('div');
      expect(mainDiv).toBeDefined();
      expect(mainDiv.innerHTML.includes('ffffff')).toBe(false);
    });
  });
});
