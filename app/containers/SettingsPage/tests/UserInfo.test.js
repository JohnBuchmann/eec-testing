import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { userLogin } from 'Internals/mocks/userLogin';
import { cleanUserOktaPasswordMessages } from 'Store/User/actions';
import { act } from 'react-dom/test-utils';
import UserInfo from '../UserInfo';

describe('<UserInfo />', () => {
  let wrapper;
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const storeMockData = {
    user: { user: { ...userLogin, oktaSuccessPassword: false } },
  };
  const store = mockStore(storeMockData);

  describe('#Change Password', () => {
    beforeEach(() => {
      wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en">
            <UserInfo />
          </IntlProvider>
        </Provider>
      );
    });

    it('should change password fields and call actions to redux', () => {
      const oldPasswordMock = '123456789';
      const newPasswordMock = '12345678910';
      const confirmPasswordMock = '12345678910';
      const buttonEdit = wrapper
        .find('[data-testid="content-editPasswordButton"]')
        .first();
      act(() => {
        buttonEdit.at(0).simulate('click');
      });
      wrapper.update();
      const inputOldPassword = wrapper
        .find('[data-testid="content-inputOldPassword"]')
        .first();
      const eventOld = {
        preventDefault() {},
        target: { value: oldPasswordMock, name: 'current' },
      };
      act(() => {
        inputOldPassword.props().onChange(eventOld);
      });
      wrapper.update();
      const inputNewPassword = wrapper
        .find('[data-testid="content-inputNewPassword"]')
        .first();
      const eventNew = {
        preventDefault() {},
        target: { value: newPasswordMock, name: 'new' },
      };
      act(() => {
        inputNewPassword.props().onChange(eventNew);
      });
      wrapper.update();
      const inputConfirmPassword = wrapper
        .find('[data-testid="content-inputNewPassword"]')
        .first();
      const eventConfirm = {
        preventDefault() {},
        target: { value: confirmPasswordMock, name: 'confirm' },
      };
      act(() => {
        inputConfirmPassword.props().onChange(eventConfirm);
      });
      wrapper.update();
      const saveButton = wrapper
        .find('[data-testid="content-savePasswordButton"]')
        .first();
      act(() => {
        saveButton.at(0).simulate('click');
      });
      const actual = store.getActions().length;
      const expected = 1;

      expect(actual).toEqual(expected);
    });

    it('should change password fields with no match new and confirm password fields', () => {
      const oldPasswordMock = '123456789';
      const newPasswordMock = '12345678910';
      const confirmPasswordMock = '0123456789';
      const buttonEdit = wrapper
        .find('[data-testid="content-editPasswordButton"]')
        .first();
      act(() => {
        buttonEdit.at(0).simulate('click');
      });
      wrapper.update();
      const inputOldPassword = wrapper
        .find('[data-testid="content-inputOldPassword"]')
        .first();
      const eventOld = {
        preventDefault() {},
        target: { value: oldPasswordMock, name: 'current' },
      };
      act(() => {
        inputOldPassword.props().onChange(eventOld);
      });
      wrapper.update();
      const inputNewPassword = wrapper
        .find('[data-testid="content-inputNewPassword"]')
        .first();
      const eventNew = {
        preventDefault() {},
        target: { value: newPasswordMock, name: 'new' },
      };
      act(() => {
        inputNewPassword.props().onChange(eventNew);
      });
      wrapper.update();
      const inputConfirmPassword = wrapper
        .find('[data-testid="content-inputNewPassword"]')
        .first();
      const eventConfirm = {
        preventDefault() {},
        target: { value: confirmPasswordMock, name: 'confirm' },
      };
      act(() => {
        inputConfirmPassword.props().onChange(eventConfirm);
      });
      wrapper.update();
      const saveButton = wrapper
        .find('[data-testid="content-savePasswordButton"]')
        .first();
      act(() => {
        saveButton.at(0).simulate('click');
      });
      wrapper.update();
      const actualInput = wrapper
        .find('[data-testid="content-inputConfirmPassword"]')
        .first();
      const actualValue = actualInput.props().value;
      const actualHelperText = actualInput.props().helperText;
      const expectedValue = '';
      const expectedHelperText =
        'Your Password Confirmation did not match. Please try again.';

      expect(actualValue).toEqual(expectedValue);
      expect(actualHelperText).toEqual(expectedHelperText);
    });

    it('should display okta error message on old password', () => {
      const errorMessageMock =
        'Old Password does not match our records. Please try again.';
      const storeError = mockStore({
        user: {
          user: {
            ...userLogin,
            oktaErrorMessage: { type: 'password', message: errorMessageMock },
          },
        },
      });
      const wrapperError = mount(
        <Provider store={storeError}>
          <IntlProvider locale="en">
            <UserInfo />
          </IntlProvider>
        </Provider>
      );
      const buttonEdit = wrapperError
        .find('[data-testid="content-editPasswordButton"]')
        .first();
      act(() => {
        buttonEdit.at(0).simulate('click');
      });
      wrapperError.update();
      const inputOldPassword = wrapperError
        .find('[data-testid="content-inputOldPassword"]')
        .first();

      const actualValue = inputOldPassword.props().value;
      const actualHelperText = inputOldPassword.props().helperText;
      const expectedValue = '';
      const expectedHelperText = errorMessageMock;

      expect(actualValue).toEqual(expectedValue);
      expect(actualHelperText).toEqual(expectedHelperText);
    });

    it('should display okta error message on new password', () => {
      const errorMessageMock = 'Password requirements were not met.';
      const storeError = mockStore({
        user: {
          user: {
            ...userLogin,
            oktaErrorMessage: { type: 'password', message: errorMessageMock },
          },
        },
      });
      const wrapperError = mount(
        <Provider store={storeError}>
          <IntlProvider locale="en">
            <UserInfo />
          </IntlProvider>
        </Provider>
      );
      const buttonEdit = wrapperError
        .find('[data-testid="content-editPasswordButton"]')
        .first();
      act(() => {
        buttonEdit.at(0).simulate('click');
      });
      wrapperError.update();
      const inputNewPassword = wrapperError
        .find('[data-testid="content-inputNewPassword"]')
        .first();

      const actualValue = inputNewPassword.props().value;
      const actualHelperText = inputNewPassword.props().helperText;
      const expectedValue = '';
      const expectedHelperText = errorMessageMock;

      expect(actualValue).toEqual(expectedValue);
      expect(actualHelperText).toEqual(expectedHelperText);
    });

    it('should input oktaSuccessPassword with "true" on store and call action "cleanUserOktaPasswordMessages"', () => {
      const storeSuccess = mockStore({
        user: {
          user: {
            ...userLogin,
            oktaSuccessPassword: true,
          },
        },
      });
      const wrapperSuccess = mount(
        <Provider store={storeSuccess}>
          <IntlProvider locale="en">
            <UserInfo />
          </IntlProvider>
        </Provider>
      );
      const actualExists = wrapperSuccess.exists();
      const actual = storeSuccess.getActions();
      const expectedExists = true;
      const expected = cleanUserOktaPasswordMessages();

      expect(actual).toContainEqual(expected);
      expect(actualExists).toEqual(expectedExists);
    });
  });

  describe('#Edit mobile phone', () => {
    beforeEach(() => {
      wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en">
            <UserInfo />
          </IntlProvider>
        </Provider>
      );
    });

    it('should edit phone number field', () => {
      const phoneMock = { workingText: '5555555555' };
      const inputPhone = wrapper
        .find('[data-testid="content-inputEditMobilePhone"]')
        .first();
      const spyEditPhone = jest.spyOn(inputPhone.props(), 'onEditionSave');
      act(() => {
        inputPhone.props().onEditionSave(phoneMock);
      });
      wrapper.update();

      expect(spyEditPhone).toHaveBeenCalledWith(phoneMock);
    });

    it('should display modal with error phone', () => {
      const errorMessageMock = 'Password requirements were not met.';
      const storeError = mockStore({
        user: {
          user: {
            ...userLogin,
            oktaErrorMessage: {
              type: 'mobilePhone',
              message: errorMessageMock,
            },
          },
        },
      });
      const wrapperError = mount(
        <Provider store={storeError}>
          <IntlProvider locale="en">
            <UserInfo />
          </IntlProvider>
        </Provider>
      );

      const modal = wrapperError
        .find('[data-testid="content-userProfileErrorModal"]')
        .first();
      const actual = modal.exists();
      const expected = true;

      expect(actual).toEqual(expected);
    });
  });
});
