/**
 * Ok icon
 */

import React from 'react';
import { Colors } from 'Theme';

/**
 * Display the core of ok icon for svg
 */
function SvgOk() {
  return (
    <>
      <desc>Ok icon core</desc>
      <defs>
        <filter id="3zjp5py6ka">
          <feColorMatrix
            in="SourceGraphic"
            values="0 0 0 0 1.000000 0 0 0 0 1.000000 0 0 0 0 1.000000 0 0 0 1.000000 0"
          />
        </filter>
      </defs>
      <g fill="none" fillRule="evenodd">
        <g>
          <g>
            <g>
              <g
                filter="url(#3zjp5py6ka)"
                transform="translate(-876 -284) translate(98 178) translate(774 102) translate(4 4)"
              >
                <g>
                  <path
                    fill={Colors.black}
                    fillRule="nonzero"
                    d="M16.225 0L18 1.731 6.144 15 0 8.983 1.661 7.133 6.028 11.41z"
                    transform="translate(3 5)"
                  />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </>
  );
}

export default SvgOk;
