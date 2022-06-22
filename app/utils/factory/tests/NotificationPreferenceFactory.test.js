import { NotificationPreferenceFactory } from '../NotificationPreferenceFactory';
import { PreferenceNotificationTypes } from '../NotificationPreferenceTypeFactory';

describe('NotificationPreferenceFactory', () => {
  let undefinedData;
  describe('#createObject', () => {
    it('should create a default notificationPreference object when no Preference Notification Types is passed', () => {
      const notificationPreferenceFactory = new NotificationPreferenceFactory();

      const notificationPreference = notificationPreferenceFactory.createObject(
        undefinedData
      );

      expect(notificationPreference).toBeDefined();
      expect(notificationPreference.notificationPreferenceType).toBeDefined();
      expect(
        notificationPreference.notificationPreferenceType
          .notificationPreferenceTypeId
      ).toBe(PreferenceNotificationTypes.NewWorkItem);
    });

    it('should create notificationPreference object ', () => {
      const notificationPreferenceFactory = new NotificationPreferenceFactory();

      const notificationPreference = notificationPreferenceFactory.createObject(
        PreferenceNotificationTypes.NewWorkItem
      );

      expect(notificationPreference).toBeDefined();
      expect(notificationPreference.notificationPreferenceType).toBeDefined();
      expect(
        notificationPreference.notificationPreferenceType
          .notificationPreferenceTypeId
      ).toBe(PreferenceNotificationTypes.NewWorkItem);
    });
  });

  describe('#getDefaultValues', () => {
    it('should get default values for DeviceRemovedFromSite type', () => {
      const notificationPreferenceFactory = new NotificationPreferenceFactory();

      const defaultValues = notificationPreferenceFactory.getDefaultValues(
        PreferenceNotificationTypes.Faulted
      );

      const faultedDefaultValues = {
        emailEnabled: true,
        smsEnabled: true,
      };

      expect(defaultValues).toBeDefined();
      expect(defaultValues).toEqual(faultedDefaultValues);
    });

    it('should get default values when Preference Notification Types is invalid', () => {
      const notificationPreferenceFactory = new NotificationPreferenceFactory();

      const defaultValues = notificationPreferenceFactory.getDefaultValues(-1);

      const invalidDefaultValues = {
        emailEnabled: false,
        smsEnabled: false,
      };

      expect(defaultValues).toBeDefined();
      expect(defaultValues).toEqual(invalidDefaultValues);
    });
  });
});
