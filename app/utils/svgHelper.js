/**
 * SVG helpers
 */
import { LineDirection } from './enums/systemDiagram';
import { propertyExist } from './propertyValidation';

export const SvgCommand = {
  LineRelativeHorizontal: 'h',
  LineRelativeVertical: 'v',
};

/**
 * translateToSvgCommandDirection
 * Get a SVG command direction
 *
 * @param {number} direction value to convert into a SVG command
 * @return {String} SVG direction command
 */
export const translateToSvgCommandDirection = (direction) => {
  let svgLineDirectionCommand;

  switch (direction) {
    case LineDirection.Horizontal:
      svgLineDirectionCommand = SvgCommand.LineRelativeHorizontal;
      break;
    case LineDirection.Vertical:
      svgLineDirectionCommand = SvgCommand.LineRelativeVertical;
      break;
    default:
      svgLineDirectionCommand = '';
      break;
  }

  return svgLineDirectionCommand;
};

/**
 * translateToLineVectorCommand
 * Translate a segment object to a SVG direction command  to draw a line
 *
 * @param {Object} segment
 * @return {String} SVG command data
 */
export const translateToLineVectorCommand = (segment) => {
  let lineSvgVectorCommand = '';

  if (
    propertyExist(() => segment.direction) &&
    propertyExist(() => segment.length)
  ) {
    const svgLineDirectionCommand = translateToSvgCommandDirection(
      segment.direction
    );

    lineSvgVectorCommand = svgLineDirectionCommand
      ? `${svgLineDirectionCommand}${segment.length}`
      : '';
  }

  return lineSvgVectorCommand;
};

/**
 * getSvgLineCommandData
 * Get a SVG command data to draw a line from segments objects
 *
 * @param {number} positionX position X where line start
 * @param {number} positionY position Y where line start
 * @param {Array} segments an array with consecutive segment lines with direction
 * @return {String} SVG command data
 */
export const getSvgLineCommandData = (positionX, positionY, segments) => {
  let lineCommandData = '';
  let lineVector = '';

  if (
    propertyExist(() => positionX) &&
    propertyExist(() => positionY) &&
    segments
  ) {
    lineCommandData = `M${positionX} ${positionY}`;

    lineVector = segments.reduce((accumulator, segment) => {
      const svgVectorCommand = translateToLineVectorCommand(segment);

      return svgVectorCommand
        ? `${accumulator} ${translateToLineVectorCommand(segment)}`
        : accumulator;
    }, '');

    lineCommandData = `${lineCommandData}${lineVector}`;
  }

  return lineCommandData;
};

/**
 * getSvgLineLength
 * Get total length from valid SVG segments from the array
 *
 * @param {Array} segments an array with consecutive segment lines with direction
 * @return {number} Total length
 */
export const getSvgLineLength = (segments) => {
  let lineLength = 0;
  if (segments) {
    lineLength = segments.reduce((accumulator, segment) => {
      const svgDirection = translateToSvgCommandDirection(segment.direction);

      return svgDirection
        ? accumulator + Math.abs(segment.length)
        : accumulator;
    }, 0);
  }

  return lineLength;
};
