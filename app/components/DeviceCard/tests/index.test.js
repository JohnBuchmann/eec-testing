/**
 * Testing DeviceCard component
 */

import { mount } from 'enzyme';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { render } from 'react-testing-library';
import { DeviceStatusId } from 'Utils/enums/deviceStatus';

import DeviceCard from '../index';

describe('<DeviceCard />', () => {
  describe('#Constructor', () => {
    it('should render DeviceCard with minimum required data', () => {
      const deviceStatusId = DeviceStatusId.Ok;
      const wrapper = mount(
        <IntlProvider locale="en">
          <DeviceCard deviceStatusId={deviceStatusId} />
        </IntlProvider>
      );

      const divs = wrapper.find('div');
      const foundDiv = divs.findWhere((item) => item.text() === 'Ok');
      expect(!!foundDiv).toBe(true);
    });

    it('should render DeviceCard with full data', () => {
      const deviceCardData = {
        deviceStatusId: DeviceStatusId.Ok,
        deviceName: 'Name',
        deviceContainer: '1',
        deviceRack: '2',
        devicePosition: '3',
        deviceEnergyRating: 'Energy Rating',
        deviceMake: 'Make',
        deviceGridStatus: true,
        onClickHandler: jest.fn(() => {}),
        isLocationNeeded: true,
      };

      const wrapper = mount(
        <IntlProvider locale="en">
          <DeviceCard {...deviceCardData} />
        </IntlProvider>
      );

      const divs = wrapper.find('div');
      const foundDiv = divs.findWhere((item) => item.text() === 'Ok');
      expect(!!foundDiv).toBe(true);
    });

    it('should render even with invalid data', () => {
      const deviceStatusId = 999;

      const { container } = render(
        <IntlProvider locale="en">
          <DeviceCard deviceStatusId={deviceStatusId} />
        </IntlProvider>
      );
      const actual = !!container.querySelector('div');
      const expected = true;
      expect(actual).toBe(expected);
    });

    it('should render with deviceGridStatus true', () => {
      const deviceStatusId = DeviceStatusId.Ok;
      const deviceGridStatus = true;

      const wrapper = mount(
        <IntlProvider locale="en">
          <DeviceCard
            deviceStatusId={deviceStatusId}
            deviceGridStatus={deviceGridStatus}
          />
        </IntlProvider>
      );

      const divs = wrapper.find('div > div > div');
      const foundDiv = divs
        .findWhere((item) => item.text().startsWith('Grid Status'))
        .first();
      expect(!!foundDiv).toBe(true);
      expect(foundDiv.text().includes('On-Grid')).toBe(true);
    });
  });
});
