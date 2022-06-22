/**
 *
 * Testing Paginator Component
 *
 */

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { userLogin } from 'Internals/mocks/userLogin';
import NavigationDrawer from '../index';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('<NavigationDrawer />', () => {
  describe('#Constructor', () => {
    const initialState = {
      router: { location: { pathname: '/' } },
      user: { user: userLogin },
    };
    let store;

    it('should render Navigation Drawer over reports ', () => {
      store = mockStore(initialState);
      const { container } = render(
        <Provider store={store}>
          <BrowserRouter>
            <IntlProvider locale="en">
              <NavigationDrawer location="reports" />
            </IntlProvider>
          </BrowserRouter>
        </Provider>
      );
      const reportsLink = container.querySelector('a[href="/reports"]');

      expect(reportsLink).toBeDefined();
    });
  });
});
