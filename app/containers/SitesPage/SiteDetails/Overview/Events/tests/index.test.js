/**
 * Testing SiteEvents component
 */

import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { DeviceListTypeId } from 'Utils/enums/device';
import { DeviceStatusId } from 'Utils/enums/deviceStatus';
import { SiteEventType } from 'Utils/enums/siteEvent';
import history from 'utils/history';
import SiteEvents from '../index';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
Enzyme.configure({ adapter: new Adapter() });

const mountComponent = (props) => {
  const initialState = {
    sites: {
      site: {
        events: [
          {
            name: 'Warning',
            events: [
              {
                siteId: 1,
                deviceGroupId: 1,
                deviceId: 1,
                deviceName: 'BATT1',
                title: 'Warning BATT1',
                description:
                  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys.',
                eventDateTime: '2020-12-03T12:54:28.555391',
              },
            ],
          },
        ],
        eventsFilters: {
          eventTypeId: SiteEventType.AllEvents,
          deviceId: 0,
          groupId: DeviceListTypeId.All,
        },
      },
    },
    devices: {
      eventsDownloadExcel: false,
    },
  };
  const store = mockStore(initialState);
  return mount(
    <Provider store={store}>
      <IntlProvider locale="en">
        <BrowserRouter>
          <SiteEvents {...props} store={store} history={history} />
        </BrowserRouter>
      </IntlProvider>
    </Provider>
  );
};

describe('<SiteEvents />', () => {
  describe('#Constructor', () => {
    it('should render SiteEvents with minimum required data', () => {
      const wrapper = mountComponent({});

      const elementToFind = 'h6';
      const labelToFind = 'EVENTS';

      const h6Container = wrapper.find(elementToFind);
      const foundText = h6Container.findWhere(
        (item) => item.text() === labelToFind
      );
      const actual = !!foundText;
      const expected = true;
      expect(actual).toBe(expected);
    });
  });

  describe('#DropdownList Selection', () => {
    it('Should render with someother default values', () => {
      const deviceTypeId = DeviceListTypeId.Ess;
      const eventTypeId = DeviceStatusId.Faulted;

      const wrapper = mountComponent({
        deviceTypeId,
        eventTypeId,
      });
      const elementToFind = 'h6';
      const labelToFind = 'EVENTS';

      const h6Container = wrapper.find(elementToFind);
      const foundText = h6Container.findWhere(
        (item) => item.text() === labelToFind
      );
      const actual = !!foundText;
      const expected = true;
      expect(actual).toBe(expected);
    });

    it('Should render with someother default values', () => {
      const deviceTypeId = DeviceListTypeId.Ess;
      const eventTypeId = DeviceStatusId.Faulted;

      const wrapper = mountComponent({
        deviceTypeId,
        eventTypeId,
        deviceGroupId: 2,
      });
      const elementToFind = 'h6';
      const labelToFind = 'EVENTS';

      const h6Container = wrapper.find(elementToFind);
      const foundText = h6Container.findWhere(
        (item) => item.text() === labelToFind
      );
      const actual = !!foundText;
      const expected = true;
      expect(actual).toBe(expected);
    });

    it('Should render with wrong values', () => {
      const wrapper = mountComponent({
        deviceTypeId: 999,
        eventTypeId: 999,
      });
      const elementToFind = 'h6';
      const labelToFind = 'EVENTS';

      const h6Container = wrapper.find(elementToFind);
      const foundText = h6Container.findWhere(
        (item) => item.text() === labelToFind
      );
      const actual = !!foundText;
      const expected = true;
      expect(actual).toBe(expected);
    });
  });
});
