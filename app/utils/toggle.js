export const offLabel = 'OFF';
export const onLabel = 'ON';

/*
 * getDefaultToggleOptions
 * Get default (ON/OFF) toogle options
 * @return {object} object with default toogle options
 */
export function getDefaultToggleOptions() {
  return {
    left: {
      value: false,
      label: offLabel,
    },
    right: {
      value: true,
      label: onLabel,
    },
    disabled: false,
  };
}
