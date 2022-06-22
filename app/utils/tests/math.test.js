import { round } from 'Utils/math';

describe('math', () => {
  describe('#round', () => {
    it('should return zero when undefined number to round is sent', () => {
      const expected = 0;
      let undefinedData;
      const actual = round(undefinedData, 2);

      expect(expected).toBe(actual);
    });

    it('should return zero when undefined decimals to round is sent', () => {
      const expected = 0;
      let undefinedData;
      const actual = round(1.234, undefinedData);

      expect(expected).toBe(actual);
    });

    it('should round number 1.123 with two decimals', () => {
      const expected = 1.12;
      const actual = round(1.123, 2);

      expect(expected).toBe(actual);
    });

    it('should round number 2.3456 with two decimals', () => {
      const expected = 2.35;
      const actual = round(2.3456, 2);

      expect(expected).toBe(actual);
    });
  });
});
