export const toNumber = (...arr) => {
  return arr.reduce((accumulator: number, currentValue: number) => {
    // console.log(currentValue);
    currentValue = !!currentValue ? currentValue : 0;
    return accumulator + currentValue;
  }, 0);
};

