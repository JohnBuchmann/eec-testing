import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import sitePermissionMock from 'Internals/mocks/sitePermissionMock';
import { deleteUserPermissionsStart } from 'Store/Sites/actions';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { userLogin } from 'Internals/mocks/userLogin';
import { SiteAdminAccess } from 'Utils/enums/roles';
import thunk from 'redux-thunk';
import SitePermissions from '../SitePermissions';

describe('<SitePermissions />', () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const icianPrincipalMock = true;
  const permissionsMock = {
    emulated: {
      siteAdmin: {
        edit: [SiteAdminAccess.AddUser],
      },
    },
  };
  const initialState = {
    user: { permissions: permissionsMock, user: userLogin },
    sites: {
      oktaUsers: [
        {
          activated: null,
          created: '2021-03-19T16:40:31.000Z',
          credentials: { provider: { type: 'OKTA', name: 'OKTA' } },
          id: '00uhsdyrs5ykcC5qt1d6',
          lastLogin: null,
          lastUpdated: '2021-03-19T16:40:31.000Z',
          passwordChanged: null,
          profile: {
            email: 'test@faithtechnologies.com',
            firstName: 'Test_Brian',
            lastName: 'Test_Leslie',
            login: 'test@faithtechnologies.com',
            mobilePhone: null,
            secondEmail: 'test@faithtechnologies.com',
          },
          status: 'STAGED',
          statusChanged: null,
          type: { id: 'oty6s96if17AEJYwS1d6' },
        },
      ],
      usersPermissions: {
        isPermissioned: true,
        users: [
          {
            userId: 1,
            userName: 'Benhur',
            isEditable: false,
            externalId: 'benhur@noemail.com',
          },
          {
            userId: 2,
            userName: 'Judas',
            isEditable: true,
            externalId: 'judas@noemail.com',
          },
          {
            userId: 3,
            userName: 'Salome',
            isEditable: true,
            externalId: 'salome@noemail.com',
          },
        ],
      },
      site: {
        address: {
          addressId: 11,
          addressLine1: '73370 US-2',
          addressLine2: null,
          city: 'Ashland',
          state: 'WI',
        },
        connectionStatusId: null,
        externalIcianId: 'react_okta_dev@hotmail.com',
        secondaryIcianName: 'John Doe',
        secondaryIcianId: 'jdoe@noemail.com',
        externalId: 'a0h3K000000CQntQAG',
        icianName: 'Ben Netzel',
        isPermissioned: false,
        location: { locationId: 45, locationName: 'Bad River Lodge & Casino' },
        name: 'Bad River Lodge & Casino',
        plcId: 'bad-river-lodge--casin',
        points: null,
        siteId: 45,
        siteType: { siteTypeId: null, name: null, description: null },
        statusId: null,
        tariffStructure: null,
        timeZone: { timeZoneId: 10, name: 'America/Chicago', country: 'US' },
      },
    },
  };
  const store = mockStore(initialState);
  describe('<SitePermissions />', () => {
    const wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en">
          <SitePermissions
            sitePermission={sitePermissionMock}
            icianPrincipal={icianPrincipalMock}
          />
        </IntlProvider>
      </Provider>
    );
    const component = wrapper.find(
      '[data-testid="content-sitePermissionsPanel"]'
    );
    const contentBody = component.find('[data-testid="content-contentBody"]');
    const actions = component.find('[data-testid="content-headerContent"]');

    it('should headerContent actions exists', () => {
      const expected = true;
      const actual = component.exists();
      expect(actual).toBe(expected);
    });
    it('should headerContent actions exists', () => {
      const expected = true;
      const actual = actions.exists();
      expect(actual).toBe(expected);
    });
    it('should contentBody exists', () => {
      const expected = true;
      const actual = contentBody.exists();
      expect(actual).toBe(expected);
    });
  });
  describe('#onPermissionsChange', () => {
    let allowedPermissions;
    const setState = jest.fn((event) => {
      allowedPermissions = event;
    });
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);
    const wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en">
          <SitePermissions
            sitePermission={sitePermissionMock}
            icianPrincipal={icianPrincipalMock}
          />
        </IntlProvider>
      </Provider>
    );
    const component = wrapper.find(
      '[data-testid="content-sitePermissionsPanel"]'
    );
    const actions = component.find('[data-testid="content-headerContent"]');
    const switchPermissions = actions.find(
      '[data-testid="content-sitePermissionsToggleOptions"]'
    );
    it('sitePermissionsToggleOptions should exists', () => {
      const expected = true;
      const actual = switchPermissions.exists();
      expect(actual).toBe(expected);
    });
    it('sitePermissionsToggleOptions should toggle options to false', () => {
      const expected = false;
      switchPermissions.props().onChange(null, expected);
      expect(setState).toHaveBeenCalledWith(expected);
      const actual = allowedPermissions;
      expect(actual).toBe(expected);
    });
  });

  describe('<ButtonComponent addNewUser />', () => {
    let isModalOpen;
    const setState = jest.fn((event) => {
      isModalOpen = event.isOpen;
    });
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);
    const wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en">
          <SitePermissions
            sitePermission={sitePermissionMock}
            icianPrincipal={icianPrincipalMock}
          />
        </IntlProvider>
      </Provider>
    );
    const component = wrapper.find(
      '[data-testid="content-sitePermissionsPanel"]'
    );
    const openDialogButton = component
      .find('[data-testid="content-addNewUserButton"]')
      .first();
    it('should call openAddNewUserDialog on addNewUser button click and show the logs', () => {
      const expected = true;
      openDialogButton.simulate('click');
      const actual = isModalOpen;
      expect(actual).toBe(expected);
    });
  });
  describe('<AddUsersModal />', () => {
    let state;
    const setState = jest.fn((event) => {
      state = event;
    });
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);
    const wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en">
          <SitePermissions sitePermission={sitePermissionMock} />
        </IntlProvider>
      </Provider>
    );
    const modalComponent = wrapper
      .find('[data-testid="content-addNewUserModal"]')
      .first();
    it('should modalComponent exists', () => {
      const expected = true;
      const actual = modalComponent.exists();
      expect(actual).toBe(expected);
    });
    it('should call the property handleAutoCompleteChange', () => {
      const emailSelected = 'test@faithtechnologies.com';
      modalComponent.props().handleAutoCompleteChange({}, emailSelected);
      const expected = emailSelected;
      const actual = state.profile.email;

      expect(actual).toEqual(expected);
    });

    it('should call the property submitAddnewUserDialog', () => {
      const expected = {
        modal: 'addNewUserModal',
        isOpen: false,
      };
      modalComponent.props().submitAddnewUserDialog();
      const actual = state;

      expect(actual).toEqual(expected);
    });

    it('should call the property closeAddNewUserDialog', () => {
      const expected = {
        modal: 'addNewUserModal',
        isOpen: false,
      };
      modalComponent.props().closeAddNewUserDialog();
      const actual = state;

      expect(actual).toEqual(expected);
    });
  });
  describe('addNewUserButton', () => {
    const wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en">
          <SitePermissions
            sitePermission={sitePermissionMock}
            icianPrincipal={icianPrincipalMock}
          />
        </IntlProvider>
      </Provider>
    );
    const openModalButton = wrapper
      .find('[data-testid="content-addNewUserButton"]')
      .first();
    it('should render the component and exists', () => {
      const actual = openModalButton.exists();
      const expected = true;
      expect(actual).toBe(expected);
    });
  });
  describe('SitePermissions - Mounted', () => {
    const wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en">
          <SitePermissions sitePermission={sitePermissionMock} />
        </IntlProvider>
      </Provider>
    );
    it('should the component mounted exists', () => {
      const actual = wrapper.exists();
      const expected = true;
      expect(actual).toBe(expected);
    });
  });
  describe('DeleteUserModal', () => {
    let state;
    const setState = jest.fn((event) => {
      state = event;
    });
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);
    const wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en">
          <SitePermissions sitePermission={sitePermissionMock} allowEdit />
        </IntlProvider>
      </Provider>
    );
    const modalComponent = wrapper
      .find('[data-testid="content-deleteUserModal"]')
      .first();
    it('should the delete modal exists', () => {
      const actual = modalComponent.exists();
      const expected = true;
      expect(actual).toBe(expected);
    });
    it('should call the property submitDeleteUserDialog', () => {
      modalComponent.props().submitDeleteUserDialog();
      const actual = store.getActions();
      const expected = deleteUserPermissionsStart();

      expect(actual).toContainEqual(expected);
    });

    it('should call the property closeDeleteUserDialog', () => {
      const expected = {
        modal: 'deleteUserModal',
        isOpen: false,
      };
      modalComponent.props().closeDeleteUserDialog();
      const actual = state;

      expect(actual).toEqual(expected);
    });
  });
});
