/**
 * Testing our Notification Ribbon component
 */

import React from 'react';
import { IntlProvider } from 'react-intl';
import { mount } from 'enzyme';
import NotificationRow from '../NotificationRow';

describe('<OpportunityDashboardPage />', () => {
  describe('Component should mount', () => {
    const now = new Date();
    const minutesToRemove = 5;
    const dateWithSomeMinutesAgo = new Date(
      now.setMinutes(now.getMinutes() - minutesToRemove)
    ).toISOString();
    const container = mount(
      <IntlProvider locale="en">
        <NotificationRow dateTime={dateWithSomeMinutesAgo} />
      </IntlProvider>
    );
    it('should component exists', () => {
      const actual = container.exists();
      const expected = true;
      expect(actual).toBe(expected);
    });
    it('should timeago text exists', () => {
      const bodyContainer = container.find(
        '[data-testid="notification-body-container"]'
      );
      const timeAgoContainer = bodyContainer
        .find('[data-testid="notification-time-ago"]')
        .first();
      const actual = timeAgoContainer.exists();
      const expected = true;
      expect(actual).toBe(expected);
    });
  });
  describe('validates difference on times and dates', () => {
    it('should validate the minutes the message', () => {
      const now = new Date();
      const minutesToRemove = 5;
      const dateWithSomeMinutesAgo = new Date(
        now.setMinutes(now.getMinutes() - minutesToRemove)
      ).toISOString();
      const container = mount(
        <IntlProvider locale="en">
          <NotificationRow dateTime={dateWithSomeMinutesAgo} />
        </IntlProvider>
      );
      const bodyContainer = container.find(
        '[data-testid="notification-body-container"]'
      );
      const timeAgoContainer = bodyContainer
        .find('[data-testid="notification-time-ago"]')
        .first();
      const { props: messageProps } = timeAgoContainer.prop('data');
      const { value: minutesInMessage = 0 } = messageProps.values || {};
      const actual =
        parseInt(minutesToRemove + 1, 10) >= parseInt(minutesInMessage, 10);
      const expected = true;
      expect(actual).toBe(expected);
    });
    it('should validate hours in the message', () => {
      const now = new Date();
      const hoursToRemove = 2;
      const dateWithSomeHoursAgo = new Date(
        now.setHours(now.getHours() - hoursToRemove)
      ).toISOString();
      const container = mount(
        <IntlProvider locale="en">
          <NotificationRow dateTime={dateWithSomeHoursAgo} />
        </IntlProvider>
      );
      const bodyContainer = container.find(
        '[data-testid="notification-body-container"]'
      );
      const timeAgoContainer = bodyContainer
        .find('[data-testid="notification-time-ago"]')
        .first();
      const { props: messageProps } = timeAgoContainer.prop('data');
      const { value: hoursInMessage = 0 } = messageProps.values || {};
      const actual =
        parseInt(hoursToRemove + 1, 10) >= parseInt(hoursInMessage, 10);
      const expected = true;
      expect(actual).toBe(expected);
    });
    it('should return format days in the message', () => {
      const now = new Date();
      const daysToRemove = 3;
      const dateWithSomeDaysAgo = new Date(
        now.setDate(now.getDate() - daysToRemove)
      ).toISOString();
      const container = mount(
        <IntlProvider locale="en">
          <NotificationRow dateTime={dateWithSomeDaysAgo} />
        </IntlProvider>
      );
      const bodyContainer = container.find(
        '[data-testid="notification-body-container"]'
      );
      const timeAgoContainer = bodyContainer
        .find('[data-testid="notification-time-ago"]')
        .first();
      const { props: messageProps } = timeAgoContainer.prop('data');
      const { value: daysInMessage = 0 } = messageProps.values || {};
      const actual =
        parseInt(daysToRemove + 1, 10) >= parseInt(daysInMessage, 10);
      const expected = true;
      expect(actual).toBe(expected);
    });
    it('should display an error accurred when DateTime is invalid', () => {
      const errorDate = 'InvalidDate';
      const container = mount(
        <IntlProvider locale="en">
          <NotificationRow dateTime={errorDate} />
        </IntlProvider>
      );
      const bodyContainer = container.find(
        '[data-testid="notification-body-container"]'
      );
      const timeAgoContainer = bodyContainer
        .find('[data-testid="notification-time-ago"]')
        .first();
      const textToSearch = 'An error occurred';
      const { props: messageProps } = timeAgoContainer.prop('data');
      const { defaultMessage: actual = '' } = messageProps || {};
      const expected = textToSearch;
      expect(actual).toBe(expected);
    });
  });
});
