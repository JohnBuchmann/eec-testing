import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { userLogin, userPermissions } from 'Internals/mocks/userLogin';
import ReportsPage from '../index';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('<ReportsPage />', () => {
  it('should render <ReportsPage /> component', () => {
    const initialState = {
      data: [],
      user: { user: userLogin, permissions: userPermissions },
      router: { location: { pathname: '/' } },
      notification: { notifications: [] },
      reports: { charts: {}, shareReports: {} },
    };
    const store = mockStore(initialState);
    const reportsWrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en">
          <BrowserRouter>
            <ReportsPage />
          </BrowserRouter>
        </IntlProvider>
      </Provider>
    );
    const actual = reportsWrapper.exists();
    const expected = true;
    expect(actual).toBe(expected);
  });
});
