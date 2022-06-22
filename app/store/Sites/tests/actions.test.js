import {
  cleanAuditLogFilters,
  deleteUserPermissions,
  deleteUserPermissionsFail,
  deleteUserPermissionsStart,
  fetchCACertificateFail,
  fetchCACertificateStart,
  fetchCompaniesSitesFail,
  fetchCompaniesSitesStart,
  fetchNewResultsToAuditLog,
  fetchOktaUsersFail,
  fetchOktaUsersStart,
  fetchSiteAuditLogFail,
  fetchSiteBusBand,
  fetchSiteBusBandFail,
  fetchSiteDetailsFail,
  fetchSiteEventsFail,
  fetchSitesFail,
  fetchSitesStart,
  fetchSiteTelemetryFail,
  fetchSiteTypeStart,
  fetchTariffStructureFail,
  fetchTariffStructureStart,
  fetchTimeZonesFail,
  fetchTimeZonesStart,
  fetchUsersPermissionsFail,
  fetchUsersPermissionsStart,
  patchBusBandPointsFail,
  patchBusBandPointsSuccess,
  postBusBandStatusFail,
  postBusBandStatusSet,
  postBusBandStatusStart,
  setCACertificate,
  setCompaniesSites,
  setCradlePointRouterId,
  setCradlePointRouterIdFail,
  setCradlePointRouterIdStart,
  setOktaUsers,
  setSiteAuditLog,
  setSiteAuditLogFilters,
  setSiteBusBand,
  setSiteDetails,
  setSiteEvent,
  setSiteFiltersByAssignedUser,
  setSiteFiltersByStatus,
  setSiteFiltersByText,
  setSiteFiltersByEmulatedSites,
  setSites,
  setSitesIcianUsers,
  setSiteTelemetry,
  setSiteType,
  setSiteTypeFail,
  setTariffStructure,
  setTariffStructureFail,
  setTariffStructureStart,
  setTimeZone,
  setTimeZoneFail,
  setTimeZones,
  setTimeZoneStart,
  setUsersPermissions,
  updateBusBandTabsDisabled,
  setUsernamePassword,
  setEdgeDataTimeout,
  setEdgeDataTimeoutFail,
  setEdgeDataTimeoutStart,
} from '../actions';
import {
  CLEAN_SITE_AUDIT_LOG_FILTERS,
  DELETE_USER_PERMISSIONS,
  DELETE_USER_PERMISSIONS_FAIL,
  DELETE_USER_PERMISSIONS_START,
  FETCH_CA_CERTIFICATE,
  FETCH_CA_CERTIFICATE_FAIL,
  FETCH_COMPANIES_SITES_FAIL,
  FETCH_COMPANIES_SITES_START,
  FETCH_OKTA_USERS_FAIL,
  FETCH_OKTA_USERS_START,
  FETCH_SITES_FAIL,
  FETCH_SITES_START,
  FETCH_SITE_AUDIT_LOG_FAIL,
  FETCH_SITE_BUS_BAND,
  FETCH_SITE_BUS_BAND_FAIL,
  FETCH_SITE_DETAILS_FAIL,
  FETCH_SITE_EVENTS_FAIL,
  FETCH_SITE_TELEMETRY_FAIL,
  FETCH_SITE_TYPE_START,
  FETCH_TARIFF_STRUCTURE_FAIL,
  FETCH_TARIFF_STRUCTURE_START,
  FETCH_TIME_ZONES_FAIL,
  FETCH_TIME_ZONES_START,
  FETCH_USERS_PERMISSIONS_FAIL,
  FETCH_USERS_PERMISSIONS_START,
  PATCH_SITE_BUS_BAND_POINTS,
  PATCH_SITE_BUS_BAND_POINTS_FAIL,
  SET_BUS_BAND_STATUS,
  SET_BUS_BAND_STATUS_FAIL,
  SET_BUS_BAND_STATUS_START,
  SET_CA_CERTIFICATE,
  SET_COMPANIES_SITES,
  SET_CRADLE_POINT_ROUTER_ID,
  SET_CRADLE_POINT_ROUTER_ID_FAIL,
  SET_CRADLE_POINT_ROUTER_ID_START,
  SET_OKTA_USERS,
  SET_SITES,
  SET_SITES_FILTERS_ASSIGNED_USER,
  SET_SITES_FILTERS_STATUS,
  SET_SITES_FILTERS_TEXT,
  SET_SITES_FILTERS_EMULATED_SITES,
  SET_SITES_ICIAN_USERS,
  SET_SITE_AUDIT_LOG,
  SET_SITE_AUDIT_LOG_FILTERS,
  SET_SITE_AUDIT_LOG_MORE_RESULTS,
  SET_SITE_BUS_BAND,
  SET_SITE_DETAILS,
  SET_SITE_EVENTS,
  SET_SITE_TELEMETRY,
  SET_SITE_TYPE,
  SET_SITE_TYPE_FAIL,
  SET_TARIFF_STRUCTURE,
  SET_TARIFF_STRUCTURE_FAIL,
  SET_TARIFF_STRUCTURE_START,
  SET_TIME_ZONES,
  SET_TIME_ZONE_FAIL,
  SET_TIME_ZONE_START,
  SET_USERS_PERMISSIONS,
  UPDATE_BUS_BAND_TABS_DISABLED,
  UPDATE_TIME_ZONE,
  SET_SITE_USERNAME_PASSWORD,
  SET_EDGE_DATA_TIMEOUT,
  SET_EDGE_DATA_TIMEOUT_FAIL,
  SET_EDGE_DATA_TIMEOUT_START,
} from '../types';

