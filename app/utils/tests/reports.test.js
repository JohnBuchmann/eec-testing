// Environment variables
import { ReportTypesId } from 'Utils/enums/report';
import { ScaleValues } from 'Utils/enums/unitMeasurement';
import moment from 'moment';
import {
  getReportTypesSelectOptions,
  getXTitle,
  getYTitle,
  getTimePeriodTitle,
  getReportSitesSelectOptions,
  getReportIntervalSelectOptions,
  getReportScaleSelectOptions,
  getReportTimePeriodOptions,
  getMaxValueFromChartLevels,
  generateCompaniesOptions,
  generateSitesOptions,
  scaledFormatYAxis,
} from 'Utils/reports';
import { getValueIfExists } from 'Utils/propertyValidation';

const funcMock = (value) => value.defaultMessage;

describe('reports', () => {
  describe('#getReportTypesSelectOptions', () => {
    it('Should return default report type dropdown options', () => {
      const expected = [
        {
          value: ReportTypesId.Facility,
          text: 'Facility Usage vs. Production',
        },
        {
          value: ReportTypesId.Energy,
          text: 'Energy Production',
        },
        {
          value: ReportTypesId.ESS,
          text: 'ESS State',
        },
        {
          value: ReportTypesId.VehicleAndFleet,
          text: 'Vehicle and Fleet Loads',
        },
        {
          value: ReportTypesId.Monthly,
          text: 'Monthly Report',
        },
      ];
      const actual = getReportTypesSelectOptions();

      expect(actual).toEqual(expected);
    });
  });

  describe('#getXTitle', () => {
    it('should input interval "Day" and return "Hours"', () => {
      const expected = 'Hours';
      const actual = getXTitle(funcMock, 'Day');
      expect(actual).toBe(expected);
    });
    it('should input interval "Month" and return "Days"', () => {
      const expected = 'Days';
      const actual = getXTitle(funcMock, 'Month');
      expect(actual).toBe(expected);
    });
    it('should input interval "Quarter" and return "Weeks"', () => {
      const expected = 'Weeks';
      const actual = getXTitle(funcMock, 'Quarter');
      expect(actual).toBe(expected);
    });
    it('should input interval "Year" and return "Months"', () => {
      const expected = 'Months';
      const actual = getXTitle(funcMock, 'Year');
      expect(actual).toBe(expected);
    });
  });

  describe('#getYTitle', () => {
    const yAxisTitle = 'yAxisTitlePower';
    it('should input scale "Auto" and return "GWh"', () => {
      const expected = 'Energy (GWh)';
      const actual = getYTitle(funcMock, 'Auto', ScaleValues.Giga);
      expect(actual).toBe(expected);
    });
    it('should input scale "Auto" and return "MWh"', () => {
      const expected = 'Energy (MWh)';
      const actual = getYTitle(funcMock, 'Auto', 5000000);
      expect(actual).toBe(expected);
    });
    it('should input scale "Auto" and return "kWh"', () => {
      const expected = 'Energy (kWh)';
      const actual = getYTitle(funcMock, 'Auto', 1000);
      expect(actual).toBe(expected);
    });
    it('should input scale "KW_1000" and return "kWh"', () => {
      const expected = 'Energy (1000 kW)';
      const actual = getYTitle(funcMock, 'KW_1000', 1000);
      expect(actual).toBe(expected);
    });

    it('should input scale "Auto" with "yAxisTitlePower" and return "gW"', () => {
      const expected = 'Power (gW)';
      const actual = getYTitle(funcMock, 'Auto', ScaleValues.Giga, yAxisTitle);
      expect(actual).toBe(expected);
    });
    it('should input scale "Auto" with "yAxisTitlePower" and return "MWh"', () => {
      const expected = 'Power (mW)';
      const actual = getYTitle(funcMock, 'Auto', 5000000, yAxisTitle);
      expect(actual).toBe(expected);
    });
    it('should input scale "Auto" with "yAxisTitlePower" and return "kWh"', () => {
      const expected = 'Power (kW)';
      const actual = getYTitle(funcMock, 'Auto', 1000, yAxisTitle);
      expect(actual).toBe(expected);
    });
    it('should input scale "KW_1000" with "yAxisTitlePower" and return "kWh"', () => {
      const expected = 'Power (1000 kW)';
      const actual = getYTitle(funcMock, 'KW_1000', 1000, yAxisTitle);
      expect(actual).toBe(expected);
    });
  });

  describe('#getTimePeriodTitle', () => {
    const paramsMock = {
      quarter: 'Q1-2021',
      timePeriod: '2021-02-21',
      interval: { value: 'Day' },
      timePeriodSelected: {
        text: '2021-02-21',
      },
    };
    it('should input interval "Day" and return time period title for days', () => {
      const expected = '21-Feb-2021';
      const actual = getTimePeriodTitle(paramsMock);

      expect(actual).toEqual(expected);
    });

    it('should input interval "Month" and return time period title for month', () => {
      const expected = 'Feb-2021';
      const actual = getTimePeriodTitle({
        ...paramsMock,
        interval: { value: 'Month' },
      });

      expect(actual).toEqual(expected);
    });

    it('should input interval "Quarter" and return time period title for quarter', () => {
      const expected = 'Q1-2021';
      const actual = getTimePeriodTitle({
        ...paramsMock,
        interval: { value: 'Quarter' },
      });

      expect(actual).toEqual(expected);
    });

    it('should input interval "Year" and return time period title for year', () => {
      const expected = '2021';
      const actual = getTimePeriodTitle({
        ...paramsMock,
        interval: { value: 'Year' },
      });

      expect(actual).toEqual(expected);
    });
  });

  describe('#getReportSitesSelectOptions', () => {
    it('should input sites and return sites options', () => {
      const sitesMock = [
        { siteId: 1, name: 'site 1' },
        { siteId: 2, name: 'site 3' },
      ];
      const expected = [
        { value: 1, text: 'site 1' },
        { value: 2, text: 'site 3' },
      ];
      const actual = getReportSitesSelectOptions(sitesMock);

      expect(actual).toEqual(expected);
    });
  });

  describe('#getReportIntervalSelectOptions', () => {
    it('should call function getReportIntervalSelectOptions and return interval options', () => {
      const expected = [
        { value: 'Day', text: 'By Day' },
        { value: 'Month', text: 'By Month' },
        { value: 'Quarter', text: 'By Quarter' },
        { value: 'Year', text: 'By Year' },
      ];
      const actual = getReportIntervalSelectOptions();

      expect(actual).toEqual(expected);
    });
  });

  describe('#getMaxValueFromChartLevels', () => {
    it('should call function getMaxValueFromChartLevels and return max value', () => {
      const minValue = 50;
      const maxValue = 115;
      const mockChartData = [
        {
          values: [[{ value: minValue }, { value: maxValue }]],
        },
      ];
      const actual = getMaxValueFromChartLevels(mockChartData);
      const expected = maxValue;
      expect(actual).toEqual(expected);
    });

    it('should call function getMaxValueFromChartLevels and return 0 when no data', () => {
      const mockChartData = [];
      const actual = getMaxValueFromChartLevels(mockChartData);
      const expected = 0;
      expect(actual).toEqual(expected);
    });
  });

  describe('#getReportScaleSelectOptions', () => {
    it('should call function getReportScaleSelectOptions and return scale options', () => {
      const expected = [
        { value: 'Auto', text: 'Auto' },
        { value: 'KW_1000', text: '1000 kW' },
        { value: 'KW_500', text: '500 kW' },
        { value: 'KW_100', text: '100 kW' },
      ];
      const actual = getReportScaleSelectOptions();

      expect(actual).toEqual(expected);
    });
  });

  describe('#getReportTimePeriodOptions', () => {
    it('should call function getReportTimePeriodOptions and input interval "Day"', () => {
      const intervalMock = 'Day';
      const expected = {
        text: moment().format('DD-MMMM-YYYY'),
        value: 0,
      };
      const actual = getReportTimePeriodOptions(intervalMock);

      expect(actual).toContainEqual(expected);
    });

    it('should call function getReportTimePeriodOptions and input interval "Month"', () => {
      const intervalMock = 'Month';
      const expected = {
        text: moment()
          .subtract(0, 'months')
          .format('MMM-YYYY'),
        value: 0,
      };
      const actual = getReportTimePeriodOptions(intervalMock);

      expect(actual).toContainEqual(expected);
    });

    it('should call function getReportTimePeriodOptions and input interval "Quarter"', () => {
      const intervalMock = 'Quarter';
      const query = {
        value: 0,
        text: `Q1-${moment()
          .subtract(0, 'years')
          .format('YYYY')}`,
      };
      const periods = getReportTimePeriodOptions(intervalMock);
      const result = periods.filter((period) => period.text === query.text)[0];
      const actual = getValueIfExists(() => result.text, null);
      const expected = getValueIfExists(() => query.text, null);

      expect(actual).toBe(expected);
    });

    it('should call function getReportTimePeriodOptions and input interval "Year"', () => {
      const intervalMock = 'Year';
      const expected = {
        text: moment().format('YYYY'),
        value: 0,
      };
      const actual = getReportTimePeriodOptions(intervalMock);

      expect(actual).toContainEqual(expected);
    });

    it('should call function getReportTimePeriodOptions and input undefined', () => {
      let undefinedIntervalMock;
      const expected = [];
      const actual = getReportTimePeriodOptions(undefinedIntervalMock);

      expect(actual).toEqual(expected);
    });
  });

  it('should call function generateCompaniesOptions and get companies array options', () => {
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
    const expected = [
      {
        text: 'Acuity A Mutual Insurance Co',
        value: 0,
      },
      {
        value: 1,
        text: 'SIT Company 1',
      },
    ];
    const actual = generateCompaniesOptions(mockData);
    expect(actual).toEqual(expected);
  });

  it('should call function generateSitesOptions and get sites array options', () => {
    const mockData = [
      {
        siteId: 300,
        externalId: 'harry.ayers@faithtechnologies.com',
        name: 'Tom and Tony Test',
        locationName: 'Demo Name',
      },
    ];
    const expected = [
      {
        value: 300,
        text: 'Tom and Tony Test - Demo Name',
      },
    ];
    const actual = generateSitesOptions(mockData);
    expect(actual).toEqual(expected);
  });

  describe('#scaledFormatYAxis', () => {
    it('shoudl call function scaledFormatYAxis and get GWH format value', () => {
      const intervalMock = null;
      const maxValueMock = 5000000;
      const value = 5000000;
      const expected = '5 G';
      const actual = scaledFormatYAxis(intervalMock, maxValueMock, value);

      expect(actual).toEqual(expected);
    });

    it('shoudl call function scaledFormatYAxis and get MWH format value', () => {
      const intervalMock = null;
      const maxValueMock = 5;
      const value = 5;
      const expected = '5 ';
      const actual = scaledFormatYAxis(intervalMock, maxValueMock, value);

      expect(actual).toEqual(expected);
    });

    it('should call function scaledFormatYAxis and get normal value', () => {
      const intervalMock = null;
      const maxValueMock = 0.5;
      const value = 0.5;
      const expected = '0.5 ';
      const actual = scaledFormatYAxis(intervalMock, maxValueMock, value);

      expect(actual).toEqual(expected);
    });
  });
});
