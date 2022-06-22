import { formatCustomerAreas } from '../formatCustomerAreas';

describe('formatCustomerAreas', () => {
  it('#should return formatted customers', () => {
    const mockData = [
      {
        customerId: 60,
        companyName: 'Anexinet Corp',
        areas: [
          {
            areaName: 'East Region',
            locations: [
              {
                locationId: 450,
                locationName: 'Connection Test Site 1',
                assets: [
                  {
                    siteId: 5058,
                    externalIcianId: 'jlenthe@anexinet.com',
                    name: 'DSeries Conn Test Site 1 Asset 1',
                    icianName: 'Jason Lenthe',
                    siteType: null,
                    live: true,
                    siteStatus: null,
                    siteStatusSymbolName: null,
                    siteCommStatus: '3',
                    siteCommStatusSymbolName: 'Disconnected',
                    islandMode: null,
                    address: {
                      addressId: 447,
                      addressLine1: '123 Main St',
                      addressLine2: null,
                      city: 'Norristown',
                      state: 'PA',
                      postalCode: 19403,
                      latitude: '40.1151952',
                      longitude: '-75.3459428',
                    },
                  },
                ],
              },
            ],
          },
          {
            areaName: 'Parking Lot',
            locations: [
              {
                locationId: 323,
                locationName: "Brian's Test Site",
                assets: [
                  {
                    siteId: 5043,
                    externalIcianId: 'bjoffe@anexinet.com',
                    name: 'Xcape Unit 000002',
                    icianName: 'Brian Joffe',
                    siteType: null,
                    live: true,
                    siteStatus: null,
                    siteStatusSymbolName: null,
                    siteCommStatus: null,
                    siteCommStatusSymbolName: null,
                    islandMode: null,
                    address: {
                      addressId: 281,
                      addressLine1: '4 Sentry Parkway East Suite 300',
                      addressLine2: null,
                      city: 'Blue Bell',
                      state: 'PA',
                      postalCode: 19422,
                      latitude: '40.1317162',
                      longitude: '-75.2713304',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ];

    const formattedData = formatCustomerAreas(mockData);
    const expectedCustomerLength = 1;
    expect(formattedData.length).toBe(expectedCustomerLength);
  });
});
