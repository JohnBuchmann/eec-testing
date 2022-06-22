import { mount } from 'enzyme';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sitesListMock from 'Internals/mocks/sitesListMock';

import SiteCard from '../index';

describe('<SiteCard />', () => {
  const data = sitesListMock[0];

  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const initialState = {};
  const store = mockStore(initialState);

  let wrapper;

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en">
          <SiteCard site={data} />
        </IntlProvider>
      </Provider>
    );
  });
  describe('#constructor', () => {
    it('should render and exists', () => {
      const actual = wrapper.find('[data-testid="siteCardItem"]').exists();
      const expected = true;
      expect(actual).toBe(expected);
    });
  });

  describe('#getConfigurationById', () => {
    it('should get the site status as Maintenance', () => {
      const expected = 'maintenance';
      const sitestatus = wrapper
        .find('[data-testid="siteCardStatusBadgeItem"]')
        .first();
      const actual = sitestatus.props().data;

      expect(actual).toBe(expected);
    });
    it('should get the ICIAN name enable', () => {
      const expected = true;
      const wrapperIcian = mount(
        <Provider store={store}>
          <IntlProvider locale="en">
            <SiteCard site={data} allTabSelected />
          </IntlProvider>
        </Provider>
      );
      const actual = wrapperIcian.exists();

      expect(actual).toBe(expected);
    });

    it('should have class "emulatedSite" for emulated site', () => {
      const dataSite = { ...data, live: false };
      const wrapperComponent = mount(
        <Provider store={store}>
          <IntlProvider locale="en">
            <SiteCard site={dataSite} />
          </IntlProvider>
        </Provider>
      );
      const card = wrapperComponent
        .find('[data-testid="siteCardItem"]')
        .first();
      const actual = card.props().className;
      const expected = 'emulatedSite';
      expect(actual).toContain(expected);
    });
  });
});
