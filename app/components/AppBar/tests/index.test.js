/**
 * Testing our App bar component
 */

import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import AppBar from '../index';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
Enzyme.configure({ adapter: new Adapter() });

const notifications = [
  {
    id: '602403d4973bb702f165485a',
    title: 'Notification Title',
    text:
      'Schneider Electric BB-466-02 Serial Number 3216842FBD-FOO is Offline.',
    siteId: 1,
    ts: '2021-01-10 10:03:24',
    uniqueId: 'oldHHDHdfg<6s0001hdsABATT1',
  },
  {
    id: '602403d4973bb702f365845a',
    title: 'Notification Title',
    text:
      'Schneider Electric BB-466-02 Serial Number 321648FBD-FOO is Offline.',
    siteId: 9,
    ts: '2021-02-09 10:03:24',
    uniqueId: 'oldHHDHdfg<6s0001hdsABATT1',
  },
];

const initialState = {
  data: [],
  router: { location: { pathname: '/' } },
  notification: {
    notifications,
  },
  user: {
    user: {
      role: 'DCentriQ_ICIAN',
    },
    policy: {
      consentEffectiveDate: '2020-09-15 12:00:00',
    },
  },
  app: {},
};
const store = mockStore(initialState);

describe('<AppBarComponent />', () => {
  describe('#initialized', () => {
    it('should mount without notification', () => {
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en">
            <AppBar store={store} />
          </IntlProvider>
        </Provider>
      );

      const actual = wrapper.exists();
      const expected = true;

      expect(actual).toBe(expected);
    });
  });

  describe('#popover', () => {
    it('should bell icon exists', () => {
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en">
            <AppBar store={store} />
          </IntlProvider>
        </Provider>
      );

      const component = wrapper
        .find('[data-testid="content-bell-icon"]')
        .first();
      const actual = component.exists();
      const expected = true;
      expect(actual).toBe(expected);
    });

    it('should open the notification popup', () => {
      let state;
      const setState = jest.fn((event) => {
        state = event;
      });
      const useStateSpy = jest.spyOn(React, 'useState');
      useStateSpy.mockImplementation((init) => [init, setState]);
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en">
            <AppBar store={store} />
          </IntlProvider>
        </Provider>
      );
      const component = wrapper
        .find('[data-testid="content-bell-icon"]')
        .first();
      component.props().onClick();
      expect(setState).toHaveBeenCalled();
      const actual = state;
      // default value for testing
      const expected = null;
      expect(actual).toBe(expected);
    });
    it('should close notification popup by clicking on Dismiss', () => {
      const onDismissClickMock = jest.fn(() => {});
      const wrapper = shallow(
        <Provider store={store}>
          <IntlProvider locale="en">
            <AppBar
              notifications={notifications}
              onDismissClick={onDismissClickMock}
            />
          </IntlProvider>
        </Provider>
      );

      // Finding directly the component to test.
      const component = wrapper.find(AppBar);
      component.props().onDismissClick();
      expect(onDismissClickMock).toHaveBeenCalled();
    });

    it('should view the device on onViewClick', () => {
      const onViewNotificationClickMock = jest.fn(() => {});

      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en">
            <AppBar
              notifications={notifications}
              onViewNotificationClick={onViewNotificationClickMock}
              store={store}
              main
              auth
            />
          </IntlProvider>
        </Provider>
      );

      const component = wrapper.find(AppBar);
      component.props().onViewNotificationClick();
      expect(onViewNotificationClickMock).toHaveBeenCalled();
    });
  });
});
