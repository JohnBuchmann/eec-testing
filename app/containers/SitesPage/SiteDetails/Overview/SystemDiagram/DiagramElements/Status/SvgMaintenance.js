/**
 * Maintenance icon
 */

import React from 'react';
import { Colors } from 'Theme';

/**
 * Display the core of maintenance icon for svg
 */
function SvgMaintenance() {
  return (
    <>
      <desc>Maintenance icon core</desc>
      <g fill="none" fillRule="evenodd">
        <g fill={Colors.white}>
          <g>
            <g>
              <g>
                <g>
                  <g>
                    <path
                      d="M12.167 3c2.693.667 4.666 2.834 4.666 5.405 0 2.182-1.422 4.074-3.5 5.003v5.342H7.5l-.001-5.342C5.422 12.478 4 10.587 4 8.405 4 5.835 5.973 3.667 8.666 3v5.7h3.5z"
                      transform="translate(-130 -284) translate(98 178) translate(28 102) translate(4 4) translate(1 1) translate(.813 .125) rotate(-45 10.417 10.875)"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </>
  );
}

export default SvgMaintenance;
