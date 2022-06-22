/**
 * ESS icon
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Colors } from 'Theme';

/**
 * @method SvgIcon
 * Displays ESS icon
 * @param {number} x The X axis
 * @param {number} y The Y axis
 * @returns ESS icon
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
      <desc>ESS</desc>
      <g fill="none" fillRule="evenodd">
        <g fillRule="nonzero">
          <g>
            <g>
              <g>
                <g>
                  <g>
                    <path
                      fill={Colors.white}
                      d="M9.563 0c1.163 0 2.109.918 2.109 2.045v2.046h12.656V2.045c0-1.127.946-2.045 2.11-2.045h2.812c1.163 0 2.11.918 2.11 2.045v2.046h2.53c1.164 0 2.11.917 2.11 2.045V7.5c0 1.128-.946 2.045-2.11 2.045v15c1.164 0 2.11.918 2.11 2.046v1.364C36 29.082 35.054 30 33.89 30H21.165c-.388 0-.703-.305-.703-.682 0-.376.315-.682.703-.682h12.727c.387 0 .703-.305.703-.681V26.59c0-.376-.316-.682-.703-.682H2.109c-.387 0-.703.306-.703.682v1.364c0 .376.316.681.703.681h12.727c.388 0 .703.306.703.682 0 .377-.315.682-.703.682H2.109C.946 30 0 29.082 0 27.955V26.59c0-1.128.946-2.046 2.11-2.046v-15C.945 9.545 0 8.628 0 7.5V6.136c0-1.128.946-2.045 2.11-2.045h2.53V2.045C4.64.918 5.588 0 6.75 0zm8.79 28.636c.39 0 .706.306.706.682 0 .377-.316.682-.706.682-.39 0-.706-.305-.706-.682 0-.376.316-.682.706-.682zm14.131-19.09H3.516v15h28.968v-15zM9.882 14.317c.39 0 .706.305.706.682v1.364H12c.39 0 .706.305.706.681 0 .377-.316.682-.706.682h-1.412v1.364c0 .377-.316.682-.706.682-.39 0-.706-.305-.706-.682v-1.364H7.765c-.39 0-.706-.305-.706-.682 0-.376.316-.681.706-.681h1.411V15c0-.377.316-.682.706-.682zm18.353 2.046c.39 0 .706.305.706.681 0 .377-.316.682-.706.682H24c-.39 0-.706-.305-.706-.682 0-.376.316-.681.706-.681zm5.656-10.91H2.109c-.387 0-.703.306-.703.682V7.5c0 .376.316.682.703.682h31.782c.387 0 .703-.306.703-.682V6.136c0-.376-.316-.681-.703-.681zm-4.641-4.09h-2.813c-.387 0-.703.305-.703.681v2.046h4.22V2.045c0-.376-.316-.681-.704-.681zm-19.688 0H6.75c-.388 0-.703.305-.703.681v2.046h4.219V2.045c0-.376-.316-.681-.704-.681z"
                      transform="translate(-788 -684) translate(95 221) translate(16 23) translate(669 333) translate(9 108) translate(4 6)"
                    />
                    <path
                      fill={Colors.hokeyPok}
                      d="M14.762 17.83l2.196 1.172-.588 4.394c-.042.316.121.622.398.744.274.122.593.03.774-.226l3.927-5.591c.117-.166.158-.379.114-.58-.045-.202-.171-.372-.345-.465l-2.256-1.204v-3.762c0-.304-.184-.573-.455-.666-.27-.093-.567.013-.732.26l-3.273 4.892c-.111.166-.149.376-.103.575.046.198.171.365.343.457zm2.91-3.337v2.012c0 .265.14.507.362.626l1.917 1.023-1.924 2.739.294-2.192c.04-.298-.104-.59-.356-.724l-1.933-1.032 1.64-2.452z"
                      transform="translate(-788 -684) translate(95 221) translate(16 23) translate(669 333) translate(9 108) translate(4 6)"
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