import { NotificationPreferenceFactory } from './factory/NotificationPreferenceFactory';
import { propertyExist } from './propertyValidation';

export function initializeUserSettings(userSettings) {
  const userSettingsInitialized = userSettings ? { ...userSettings } : {};

  if (!userSettingsInitialized.unitMeasurement) {
    userSettingsInitialized.unitMeasurement = {
      unitMeasurementId: 0,
    };
  }

  if (userSettingsInitialized.notificationPreferences) {
    const notificationPreferenceFactory = new NotificationPreferenceFactory();

    userSettingsInitialized.notificationPreferences = userSettingsInitialized.notificationPreferences.map(
      (preference) => {
        const notificationPreference = { ...preference };

        if (notificationPreference.notificationPreferenceType) {
          const defaultPreferenceValues = notificationPreferenceFactory.getDefaultValues(
            notificationPreference.notificationPreferenceType
              .notificationPreferenceTypeId
          );

          if (!propertyExist(() => notificationPreference.emailEnabled)) {
            notificationPreference.emailEnabled =
              defaultPreferenceValues.emailEnabled;
          }

          if (!propertyExist(() => notificationPreference.smsEnabled)) {
            notificationPreference.smsEnabled =
              defaultPreferenceValues.smsEnabled;
          }
        }

        return notificationPreference;
      }
    );
  }

  return userSettingsInitialized;
}
