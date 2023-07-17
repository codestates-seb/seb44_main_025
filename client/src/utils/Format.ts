export const getTimezoneAdjustedISOString = () => {
  return new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
};

export const getFormattedNumber = (number: number) => {
  return number.toLocaleString();
};
