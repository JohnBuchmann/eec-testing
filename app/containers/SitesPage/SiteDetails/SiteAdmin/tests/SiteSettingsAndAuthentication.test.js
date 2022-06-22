import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import history from 'Utils/history';
import { fetchSiteTypeStart } from 'Store/Sites/actions';
import { userLogin, userPermissions } from 'Internals/mocks/userLogin';
import SiteSettingsAndAuthentication from '../SiteSettingsAndAuthentication';

const initialState = {
  user: { user: userLogin, permissions: userPermissions },
  sites: {
    timeZones: [
      {
        timeZoneId: 1,
        name: 'America/Adak',
        country: 'US',
        value: 1,
        text: 'America/Adak',
      },
      {
        timeZoneId: 2,
        name: 'America/Detroit',
        country: 'US',
        value: 2,
        text: 'America/Detroit',
      },
    ],
    site: {
      routerId: '5555',
      plcId: 'username1',
      password: 'password123+',
      caCertificate: {
        url: 'https://www.temporaryurl.com/ca.pem?key=348sd87s8y8y3482y4',
      },
      timeZone: {
        timeZoneId: 1,
        name: 'America/Adak',
        country: 'US',
        value: 1,
        text: 'America/Adak',
      },
      siteType: {
        siteTypeId: 1,
        name: 'Ignition',
        description: 'For sites using Ignition',
      },
    },
  },
};

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore(initialState);
let state;
const setState = jest.fn((event) => {
  state = event;
});
const useStateSpy = jest.spyOn(React, 'useState');
useStateSpy.mockImplementation((init) => [init, setState]);

const mountComponent = mount(
  <Provider store={store}>
    <BrowserRouter>
      <IntlProvider locale="en">
        <SiteSettingsAndAuthentication history={history} />
      </IntlProvider>
    </BrowserRouter>
  </Provider>
);

describe('<SiteSettingsAndAuthentication />', () => {
  describe('Mount the component', () => {
    it('should the component exists mounted', () => {
      const expected = true;
      const actual = mountComponent.exists();
      expect(actual).toBe(expected);
    });
  });

  describe('Download CA Certificate', () => {
    it('should download CA Certificate', () => {
      const downloadCACertificateButton = mountComponent
        .find('[data-testid="content-downloadCACertificateButton"]')
        .first();
      downloadCACertificateButton.simulate('click');
      const actual = store.getState().sites.site.caCertificate.url;
      const expected =
        'https://www.temporaryurl.com/ca.pem?key=348sd87s8y8y3482y4';
      expect(actual).toBe(expected);
    });
  });

  describe('SiteSettings Edit', () => {
    const buttonEdit = mountComponent
      .find('[data-testid="content-editSettingsDataButton"]')
      .first();
    it('should exist button "Edit"', () => {
      const expected = true;
      const actual = buttonEdit.exists();

      expect(actual).toBe(expected);
    });
  });

  describe('<GenericModalConfirmation />', () => {
    const modalComponent = mountComponent
      .find('[data-testid="content-siteSettingsModal"]')
      .first();
    it('should the modal component exists', () => {
      const actual = modalComponent.exists();
      const expected = true;
      expect(actual).toBe(expected);
    });

    it('should call function property submitCancel in modal', () => {
      const expected = {
        modal: 'siteSettingsModal',
        isOpen: false,
      };
      modalComponent.props().submitCancel();
      const actual = state;

      expect(actual).toEqual(expected);
    });

    it('should call function property submitSave in modal', () => {
      const expected = {
        modal: 'siteSettingsModal',
        isOpen: false,
      };
      modalComponent.props().submitSave();
      const actual = state;

      expect(actual).toEqual(expected);
    });
  });

  describe('<GenerateUsernamePasswordModal />', () => {
    const modalComponent = mountComponent
      .find('[data-testid="content-generateUsernamePasswordModal"]')
      .first();
    it('should the modal component exists', () => {
      const actual = modalComponent.exists();
      const expected = true;
      expect(actual).toBe(expected);
    });

    it('should call function property closetUsernamePasswordDialog in modal', () => {
      const expected = {
        modal: 'generateUsernamePasswordModal',
        isOpen: false,
      };
      modalComponent.props().closetUsernamePasswordDialog();
      const actual = state;

      expect(actual).toEqual(expected);
    });

    it('should call function property submitUsernamePasswordDialog in modal', () => {
      modalComponent.props().submitUsernamePasswordDialog();
      expect(store.getActions()).toContainEqual(fetchSiteTypeStart());
    });
  });

  describe('<GenericModalConfirmation />', () => {
    const modalComponent = mountComponent
      .find('[data-testid="outOfRange-alert"]')
      .first();
    it('should the modal component exists', () => {
      const actual = modalComponent.exists();
      const expected = true;
      expect(actual).toBe(expected);
    });

    it('modal should be closed after submitCancel in modal', () => {
      const isOpen = false;
      modalComponent.props().submitCancel();
      const actual = state;

      expect(actual).toEqual(isOpen);
    });
  });
});
