import { mount } from 'enzyme';
import React from 'react';
import { IntlProvider } from 'react-intl';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { settings } from 'Internals/mocks/userLogin';
import NotificationPreferences from '../NotificationPreferences';

describe('<NotificationPreferences />', () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const onChangeSpy = jest.fn();
  const notificationPreferences = [
    {
      notificationPreferenceId: 1,
      notificationPreferenceType: {
        notificationPreferenceTypeId: 1,
        name: 'NEW WORK ITEM',
      },
      emailEnabled: true,
      smsEnabled: false,
    },
    {
      notificationPreferenceId: 2,
      notificationPreferenceType: {
        notificationPreferenceTypeId: 2,
        name: 'FAULTED',
      },
      emailEnabled: true,
      smsEnabled: true,
    },
  ];

  let store;
  let wrapper;

  beforeEach(() => {
    jest.clearAllMocks();

    store = mockStore({ settings: { notifications: settings } });
    wrapper = mount(
      <IntlProvider locale="en">
        <NotificationPreferences
          notificationPreferences={notificationPreferences}
          onChange={onChangeSpy}
          store={store}
        />
      </IntlProvider>
    );
  });

  describe('#Constructor', () => {
    it('should render <NotificationPreferences /> component', () => {
      expect(
        wrapper.find('[data-testid="notificationPreferenceItem"]').exists()
      ).toBe(true);

      expect(
        wrapper.find('[data-testid="notificationPreferenceItem"]').length
      ).toBe(notificationPreferences.length);
    });
  });

  describe('#SwitchEmail', () => {
    it('should not call onChange method when click on same active option', () => {
      const emailToggleButton = wrapper
        .find('[data-testid="emailToggle"]')
        .first();

      const activeToggleOption = emailToggleButton.findWhere(
        (item) => item.type() === 'button' && item.prop('aria-pressed') === true
      );

      activeToggleOption.simulate('click');
      expect(onChangeSpy).not.toHaveBeenCalled();
    });
    it('should call onChange method when click on not active option', () => {
      const emailToggleButton = wrapper
        .find('[data-testid="emailToggle"]')
        .first();

      const notActiveToggleOption = emailToggleButton.findWhere(
        (item) =>
          item.type() === 'button' && item.prop('aria-pressed') === false
      );

      notActiveToggleOption.simulate('click');
      expect(onChangeSpy).toHaveBeenCalled();
    });
  });

  describe('#SwitchSMS', () => {
    it('should not call onChange method when click on same active option', () => {
      const smsToggleButton = wrapper.find('[data-testid="smsToggle"]').first();

      const activeToggleOption = smsToggleButton.findWhere(
        (item) => item.type() === 'button' && item.prop('aria-pressed') === true
      );

      activeToggleOption.simulate('click');
      expect(onChangeSpy).not.toHaveBeenCalled();
    });

    it('should call onChange method when click on not active option', () => {
      const smsToggleButton = wrapper.find('[data-testid="smsToggle"]').first();

      const notActiveToggleOption = smsToggleButton.findWhere(
        (item) =>
          item.type() === 'button' && item.prop('aria-pressed') === false
      );

      notActiveToggleOption.simulate('click');
      expect(onChangeSpy).toHaveBeenCalled();
    });
  });
});
