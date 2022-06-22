/**
 * Load DC Icon
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Colors } from 'Theme';

/**
 * @method SvgIcon
 * Displays load DC icon
 * @param {number} x The X axis
 * @param {number} y The Y axis
 * @returns Load DC icon
 */
function SvgIcon(props) {
  const { x = 0, y = 0 } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x={x}
      y={y}
      width="45"
      height="45"
      viewBox="0 0 45 45"
    >
      <desc>Load DC</desc>
      <g fill="none" fillRule="evenodd">
        <g fillRule="nonzero">
          <g>
            <g>
              <g>
                <g>
                  <g transform="translate(-601 -401) translate(95 221) translate(16 23) translate(482 128) translate(9 30) translate(4 11)">
                    <path
                      fill={Colors.white}
                      d="M18 0c6.076 0 11.034 4.657 11.303 10.5h5.947c.414 0 .75.336.75.75s-.336.75-.75.75h-5.982c-.52 5.607-5.366 10-11.268 10-5.902 0-10.748-4.393-11.268-10H.75c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h5.947C6.967 4.657 11.924 0 18 0zm0 1C12.32 1 7.714 5.477 7.714 11S12.32 21 18 21c5.68 0 10.286-4.477 10.286-10S23.68 1 18 1z"
                    />
                    <rect
                      width="10.588"
                      height="1"
                      x="12.706"
                      y="8"
                      fill={Colors.hokeyPok}
                      rx=".5"
                    />
                    <rect
                      width="10.588"
                      height="1"
                      x="12.706"
                      y="13"
                      fill={Colors.hokeyPok}
                      rx=".5"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

SvgIcon.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
};

export default SvgIcon;
