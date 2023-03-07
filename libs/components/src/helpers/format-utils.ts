export const formatTo3Digits = (num: number): string => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 '); // Use a lookahead to match only if the next group of three digits is not followed by another digit
};
export const maskCreditCardNumber = (cardNumber: string): string => {
  const visibleDigits = 4;
  const trimmedCardNumber = cardNumber.replace(/\s/g, ''); // remove any spaces
  if (trimmedCardNumber.length !== 16) {
    throw new Error('Invalid credit card number. Must be exactly 16 digits.');
  }
  const maskedNumber =
    trimmedCardNumber.substring(0, visibleDigits) +
    trimmedCardNumber
      .substring(visibleDigits, trimmedCardNumber.length - visibleDigits)
      .replace(/./g, 'X') +
    trimmedCardNumber.substring(trimmedCardNumber.length - visibleDigits);
  const maskedCardNumber = maskedNumber.replace(/(.{4})/g, '$1 '); // add spaces back
  return maskedCardNumber.trim();
};
