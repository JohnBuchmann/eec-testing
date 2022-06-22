import {
  NotificationPreferenceTypeFactory,
  PreferenceNotificationTypes,
} from './NotificationPreferenceTypeFactory';

/**
 * NotificationPreferenceFactory This is a factory class to create
 * notification preference objects and other helpful methods
 */
export class NotificationPreferenceFactory {
  /*
   * createObject
   * Factory method to create a notification preference object
   * @param {number} notificationPreferenceType Notification preference type id
   * @output {object} notification preference object
   */
  createObject(notificationPreferenceType) {
    const preferenceNotificationTypeFactory = new NotificationPreferenceTypeFactory();

    const type =
      notificationPreferenceType || PreferenceNotificationTypes.NewWorkItem;

    return {
      notificationPreferenceType: preferenceNotificationTypeFactory.createObject(
        type
      ),
      ...this.getDefaultValues(type),
    };
  }

  /*
   * getDefaultValues
   * Method to default values by notification preference type
   * @param {number} notificationPreferenceType Notification preference type id
   * @output {object} object with default values by notification preference type
   */
  getDefaultValues(notificationPreferenceType) {
    let emailEnabled;
    let smsEnabled;

    switch (notificationPreferenceType) {
      case PreferenceNotificationTypes.NewWorkItem:
      case PreferenceNotificationTypes.LockoutInitiated:
      case PreferenceNotificationTypes.LockoutCleared:
      case PreferenceNotificationTypes.NewDeviceAtSite:
      case PreferenceNotificationTypes.DeviceOffline:
      case PreferenceNotificationTypes.DeviceRemovedFromSite:
        emailEnabled = true;
        smsEnabled = false;
        break;
      case PreferenceNotificationTypes.Faulted:
        emailEnabled = true;
        smsEnabled = true;
        break;
      default:
        emailEnabled = false;
        smsEnabled = false;
        break;
    }

    return {
      emailEnabled,
      smsEnabled,
    };
  }
}
