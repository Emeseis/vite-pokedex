export const getColor = (type) => {
  switch (type) {
    case 'Normal': return '#aaaa99';
    case 'Fire': return '#ff4422';
    case 'Water': return '#3399ff';
    case 'Electric': return '#ffcc33';
    case 'Grass': return '#77cc55';
    case 'Ice': return '#66ccff';
    case 'Fighting': return '#bb5544';
    case 'Poison': return '#aa5599';
    case 'Ground': return '#ddbb55';
    case 'Flying': return '#8899ff';
    case 'Psychic': return '#ff5599';
    case 'Bug': return '#aabb22';
    case 'Rock': return '#bbaa66';
    case 'Ghost': return '#6666bb';
    case 'Dark': return '#775544';
    case 'Dragon': return '#7766ee';
    case 'Steel': return '#aaaabb';
    case 'Fairy': return '#ee99ee';
  }
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
};
