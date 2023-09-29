export const toFeetInch = (m) => {
  let cm = m*100;
  let realFeet = ((cm*0.393700) / 12);
  let feet = Math.floor(realFeet);
  let inches = Math.round((realFeet - feet) * 12);
  inches = zerofyInch(inches);
  if (inches == 12) { feet++; inches = '00'; }
  let number = `${feet}′${inches}″`
  return number;
};

export const capitalizeWord = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const capitalizeWords = (string) => {
  let words = string.split('-');
  return words.map(word => capitalizeWord(word)).join(' ');
};

export const zerofy = (value) => {
  let zeroes = new Array(4).join("0");
  return (zeroes + value).slice(-3);
};

export const zerofyInch = (value) => {
  if (!value) return;
  let zeroes = new Array(3).join("0");
  return (zeroes + value).slice(-2);
};
