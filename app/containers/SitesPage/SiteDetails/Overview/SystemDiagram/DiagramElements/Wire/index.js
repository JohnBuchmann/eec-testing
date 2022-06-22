/**
 * Wire
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Colors } from 'Theme';
import { FlowDirection } from 'Utils/enums/systemDiagram';
import { getSvgLineCommandData, getSvgLineLength } from 'Utils/svgHelper';

/**
 * @method Wire
 * Displays a Wire
 *
 * @param {number} x The X axis
 * @param {number} y The Y axis
 * @returns Ignition Wire component
 */
function Wire(props) {
  const { x = 0, y = 0, segments, flowDirection } = props;
  const strokeFlowWidth = 15;

  const lineCommandData = getSvgLineCommandData(x, y, segments);
  const wireLength = getSvgLineLength(segments);
  const strokeDashArray = [strokeFlowWidth, wireLength - strokeFlowWidth];
  const animateValues =
    flowDirection === FlowDirection.StartToEnd
      ? `0;${wireLength}`
      : `${wireLength};0`;

  /**
   * Component content
   */
  return (
    <>
      <path
        data-testid="path-wire"
        fill="none"
        strokeWidth="4"
        stroke={Colors.white}
        d={lineCommandData}
      />
      {flowDirection && (
        <path
          data-testid="path-flow"
          className="path"
          fill="none"
          strokeWidth="4"
          stroke={Colors.havelockBlue}
          d={lineCommandData}
          strokeDasharray={strokeDashArray}
          strokeDashoffset={wireLength}
        >
          <animate
            data-testid="path-flow-animation"
            attributeName="stroke-dashoffset"
            values={animateValues}
            dur="1.2s"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </path>
      )}
    </>
  );
}

Wire.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  segments: PropTypes.any,
  flowDirection: PropTypes.object,
};

export default Wire;
