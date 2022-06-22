import {
  convertToAsterisk,
  getCamelCase,
  getDefaultValueDropDown,
  replaceStringByKeys,
  truncate,
  formatPhoneNumber,
  stringToFloat,
} from '../propertyHelpers';

describe('propertyHelpers', () => {
  let undefinedData;
  describe('#replaceStringByKeys', () => {
    it('should return a formatted string', () => {
      const text = 'My test is the number {number}-{version}';
      const keyToReplace = {
        number: 1,
        version: 2,
      };
      const actual = replaceStringByKeys(text, keyToReplace);
      const expected = 'My test is the number 1-2';
      expect(actual).toBe(expected);
    });

    it('should return a the same string with no keys to replace', () => {
      const text = 'My test is the number {number}-{version}';
      const actual = replaceStringByKeys(text, undefinedData);
      const expected = text;
      expect(actual).toBe(expected);
    });
  });

  describe('#truncate', () => {
    it('should truncate a string based on max characters and add ellipsis', () => {
      const text = 'Lorem ipsum dolor sit amet';
      const maxCharacters = 10;
      const actual = truncate(text, maxCharacters);
      const expected = 'Lorem ipsu...';
      expect(actual).toBe(expected);
    });

    it('should return same string when maxCharacters are higher than text length', () => {
      const text = 'Lorem ipsum dolor sit amet';
      const maxCharacters = 100;
      const actual = truncate(text, maxCharacters);
      const expected = text;
      expect(actual).toBe(expected);
    });

    it('should return the same string if no max characters', () => {
      const text = 'Lorem ipsum dolor sit amet';
      const actual = truncate(text, undefinedData);
      const expected = text;
      expect(actual).toBe(expected);
    });

    it('should truncate a string based on max characters', () => {
      const text = 'Lorem ipsum dolor sit amet';
      const maxCharacters = 10;
      const actual = truncate(text, maxCharacters, false);
      const expected = 'Lorem ipsu';
      expect(actual).toBe(expected);
    });
  });

  describe('#getDefaultValueDropDown', () => {
    it('should return a text on the array options', () => {
      const itemToFind = 2;
      const arrayDataMock = [
        {
          value: 1,
          text: 'Test-1',
        },
        {
          value: itemToFind,
          text: `Item-${itemToFind}`,
        },
      ];
      const actual = getDefaultValueDropDown(arrayDataMock, itemToFind);
      const expected = `Item-${itemToFind}`;
      expect(actual).toBe(expected);
    });

    it('should return an empty text when arrayData is not defined', () => {
      const arrayData = [];
      const itemToFind = 2;
      const actual = getDefaultValueDropDown(arrayData, itemToFind);
      const expected = '';
      expect(actual).toBe(expected);
    });
  });

  describe('#getCamelCase', () => {
    it('should return a text on camel case format', () => {
      const inputMock = 'Camel Case';
      const actual = getCamelCase(inputMock);
      const expected = `camelCase`;
      expect(actual).toBe(expected);
    });
  });

  describe('#convertToAsterisk', () => {
    it('should return a full of asterisks', () => {
      const inputMock = 'TestingFunction';
      const actual = convertToAsterisk(inputMock).length;
      const expected = inputMock.length;
      expect(actual).toBe(expected);
    });

    it('should return a empty string when no data is sent', () => {
      let undefinedInputMock;
      const actual = convertToAsterisk(undefinedInputMock);
      const expected = '';
      expect(actual).toBe(expected);
    });
  });

  describe('#formatPhoneNumber', () => {
    it('should return phone number formatted', () => {
      const phoneMock = '9999999999';
      const expected = '(999)999-9999';
      const actual = formatPhoneNumber(phoneMock);

      expect(actual).toEqual(expected);
    });

    it('should input numbers and letters return phone number formatted', () => {
      const phoneMock = '99999dddddwwwwww99999';
      const expected = '(999)999-9999';
      const actual = formatPhoneNumber(phoneMock);

      expect(actual).toEqual(expected);
    });

    it('should input null and return a not available message', () => {
      const phoneMock = null;
      const notAvailableMock = 'Not Available Data';
      const expected = notAvailableMock;
      const actual = formatPhoneNumber(phoneMock, notAvailableMock);

      expect(actual).toEqual(expected);
    });
  });

  describe('#stringToFloat', () => {
    it('should return a number when send a valid string value', () => {
      const value = '123.1234';
      const expected = 123.1234;
      const actual = stringToFloat(value);

      expect(actual).toBe(expected);
    });

    it('should return a zero when  a null value is sent', () => {
      const value = null;
      const expected = 0;
      const actual = stringToFloat(value);

      expect(actual).toBe(expected);
    });

    it('should return a zero when a invalid value is sent', () => {
      const value = {};
      const expected = 0;
      const actual = stringToFloat(value);

      expect(actual).toBe(expected);
    });
  });
});
