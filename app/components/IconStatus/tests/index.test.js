/**
 * Testing IconStatus component
 */

import React from 'react';
import { IntlProvider } from 'react-intl';
import { render } from 'react-testing-library';
import { DeviceStatusId } from 'Utils/enums/deviceStatus';
import IconStatus from '../index';

describe('<IconStatus />', () => {
  describe('#constructor', () => {
    it('should render a <IconStatus> with only required parameters', () => {
      const statusMaintenance = DeviceStatusId.Maintenance;
      const { container } = render(
        <IntlProvider locale="en">
          <IconStatus statusId={statusMaintenance} />
        </IntlProvider>
      );
      expect(container.querySelector('img')).toBeDefined();
    });

    it('should not render a <IconStatus> invalid Status Id', () => {
      const statusMaintenance = 99999;
      const { container } = render(
        <IntlProvider locale="en">
          <IconStatus statusId={statusMaintenance} />
        </IntlProvider>
      );
      expect(!!container.querySelector('img')).toBe(false);
    });
  });
});
