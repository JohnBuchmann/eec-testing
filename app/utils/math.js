/**
 * round
 * Gets the rounded value from number
 * @param {number} value to be rounded
 * @param {number} decimals to round
 */
export const round = (value, decimals) => {
  const formatNumber = Number(
    `${Math.round(`${value}e${decimals}`)}e-${decimals}`
  );
  return Number.isNaN(formatNumber) ? 0 : formatNumber;
};
