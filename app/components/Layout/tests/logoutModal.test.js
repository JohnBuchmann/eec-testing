import React from 'react';
import { shallow, mount } from 'enzyme';
import { IntlProvider } from 'react-intl';

import LogoutModal from '../logoutModal';

import messages from '../messages';

describe('LogoutModal', () => {
  describe('Mount the component', () => {
    it('should the component exists mounted', () => {
      const mountWrapper = mount(
        <IntlProvider locale="en">
          <LogoutModal openModal />
        </IntlProvider>
      );
      const expected = true;
      const actual = mountWrapper.exists();
      expect(actual).toBe(expected);
    });
    it('should the component exists mounted', () => {
      const isOpen = false;
      const mountWrapper = mount(
        <IntlProvider locale="en">
          <LogoutModal openModal={isOpen} />
        </IntlProvider>
      );
      const expected = true;
      const actual = mountWrapper.exists();
      expect(actual).toBe(expected);
    });
  });

  describe('constructor', () => {
    const { logoutModal: logoutModalMessages } = messages;

    const wrapper = shallow(
      <IntlProvider locale="en">
        <LogoutModal openModal />
      </IntlProvider>
    );
    const component = wrapper.dive();
    const modalTitle = component
      .dive()
      .find('[data-testid="content-modalTitle"]');

    it('should component exists', () => {
      const expected = true;
      const actual = component.exists();
      expect(actual).toBe(expected);
    });
    it('should exists the ModalTitle', () => {
      const expected = true;
      const actual = modalTitle.exists();
      expect(actual).toBe(expected);
    });
    it('should have the same title in the messages', () => {
      const { defaultMessage: actual } = modalTitle.props();
      const { defaultMessage: expected } = logoutModalMessages.title;
      expect(actual).toBe(expected);
    });
    it('should the cancel button exists', () => {
      const actual = component
        .find('[data-testid="content-modalDeleteCloseButton"]')
        .exists();
      const expected = true;
      expect(actual).toBe(expected);
    });
    it('should the submit button exists', () => {
      const actual = component
        .find('[data-testid="content-modalLogoutSubmitButton"]')
        .exists();
      const expected = true;
      expect(actual).toBe(expected);
    });
  });
  describe('Modal > buttons', () => {
    const submitLogoutConfirmationModal = jest.fn(() => {});
    const closeLogoutConfirmationModal = jest.fn(() => {});
    const wrapper = shallow(
      <IntlProvider locale="en">
        <LogoutModal
          openModal
          submitLogoutConfirmationModal={submitLogoutConfirmationModal}
          closeLogoutConfirmationModal={closeLogoutConfirmationModal}
        />
      </IntlProvider>
    );
    const component = wrapper.dive();

    it('should cancel button click call closeLogoutConfirmationModal method', () => {
      const actual = closeLogoutConfirmationModal;
      const button = component.find(
        '[data-testid="content-modalDeleteCloseButton"]'
      );
      button.props().onClick();
      expect(actual).toHaveBeenCalled();
    });

    it('should submit button click call submitLogoutConfirmationModal method', () => {
      const actual = submitLogoutConfirmationModal;
      const button = component.find(
        '[data-testid="content-modalLogoutSubmitButton"]'
      );
      button.props().onClick();
      expect(actual).toHaveBeenCalled();
    });
  });
});
