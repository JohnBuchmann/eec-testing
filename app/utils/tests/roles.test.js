import { userLogin, userPermissions } from 'Internals/mocks/userLogin';
import { rolesAccess, rolesNames } from 'Utils/enums/roles';
import {
  getPermissions,
  getSiteDashboardTabs,
  getSiteDetailsTabs,
  isCustomerRole,
  isFaithAccount,
  userTypeFaith,
  validateIcianPrincipal,
  getRoleNamesByRolesAccess,
} from 'Utils/roles';

const siteDetailsmock = [
  {
    key: 1,
    title: 'Overview',
  },
  {
    key: 2,
    title: 'Devices',
  },
  {
    key: 3,
    title: 'Site Test',
  },
];

const siteDashboardTabs = [
  {
    key: 1,
    title: 'My Sites',
  },
  {
    key: 2,
    title: 'All',
  },
];

describe('roles', () => {
  describe('#getSiteDetailsTabs', () => {
    it('should function getSiteDetailsTabs return validate for rol tabs', () => {
      const expected = siteDetailsmock;
      const actual = getSiteDetailsTabs(userPermissions.live, siteDetailsmock);
      expect(expected).not.toEqual(actual);
    });

    it('should function getSiteDetailsTabs return array empty', () => {
      const expected = [];
      const actual = getSiteDetailsTabs({}, []);
      expect(actual).toEqual(expected);
    });
  });
  describe('#getSiteDashboardTabs', () => {
    it('should function getSiteDashboardTabs return validate for rol tabs', () => {
      const expected = siteDashboardTabs;
      const actual = getSiteDashboardTabs(userPermissions, siteDashboardTabs);
      expect(expected).not.toEqual(actual);
    });
    it('should function getSiteDashboardTabs return array empty', () => {
      const expected = [];
      const actual = getSiteDashboardTabs({}, []);
      expect(actual).toEqual(expected);
    });
  });
  describe('#getPermissions', () => {
    it('should function getPermissions return permission "Energy_Engineer" ', () => {
      const expected = 'DCentriQ_Energy_Engineer';
      const actual = getPermissions(userLogin);
      expect(expected).toEqual(actual.name);
    });
    it('should function getPermissions return object empty', () => {
      const expected = {};
      const actual = getPermissions({});
      expect(actual).toEqual(expected);
    });
    it('should function getPermissions return object empty when input roles array empty', () => {
      const expected = {};
      const mockData = { roles: [] };
      const actual = getPermissions(mockData);
      expect(actual).toEqual(expected);
    });
    it('should function getPermissions return permission "DCentriQ_ICIAN"', () => {
      const expected = 'DCentriQ_ICIAN';
      const mockUserLogin = {
        ...userLogin,
        roles: ['Fake_Role', 'DCentriQ_Energy_Engineer', 'DCentriQ_ICIAN'],
      };
      const actual = getPermissions(mockUserLogin);
      expect(expected).toEqual(actual.name);
    });
  });

  describe('#validateIcianPrincipal', () => {
    it('should function validateIcianPrincipal return "false"', () => {
      const userMock = {
        email: 'user@anexinet.com',
      };
      const siteMock = {
        externalIcianId: 'ben.netzel@faithtechnologies.com',
      };
      const expected = false;
      const actual = validateIcianPrincipal(userMock, siteMock);
      expect(actual).toEqual(expected);
    });
    it('should function validateIcianPrincipal return "true"', () => {
      const userMock = {
        email: 'user@anexinet.com',
      };
      const siteMock = {
        externalIcianId: 'user@anexinet.com',
      };
      const expected = true;
      const actual = validateIcianPrincipal(userMock, siteMock);
      expect(actual).toEqual(expected);
    });
  });

  describe('#validate secondary Ician', () => {
    it('should function validateIcianPrincipal return "false"', () => {
      const userMock = {
        email: 'user@anexinet.com',
      };
      const siteMock = {
        secondaryIcianId: 'ben.netzel@faithtechnologies.com',
      };
      const expected = false;
      const actual = validateIcianPrincipal(userMock, siteMock);
      expect(actual).toEqual(expected);
    });
    it('should function validateIcianPrincipal return "true"', () => {
      const userMock = {
        email: 'user@anexinet.com',
      };
      const siteMock = {
        secondaryIcianId: 'user@anexinet.com',
      };
      const expected = true;
      const actual = validateIcianPrincipal(userMock, siteMock);
      expect(actual).toEqual(expected);
    });
  });

  describe('#isFaithAccount', () => {
    it('should return true when the email domain contains faith', () => {
      const userMock = {
        sessionType: userTypeFaith,
      };
      const expected = true;
      const actual = isFaithAccount(userMock);
      expect(actual).toEqual(expected);
    });
  });

  it('should validate the customer role and return true', () => {
    const userPermissionMock = {
      permission: {
        name: 'DCentriQ_Other_Customers',
      },
    };
    const actual = isCustomerRole(userPermissionMock.permission);
    const expected = true;
    expect(actual).toEqual(expected);
  });
  it('should validate the customer role using ICIAN role and return false', () => {
    const userPermissionMock = {
      permission: {
        name: 'DCentriQ_ICIAN',
      },
    };
    const actual = isCustomerRole(userPermissionMock.permission);
    const expected = false;
    expect(actual).toEqual(expected);
  });

  describe('#getRoleNamesByRolesAccess', () => {
    it('should call function getRoleNamesByRolesAccess and return Energy Engineer and ICIAN roles name', () => {
      const roleAccessMock = [rolesAccess.EnergyEngineer, rolesAccess.ICIAN];
      const actual = getRoleNamesByRolesAccess(
        roleAccessMock,
        rolesAccess.EnergyEngineer
      );
      const expected = `<b>${rolesNames.DCentriQ_Energy_Engineer}</b>, ${
        rolesNames.DCentriQ_ICIAN
      }`;
      expect(actual).toEqual(expected);
    });

    it('should call function getRoleNamesByRolesAccess and return empty string', () => {
      const roleAccessMock = [];
      const actual = getRoleNamesByRolesAccess(
        roleAccessMock,
        rolesAccess.EnergyEngineer
      );
      const expected = '';
      expect(actual).toEqual(expected);
    });
  });
});