describe('Site Actions', () => {
  it('should create an action to start fetch sites', () => {
    const expected = {
      type: FETCH_SITES_START,
    };
    const actual = fetchSitesStart();

    expect(actual).toEqual(expected);
  });

  it('should create an action when fail fetch sites', () => {
    const expected = {
      type: FETCH_SITES_FAIL,
    };
    const actual = fetchSitesFail();

    expect(actual).toEqual(expected);
  });

  it('should create an action to set sites', () => {
    const expected = {
      type: SET_SITES,
      payload: [],
    };
    const actual = setSites([]);

    expect(actual).toEqual(expected);
  });

  it('should create an action to set site filters by status', () => {
    const filterStatus = [{ text: 'Maintenance', value: 1 }];
    const expected = {
      type: SET_SITES_FILTERS_STATUS,
      payload: filterStatus,
    };
    const actual = setSiteFiltersByStatus(filterStatus);

    expect(actual).toEqual(expected);
  });

  it('should create an action to set Site Filters By Text', () => {
    const filterText = 'Testing';
    const expected = {
      type: SET_SITES_FILTERS_TEXT,
      payload: filterText,
    };
    const actual = setSiteFiltersByText(filterText);

    expect(actual).toEqual(expected);
  });

  it('should create an action to set Site Filters By assignedUser', () => {
    const assignedUser = 'Testing';
    const expected = {
      type: SET_SITES_FILTERS_ASSIGNED_USER,
      payload: assignedUser,
    };
    const actual = setSiteFiltersByAssignedUser(assignedUser);

    expect(actual).toEqual(expected);
  });

  it('should create an action to set Site Filters By showEmulatedSites', () => {
    const showEmulatedSites = true;
    const expected = {
      type: SET_SITES_FILTERS_EMULATED_SITES,
      payload: showEmulatedSites,
    };
    const actual = setSiteFiltersByEmulatedSites(showEmulatedSites);

    expect(actual).toEqual(expected);
  });
});

