import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import history from 'Utils/history';
import { userLogin, userPermissions } from 'Internals/mocks/userLogin';
import SiteAdmin from '../index';

const initialState = {
  user: { user: userLogin, permissions: userPermissions },
  sites: {
    usersPermissions: {
      isPermissioned: true,
      users: [
        {
          userId: 1,
          userName: 'Ben Hur',
          isEditable: false,
          externalId: 'ben.huer@noemail.com',
        },
      ],
    },
    site: {
      authentication: {
        plcId: 'username1', // Change plcId to username on integration
        password: 'password123+',
      },
      caCertificate: {
        url: '',
      },
    },
  },
};

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore(initialState);

describe('<SiteAdmin />', () => {
  describe('should mount the component', () => {
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <IntlProvider locale="en">
            <SiteAdmin history={history} />
          </IntlProvider>
        </BrowserRouter>
      </Provider>
    );
    it('should the component exists and is mounted', () => {
      const actual = wrapper.exists();
      const expected = true;
      expect(actual).toBe(expected);
    });

    it('should token management exists', () => {
      const siteSettingsAndAuthentication = wrapper.find(
        '[data-testid="content-siteSettingsAndAuthentication"]'
      );
      const expected = true;
      const actual = siteSettingsAndAuthentication.exists();
      expect(actual).toBe(expected);
    });
    it('should the module of site permissions exists', () => {
      const sitePermissions = wrapper.find(
        '[data-testid="sitePermissionPanel"]'
      );
      const actual = sitePermissions.exists();
      const expected = true;
      expect(actual).toBe(expected);
    });
    it('the module of tariff structure should exists', () => {
      const tariffStructureComponent = wrapper.find(
        '[data-testid="content-tariffStructure"]'
      );
      const actual = tariffStructureComponent.exists();
      const expected = true;
      expect(actual).toBe(expected);
    });
  });
});
