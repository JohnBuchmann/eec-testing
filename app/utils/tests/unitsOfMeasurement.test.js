import {
  getTemperatureUnitLabel,
  temperatureUnitsId,
  getTemperatureUnitCode,
  formatTemperatureData,
} from '../unitsOfMeasurement';

describe('UnitsOfMeasurement', () => {
  describe('#getTemperatureUnitLabel', () => {
    it('should return empty string when no valid temperature unit', () => {
      expect(getTemperatureUnitLabel(-1)).toBe('');
    });

    it('should return C° for celsius temperature unit', () => {
      expect(getTemperatureUnitLabel(temperatureUnitsId.Celsius)).toBe('C°');
    });

    it('should return F° for fahrenheit temperature unit', () => {
      expect(getTemperatureUnitLabel(temperatureUnitsId.Fahrenheit)).toBe('F°');
    });
  });

  describe('#getTemperatureUnitCode', () => {
    it('should return empty string when no valid temperature unit', () => {
      expect(getTemperatureUnitCode(-1)).toBe('');
    });
    it('should return C for celsius temperature unit', () => {
      expect(getTemperatureUnitCode(temperatureUnitsId.Celsius)).toBe('C');
    });

    it('should return F for fahrenheit temperature unit', () => {
      expect(getTemperatureUnitCode(temperatureUnitsId.Fahrenheit)).toBe('F');
    });
  });

  describe('#formatTemperatureData', () => {
    it('should input unit "C" and return celsius', () => {
      const itemMock = { units: 'C', value: 40 };
      const settingsMock = { unitMeasurementId: 1 };
      const expected = itemMock;
      const actual = formatTemperatureData(itemMock, settingsMock);

      expect(actual).toEqual(expected);
    });

    it('should input units "C" and return fahrenheit', () => {
      const itemMock = { units: 'C', value: 40 };
      const settingsMock = { unitMeasurementId: 2 };
      const expected = { units: 'F°', value: '104' };
      const actual = formatTemperatureData(itemMock, settingsMock);

      expect(actual).toEqual(expected);
    });
  });
});
