import { Colors } from 'Theme';
import {
  getColorChartKey,
  getLinesChartChartColors,
  getStackedBarChartColors,
} from 'Utils/colorsHelper';

describe('colorsHelper', () => {
  let undefinedData;
  describe('#getColorChartKey', () => {
    const stJohnColorItems = [
      'January',
      'Jan',
      'Tuesday',
      'Tue',
      'Facility Use',
    ];

    const pacificBlueColorItems = [
      'March',
      'Mar',
      'Monday',
      'Mon',
      'Ess at max',
    ];
    const olivineColorItems = [
      'February',
      'Feb',
      'Saturday',
      'Sat',
      'Energy provided by the grid',
      'Ess in use',
    ];

    const bostonBlueColorItems = [
      'July',
      'Jul',
      'Sunday',
      'Sun',
      'Reciprocating engine',
    ];
    const christineColorItems = ['December', 'Dec', 'Wednesday', 'Wed', 'Wind'];
    const thunderbirdColorItems = ['April', 'Apr', 'Thursday', 'Thu', 'Solar'];
    const goldenDreamColorItems = ['May', 'Friday', 'Fri', 'Microturbine'];
    const blackColorItems = [
      'October',
      'Oct',
      undefinedData,
      'SDFERVVTRDVSDSAD',
    ];
    const cadillacColorItems = ['November', 'Nov'];
    const cancanColorItems = ['September', 'Sep'];
    const buccaneerColorItems = ['August', 'Aug'];
    const eucalyptusColorItems = ['June', 'Jun', 'Ess losses', 'Ess at min'];

    test.each(stJohnColorItems)(
      'should return stJohn color for item %p',
      (item) => {
        const expected = Colors.stJohn;
        const actual = getColorChartKey(item);
        expect(actual).toEqual(expected);
      }
    );

    test.each(pacificBlueColorItems)(
      'should return pacificBlue color for item %p',
      (item) => {
        const expected = Colors.pacificBlue;
        const actual = getColorChartKey(item);
        expect(actual).toEqual(expected);
      }
    );

    test.each(christineColorItems)(
      'should return christine color for item %p',
      (item) => {
        const expected = Colors.christine;
        const actual = getColorChartKey(item);
        expect(actual).toEqual(expected);
      }
    );

    test.each(thunderbirdColorItems)(
      'should return thunderbird color for item %p',
      (item) => {
        const expected = Colors.thunderbird;
        const actual = getColorChartKey(item);
        expect(actual).toEqual(expected);
      }
    );

    test.each(goldenDreamColorItems)(
      'should return goldenDream color for item %p',
      (item) => {
        const expected = Colors.goldenDream;
        const actual = getColorChartKey(item);
        expect(actual).toEqual(expected);
      }
    );

    test.each(olivineColorItems)(
      'should return olivine color for item %p',
      (item) => {
        const expected = Colors.olivine;
        const actual = getColorChartKey(item);
        expect(actual).toEqual(expected);
      }
    );

    test.each(bostonBlueColorItems)(
      'should return bostonBlue color for item %p',
      (item) => {
        const expected = Colors.bostonBlue;
        const actual = getColorChartKey(item);
        expect(actual).toEqual(expected);
      }
    );

    test.each(eucalyptusColorItems)(
      'should return eucalyptus color for item %p',
      (item) => {
        const expected = Colors.eucalyptus;
        const actual = getColorChartKey(item);
        expect(actual).toEqual(expected);
      }
    );

    test.each(blackColorItems)(
      'should return black color for item %p',
      (item) => {
        const expected = Colors.black;
        const actual = getColorChartKey(item);
        expect(actual).toEqual(expected);
      }
    );

    test.each(cadillacColorItems)(
      'should return cadillac color for item %p',
      (item) => {
        const expected = Colors.cadillac;
        const actual = getColorChartKey(item);
        expect(actual).toEqual(expected);
      }
    );

    test.each(cancanColorItems)(
      'should return cancan color for item %p',
      (item) => {
        const expected = Colors.cancan;
        const actual = getColorChartKey(item);
        expect(actual).toEqual(expected);
      }
    );

    test.each(buccaneerColorItems)(
      'should return buccaneer color for item %p',
      (item) => {
        const expected = Colors.buccaneer;
        const actual = getColorChartKey(item);
        expect(actual).toEqual(expected);
      }
    );
  });

  describe('#getStackedBarChartColors', () => {
    const stackedBarChartData = [
      {
        group: '00:00',
        values: [
          [
            {
              name: 'Facility Use',
              value: 80,
              group: null,
            },
          ],
          [
            {
              name: 'Solar',
              value: 65,
              group: null,
            },
            {
              name: 'Wind',
              value: 100,
              group: null,
            },
            {
              name: 'Microturbine',
              value: 135,
              group: null,
            },
          ],
        ],
      },
    ];

    it('should return an empty array when undefined chartData is sent', () => {
      const expected = [];
      const actual = getStackedBarChartColors(undefinedData);

      expect(actual).toEqual(expected);
    });

    it('should return an array with name and color mapped when a valid chart data is sent', () => {
      const expected = [
        {
          name: 'Facility Use',
          color: getColorChartKey('Facility Use'),
        },
        {
          name: 'Solar',
          color: getColorChartKey('Solar'),
        },
        {
          name: 'Wind',
          color: getColorChartKey('Wind'),
        },
        {
          name: 'Microturbine',
          color: getColorChartKey('Microturbine'),
        },
      ];
      const actual = getStackedBarChartColors(stackedBarChartData);

      expect(actual).toEqual(expected);
    });
  });

  describe('#getLinesChartChartColors', () => {
    const linesChartData = [
      {
        name: '00:00',
        value: 80,
        group: 'February',
      },
      {
        name: '02:00',
        value: 100,
        group: 'March',
      },
      {
        name: '04:00',
        value: 90,
        group: 'March',
      },
    ];

    it('should return an empty array when undefined chartData is sent', () => {
      const expected = [];
      const actual = getLinesChartChartColors(undefinedData);

      expect(actual).toEqual(expected);
    });

    it('should return an array with name and color mapped when a valid chart data is sent', () => {
      const expected = [
        {
          group: 'February',
          color: getColorChartKey('February'),
        },
        {
          group: 'March',
          color: getColorChartKey('March'),
        },
      ];
      const actual = getLinesChartChartColors(linesChartData);

      expect(actual).toEqual(expected);
    });
  });
});
