import { DeviceListTypeId } from 'Utils/enums/device';
import { SiteEventType } from 'Utils/enums/siteEvent';
import { getFilteredSiteEvents, getFilteredSites } from '../selectors';

const mockSites = [
  {
    siteId: 1,
    externalId: '25251sdsdSD111',
    name: 'Bad River',
    plcId: 'BADRIVER',
    icianName: 'Elvin Jones',
    externalIcianId: 'elvin.jones@faithtechnologies.com',
    secondaryIcianName: 'John Doe',
    secondaryIcianId: 'jdoe@noemail.com',
    latitude: '9.1231231231',
    longitude: '34.232323232',
    companyName: 'Atlantida Inc.',
    live: true,
    points: [
      {
        name: 'Site_Status',
        type: 'uint16',
        label: 'Site Status',
        description: 'Site Status',
        access: 'R',
        mandatory: 'true',
        symbols: [
          {
            name: 'MAINTENANCE',
            value: '1',
            label: 'Site Status',
            description: 'Site Status',
            active: false,
          },
          {
            name: 'FAULTED',
            value: '2',
            label: 'Site Status',
            description: 'Site Status',
            active: false,
          },
          {
            name: 'ALARM',
            value: '3',
            label: 'Site Status',
            description: 'Site Status',
            active: false,
          },
          {
            name: 'WARNING',
            value: '4',
            label: 'Site Status',
            description: 'Site Status',
            active: false,
          },
          {
            name: 'OK',
            value: '5',
            label: 'Site Status',
            description: 'Site Status',
            active: false,
          },
        ],
        value: '1',
        active: false,
      },
      {
        name: 'Island_Mode_Init',
        type: 'uint16',
        label: 'Island Mode',
        description: 'Island Mode',
        access: 'R',
        mandatory: 'true',
        symbols: [
          {
            name: 'Island Mode',
            value: '1',
            label: 'Island Mode',
            description: 'Communication Status',
            active: false,
          },
          {
            name: 'Island Mode',
            value: '2',
            label: 'Island Mode',
            description: 'Communication Status',
            active: false,
          },
        ],
        value: '2',
        active: false,
      },
      {
        name: 'Comm_Status',
        type: 'uint16',
        label: 'Communications Status',
        description: 'Communications Status',
        access: 'R',
        mandatory: 'true',
        symbols: [
          {
            name: 'Landline',
            value: '1',
            label: 'Communication Status',
            description: 'Communication Status',
            active: false,
          },
          {
            name: 'Cellular',
            value: '2',
            label: 'Communication Status',
            description: 'Communication Status',
            active: false,
          },
          {
            name: 'Disconnected',
            value: '3',
            label: 'Communication Status',
            description: 'Communication Status',
            active: false,
          },
        ],
        value: '3',
        symbolName: 'Disconnected',
        active: false,
      },
    ],
  },
  {
    siteId: 2,
    externalId: '25251sdsdSD111',
    name: 'Bad River',
    plcId: 'BADRIVER',
    icianName: 'Elvin Jones',
    externalIcianId: 'elvin.jones@faithtechnologies.com',
    latitude: '9.1231231231',
    longitude: '34.232323232',
    companyName: 'Atlantida Inc.',
    live: false,
    points: [
      {
        name: 'SiteStatus',
        type: 'uint16',
        label: 'Site Status',
        description: 'Site Status',
        access: 'R',
        mandatory: 'true',
        symbols: [
          {
            name: 'MAINTENANCE',
            value: '1',
            label: 'Site Status',
            description: 'Site Status',
            active: false,
          },
          {
            name: 'FAULTED',
            value: '2',
            label: 'Site Status',
            description: 'Site Status',
            active: false,
          },
          {
            name: 'ALARM',
            value: '3',
            label: 'Site Status',
            description: 'Site Status',
            active: false,
          },
          {
            name: 'WARNING',
            value: '4',
            label: 'Site Status',
            description: 'Site Status',
            active: false,
          },
          {
            name: 'OK',
            value: '5',
            label: 'Site Status',
            description: 'Site Status',
            active: false,
          },
        ],
        value: '1',
        active: false,
      },
      {
        name: 'Island_Mode_Init',
        type: 'uint16',
        label: 'Island Mode',
        description: 'Island Mode',
        access: 'R',
        mandatory: 'true',
        symbols: [
          {
            name: 'Island Mode',
            value: '1',
            label: 'Island Mode',
            description: 'Communication Status',
            active: false,
          },
          {
            name: 'Island Mode',
            value: '2',
            label: 'Island Mode',
            description: 'Communication Status',
            active: false,
          },
        ],
        value: '2',
        active: false,
      },
      {
        name: 'Comm_Status',
        type: 'uint16',
        label: 'Communications Status',
        description: 'Communications Status',
        access: 'R',
        mandatory: 'true',
        symbols: [
          {
            name: 'Landline',
            value: '1',
            label: 'Communication Status',
            description: 'Communication Status',
            active: false,
          },
          {
            name: 'Cellular',
            value: '2',
            label: 'Communication Status',
            description: 'Communication Status',
            active: false,
          },
          {
            name: 'Disconnected',
            value: '3',
            label: 'Communication Status',
            description: 'Communication Status',
            active: false,
          },
        ],
        value: '3',
        symbolName: 'Disconnected',
        active: false,
      },
    ],
  },
];

const mockEvents = [
  {
    siteId: 1,
    deviceGroupId: 10,
    deviceGroupName: 'BATT',
    deviceId: 261,
    deviceName: 'BATT1',
    title: 'Warning BATT1',
    description: 'Lorem Ipsum is simply',
    eventDateTime: '2020-12-03T12:54:28.555391',
    eventTypeId: 'Warning',
  },
];

