import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import { userLogin, userPermissions } from 'Internals/mocks/userLogin';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { DeviceListTypeId } from 'Utils/enums/device';
import { SiteEventType } from 'Utils/enums/siteEvent';
import thunk from 'redux-thunk';
import Overview from '../index';

describe('Overview', () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const initialState = {
    user: { user: userLogin, permissions: userPermissions },
    sites: {
      site: {
        location: {
          customer: {
            primaryContact: {
              email: 'mail@noemail.com',
            },
          },
          address: {
            addressLine1: '3311 US-29',
            addressLine2: null,
            city: 'Cantonment',
            latitude: '30.549935',
            longitude: '-87.28363069999999',
            postalCode: 32533,
            state: 'FL',
          },
        },
        live: true,
        address: { latitude: '29.7', longitude: '-79.6' },
        tariffStructure: {},
        sharepointUrl: 'http://dummysite.com/',
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

  it('should mount component', () => {
    const wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en">
          <BrowserRouter>
            <Overview />
          </BrowserRouter>
        </IntlProvider>
      </Provider>
    );
    const actual = wrapper.exists();
    const expected = true;
    expect(actual).toBe(expected);
  });
});
