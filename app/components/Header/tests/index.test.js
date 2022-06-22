/**
 * Testing our Header component
 */

import { userLogin, userPermissions } from 'Internals/mocks/userLogin';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { fireEvent, render } from 'react-testing-library';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { AvailableTabsDashboard } from 'Utils/enums/site';
import Header from '../index';

let store;
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const renderComponent = (props = {}) =>
  render(
    <Provider store={store}>
      <IntlProvider locale="en">
        <Header {...props} />
      </IntlProvider>
    </Provider>
  );

const status = ['New', 'In Progress'];

const users = [
  {
    text: '',
    value: null,
  },
  {
    text: 'Unnasigned',
    icon: 'Unnasigned',
    value: 'Unnasigned',
  },
];

const initialState = {
  user: { user: userLogin, permissions: userPermissions },
};

beforeEach(() => {
  store = mockStore(initialState);
});

describe('<Header />', () => {
  const handleTabChange = jest.fn();
  const handleSearch = jest.fn();
  const handleSelectChange = jest.fn();

  describe('<HeaderDashboard />', () => {
    describe('#initialized', () => {
      it('should render a tab role tag when dashboard = true', () => {
        const onClickSpy = jest.fn();
        const { container, getByRole } = renderComponent({
          dashboard: true,
          title: 'Header Dashboard',
          handleTabChange,
          handleSearch,
          handleSelectChange,
          availableTabs: AvailableTabsDashboard,
          status,
          users,
          onChange: onClickSpy,
        });
        expect(getByRole('tab')).toBeDefined();
        const button = container.querySelector('button');

        if (button) {
          fireEvent.click(button);
        }
        expect(button).not.toBe(null);
      });
    });
  });

  describe('<HeaderDashboard />', () => {
    describe('#click', () => {
      it('should fire create new on button quickConfiguration = true', () => {
        const onClickSpy = jest.fn();
        const { container } = renderComponent({
          quickConfiguration: true,
          title: 'Header Quick Configuration',
          handleTabChange,
          handleSearch,
          handleSelectChange,
          newConfiguration: onClickSpy,
          status,
        });
        const button = container.querySelector('button');
        expect(button).not.toBe(null);
        if (button) {
          button.click();
        }
      });
    });
  });
});
