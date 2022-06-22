import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { IntlProvider } from 'react-intl';
import { userPermissions } from 'Internals/mocks/userLogin';
import DeviceStatus from '../index';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const devicesStatusMock = [
  {
    access: 'RW',
    comments: null,
    desc: 'Model',
    detail: null,
    id: 2,
    label: 'Model',
    mandatory: '0',
    maxValueRange: null,
    minValueRange: null,
    name: 'Model',
    sf: '0',
    size: null,
    symbols: [],
    tag: 'Model',
    type: 'string',
    units: null,
    value: 'The Model of the Battery ',
  },
  {
    id: 3,
    name: 'Serial_Num',
    type: 'string',
    label: 'Serial #',
    desc: 'Serial #',
    sf: '0',
    units: null,
    access: 'RW',
    mandatory: '1',
    _static: 1,
    size: null,
    detail: 'Serial #',
    symbols: [],
    comments: null,
    value: '0001',
    maxValueRange: null,
    minValueRange: null,
    tag: 'Serial_Num',
  },
];

const initialState = {
  user: { permissions: userPermissions },
  devices: {
    deviceStatus: devicesStatusMock,
    oldDeviceStatus: devicesStatusMock,
  },
  sites: {
    site: {
      siteType: {
        siteTypeId: 1,
        name: 'Ignition',
        description: 'For sites using Ignition',
      },
      eventsFilters: {
        deviceId: 1,
      },
    },
  },
  settings: {
    notifications: { unitMeasurementId: 2, name: 'F°' },
  },
};
const store = mockStore(initialState);

describe('<DeviceStatus />', () => {
  let wrapper;
  beforeEach(() => {
    const onClickSpySetNewDevice = jest.fn();
    const onClickSpyFetchDevice = jest.fn();
    wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en">
          <DeviceStatus
            deviceStatusData={initialState.devices.deviceStatus}
            oldDeviceStatusData={initialState.devices.oldDeviceStatus}
            setNewDeviceStatusDispatch={onClickSpySetNewDevice}
            getDeviceStatusFetch={onClickSpyFetchDevice}
          />
        </IntlProvider>
      </Provider>
    );
  });
  describe('#Constructor', () => {
    it('should render <DeviceStatus /> component', () => {
      const expected = true;
      const actual = wrapper.exists();

      expect(actual).toBe(expected);
    });
  });
});