describe('Sites Reducer', () => {
  let mockState;
  let undefinedData;
  beforeEach(() => {
    mockState = {
      sites: {
        allSites: mockSites,
        loading: false,
        filters: {
          text: '',
          status: [],
          customer: [],
          area: [],
          location: [],
          assignedUser: '',
          showEmulatedSites: false,
        },
      },
    };
  });

  it('Should return empty sites array when sites is undefined', () => {
    const expected = getFilteredSites();

    mockState.sites = undefinedData;

    const actual = getFilteredSites(mockState);

    expect(actual).toEqual(expected);
  });

  it('Should return sites and dropdown options ', () => {
    const mockedState = {
      sites: {
        allSites: [
          {
            customerId: 61,
            companyName: 'Faith Inve',
            areas: [
              {
                areaName: 'Not Defined',
                locations: [
                  {
                    locationId: 434,
                    locationName: 'UAT Test',
                    assets: [
                      {
                        siteId: 508,
                        externalIcianId: 'harry.ayers@faithtechinc.com',
                        name: 'UAT Test',
                        icianName: 'Harry Ayers',
                        siteType: null,
                        live: true,
                        siteStatus: null,
                        siteStatusSymbolName: null,
                        siteCommStatus: null,
                        siteCommStatusSymbolName: null,
                        islandMode: null,
                        address: null,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        loading: false,
        filters: {
          text: '',
          status: [],
          customer: [
            {
              customerId: 61,
              companyName: 'Faith Inve',
              text: 'Faith Inve',
              herarchyLevel: 2,
              value: 61,
            },
          ],
          area: [],
          location: [
            {
              locationId: 434,
              locationName: 'UAT Test',
              areaName: 'Faith Inve - Not Defined',
              text: 'UAT Test',
              herarchyLevel: 4,
              value: 434,
            },
          ],
          assignedUser: '',
          showEmulatedSites: false,
        },
      },
    };
    const {
      filteredSites,
      customerScopeOptions,
      areasScopeOptions,
      sitesScopeOptions,
    } = getFilteredSites(mockedState);

    const expectedSites = 1;
    const expectedDropdownOptions = 2;

    expect(filteredSites.length).toEqual(expectedSites);
    expect(customerScopeOptions.length).toEqual(expectedDropdownOptions);
    expect(areasScopeOptions.length).toEqual(expectedDropdownOptions);
    expect(sitesScopeOptions.length).toEqual(expectedDropdownOptions);
  });

  it('Should return 0 sites and 1 dropdown option when user has no assigned sites ', () => {
    const mockedState = {
      sites: {
        allSites: [
          {
            customerId: 61,
            companyName: 'Faith Inve',
            areas: [
              {
                areaName: 'Not Defined',
                locations: [
                  {
                    locationId: 434,
                    locationName: 'UAT Test',
                    assets: [
                      {
                        siteId: 508,
                        externalIcianId: 'harry.ayers@faithtechinc.com',
                        name: 'UAT Test',
                        icianName: 'Harry Ayers',
                        siteType: null,
                        live: true,
                        siteStatus: null,
                        siteStatusSymbolName: null,
                        siteCommStatus: null,
                        siteCommStatusSymbolName: null,
                        islandMode: null,
                        address: null,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        loading: false,
        filters: {
          text: '',
          status: [],
          customer: [],
          area: [],
          location: [],
          assignedUser: 'ician@noemail.com',
          showEmulatedSites: false,
        },
      },
    };
    const {
      filteredSites,
      customerScopeOptions,
      areasScopeOptions,
      sitesScopeOptions,
    } = getFilteredSites(mockedState);

    const expectedSites = 0;
    const expectedDropdownOptions = 1;

    expect(filteredSites.length).toEqual(expectedSites);
    expect(customerScopeOptions.length).toEqual(expectedDropdownOptions);
    expect(areasScopeOptions.length).toEqual(expectedDropdownOptions);
    expect(sitesScopeOptions.length).toEqual(expectedDropdownOptions);
  });
});

describe('Site Event Reducer', () => {
  let mockState;

  beforeEach(() => {
    mockState = {
      sites: {
        site: {
          events: mockEvents,
          eventsFilters: {
            eventTypeId: SiteEventType.AllEvents,
            deviceId: 0,
            groupId: DeviceListTypeId.All,
          },
        },
      },
    };
  });

  it('Should return one event filtered by deviceId', () => {
    const expected = 1;
    mockState.sites.site.eventsFilters.deviceId = 261;
    const actual = getFilteredSiteEvents(mockState).length;

    expect(actual).toEqual(expected);
  });
  it('Should return one event filtered by groupId', () => {
    const expected = 1;
    mockState.sites.site.eventsFilters.groupId = 'BATT';
    const actual = getFilteredSiteEvents(mockState).length;

    expect(actual).toEqual(expected);
  });
  it('Should return one event filtered by eventTypeId', () => {
    const expected = 1;
    mockState.sites.site.eventsFilters.eventTypeId = 'Warning';
    const actual = getFilteredSiteEvents(mockState).length;
    expect(actual).toEqual(expected);
  });

  it('Should return no events when there is no records matching filter criteria', () => {
    const expected = 0;
    mockState.sites.site.eventsFilters = {
      eventTypeId: SiteEventType.Alarm,
      deviceId: 999,
      groupId: DeviceListTypeId.All,
    };
    const actual = getFilteredSiteEvents(mockState).length;

    expect(actual).toEqual(expected);
  });

  it('Should return no events eventFilters does not exist', () => {
    const expected = 0;
    mockState.sites.site = {
      events: mockState.sites.site.events,
    };

    const actual = getFilteredSiteEvents(mockState).length;

    expect(actual).toEqual(expected);
  });
});
