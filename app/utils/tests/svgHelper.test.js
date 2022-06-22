import { LineDirection } from 'Utils/enums/systemDiagram';
import {
  getSvgLineCommandData,
  getSvgLineLength,
  translateToLineVectorCommand,
  translateToSvgCommandDirection,
} from 'Utils/svgHelper';

describe('svgHelper', () => {
  describe('getSvgLineCommandData', () => {
    let mockPositionX;
    let mockPositionY;
    let mockSegments;

    beforeEach(() => {
      mockPositionX = 100;
      mockPositionY = 100;
      mockSegments = [
        {
          direction: 2,
          length: 50,
        },
        {
          direction: 1,
          length: 275,
        },
        {
          direction: 2,
          length: 50,
        },
      ];
    });

    it('should return a valid SVG command line when valid data is sent', () => {
      const expected = 'M100 100 v50 h275 v50';
      const actual = getSvgLineCommandData(
        mockPositionX,
        mockPositionY,
        mockSegments
      );

      expect(actual).toBe(expected);
    });

    it('should not process segment object when invalid direction is sent on a segment', () => {
      const expected = 'M100 100 h275';

      mockSegments = [
        {
          direction: -1,
          length: 50,
        },
        {
          direction: 1,
          length: 275,
        },
      ];
      const actual = getSvgLineCommandData(
        mockPositionX,
        mockPositionY,
        mockSegments
      );

      expect(actual).toBe(expected);
    });

    it('should return a empty SVG command line when null position X is sent', () => {
      const expected = '';
      const actual = getSvgLineCommandData(null, mockPositionY, mockSegments);

      expect(actual).toBe(expected);
    });

    it('should return a empty SVG command line when null position Y is sent', () => {
      const expected = '';
      const actual = getSvgLineCommandData(mockPositionX, null, mockSegments);

      expect(actual).toBe(expected);
    });

    it('should return a empty SVG command line when null segments is sent', () => {
      const expected = '';
      const actual = getSvgLineCommandData(mockPositionX, mockPositionY, null);

      expect(actual).toBe(expected);
    });
  });

  describe('translateToLineVectorCommand', () => {
    it('should return a valid SVG line vector command when valid data is sent', () => {
      const expected = 'v50';
      const mockSegment = {
        direction: 2,
        length: 50,
      };
      const actual = translateToLineVectorCommand(mockSegment);

      expect(actual).toBe(expected);
    });

    it('should return a empty SVG line vector command when null direction is sent', () => {
      const expected = '';
      const mockSegment = {
        length: 50,
      };
      const actual = translateToLineVectorCommand(mockSegment);

      expect(actual).toBe(expected);
    });

    it('should return a empty SVG line vector command when null length is sent', () => {
      const expected = '';
      const mockSegment = {
        direction: 2,
      };
      const actual = translateToLineVectorCommand(mockSegment);

      expect(actual).toBe(expected);
    });

    it('should return a empty SVG line vector command when invalid direction is sent', () => {
      const expected = '';
      const mockSegment = {
        direction: -1,
        length: 50,
      };
      const actual = translateToLineVectorCommand(mockSegment);

      expect(actual).toBe(expected);
    });
  });

  describe('translateToSvgCommandDirection', () => {
    it('should return a valid SVG horizontal direction command when Horizontal is sent', () => {
      const expected = 'h';
      const actual = translateToSvgCommandDirection(LineDirection.Horizontal);

      expect(actual).toBe(expected);
    });

    it('should return a valid SVG vertical direction command when Horizontal is sent', () => {
      const expected = 'v';
      const actual = translateToSvgCommandDirection(LineDirection.Vertical);

      expect(actual).toBe(expected);
    });

    it('should return a empty SVG direction command when invalid direction is sent', () => {
      const expected = '';
      const actual = translateToSvgCommandDirection(-1);

      expect(actual).toBe(expected);
    });
  });

  describe('getSvgLineLength', () => {
    it('should return total line length when valid segments are sent', () => {
      const mockSegments = [
        {
          direction: 1,
          length: 275,
        },
      ];

      const expected = 275;
      const actual = getSvgLineLength(mockSegments);

      expect(actual).toBe(expected);
    });

    it('should return zero when null segments are sent', () => {
      const mockSegments = null;
      const expected = 0;
      const actual = getSvgLineLength(mockSegments);

      expect(actual).toBe(expected);
    });

    it('should return total line length for valid segments when segments contains an invalid direction', () => {
      const mockSegments = [
        {
          direction: 1,
          length: 275,
        },
        {
          direction: -1,
          length: 20,
        },
      ];

      const expected = 275;
      const actual = getSvgLineLength(mockSegments);

      expect(actual).toBe(expected);
    });
  });
});
