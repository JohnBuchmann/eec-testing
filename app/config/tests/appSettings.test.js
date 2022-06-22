import {
  SiteDetailsCatalog,
  PermissionsList,
  TypeValidation,
  rolesAccess,
  UserSettingsAccess,
} from 'Utils/enums/roles';
import {
  getAllowLiveSiteWriteBack,
  getConfigPermissions,
  validatePermission,
} from '../appSettings';
import { AllowLiveSiteWriteBack } from '../permissions/allowLiveSiteWriteback';

describe('appSettings', () => {
  describe('#getAllowLiveSiteWriteBack', () => {
    it('should call function getAllowLiveSiteWriteBack and return value from variable allowLiveSiteWriteback with "true"', () => {
      const mockData = {
        allowLiveSiteWriteback: 'true',
      };
      const expected = true;
      const actual = getAllowLiveSiteWriteBack(mockData);
      expect(actual).toEqual(expected);
    });

    it('should call function getAllowLiveSiteWriteBack and return "null"', () => {
      const mockData = {
        testVariable: 'true',
      };
      const expected = null;
      const actual = getAllowLiveSiteWriteBack(mockData);
      expect(actual).toEqual(expected);
    });
  });

  describe('#getConfigPermissions', () => {
    it('should call function getConfigPermissions and return permissions from role and config variable allowLiveSiteWriteback', () => {
      const mockData = true;
      const actual = getConfigPermissions(mockData, rolesAccess.EnergyEngineer);
      const expected = {
        live: AllowLiveSiteWriteBack.hasWritePermissions.Live.EnergyEngineer,
        emulated:
          AllowLiveSiteWriteBack.hasWritePermissions.Emulated.EnergyEngineer,
      };
      expect(actual).toEqual(expected);
    });
  });

  describe('#validatePermission', () => {
    it('should call function validatePermission and return permission "true"', () => {
      const expected = true;
      const permissions = {
        live: AllowLiveSiteWriteBack.hasWritePermissions.Live.EnergyEngineer,
        emulated:
          AllowLiveSiteWriteBack.hasWritePermissions.Emulated.EnergyEngineer,
      };
      const isSiteLive = true;
      const section = PermissionsList.SiteDetails;
      const type = TypeValidation.Edit;
      const action = SiteDetailsCatalog.BusBand;
      const params = {
        permissions,
        isSiteLive,
        section,
        type,
        action,
        siteAccount: '',
      };
      const actual = validatePermission(params);
      expect(actual).toEqual(expected);
    });

    it('should call function validatePermission and return permission "false"', () => {
      const expected = false;
      const permissions = {
        live: AllowLiveSiteWriteBack.hasWritePermissions.Live.EnergyEngineer,
        emulated:
          AllowLiveSiteWriteBack.hasWritePermissions.Emulated.EnergyEngineer,
      };
      const isSiteLive = true;
      const section = PermissionsList.UserSettings;
      const type = TypeValidation.Edit;
      const action = UserSettingsAccess.Notifications;
      const actual = validatePermission(
        permissions,
        isSiteLive,
        section,
        type,
        action
      );
      expect(actual).toEqual(expected);
    });
  });
});
