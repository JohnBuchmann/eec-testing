/**
 * Test for date helper
 */
import { getCustomFormattedDate, getShortMonthName } from '../date';

describe('getCustomFormattedDate', () => {
  describe('#ValidFormatDate', () => {
    it('should return the right format', () => {
      const validDate = '2020-11-09T16:58:30.000';
      const expected = 'Nov 9, 2020, 16:58:30';
      const result = getCustomFormattedDate(validDate);
      expect(result).toEqual(expected);
    });

    it('should return empty string, wrong format', () => {
      const validDate = 'Invalid Date';
      const expected = '';
      const result = getCustomFormattedDate(validDate);
      expect(result).toEqual(expected);
    });

    describe('#MothFunction', () => {
      it('should return empty string, wrong month', () => {
        const month = '';
        const expected = '';
        const result = getShortMonthName(month);
        expect(result).toEqual(expected);
      });
    });
  });
});
