import {
  NotificationPreferenceTypeFactory,
  PreferenceNotificationTypes,
} from '../NotificationPreferenceTypeFactory';

describe('NotificationPreferenceTypeFactory', () => {
  let notificationPreferenceTypeFactory = new NotificationPreferenceTypeFactory();

  beforeEach(() => {
    notificationPreferenceTypeFactory = new NotificationPreferenceTypeFactory();
  });

  describe('#createObject', () => {
    it('should create a default notificationPreferenceType object when no Preference Notification Types is passed', () => {
      let undefinedData;
      const notificationPreferenceType = notificationPreferenceTypeFactory.createObject(
        undefinedData
      );

      expect(notificationPreferenceType).toBeDefined();
      expect(notificationPreferenceType.notificationPreferenceTypeId).toBe(
        PreferenceNotificationTypes.NewWorkItem
      );
    });

    it('should create a notificationPreferenceType object when Preference Notification Types is passed', () => {
      const notificationPreferenceType = notificationPreferenceTypeFactory.createObject(
        PreferenceNotificationTypes.Faulted
      );

      expect(notificationPreferenceType).toBeDefined();
      expect(notificationPreferenceType.notificationPreferenceTypeId).toBe(
        PreferenceNotificationTypes.Faulted
      );
    });
  });

  describe('#getDescription', () => {
    it('should get empty description when no valid type', () => {
      expect(notificationPreferenceTypeFactory.getDescription(-1)).toBe('');
    });

    it('should get Maintenance Mode Initiated description when LockoutInitiated type', () => {
      expect(
        notificationPreferenceTypeFactory.getDescription(
          PreferenceNotificationTypes.LockoutInitiated
        )
      ).toBe('Maintenance Mode Initiated');
    });

    it('should get Maintenance Mode Cleared description when LockoutCleared type', () => {
      expect(
        notificationPreferenceTypeFactory.getDescription(
          PreferenceNotificationTypes.LockoutCleared
        )
      ).toBe('Maintenance Mode Cleared');
    });

    it('should get New Device at Site description when NewDeviceAtSite type', () => {
      expect(
        notificationPreferenceTypeFactory.getDescription(
          PreferenceNotificationTypes.NewDeviceAtSite
        )
      ).toBe('New Device at Site');
    });

    it('should get Device Offline description when DeviceOffline type', () => {
      expect(
        notificationPreferenceTypeFactory.getDescription(
          PreferenceNotificationTypes.DeviceOffline
        )
      ).toBe('Device Offline');
    });

    it('should get Device Removed From Site description when DeviceRemovedFromSite type', () => {
      expect(
        notificationPreferenceTypeFactory.getDescription(
          PreferenceNotificationTypes.DeviceRemovedFromSite
        )
      ).toBe('Device Removed From Site');
    });
  });
});