describe('Site Detail actions', () => {
  it('should create an action to set site detail', () => {
    const expected = {
      type: SET_SITE_DETAILS,
      payload: {},
    };
    const actual = setSiteDetails({});

    expect(actual).toEqual(expected);
  });

  it('should create an action to fetch site detail fail', () => {
    const expected = {
      type: FETCH_SITE_DETAILS_FAIL,
    };
    const actual = fetchSiteDetailsFail();

    expect(actual).toEqual(expected);
  });
});

describe('Site Event actions', () => {
  it('should create an action to set site events', () => {
    const expected = {
      type: SET_SITE_EVENTS,
      payload: [],
    };
    const actual = setSiteEvent([]);

    expect(actual).toEqual(expected);
  });
  it('should create an action to fetch site events fail', () => {
    const expected = {
      type: FETCH_SITE_EVENTS_FAIL,
    };
    const actual = fetchSiteEventsFail();

    expect(actual).toEqual(expected);
  });
});

describe('Site telemetry actions', () => {
  it('should create an action to set site telemetry', () => {
    const expected = {
      type: SET_SITE_TELEMETRY,
      payload: {},
    };
    const actual = setSiteTelemetry({});

    expect(actual).toEqual(expected);
  });
  it('should create an action to fetch site telemetry fail', () => {
    const expected = {
      type: FETCH_SITE_TELEMETRY_FAIL,
    };
    const actual = fetchSiteTelemetryFail();

    expect(actual).toEqual(expected);
  });
});

describe('Site ICIAN user actions', () => {
  it('should create an action to set site ICIAN users', () => {
    const expected = {
      type: SET_SITES_ICIAN_USERS,
      payload: {},
    };
    const actual = setSitesIcianUsers({});
    expect(actual).toEqual(expected);
  });
});

describe('Site BusBand Actions', () => {
  it('should create an action to start fetch bus band', () => {
    const expected = {
      type: FETCH_SITE_BUS_BAND,
    };
    const actual = fetchSiteBusBand();

    expect(actual).toEqual(expected);
  });

  it('should create an action when fail fetch site bus band fail', () => {
    const expected = {
      type: FETCH_SITE_BUS_BAND_FAIL,
    };
    const actual = fetchSiteBusBandFail();

    expect(actual).toEqual(expected);
  });

  it('should create an action to set site bus band', () => {
    const expected = {
      type: SET_SITE_BUS_BAND,
      payload: [],
    };
    const actual = setSiteBusBand([]);

    expect(actual).toEqual(expected);
  });

  it('should create an action when BusBand Patch Failed', () => {
    const expected = {
      type: PATCH_SITE_BUS_BAND_POINTS_FAIL,
    };
    const actual = patchBusBandPointsFail();

    expect(actual).toEqual(expected);
  });

  it('should create an action when BusBand Patch was success', () => {
    const expected = {
      type: PATCH_SITE_BUS_BAND_POINTS,
    };
    const actual = patchBusBandPointsSuccess();

    expect(actual).toEqual(expected);
  });

  it('should create an action to set site bus band status', () => {
    const expected = {
      type: SET_BUS_BAND_STATUS,
      payload: {},
    };
    const actual = postBusBandStatusSet({});

    expect(actual).toEqual(expected);
  });

  it('should create an action when post bus band status starts', () => {
    const expected = {
      type: SET_BUS_BAND_STATUS_START,
    };
    const actual = postBusBandStatusStart();

    expect(actual).toEqual(expected);
  });

  it('should create an action when bus band status fails', () => {
    const expected = {
      type: SET_BUS_BAND_STATUS_FAIL,
      payload: 'error',
    };
    const actual = postBusBandStatusFail({});

    expect(actual).toEqual(expected);
  });
});

