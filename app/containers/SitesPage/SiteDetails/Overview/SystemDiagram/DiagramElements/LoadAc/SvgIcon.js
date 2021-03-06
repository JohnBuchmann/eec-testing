/**
 * AC icon
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Colors } from 'Theme';

/**
 * @method SvgIcon
 * Displays ac icon
 * @param {number} x The X axis
 * @param {number} y The Y axis
 * @returns AC icon
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
      <desc>AC</desc>
      <g fill="none" fillRule="evenodd">
        <g fillRule="nonzero">
          <g>
            <g>
              <g>
                <g>
                  <g>
                    <path
                      fill={Colors.white}
                      d="M18 0c6.076 0 11.034 4.657 11.303 10.5h5.947c.414 0 .75.336.75.75s-.336.75-.75.75h-5.982c-.52 5.607-5.366 10-11.268 10-5.902 0-10.748-4.393-11.268-10H.75c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h5.947C6.967 4.657 11.924 0 18 0zm0 1C12.32 1 7.714 5.477 7.714 11S12.32 21 18 21c5.68 0 10.286-4.477 10.286-10S23.68 1 18 1z"
                      transform="translate(-290 -685) translate(95 221) translate(16 23) translate(149 324) translate(31 118) translate(4 11)"
                    />
                    <path
                      fill={Colors.hokeyPok}
                      d="M12 11.824c2.71-3.657 5.48-3.789 7.431-.242l.218.402c1.232 2.206 2.192 2.071 3.758-.686l.17-.306 1.423.664c-2.232 4.083-4.856 4.487-6.835.88l-.083-.152c-1.351-2.562-2.615-2.57-4.658.128l-.108.145L12 11.824z"
                      transform="translate(-290 -685) translate(95 221) translate(16 23) translate(149 324) translate(31 118) translate(4 11)"
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
