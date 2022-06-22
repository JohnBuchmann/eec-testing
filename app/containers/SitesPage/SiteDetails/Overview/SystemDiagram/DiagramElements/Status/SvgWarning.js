/**
 * Warning icon
 */

import React from 'react';
import { Colors } from 'Theme';

/**
 * Display the core of warning icon for svg
 */
function SvgWarning() {
  return (
    <>
      <desc>Warning icon core</desc>
      <g fill="none" fillRule="evenodd">
        <g fill={Colors.white}>
          <g>
            <g>
              <g>
                <g>
                  <path
                    d="M15.849 13.833L9.113 1.307c-.477-.888-1.749-.888-2.227 0L.151 13.833c-.21.393-.2.867.027 1.25.228.382.64.617 1.085.617h13.472c.445 0 .858-.234 1.086-.617.228-.382.239-.857.028-1.25zM8 13.761c-.437 0-.79-.354-.79-.792 0-.437.353-.791.79-.791.437 0 .79.354.79.791 0 .21-.083.412-.231.56-.148.149-.35.232-.559.232zm.858-7.96l-.226 4.828c0 .35-.284.633-.633.633-.349 0-.632-.284-.632-.633L7.14 5.802c-.01-.233.074-.46.235-.63.16-.169.382-.266.615-.268h.008c.235 0 .459.096.621.266.162.17.248.398.238.633l.001-.003z"
                    transform="translate(-685 -283) translate(98 178) translate(583 102) translate(4 3) translate(4 4)"
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

export default SvgWarning;