describe('Site AuditLogs Actions', () => {
  it('should create an action when fail fetch auditLogs', () => {
    const expected = {
      type: FETCH_SITE_AUDIT_LOG_FAIL,
    };
    const actual = fetchSiteAuditLogFail();
    expect(actual).toEqual(expected);
  });
  it('should create an action when new logs are received', () => {
    const payload = [];
    const expected = {
      type: SET_SITE_AUDIT_LOG,
      payload,
    };
    const actual = setSiteAuditLog(payload);
    expect(actual).toEqual(expected);
  });
  it('should create an action when sets new filters to site audit log filters', () => {
    const filter = { text: 'test' };
    const expected = {
      type: SET_SITE_AUDIT_LOG_FILTERS,
      payload: filter,
    };
    const actual = setSiteAuditLogFilters(filter);
    expect(actual).toEqual(expected);
  });
  it('should create an action when new logs are received by fetchNewResultsToAuditLog', () => {
    const payload = [];
    const expected = {
      type: SET_SITE_AUDIT_LOG_MORE_RESULTS,
      payload,
    };
    const actual = fetchNewResultsToAuditLog(payload);
    expect(actual).toEqual(expected);
  });

  it('should call action cleanAuditLogFilters', () => {
    const expected = {
      type: CLEAN_SITE_AUDIT_LOG_FILTERS,
    };
    const actual = cleanAuditLogFilters();
    expect(actual).toEqual(expected);
  });
});

describe('Site settings change site type actions', () => {
  it('should create and action to set username and password', () => {
    const mockData = {
      password: 'Y2x4MGFEYTBIcUo4Qk',
      plcId: 'test-sandbox-link',
    };
    const expected = {
      type: SET_SITE_USERNAME_PASSWORD,
      payload: mockData,
    };
    const actual = setUsernamePassword(mockData);

    expect(actual).toEqual(expected);
  });

  it('should create an action to start change of site type', () => {
    const expected = {
      type: FETCH_SITE_TYPE_START,
    };
    const actual = fetchSiteTypeStart();

    expect(actual).toEqual(expected);
  });

  it('should create an action when fail the change of site type', () => {
    const expected = {
      type: SET_SITE_TYPE_FAIL,
    };
    const actual = setSiteTypeFail();

    expect(actual).toEqual(expected);
  });

  it('should create an action to set selected site type', () => {
    const expected = {
      type: SET_SITE_TYPE,
      payload: {},
    };
    const actual = setSiteType({});

    expect(actual).toEqual(expected);
  });
});

describe('Site Settings CA certificate actions', () => {
  it('should create an action to start fetch CA certificate', () => {
    const expected = {
      type: FETCH_CA_CERTIFICATE,
    };
    const actual = fetchCACertificateStart();

    expect(actual).toEqual(expected);
  });

  it('should create an action when fail fetch CA certificate', () => {
    const expected = {
      type: FETCH_CA_CERTIFICATE_FAIL,
    };
    const actual = fetchCACertificateFail();

    expect(actual).toEqual(expected);
  });

  it('should create an action to set CA certificate', () => {
    const expected = {
      type: SET_CA_CERTIFICATE,
      payload: {},
    };
    const actual = setCACertificate({});

    expect(actual).toEqual(expected);
  });
});

