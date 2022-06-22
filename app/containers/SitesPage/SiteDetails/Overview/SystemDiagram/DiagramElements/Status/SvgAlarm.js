/**
 * Alarm icon
 */

import React from 'react';
import { Colors } from 'Theme';

/**
 * Display the core of alarm icon for svg
 */
function SvgAlarm() {
  return (
    <>
      <desc>Alarm icon core</desc>
      <defs>
        <filter id="57ps02qppa">
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
                filter="url(#57ps02qppa)"
                transform="translate(-509 -284) translate(98 178) translate(407 102) translate(4 4)"
              >
                <g fill={Colors.black} fillRule="nonzero">
                  <path
                    d="M4 0L3 14 1 14 0 0z"
                    transform="translate(10 3) matrix(-1 0 0 1 4 0)"
                  />
                  <path
                    d="M3 16L3 18 1 18 1 16z"
                    transform="translate(10 3) matrix(1 0 0 -1 0 34)"
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

export default SvgAlarm;
