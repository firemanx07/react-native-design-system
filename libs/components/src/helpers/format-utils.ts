export const formatTo3Digits = (num: number): string => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 '); // Use a lookahead to match only if the next group of three digits is not followed by another digit
};
