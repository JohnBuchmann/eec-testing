/**
 * Regex Catalog
 */
export const regex = {
  onlyNumbers: /\D/g,
  alphanumeric: /[^a-zA-Z0-9]/g,
  emailFormat: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
  phoneNumber: /^(\d{3})(\d{3})(\d{4})$/,
  phoneMask: [
    '(',
    /^[0-9]*$/,
    /^[0-9]*$/,
    /^[0-9]*$/,
    ')',
    ' ',
    /^[0-9]*$/,
    /^[0-9]*$/,
    /^[0-9]*$/,
    '-',
    /^[0-9]*$/,
    /^[0-9]*$/,
    /^[0-9]*$/,
    /^[0-9]*$/,
  ],
};

/**
 * @method formatPhoneNumber
 * Format phone number with regular expresion
 * @param phoneNumber
 * @return {string}
 */
export const formatPhoneNumber = (phoneNumber) => {
  const cleaned = `${phoneNumber}`.replace(/\D/g, '');
  const match = cleaned.match(regex.phoneNumber);
  const length = 4;
  if (match && match.length === length) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return null;
};

/**
 * @method validateEmail
 * Validate if an email has the proper structure
 * @param email value
 * @return {boolean}
 */
export const validateEmail = (email) => !!email.match(regex.emailFormat);
