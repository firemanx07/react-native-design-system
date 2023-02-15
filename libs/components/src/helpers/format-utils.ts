export const formatTo3Digits = (num: number): string => {
  return num
    .toString()
    .replace(/(\d{1,2}?)((\d{3})+)$/, '$1 $2') //  puts a comma after the first 1 or 2 digits if the remaining number of digits is divisible by three
    .replace(/(\d{3})(?=\d)/g, '$1 '); // The second regex places a comma after every remaining group of 3 digits
};
