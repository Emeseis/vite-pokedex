export const getColor = (type) => {
  if (type == 'Normal') return '#aaaa99';
  if (type == 'Fire') return '#ff4422';
  if (type == 'Water') return '#3399ff';
  if (type == 'Electric') return '#ffcc33';
  if (type == 'Grass') return '#77cc55';
  if (type == 'Ice') return '#66ccff';
  if (type == 'Fighting') return '#bb5544';
  if (type == 'Poison') return '#aa5599';
  if (type == 'Ground') return '#ddbb55';
  if (type == 'Flying') return '#8899ff';
  if (type == 'Psychic') return '#ff5599';
  if (type == 'Bug') return '#aabb22';
  if (type == 'Rock') return '#bbaa66';
  if (type == 'Ghost') return '#6666bb';
  if (type == 'Dragon') return '#7766ee';
  if (type == 'Dark') return '#775544';
  if (type == 'Steel') return '#aaaabb';
  if (type == 'Fairy') return '#ee99ee';  
  return '#000000'
};

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
}
