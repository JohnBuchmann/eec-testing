import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { userLogin } from 'Internals/mocks/userLogin';
import ReportingPage from '../index';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('<ReportingPage />', () => {
  it('should render <ReportingPage /> component', () => {
    const initialState = {
      app: { loading: false },
      data: [],
      user: { user: userLogin },
      router: { location: { pathname: '/' } },
      notification: { notifications: [] },
      sites: { allSites: [] },
      reports: {
        charts: {},
        searchParams: { company: '', sites: [] },
        shareReports: {},
      },
      devices: { devicesList: [] },
    };
    const store = mockStore(initialState);
    const reportsWrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en">
          <BrowserRouter>
            <ReportingPage />
          </BrowserRouter>
        </IntlProvider>
      </Provider>
    );
    const actual = reportsWrapper.exists();
    const expected = true;
    expect(actual).toBe(expected);
  });
});
