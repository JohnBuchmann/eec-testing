import {
  getFilterAvailableOptions,
  getSiteStatusByStatusPoint,
  getStatusCount,
  SiteStatusId,
  SiteStatusPointName,
} from 'Utils/enums/site';

const mockedSites = [
  {
    siteId: 331,
    externalIcianId: 'harry.ayers@faithtechinc.com',
    name: 'R&D Site #2',
    icianName: 'Harry Ayers',
    siteType: null,
    live: true,
    siteStatus: 1,
    siteStatusSymbolName: null,
    siteCommStatus: null,
    siteCommStatusSymbolName: null,
    islandMode: null,
    address: {
      addressId: 270,
      addressLine1: '3145 N Longwood Lane',
      addressLine2: null,
      city: 'Appleton',
      state: 'WI',
      postalCode: 54914,
      latitude: '44.2930392',
      longitude: '-88.44542319999999',
    },
    companyName: 'Faith R&D Engineer Group Customer',
    areaName: 'Faith R&D Engineer Group Customer - Not Defined',
    locationName: 'R&D Site #2',
  },
];
describe('site functions', () => {
  const sitesMock = mockedSites;
  let undefinedData;

  describe('#getStatusCount', () => {
    it('should render default data and get 1 record', () => {
      const totalRecordsFound = getStatusCount(
        SiteStatusPointName.SiteStatus,
        SiteStatusId.Maintenance,
        sitesMock
      );
      const expected = 1;
      expect(totalRecordsFound).toEqual(expected);
    });

    it('it should test sites undefined', () => {
      const totalRecordsFound = getStatusCount(
        SiteStatusPointName.SiteStatus,
        SiteStatusId.Ok,
        undefinedData
      );
      const expected = 0;
      expect(totalRecordsFound).toEqual(expected);
    });
  });

  describe('#getSiteStatusByStatusPoint', () => {
    it('should return empty object when sitePoints and statusPointName are undefined', () => {
      const actual = getSiteStatusByStatusPoint(undefinedData, undefinedData);
      const expected = {};
      expect(actual).toEqual(expected);
    });

    it('should return empty object when sitePoints is undefinedData', () => {
      const actual = getSiteStatusByStatusPoint(
        undefinedData,
        SiteStatusPointName.SiteStatus
      );
      const expected = {};
      expect(actual).toEqual(expected);
    });
  });

  describe('#getFilterAvailableOptions', () => {
    it('should get all Available Options', () => {
      const actual = getFilterAvailableOptions();
      const expected = [
        { herarchyLevel: 1, text: 'All', value: 0 },
        { herarchyLevel: 1, text: 'Maintenance', value: 1 },
        { herarchyLevel: 1, text: 'Fault', value: 2 },
        { herarchyLevel: 1, text: 'Alarm', value: 3 },
        { herarchyLevel: 1, text: 'Warning', value: 4 },
        { herarchyLevel: 1, text: 'Ok', value: 5 },
        { herarchyLevel: 1, text: 'Disconnected', value: 'Disconnected' },
      ];

      expect(actual).toEqual(expected);
    });
  });
});
