/**
 * Testing SiteEventItem component
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
import { SiteEventType } from 'Utils/enums/siteEvent';
import SiteEventItem from '../index';

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
          <SiteEventItem {...props} />
        </BrowserRouter>
      </IntlProvider>
    </Provider>
  );
};

describe('<SiteEventItem />', () => {
  describe('#Constructor', () => {
    it('should render <SiteEventItem /> with minimum required data', () => {
      const wrapper = mountComponent({});
      const divs = wrapper.find('[data-testid="site-event-wrapper"]');
      const actual = !!divs.length;
      const expected = true;
      expect(actual).toBe(expected);
    });
    it('should render SiteEventItem with valid mock data', () => {
      const eventItem = {
        deviceId: 1,
        deviceName: 'Device Name 1',
        title: 'Event Title 1',
        date: '2020-11-09T16:58:30.000',
        description: 'Loren description',
        eventTypeId: 1,
        deviceTypeId: 3,
      };
      const wrapper = mountComponent({ eventItemRibbon: eventItem });
      const divs = wrapper.find('[data-testid="site-event-wrapper"]');
      const actual = !!divs.length;
      const expected = true;
      expect(actual).toBe(expected);
    });
  });
});
