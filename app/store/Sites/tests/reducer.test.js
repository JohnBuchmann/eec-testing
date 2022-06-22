import siteInformationMock from 'Internals/mocks/siteInformationMock';
import { busBandEditingStatus } from 'Utils/busband';
import { DeviceListTypeId } from 'Utils/enums/device';
import { SiteEventType } from 'Utils/enums/siteEvent';
import { firstElement } from 'Utils/propertyValidation';
import {
  deleteUserPermissions,
  fetchSitesFail,
  fetchSitesStart,
  postBusBandStatusSet,
  setCACertificate,
  setCompaniesSites,
  setCradlePointRouterId,
  setOktaUsers,
  setSiteAuditLog,
  setSiteAuditLogFilters,
  setSiteBusBand,
  setSiteDetails,
  setSiteEvent,
  setSiteEventFilters,
  setSiteFiltersByStatus,
  setSiteFiltersByText,
  setSiteFiltersByEmulatedSites,
  setSites,
  setSiteTelemetry,
  setSiteType,
  setTariffStructure,
  setTimeZone,
  setTimeZones,
  setUsersPermissions,
  updateBusBandTabsDisabled,
  setUsernamePassword,
} from '../actions';
import sitesReducer, { formatBusBandData } from '../reducer';

const defaultState = {
  timeZones: [],
  oktaUsers: [],
  usersPermissions: {},
  allSites: [],
  icianUsers: [],
  loading: false,
  filters: {
    text: '',
    status: [],
    customer: [],
    area: [],
    location: [],
    isAreaDropwonDisabled: true,
    isLocationDropwonDisabled: true,
    assignedUser: '',
    showEmulatedSites: false,
  },
  site: {
    location: {
      customer: {
        primaryContact: {},
      },
      address: {},
    },
    name: '',
    siteId: '',
    address: {},
    timeZone: { country: '', name: '', timeZoneId: 0 },
    type: '',
    siteType: {
      siteTypeId: 0,
      name: '',
    },
    plcId: '',
    password: '',
    caCertificate: {
      url: '',
    },
    tariffStructure: {},
    busBand: {
      configuration: {},
      formattedConfiguration: {},
      lastPointsUpdated: {},
      editionAvailable: {
        message: '',
        status: null,
      },
    },
    events: [],
    overview: null,
    eventsFilters: {
      eventTypeId: SiteEventType.AllEvents,
      deviceId: 0,
      groupId: DeviceListTypeId.All,
    },
    auditLogs: {
      date: null,
      siteId: 0,
      page: 0,
      totalResults: 0,
      results: [],
    },
    auditLogsFilters: { text: '' },
    busbandStateId: null,
    userEditingBusband: null,
    routerId: '',
  },
  companiesSites: [],
  busBandTabsDisabled: false,
};

