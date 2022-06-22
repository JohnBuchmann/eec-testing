import {
  getValueIfExists,
  propertyExist,
  stringContains,
  stringIsNullOrEmpty,
  isNumeric,
  getSites,
} from '../propertyValidation';

describe('propertyValidation', () => {
  let undefinedData;
  describe('#propertyExist', () => {
    it('should return true when value exists', () => {
      const validData = 'Valid Data';

      expect(propertyExist(() => validData)).toBe(true);
    });

    it('should return false when property is undefined', () => {
      const validData = undefinedData;

      expect(propertyExist(() => validData)).toBe(false);
    });

    it('should return false when property is null', () => {
      const validData = null;

      expect(propertyExist(() => validData)).toBe(false);
    });

    it('should return false when trying to read from undefined', () => {
      const validData = [1];
      const invalidIndex = 99;
      const actual = propertyExist(() => validData[`${invalidIndex}`]);
      const expected = false;

      expect(actual).toBe(expected);
    });

    it('should return false when trying to read from undefined', () => {
      const validData = undefinedData;
      const invalidIndex = 99;
      const actual = propertyExist(() => validData[`${invalidIndex}`]);
      const expected = false;

      expect(actual).toBe(expected);
    });
  });

  describe('#stringContains', () => {
    it('should return false undefined value data is sent', () => {
      const expected = false;
      const actual = stringContains(undefinedData, 'test');

      expect(expected).toBe(actual);
    });

    it('should return false undefined search text data is sent', () => {
      const expected = false;
      const actual = stringContains('This is a test', undefinedData);

      expect(expected).toBe(actual);
    });

    it('should return false when search text value is contained on main string and case sensitive', () => {
      const expected = false;
      const actual = stringContains('This is a test', 'TEST');

      expect(expected).toBe(actual);
    });

    it('should return true when search text value is contained on main string and no case sensitive', () => {
      const expected = true;
      const actual = stringContains('This is a test', 'TEST', false);

      expect(expected).toBe(actual);
    });
  });

  describe('#stringIsNullOrEmpty', () => {
    it('should return true undefined string is sent', () => {
      const expected = true;
      const actual = stringIsNullOrEmpty(undefinedData);

      expect(actual).toBe(expected);
    });

    it('should return true empty string is sent', () => {
      const expected = true;
      const actual = stringIsNullOrEmpty('');

      expect(actual).toBe(expected);
    });

    it('should return true blank string is sent', () => {
      const expected = true;
      const actual = stringIsNullOrEmpty('       ');

      expect(actual).toBe(expected);
    });

    it('should false string is sent', () => {
      const expected = false;
      const actual = stringIsNullOrEmpty('Testing');

      expect(actual).toBe(expected);
    });
  });

  describe('#getValueIfExists', () => {
    it('should return the valid value back', () => {
      const validValue = 'Valid Value';
      const actual = getValueIfExists(() => validValue, '');
      const expected = validValue;
      expect(actual).toBe(expected);
    });

    it('should return default value when invalid value comes as an input', () => {
      let invalidValue;
      const defaultValue = 'Default Value';
      const actual = getValueIfExists(() => invalidValue, defaultValue);
      const expected = defaultValue;
      expect(actual).toBe(expected);
    });
  });

  describe('#isNumeric', () => {
    it('should return true when this is a number', () => {
      const validValue = '123';
      const actual = isNumeric(validValue);
      const expected = true;
      expect(actual).toBe(expected);
    });
  });

  describe('#getSites', () => {
    it('should return true when this is a number', () => {
      const mockData = [
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
      ];

      const {
        formattedSitesList,
        customersOptions,
        areasOptions,
        sitesOptions,
      } = getSites(mockData, [], [], [], []);
      const expectedSites = 1;
      const expectedDropdownOptions = 2;
      expect(formattedSitesList.length).toBe(expectedSites);
      expect(customersOptions.length).toBe(expectedDropdownOptions);
      expect(areasOptions.length).toBe(expectedDropdownOptions);
      expect(sitesOptions.length).toBe(expectedDropdownOptions);
    });
  });
});