describe('Site permissions actions', () => {
  it('should create an action to start fetch okta users', () => {
    const expected = {
      type: FETCH_OKTA_USERS_START,
    };
    const actual = fetchOktaUsersStart();

    expect(actual).toEqual(expected);
  });

  it('should create an action to set okta users', () => {
    const mockData = {
      users: {
        id: '00uhsdy',
        profile: {
          email: 'test@email.com',
        },
      },
    };
    const expected = {
      type: SET_OKTA_USERS,
      payload: mockData,
    };
    const actual = setOktaUsers(mockData);

    expect(actual).toEqual(expected);
  });

  it('should create an action to fail fetch okta users', () => {
    const errorData = {
      error: 'There was an error sending request to fetch okta user.',
    };
    const expected = {
      type: FETCH_OKTA_USERS_FAIL,
      payload: errorData,
    };
    const actual = fetchOktaUsersFail(errorData);

    expect(actual).toEqual(expected);
  });

  it('should create an action to start fetch users permissions', () => {
    const expected = {
      type: FETCH_USERS_PERMISSIONS_START,
    };
    const actual = fetchUsersPermissionsStart();

    expect(actual).toEqual(expected);
  });

  it('should create an action to set users permissions', () => {
    const mockData = {
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
      type: SET_USERS_PERMISSIONS,
      payload: mockData,
    };
    const actual = setUsersPermissions(mockData);

    expect(actual).toEqual(expected);
  });

  it('should create an action to fail fetch users permissions', () => {
    const errorData = {
      error: 'There was an error sending request to set users permissions',
    };
    const expected = {
      type: FETCH_USERS_PERMISSIONS_FAIL,
      payload: errorData,
    };
    const actual = fetchUsersPermissionsFail(errorData);

    expect(actual).toEqual(expected);
  });

  it('should create an action to start set time zone', () => {
    const expected = {
      type: SET_TIME_ZONE_START,
    };
    const actual = setTimeZoneStart();

    expect(actual).toEqual(expected);
  });

  it('should create an action to set time zone', () => {
    const mockData = {
      country: 'US',
      name: 'America/Adak',
      timeZoneId: 1,
    };
    const expected = {
      type: UPDATE_TIME_ZONE,
      payload: mockData,
    };
    const actual = setTimeZone(mockData);

    expect(actual).toEqual(expected);
  });

  it('should create an action to fail set time zone', () => {
    const errorData = {
      error: 'There was an error sending request to set the time zone.',
    };
    const expected = {
      type: SET_TIME_ZONE_FAIL,
      payload: errorData,
    };
    const actual = setTimeZoneFail(errorData);

    expect(actual).toEqual(expected);
  });

  it('should create an action to start fetch time zones', () => {
    const expected = {
      type: FETCH_TIME_ZONES_START,
    };
    const actual = fetchTimeZonesStart();

    expect(actual).toEqual(expected);
  });

  it('should create an action to set time zones', () => {
    const mockData = [
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
      type: SET_TIME_ZONES,
      payload: mockData,
    };
    const actual = setTimeZones(mockData);

    expect(actual).toEqual(expected);
  });
});

describe('Site Admin Tariff Structure actions', () => {
  it('should create an action when start to fetch tariff structure', () => {
    const expected = {
      type: FETCH_TARIFF_STRUCTURE_START,
    };
    const actual = fetchTariffStructureStart();

    expect(actual).toEqual(expected);
  });

  it('should create an action when fail to fetch tariff structure', () => {
    const mockError = {
      error: 'warning',
    };
    const expected = {
      type: FETCH_TARIFF_STRUCTURE_FAIL,
      payload: mockError,
    };
    const actual = fetchTariffStructureFail(mockError);

    expect(actual).toEqual(expected);
  });

  it('should create an action when set tariff structure', () => {
    const mockData = {
      id: 1,
      utility: 'utility update x',
      tariffStructure: 'tariff structure',
    };
    const expected = {
      type: SET_TARIFF_STRUCTURE,
      payload: mockData,
    };
    const actual = setTariffStructure(mockData);

    expect(actual).toEqual(expected);
  });

  it('should create an action to fail fetch time zones', () => {
    const errorData = {
      error: 'There was an error sending request to set the time zone.',
    };
    const expected = {
      type: FETCH_TIME_ZONES_FAIL,
      payload: errorData,
    };
    const actual = fetchTimeZonesFail(errorData);

    expect(actual).toEqual(expected);
  });

  it('should create an action to start delete user permissions', () => {
    const expected = {
      type: DELETE_USER_PERMISSIONS_START,
    };
    const actual = deleteUserPermissionsStart();

    expect(actual).toEqual(expected);
  });

  it('should create an action to delete user permissions', () => {
    const mockData = 1;
    const expected = {
      type: DELETE_USER_PERMISSIONS,
      payload: mockData,
    };
    const actual = deleteUserPermissions(mockData);

    expect(actual).toEqual(expected);
  });
  it('should create an action when start to set tariff structure', () => {
    const expected = {
      type: SET_TARIFF_STRUCTURE_START,
    };
    const actual = setTariffStructureStart();

    expect(actual).toEqual(expected);
  });

  it('should create an action to fail delete user permissions', () => {
    const errorData = {
      error: 'There was an error sending request to delete user permissions.',
    };
    const expected = {
      type: DELETE_USER_PERMISSIONS_FAIL,
      payload: errorData,
    };
    const actual = deleteUserPermissionsFail(errorData);

    expect(actual).toEqual(expected);
  });
  it('should create an action when fail to set tariff structure', () => {
    const mockError = {
      error: 'warning',
    };
    const expected = {
      type: SET_TARIFF_STRUCTURE_FAIL,
      payload: mockError,
    };
    const actual = setTariffStructureFail(mockError);

    expect(actual).toEqual(expected);
  });
});

