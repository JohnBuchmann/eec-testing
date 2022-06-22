/**
 * Fleet icon
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Colors } from 'Theme';

/**
 * @method FleetIcon
 * Displays fleet icon
 * @param {number} x The X axis
 * @param {number} y The Y axis
 * @returns Fleet icon
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
      <desc>Fleet</desc>
      <g fill="none" fillRule="evenodd">
        <g fillRule="nonzero">
          <g>
            <g>
              <g>
                <g>
                  <g>
                    <path
                      fill={Colors.hokeyPok}
                      d="M27 22.815c-.264 0-.521.11-.707.304-.187.193-.293.46-.293.733 0 .273.106.54.293.733.186.193.443.304.707.304.263 0 .521-.111.707-.304.186-.193.293-.46.293-.733 0-.273-.107-.54-.293-.733-.187-.193-.444-.304-.707-.304zM9 22.815c-.264 0-.521.11-.708.304-.186.193-.292.46-.292.733 0 .273.106.54.292.733.187.193.444.304.708.304.263 0 .521-.111.707-.304.186-.193.293-.46.293-.733 0-.273-.107-.54-.293-.733-.186-.193-.444-.304-.707-.304z"
                      transform="translate(-290 -401) translate(95 221) translate(16 23) translate(171 128) translate(9 30) translate(4 8)"
                    />
                    <path
                      fill={Colors.white}
                      d="M35.794 14.48l-6.54-6.445c-.131-.13-.31-.203-.496-.203h-6.539V.693c0-.383-.315-.693-.703-.693h-7.251c-.388 0-.703.31-.703.693 0 .383.315.693.703.693h6.548V19.96H1.406V1.386h6.53c.389 0 .704-.31.704-.693C8.64.31 8.325 0 7.937 0H.703C.315 0 0 .31 0 .693V23.98c0 .383.315.693.703.693h4.228C5.265 26.56 6.94 28 8.947 28c2.01 0 3.682-1.44 4.017-3.327h10.934C24.233 26.56 25.906 28 27.915 28c2.009 0 3.682-1.44 4.016-3.327h3.366c.388 0 .703-.31.703-.693v-9.01c0-.184-.074-.36-.206-.49zm-2.607 4.094h1.407v1.386h-.861c-.3 0-.546-.24-.546-.537v-.849zm1.407-1.386h-4.735l3.347-3.299 1.388 1.368v1.931zm-8.437 0v-1.26l4.558-4.494 1.496 1.475-4.341 4.28h-1.713zm3.564-6.734l-3.564 3.513v-4.75h2.31l1.254 1.237zm-8.908 12.833h-7.85c-.13-.734-.462-1.4-.938-1.94h8.788v1.94zm-19.407-1.94H5.87c-.476.54-.809 1.206-.939 1.94H1.406v-1.94zm7.541 5.267c-1.473 0-2.671-1.182-2.671-2.634s1.198-2.633 2.671-2.633c1.474 0 2.672 1.181 2.672 2.633s-1.198 2.634-2.672 2.634zm18.968 0c-1.474 0-2.672-1.182-2.672-2.634s1.198-2.633 2.672-2.633c1.473 0 2.672 1.181 2.672 2.633s-1.199 2.634-2.672 2.634zm4.016-3.327c-.334-1.887-2.007-3.327-4.016-3.327-2.01 0-3.682 1.44-4.017 3.327H22.22V9.217h2.532v8.664c0 .383.314.693.703.693h6.327v.849c0 1.06.876 1.924 1.952 1.924h.86v1.94h-2.662z"
                      transform="translate(-290 -401) translate(95 221) translate(16 23) translate(171 128) translate(9 30) translate(4 8)"
                    />
                    <path
                      fill={Colors.white}
                      d="M4 11.407c0 4.003 3.14 7.26 7 7.26s7-3.257 7-7.26c0-4.002-3.14-7.259-7-7.259s-7 3.257-7 7.26zm12.614 0c0 3.21-2.519 5.822-5.614 5.822-3.095 0-5.614-2.611-5.614-5.822 0-3.21 2.519-5.821 5.614-5.821 3.095 0 5.614 2.611 5.614 5.821z"
                      transform="translate(-290 -401) translate(95 221) translate(16 23) translate(171 128) translate(9 30) translate(4 8)"
                    />
                    <path
                      fill={Colors.hokeyPok}
                      d="M8.043 10.677c-.083.198-.045.416.101.587.146.17.383.271.634.271h2.35l-.886 2.126c-.14.337.075.705.481.822.085.024.17.036.255.036.322 0 .624-.168.735-.435l1.244-2.984c.083-.197.045-.416-.101-.586-.146-.17-.383-.271-.634-.271h-2.35l.886-2.126c.14-.337-.075-.705-.481-.822-.406-.117-.85.062-.99.4l-1.244 2.982zM11 2.074c.263 0 .521-.11.707-.304.186-.193.293-.46.293-.733 0-.273-.107-.54-.293-.733C11.521.11 11.263 0 11 0c-.263 0-.521.11-.707.304-.186.193-.293.46-.293.733 0 .273.107.54.293.733.186.193.444.304.707.304z"
                      transform="translate(-290 -401) translate(95 221) translate(16 23) translate(171 128) translate(9 30) translate(4 8)"
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
