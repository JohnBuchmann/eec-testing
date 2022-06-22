/**
 * Faulted icon
 */

import React from 'react';
import { Colors } from 'Theme';

/**
 * Display the core of faulted icon for svg
 */
function SvgFaulted() {
  return (
    <>
      <desc>Faulted icon core</desc>
      <defs>
        <filter id="mrqp0xtl3a">
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
                filter="url(#mrqp0xtl3a)"
                transform="translate(-322 -284) translate(98 178) translate(220 102) translate(4 4)"
              >
                <g>
                  <path
                    fill={Colors.black}
                    fillRule="nonzero"
                    d="M16 1.861L14.139 0 8 6.139 1.861 0 0 1.861 6.139 8 0 14.139 1.861 16 8 9.861 14.139 16 16 14.139 9.861 8z"
                    transform="translate(4 4)"
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

export default SvgFaulted;