describe('Sites Reducer', () => {
  it('returns initial state', () => {
    let dataUndefined;
    expect(sitesReducer(dataUndefined, {})).toEqual(defaultState);
  });

  describe('Sites Filters', () => {
    describe('Text filters', () => {
      it('Should set text filters with value when setSiteFiltersByText action is dispatched with value', () => {
        const filterText = 'Testing';
        const expected = {
          ...defaultState,
          filters: { ...defaultState.filters, text: filterText },
        };
        const actual = sitesReducer(
          defaultState,
          setSiteFiltersByText(filterText)
        );

        expect(actual).toEqual(expected);
      });
    });
    describe('Status filters', () => {
      it('Should set text filters with value when setSiteFiltersByStatus action is dispatched with value', () => {
        const filterStatus = [{ text: 'Maintenance', value: 1 }];
        const expected = {
          ...defaultState,
          filters: { ...defaultState.filters, status: filterStatus },
        };
        const actual = sitesReducer(
          defaultState,
          setSiteFiltersByStatus(filterStatus)
        );

        expect(actual).toEqual(expected);
      });
    });
    describe('Emulated Sites', () => {
      it('Should set showEmulated Sites filters with value when setSiteFiltersByEmulatedSites action is dispatched with value', () => {
        const showEmulatedSites = true;
        const expected = {
          ...defaultState,
          filters: { ...defaultState.filters, showEmulatedSites },
        };
        const actual = sitesReducer(
          defaultState,
          setSiteFiltersByEmulatedSites(showEmulatedSites)
        );

        expect(actual).toEqual(expected);
      });
    });
  });

  describe('Sites', () => {
    it('Should dispatch fetchSitesStart action', () => {
      const expected = {
        ...defaultState,
        loading: true,
      };
      const actual = sitesReducer(defaultState, fetchSitesStart());

      expect(actual).toEqual(expected);
    });

    it('Should dispatch fetchSitesFail action', () => {
      const expected = {
        ...defaultState,
        loading: false,
      };
      const actual = sitesReducer(defaultState, fetchSitesFail());

      expect(actual).toEqual(expected);
    });

    it('Should set sites data when setSites action is dispatched', () => {
      const sitesMock = [
        {
          siteId: 1,
          externalId: '25251sdsdSD111',
          name: 'Bad River',
          plcId: 'BADRIVER',
          icianName: 'Elvin Jones',
          latitude: '9.1231231231',
          longitude: '34.232323232',
          companyName: 'Atlantida Inc.',
          locationName: 'Atlantida Inc.',
          areaName: 'East',
        },
        {
          siteId: 2,
          externalId: '9999sdsdSD111',
          name: 'Bad River',
          plcId: 'BADRIVER',
          icianName: 'Elvin Jones',
          latitude: '18.1231231',
          longitude: '4.232323232',
          companyName: 'Atlantida Inc.',
          locationName: 'Atlantida Inc.',
          areaName: 'East',
        },
      ];
      const expected = {
        ...defaultState,
        allSites: sitesMock,
      };
      const actual = sitesReducer(defaultState, setSites(sitesMock));

      expect(actual).toEqual(expected);
    });
  });

  describe('Site Detail', () => {
    it('Should set site detail data when setSiteDetails action is dispatched', () => {
      const expected = {
        ...defaultState,
        site: {
          ...siteInformationMock,
          events: defaultState.site.events,
          eventsFilters: defaultState.site.eventsFilters,
          overview: defaultState.site.overview,
          auditLogs: defaultState.site.auditLogs,
          auditLogsFilters: defaultState.site.auditLogsFilters,
          busBand: defaultState.site.busBand,
        },
      };

      const actual = sitesReducer(
        defaultState,
        setSiteDetails(siteInformationMock)
      );

      expect(actual).toEqual(expected);
    });

    it('Should set site overview when setSiteOverview action is dispatched', () => {
      const overview = {};

      const initialState = {
        ...defaultState,
        site: {
          ...siteInformationMock,
          overview,
        },
      };
      const result = sitesReducer(initialState, setSiteTelemetry(overview));

      const actual = result.site.overview;
      const expected = initialState.site.overview;

      expect(actual).toEqual(expected);
    });

    it('Should set site overview when setSiteBusBand action is dispatched', () => {
      const busBand = [];

      const initialState = {
        ...defaultState,
        site: {
          ...siteInformationMock,
          busBand,
        },
      };
      const result = sitesReducer(initialState, setSiteBusBand(busBand));

      const { formattedConfiguration = {} } = result.site.busBand || {};

      const actual = formattedConfiguration.busBandConfiguration;
      const expected = initialState.site.busBand;

      expect(actual).toEqual(expected);
    });
    it('Should set site overview when setSiteAuditLog action is dispatched', () => {
      const auditLogs = {
        date: null,
        siteId: 0,
        page: 0,
        totalResults: 0,
        results: [],
      };

      const initialState = {
        ...defaultState,
        site: {
          ...siteInformationMock,
          auditLogs,
        },
      };
      const result = sitesReducer(initialState, setSiteAuditLog(auditLogs));

      const actual = result.site.auditLogs;
      const expected = initialState.site.auditLogs;

      expect(actual).toEqual(expected);
    });
    it('Should set site overview when setSiteAuditLogFilters action is dispatched', () => {
      const auditLogFilters = { text: 'Filter' };

      const initialState = {
        ...defaultState,
        site: {
          ...siteInformationMock,
          auditLogFilters,
        },
      };
      const result = sitesReducer(
        initialState,
        setSiteAuditLogFilters(auditLogFilters)
      );

      const actual = result.site.auditLogFilters;
      const expected = initialState.site.auditLogFilters;

      expect(actual).toEqual(expected);
    });
  });

  describe('Site Events', () => {
    it('Should set site detail data when setSiteEvent action is dispatched', () => {
      const siteEventsMock = [
        {
          name: 'Warning',
          events: [
            {
              siteId: 1,
              deviceGroupId: 1,
              deviceId: 1,
              deviceName: 'BATT1',
              title: 'Warning BATT1',
              description:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.',
              eventDateTime: '2020-12-03T12:54:28.555391',
            },
          ],
        },
      ];
      const expectedSiteEvents = [
        {
          siteId: 1,
          deviceGroupId: 1,
          deviceId: 1,
          deviceName: 'BATT1',
          title: 'Warning BATT1',
          description:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.',
          eventDateTime: '2020-12-03T12:54:28.555391',
          eventTypeId: 'Warning',
        },
      ];
      const spy = jest.spyOn(console, 'log');
      const expected = {
        ...defaultState,
        site: { ...defaultState.site, events: expectedSiteEvents },
      };
      const actual = sitesReducer(defaultState, setSiteEvent(siteEventsMock));

      expect(actual).toEqual(expected);

      const expectedLog = 'formatSiteEvents';
      expect(spy).toHaveBeenLastCalledWith(expectedLog);
    });
    it('should apply the events filters', () => {
      // SET_SITE_EVENT_FILTERS
      const filters = { eventTypeId: 'Warning', deviceId: 0, groupId: 'ALL' };

      const expected = {
        ...defaultState,
        site: { ...defaultState.site, eventsFilters: filters },
      };

      const actual = sitesReducer(defaultState, setSiteEventFilters(filters));

      expect(actual).toEqual(expected);
    });
  });

  describe('Site settings site type change', () => {
    it('', () => {
      const mockData = {
        password: 'Y2x4MGFEYTBIcUo4Qk',
        plcId: 'test-sandbox-link',
      };
      const expected = {
        ...defaultState,
        site: {
          ...defaultState.site,
          password: mockData.password,
          plcId: mockData.plcId,
        },
      };
      const actual = sitesReducer(defaultState, setUsernamePassword(mockData));

      expect(actual).toEqual(expected);
    });
    it('Should set selected site type when setSiteType action is dispatched', () => {
      const siteTypeMock = {
        password: '',
        plcId: '',
      };
      const selectedSiteTypeId = 2;
      const selectedSiteTypeName = 'Xcape';
      const expected = {
        ...defaultState,
        site: {
          ...defaultState.site,
          password: '',
          plcId: '',
          siteType: {
            siteTypeId: 2,
            name: 'Xcape',
          },
        },
      };
      const actual = sitesReducer(
        defaultState,
        setSiteType(siteTypeMock, selectedSiteTypeId, selectedSiteTypeName)
      );

      expect(actual).toEqual(expected);
    });
  });

  describe('Site settings download CA certificate', () => {
    it('should set routerId when setCradlePointRouterId action is dispatched', () => {
      const routerIdMock = '5555555';
      const expected = {
        ...defaultState,
        site: {
          ...defaultState.site,
          routerId: routerIdMock,
        },
      };
      const actual = sitesReducer(
        defaultState,
        setCradlePointRouterId(routerIdMock)
      );

      expect(actual).toEqual(expected);
    });
    it('Should set CA certificate when setCACertificate action is dispatched', () => {
      const siteAuthenticationMock = {
        caCertificate: {
          url: 'https://www.temporaryurl.com/ca.pem?key=348sd87s8y8y3482y4',
        },
      };
      const expected = {
        ...defaultState,
        site: { ...defaultState.site, caCertificate: {} },
      };
      const actual = sitesReducer(
        defaultState,
        setCACertificate(siteAuthenticationMock)
      );

      expect(actual).toEqual(expected);
    });
  });

  describe('Site Permissions', () => {
    it('should set okta users when  setOktaUsers action is dispatched', () => {
      const userPermissionsState = {
        ...defaultState,
        usersPermissions: {
          isPermissioned: true,
          users: [
            {
              userId: 1,
              userName: 'Ben Hur',
              isEditable: false,
              externalId: 'ben.huer@noemail.com',
            },
          ],
        },
      };
      const oktaUsersMock = [
        {
          id: '00uhsdy',
          profile: {
            email: 'test@email.com',
          },
        },
        {
          id: '11yosll3',
          profile: {
            email: 'another@email.com',
          },
        },
      ];
      const expected = {
        ...userPermissionsState,
        oktaUsers: oktaUsersMock,
      };
      const actual = sitesReducer(
        userPermissionsState,
        setOktaUsers(oktaUsersMock)
      );

      expect(actual).toEqual(expected);
    });

    it('should set users permissions when  setUsersPermissions action is dispatched', () => {
      const usersPermissionsMock = {
        isPermissioned: true,
        users: [
          {
            userId: 1,
            userName: 'Ben Hur',
            isEditable: false,
            externalId: 'ben.huer@noemail.com',
          },
        ],
      };
      const expected = {
        ...defaultState,
        usersPermissions: usersPermissionsMock,
      };
      const actual = sitesReducer(
        defaultState,
        setUsersPermissions(usersPermissionsMock)
      );

      expect(actual).toEqual(expected);
    });

    it('should set time zone when  setTimeZone action is dispatched', () => {
      const timezoneMock = {
        country: 'US',
        name: 'America/Adak',
        timeZoneId: 1,
      };

      const expected = {
        ...defaultState,
        site: {
          ...defaultState.site,
          timeZone: timezoneMock,
        },
      };
      const actual = sitesReducer(defaultState, setTimeZone(timezoneMock));

      expect(actual).toEqual(expected);
    });

    it('should set time zones when  setTimeZones action is dispatched', () => {
      const timezonesExpected = [
        {
          country: 'US',
          name: 'America/Adak',
          timeZoneId: 1,
          text: 'America/Adak',
          value: 1,
        },
        {
          country: 'US',
          name: 'America/Anchorage',
          timeZoneId: 2,
          text: 'America/Anchorage',
          value: 2,
        },
        {
          country: 'US',
          name: 'America/Akta',
          timeZoneId: 3,
          text: 'America/Akta',
          value: 3,
        },
      ];
      const timezonesMock = [
        {
          country: 'US',
          name: 'America/Adak',
          timeZoneId: 1,
        },
        {
          country: 'US',
          name: 'America/Anchorage',
          timeZoneId: 2,
        },
        {
          country: 'US',
          name: 'America/Akta',
          timeZoneId: 3,
        },
      ];

      const expected = {
        ...defaultState,
        timeZones: timezonesExpected,
      };
      const actual = sitesReducer(defaultState, setTimeZones(timezonesMock));

      expect(actual).toEqual(expected);
    });

    it('should delete user from users permissions when  deleteUserPermissions action is dispatched', () => {
      const deleteId = 1;
      const usersPermissionsMock = {
        isPermissioned: true,
        users: [
          {
            userId: 1,
            userName: 'Ben Hur',
            isEditable: false,
            externalId: 'ben.huer@noemail.com',
          },
        ],
      };
      const usersPermissionsState = {
        ...defaultState,
        usersPermissions: {
          isPermissioned: true,
          users: [
            {
              userId: 1,
              userName: 'Ben Hur',
              isEditable: false,
              externalId: 'ben.huer@noemail.com',
            },
            {
              userId: 2,
              userName: 'Van Halen',
              isEditable: true,
              externalId: 'van.halen@noemail.com',
            },
          ],
        },
      };
      const expected = {
        ...defaultState,
        usersPermissions: usersPermissionsMock,
      };
      const actual = sitesReducer(
        usersPermissionsState,
        deleteUserPermissions(deleteId)
      );

      expect(actual).not.toEqual(expected);
    });
  });
  describe('Site Admin Tariff Structure', () => {
    it('should set tarifff structure when  setTariffStructure action is dispatched', () => {
      const mockData = {
        id: 1,
        utility: 'utility to update',
        tariffStructure: 'tariff structure',
      };
      const expected = {
        ...defaultState,
        site: {
          ...defaultState.site,
          tariffStructure: mockData,
        },
      };
      const actual = sitesReducer(defaultState, setTariffStructure(mockData));

      expect(actual).toEqual(expected);
    });
  });

  describe('Site BusBand', () => {
    it('should test formatBusBandData to get total points in array format based on mockdata', () => {
      const busBandMock = {
        name: 'BusBand',
        id: 344,
        group: [
          {
            name: 'PeakDemand',
            label: 'Peak Demand',
            points: [
              {
                id: 1,
                name: 'PV_SP',
                label: 'PV Setpoint',
                value: '830',
              },
              {
                id: 2,
                name: 'Wind_SP',
                label: 'Wind Setpoint',
                value: '810',
              },
            ],
          },
        ],
        points: [
          {
            id: 23,
            name: 'ActiveConfiguration',
            value: '1',
          },
        ],
      };

      // Get expected length of points inside the first group base on the busBandMock variable.
      const expected = firstElement(busBandMock.group).points.length;

      const formattedConfiguration = formatBusBandData(busBandMock);
      const { busBandConfiguration } = formattedConfiguration;
      const actual = busBandConfiguration.length;
      expect(actual).toEqual(expected);
    });

    it('should update state from busband tabs disabled', () => {
      const mockState = true;
      const expected = {
        ...defaultState,
        busBandTabsDisabled: mockState,
      };
      const actual = sitesReducer(
        defaultState,
        updateBusBandTabsDisabled(mockState)
      );
      expect(actual).toEqual(expected);
    });
  });

  it('should set into store bus band status ', () => {
    const busbandStatusMock = {
      status: busBandEditingStatus.Available,
      userEditingBusband: '',
    };

    const expected = {
      ...defaultState,
      site: {
        ...defaultState.site,
        busBand: {
          ...defaultState.site.busBand,
          editionAvailable: {
            status: busBandEditingStatus.Available,
            message: '',
          },
        },
      },
    };

    const actual = sitesReducer(
      defaultState,
      postBusBandStatusSet(busbandStatusMock)
    );
    expect(actual).toEqual(expected);
  });

  describe('Companies Sites', () => {
    it('should set companies sites array when input mockData', () => {
      const mockData = [
        {
          companyName: 'Acuity A Mutual Insurance Co',
          sites: [
            {
              siteId: 300,
              externalId: 'harry.ayers@faithtechnologies.com',
              name: 'Tom and Tony Test',
            },
          ],
        },
        {
          companyName: 'SIT Company 1',
          sites: [
            {
              siteId: 301,
              externalId: 'joel.hopper@faithtechnologies.com',
              name: 'Dog House',
            },
          ],
        },
      ];
      const expected = {
        ...defaultState,
        companiesSites: mockData,
      };
      const actual = sitesReducer(defaultState, setCompaniesSites(mockData));

      expect(actual).toEqual(expected);
    });
  });
});
