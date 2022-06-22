import { initializeUserSettings } from '../userSettings';

const userSettingsNoDataFilled = {
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

describe('UserSettings', () => {
  describe('#initializeUserSettings', () => {
    it('should return a default user settings object when empty objet is sent', () => {
      let userSettings = {};
      const userSettingsExpected = {
        unitMeasurement: {
          unitMeasurementId: 0,
        },
      };

      userSettings = initializeUserSettings(userSettings);

      expect(userSettings).toStrictEqual(userSettingsExpected);
    });

    it('should return a default user settings object when null paramter is sent', () => {
      let userSettings = {};
      const userSettingsExpected = {
        unitMeasurement: {
          unitMeasurementId: 0,
        },
      };

      userSettings = initializeUserSettings(userSettings);

      expect(userSettings).toStrictEqual(userSettingsExpected);
    });

    it('should not modify notification preference data when no notification preference id is on the catalog', () => {
      let userSettings = {
        notificationPreferences: [
          {
            notificationPreferenceId: 1,
            notificationPreferenceType: null,
            emailEnabled: null,
            smsEnabled: null,
          },
        ],
      };
      const notificationPreferencesExpected = [
        {
          notificationPreferenceId: 1,
          notificationPreferenceType: null,
          emailEnabled: null,
          smsEnabled: null,
        },
      ];
      userSettings = initializeUserSettings(userSettings);

      expect(userSettings.notificationPreferences).toStrictEqual(
        notificationPreferencesExpected
      );
    });

    it('should not modify email notification preference data when it is filled', () => {
      let userSettings = {
        notificationPreferences: [
          {
            notificationPreferenceId: 1,
            notificationPreferenceType: {
              notificationPreferenceTypeId: 1,
              name: 'New Work Item',
            },
            emailEnabled: false,
            smsEnabled: null,
          },
        ],
      };
      const emailEnabledExpected = false;

      userSettings = initializeUserSettings(userSettings);

      expect(
        userSettings.notificationPreferences[0].emailEnabled
      ).toStrictEqual(emailEnabledExpected);
    });

    it('should not modify sms notification preference data when it is filled', () => {
      let userSettings = {
        notificationPreferences: [
          {
            notificationPreferenceId: 1,
            notificationPreferenceType: {
              notificationPreferenceTypeId: 1,
              name: 'New Work Item',
            },
            emailEnabled: null,
            smsEnabled: false,
          },
        ],
      };
      const smsEnabledExpected = false;

      userSettings = initializeUserSettings(userSettings);

      expect(userSettings.notificationPreferences[0].smsEnabled).toStrictEqual(
        smsEnabledExpected
      );
    });

    it('should user notification preferences return with default values', () => {
      let userSettings = { ...userSettingsNoDataFilled };
      const notificationPreferencesExpected = [
        {
          notificationPreferenceId: 1,
          notificationPreferenceType: {
            notificationPreferenceTypeId: 1,
            name: 'New Work Item',
          },
          emailEnabled: true,
          smsEnabled: false,
        },
        {
          notificationPreferenceId: 2,
          notificationPreferenceType: {
            notificationPreferenceTypeId: 2,
            name: 'Faulted',
          },
          emailEnabled: true,
          smsEnabled: true,
        },
        {
          notificationPreferenceId: 3,
          notificationPreferenceType: {
            notificationPreferenceTypeId: 3,
            name: 'Maintenance Mode Initiated',
          },
          emailEnabled: true,
          smsEnabled: false,
        },
        {
          notificationPreferenceId: 4,
          notificationPreferenceType: {
            notificationPreferenceTypeId: 4,
            name: 'Maintenance Mode Cleared',
          },
          emailEnabled: true,
          smsEnabled: false,
        },
        {
          notificationPreferenceId: 5,
          notificationPreferenceType: {
            notificationPreferenceTypeId: 5,
            name: 'New Device at Site',
          },
          emailEnabled: true,
          smsEnabled: false,
        },
        {
          notificationPreferenceId: 6,
          notificationPreferenceType: {
            notificationPreferenceTypeId: 6,
            name: 'Device Offline',
          },
          emailEnabled: true,
          smsEnabled: false,
        },
        {
          notificationPreferenceId: 7,
          notificationPreferenceType: {
            notificationPreferenceTypeId: 7,
            name: 'Device Removed From Site',
          },
          emailEnabled: true,
          smsEnabled: false,
        },
      ];

      userSettings = initializeUserSettings(userSettings);

      expect(userSettings.notificationPreferences).toStrictEqual(
        notificationPreferencesExpected
      );
    });
  });
});