describe('Cradlepoints Actions', () => {
  it('should create an action when start to set cradlepoint', () => {
    const expected = {
      type: SET_CRADLE_POINT_ROUTER_ID_START,
    };
    const actual = setCradlePointRouterIdStart();

    expect(actual).toEqual(expected);
  });
  it('should create an action when set cradlepoint', () => {
    const mockData = '555555';
    const expected = {
      type: SET_CRADLE_POINT_ROUTER_ID,
      payload: mockData,
    };
    const actual = setCradlePointRouterId(mockData);

    expect(actual).toEqual(expected);
  });
  it('should create an action when fail to set cradlepoint', () => {
    const mockError = {
      error: 'There was an error sending request to set cradlepoint',
    };
    const expected = {
      type: SET_CRADLE_POINT_ROUTER_ID_FAIL,
      payload: mockError,
    };
    const actual = setCradlePointRouterIdFail(mockError);

    expect(actual).toEqual(expected);
  });
});

describe('Companies Sites Actions', () => {
  it('should create an action when start to fetch companies sites', () => {
    const expected = {
      type: FETCH_COMPANIES_SITES_START,
    };
    const actual = fetchCompaniesSitesStart();

    expect(actual).toEqual(expected);
  });

  it('should create an action when set companies sites', () => {
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
      type: SET_COMPANIES_SITES,
      payload: mockData,
    };
    const actual = setCompaniesSites(mockData);

    expect(actual).toEqual(expected);
  });

  it('should create an action when fail to fetch companies sites', () => {
    const mockError = {
      error: 'There was an error sending request to fetch companies sites',
    };
    const expected = {
      type: FETCH_COMPANIES_SITES_FAIL,
      payload: mockError,
    };
    const actual = fetchCompaniesSitesFail(mockError);

    expect(actual).toEqual(expected);
  });

  it('should create an action when update busband tabs disabled property', () => {
    const stateMock = true;
    const expected = {
      type: UPDATE_BUS_BAND_TABS_DISABLED,
      payload: stateMock,
    };
    const actual = updateBusBandTabsDisabled(stateMock);
    expect(actual).toEqual(expected);
  });
});

describe('Timeout actions', () => {
  const mockError = {
    error: 'There was an error involving edge data timeout',
  };
  it('should create an action when set edge data start', () => {
    const expected = {
      type: SET_EDGE_DATA_TIMEOUT_START,
    };
    const actual = setEdgeDataTimeoutStart();
    expect(actual).toEqual(expected);
  });

  it('should create an action when set edge data fail', () => {
    const expected = {
      type: SET_EDGE_DATA_TIMEOUT_FAIL,
      payload: mockError,
    };
    const actual = setEdgeDataTimeoutFail(mockError);
    expect(actual).toEqual(expected);
  });

  it('should create an action when set edge data', () => {
    const mockPayload = 4;
    const expected = {
      type: SET_EDGE_DATA_TIMEOUT,
      payload: mockPayload,
    };
    const actual = setEdgeDataTimeout(mockPayload);
    expect(actual).toEqual(expected);
  });
});
