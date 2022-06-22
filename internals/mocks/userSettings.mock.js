export const userSettingsMock = {
  userSettingId: 1,
  user: {
    userId: 20,
    oktaUserId: 50,
  },
  unitMeasurement: {
    unitMeasurementId: 2,
    name: 'F°',
  },
  notificationPreferences: [
    {
      notificationPreferenceId: 1,
      notificationPreferenceType: {
        notificationPreferenceTypeId: 1,
        name: 'New Work Item',
      },
      emailEnabled: null,
      smsEnabled: null,
    },
    {
      notificationPreferenceId: 2,
      notificationPreferenceType: {
        notificationPreferenceTypeId: 2,
        name: 'Faulted',
      },
      emailEnabled: null,
      smsEnabled: null,
    },
    {
      notificationPreferenceId: 3,
      notificationPreferenceType: {
        notificationPreferenceTypeId: 3,
        name: 'Maintenance Mode Initiated',
      },
      emailEnabled: null,
      smsEnabled: null,
    },
    {
      notificationPreferenceId: 4,
      notificationPreferenceType: {
        notificationPreferenceTypeId: 4,
        name: 'Maintenance Mode Cleared',
      },
      emailEnabled: null,
      smsEnabled: null,
    },
    {
      notificationPreferenceId: 5,
      notificationPreferenceType: {
        notificationPreferenceTypeId: 5,
        name: 'New Device at Site',
      },
      emailEnabled: null,
      smsEnabled: null,
    },
    {
      notificationPreferenceId: 6,
      notificationPreferenceType: {
        notificationPreferenceTypeId: 6,
        name: 'Device Offline',
      },
      emailEnabled: null,
      smsEnabled: null,
    },
    {
      notificationPreferenceId: 7,
      notificationPreferenceType: {
        notificationPreferenceTypeId: 7,
        name: 'Device Removed From Site',
      },
      emailEnabled: null,
      smsEnabled: null,
    },
  ],
};
