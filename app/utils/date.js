/**
 * it gets 3 first characters of the string, expected a Month Name
 * @param {string} monthName Month Name to format
 */
export const getShortMonthName = (monthName) => {
  const totalCharacterToGet = 3;
  const startPosition = 0;
  if (monthName) {
    return monthName.substr(startPosition, totalCharacterToGet);
  }
  return '';
};

/**
 * This converts a string into a Customs formated Date
 * Mon dd, YYYY, TimeStamp AM/PM Format
 * @param {string} date Send date to parese and get the format
 */
export function getCustomFormattedDate(date) {
  if (!Number.isNaN(Date.parse(date))) {
    const parseDate = new Date(date);
    const localesFormat = 'default';
    const intlMonthOption = 'long';
    let shortMonthName = getShortMonthName(
      parseDate.toLocaleString(localesFormat, { month: intlMonthOption })
    );

    if (shortMonthName) {
      shortMonthName = `${shortMonthName[0].toUpperCase()}${
        shortMonthName.length > 1 ? shortMonthName.substring(1) : ''
      }`;
    }

    return `${shortMonthName} ${parseDate.getDate()}, ${parseDate.getFullYear()}, ${parseDate.toLocaleTimeString(
      localesFormat,
      { hour12: false }
    )}`;
  }

  return '';
}
