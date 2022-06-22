/**
 * Testing our Drawer component
 */

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { userLogin } from 'Internals/mocks/userLogin';
import DrawerComponent from '../index';

const options = [
  {
    id: 1,
    selected: false,
    url: '/',
  },
  {
    id: 2,
    selected: true,
    url: '/quickconfigurations',
  },
];

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
  user: { user: userLogin },
};

let store;

describe('<Drawer />', () => {
  describe('#initialized', () => {
    it('should render <Drawer />', () => {
      store = mockStore(initialState);
      render(
        <Provider store={store}>
          <IntlProvider locale="en">
            <DrawerComponent />
          </IntlProvider>
        </Provider>
      );
    });

    it('should render <Drawer /> with some given options', () => {
      store = mockStore(initialState);
      const { container } = render(
        <Provider store={store}>
          <BrowserRouter>
            <IntlProvider locale="en">
              <DrawerComponent options={options} />
            </IntlProvider>
          </BrowserRouter>
        </Provider>
      );
      const linkQuickConfiguration = container.querySelector(
        'a[href="/quickconfigurations"]'
      );
      expect(linkQuickConfiguration).toBeDefined();
    });
  });
});
