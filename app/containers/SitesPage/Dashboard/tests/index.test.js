import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { setSiteFiltersByText } from 'Store/Sites/actions';
import { userLogin, userPermissions } from 'Internals/mocks/userLogin';
import SitesDashboard from '../index';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
Enzyme.configure({ adapter: new Adapter() });

describe('<SitesDashboard />', () => {
  describe('<SitesDashboard /> mounted component', () => {
    let store;
    let wrapper;
    const initialState = {
      app: { loading: false },
      user: { user: userLogin, permissions: userPermissions },
      router: { location: { pathname: '/' } },
      notification: { notifications: [] },
      site: {},
      devices: { devicesList: [] },
      sites: {
        allSites: [],
        filters: { status: [], customer: [], area: [], location: [] },
      },
    };

    beforeEach(() => {
      store = mockStore(initialState);
      wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en">
            <BrowserRouter>
              <SitesDashboard store={store} />
            </BrowserRouter>
          </IntlProvider>
        </Provider>
      );
    });

    it('should the mounted component exists', () => {
      const actual = wrapper.exists();
      const expected = true;
      expect(actual).toBe(expected);
    });
  });

  describe('#handleSearch', () => {
    let store;
    let wrapper;
    const initialState = {
      app: { loading: false },
      router: { location: { pathname: '/' } },
      user: { user: userLogin, permissions: userPermissions },
      notification: { notifications: [] },
      devices: { devicesList: [] },
      sites: {
        allSites: [],
        filters: { text: '', status: [], customer: [], area: [], location: [] },
      },
    };

    beforeEach(() => {
      store = mockStore(initialState);
      wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en">
            <BrowserRouter>
              <SitesDashboard store={store} />
            </BrowserRouter>
          </IntlProvider>
        </Provider>
      );
    });

    it('should setSiteFiltersByText method to be called', () => {
      const searchValue = 'Sites 3';
      const inputSearch = wrapper
        .find('[data-testid="headerDashboardSearch"]')
        .first()
        .find('input')
        .first();

      jest.useFakeTimers();

      inputSearch.simulate('change', { target: { value: searchValue } });

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(store.getActions()).toContainEqual(
        setSiteFiltersByText(searchValue)
      );
    });
  });
});
