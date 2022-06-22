/**
 * Enum for Preference Notification Type
 */
export const PreferenceNotificationTypes = {
  NewWorkItem: 1,
  Faulted: 2,
  LockoutInitiated: 3,
  LockoutCleared: 4,
  NewDeviceAtSite: 5,
  DeviceOffline: 6,
  DeviceRemovedFromSite: 7,
};

/**
 * NotificationPreferenceTypeFactory This is a factory class to create
 * notification preference type objects and other helpful methods
 */
export class NotificationPreferenceTypeFactory {
  /*
   * createObject
   * Factory method to create a notification preference type object
   * @param {number} notificationPreferenceType Notification preference type id
   * @output {object} notification preference type object
   */
  createObject(notificationPreferenceType) {
    const type =
      notificationPreferenceType || PreferenceNotificationTypes.NewWorkItem;

    return {
      notificationPreferenceTypeId: type,
      name: this.getDescription(type),
    };
  }

  /*
   * getDescription
   * Method to get a proper description for Notification preference type id
   * @param {number} notificationPreferenceType Notification preference type id
   * @output {string} description by Notification preference type id
   */
  getDescription(notificationPreferenceType) {
    switch (notificationPreferenceType) {
      case PreferenceNotificationTypes.NewWorkItem:
        return 'New Work Item';
      case PreferenceNotificationTypes.Faulted:
        return 'Faulted';
      case PreferenceNotificationTypes.LockoutInitiated:
        return 'Maintenance Mode Initiated';
      case PreferenceNotificationTypes.LockoutCleared:
        return 'Maintenance Mode Cleared';
      case PreferenceNotificationTypes.NewDeviceAtSite:
        return 'New Device at Site';
      case PreferenceNotificationTypes.DeviceOffline:
        return 'Device Offline';
      case PreferenceNotificationTypes.DeviceRemovedFromSite:
        return 'Device Removed From Site';
      default:
        return '';
    }
  }
}
